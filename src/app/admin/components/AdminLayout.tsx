"use client";

import { useAtom, useAtomValue } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Plus,
	Search,
	X,
	Music,
	User,
	Palette,
	Link,
	RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { Song } from "@prisma/client";
import React, { useState } from "react";

import SongTable from "./SongTable";
import EditPanel from "./EditPanel";
import ProfilePanel from "./ProfilePanel";
import ThemesPanel from "./ThemesPanel";
import ExternalLinksPanel from "./ExternalLinksPanel";
import {
	searchQueryAtom,
	showOnlyWithoutLyricsAtom,
	filteredSongsAtom,
	useCreateSongMutation,
	useUpdateSongMutation,
	songsAtom,
	useDeleteSongMutation,
} from "@/lib/admin-store";

type TabType = "songs" | "profile" | "themes" | "links";

export type SongForEditOrCreate = {
	song: Song;
	create: boolean;
};

export default function AdminLayout() {
	const [
		{ isLoading: isLoadingSongs, error: songsError, refetch: refetchSongs },
	] = useAtom(songsAtom);

	const filteredSongs = useAtomValue(filteredSongsAtom);

	const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
	const [showOnlyWithoutLyrics, setShowOnlyWithoutLyrics] = useAtom(
		showOnlyWithoutLyricsAtom,
	);

	const { mutateAsync: createSong } = useCreateSongMutation();
	const { mutateAsync: updateSong } = useUpdateSongMutation();
	const { mutateAsync: deleteSong } = useDeleteSongMutation();

	const [activeTab, setActiveTab] = useState<TabType>("songs");
	const [selectedSong, setSelectedSong] = useState<SongForEditOrCreate | null>(
		null,
	);

	// Fetch songs on mount
	const handleEditSong = (song: Song) => {
		setSelectedSong({
			song,
			create: false,
		});
	};

	const handleCreateSong = () => {
		// For now, we'll skip song creation until we update the EditPanel
		setSelectedSong({
			song: {
				id: 0,
				title: "",
				artist: "",
				remark: "",
				lang: [],
				tag: [],
				url: null,
				lyricsFragment: null,
				createdOn: new Date(),
				updatedOn: new Date(),
				extra: {},
			},
			create: true,
		});
	};

	const handleCloseEditPanel = () => {
		setSelectedSong(null);
	};

	const handleSaveSong = async (song: SongForEditOrCreate) => {
		if (song.create) {
			try {
				await createSong(song.song);
			} catch (error) {
				toast.error(`创建歌曲失败: ${error}`);
				return;
			}
			toast.success(`已创建歌曲 ${song.song.title}`);
			refetchSongs();
			return;
		}

		try {
			await updateSong(song.song);
		} catch (error) {
			toast.error(`更新歌曲失败: ${error}`);
			return;
		}

		toast.success(`已更新歌曲 ${song.song.title}`);
		refetchSongs();

		handleCloseEditPanel();
	};

	const handleDeleteSong = async (song: Song) => {
		// Prompt user for confirmation
		const confirmed = confirm(`确定要删除歌曲 ${song.title} 吗？`);

		if (!confirmed) return;

		await deleteSong(song.id!);

		toast.success(`已删除歌曲 ${song.title}`);

		await refetchSongs();
	};

	const tabs = [
		{ id: "songs" as TabType, label: "歌曲管理", icon: Music },
		{ id: "profile" as TabType, label: "个人资料", icon: User },
		{ id: "themes" as TabType, label: "主题管理", icon: Palette },
		{ id: "links" as TabType, label: "外部链接", icon: Link },
	];

	return (
		<div className="container mx-auto p-4 lg:p-6 max-w-7xl">
			{/* Mobile Edit Panel Overlay */}
			{selectedSong && (
				<div className="fixed inset-0 z-50 lg:hidden bg-background">
					<div className="h-full flex flex-col">
						<div className="flex items-center justify-between p-4 border-b">
							<h2 className="text-lg font-semibold">
								{selectedSong.create ? "添加歌曲" : "编辑歌曲"}
							</h2>
							<Button variant="ghost" size="sm" onClick={handleCloseEditPanel}>
								<X className="w-4 h-4" />
							</Button>
						</div>
						<div className="flex-1 overflow-auto p-4">
							<EditPanel
								song={selectedSong}
								onSave={handleSaveSong}
								onCancel={handleCloseEditPanel}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Tabs */}
			<div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<Button
							key={tab.id}
							variant={activeTab === tab.id ? "default" : "ghost"}
							size="sm"
							onClick={() => setActiveTab(tab.id)}
							className="flex items-center gap-2"
						>
							<Icon className="w-4 h-4" />
							<span className="hidden sm:inline">{tab.label}</span>
						</Button>
					);
				})}
			</div>

			{/* Content based on active tab */}
			{activeTab === "songs" && (
				<div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
					{/* Table Section */}
					<div className={`flex-1 ${selectedSong ? "lg:w-2/3" : "w-full"}`}>
						<Card className="h-full">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<CardTitle className="text-xl font-semibold">
										歌曲管理
									</CardTitle>
									<div className="flex gap-2">
										<Button onClick={handleCreateSong} size="sm">
											<Plus className="w-4 h-4 mr-2" />
											添加歌曲
										</Button>
									</div>
								</div>

								{/* Search and Filter Bar */}
								<div className="space-y-2">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
										<Input
											placeholder="搜索歌曲、歌手、标签、歌词..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className="pl-10"
										/>
									</div>
									<div className="flex items-center gap-2">
										<Button
											variant={showOnlyWithoutLyrics ? "default" : "outline"}
											size="sm"
											onClick={() =>
												setShowOnlyWithoutLyrics(!showOnlyWithoutLyrics)
											}
											className="text-xs"
										>
											仅显示无歌词歌曲
										</Button>
										{showOnlyWithoutLyrics && (
											<span className="text-xs text-muted-foreground">
												({filteredSongs?.length ?? 0} 首歌曲)
											</span>
										)}
									</div>
								</div>
							</CardHeader>

							<CardContent className="p-0 flex-1">
								{songsError ? (
									<div className="p-4 text-center text-red-500">
										<p>加载歌曲时出错: {songsError.message}</p>
										<pre className="text-xs mt-2 text-left bg-gray-100 p-2 rounded">
											{JSON.stringify(songsError, null, 2)}
										</pre>
										<Button
											variant="outline"
											size="sm"
											onClick={() => refetchSongs()}
											className="mt-2"
										>
											重试
										</Button>
									</div>
								) : isLoadingSongs ? (
									<div className="p-4 text-center">
										<p>正在加载歌曲...</p>
									</div>
								) : (
									<SongTable
										songs={filteredSongs ?? []}
										onEditSong={handleEditSong}
										onDeleteSong={handleDeleteSong}
									/>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Desktop Edit Panel */}
					{selectedSong && (
						<div className="hidden lg:block lg:w-1/3">
							<Card className="h-full">
								<CardHeader className="pb-4">
									<div className="flex items-center justify-between">
										<CardTitle className="text-lg font-semibold">
											{selectedSong.create ? "添加歌曲" : "编辑歌曲"}
										</CardTitle>
										<Button
											variant="ghost"
											size="sm"
											onClick={handleCloseEditPanel}
										>
											<X className="w-4 h-4" />
										</Button>
									</div>
								</CardHeader>

								<CardContent className="flex-1">
									<EditPanel
										song={selectedSong}
										onSave={handleSaveSong}
										onCancel={handleCloseEditPanel}
									/>
								</CardContent>
							</Card>
						</div>
					)}
				</div>
			)}

			{activeTab === "profile" && (
				<div className="space-y-6">
					<ProfilePanel />
				</div>
			)}

			{activeTab === "themes" && (
				<div className="space-y-6">
					<ThemesPanel />
				</div>
			)}

			{activeTab === "links" && (
				<div className="space-y-6">
					<ExternalLinksPanel />
				</div>
			)}
		</div>
	);
}
