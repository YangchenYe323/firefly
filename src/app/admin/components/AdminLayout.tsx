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
	List,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Song, VtuberSong } from "@prisma/client";
import React, { useState, useEffect } from "react";

import SongTable from "./SongTable";
import VtuberSongTable from "./VtuberSongTable";
import EditSongPanel from "./EditSongPanel";
import EditVtuberSongPanel from "./EditVtuberSongPanel";
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
	useCreateVtuberSongMutation,
	useUpdateVtuberSongMutation,
	useDeleteVtuberSongMutation,
	vtuberProfilesAtom,
	selectedProfileIdAtom,
	selectedProfileAtom,
} from "@/lib/admin-store";

type TabType = "songs" | "vtuber-songs" | "profile" | "themes" | "links";

export type SongForEditOrCreate = {
	song: Song;
	create: boolean;
};

export type VtuberSongForEditOrCreate = {
	vtuberSong: VtuberSong;
	create: boolean;
};

export default function AdminLayout() {
	const selectedProfile = useAtomValue(selectedProfileAtom);
	const [selectedProfileId, setSelectedProfileId] = useAtom(selectedProfileIdAtom);
	const [profilesAtomState] = useAtom(vtuberProfilesAtom);

	const [
		{ isLoading: isLoadingSongs, error: songsError, refetch: refetchSongs },
	] = useAtom(songsAtom);

	const [{refetch: refetchVtuberProfile}] = useAtom(vtuberProfilesAtom);

	const filteredSongs = useAtomValue(filteredSongsAtom);

	const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
	const [showOnlyWithoutLyrics, setShowOnlyWithoutLyrics] = useAtom(
		showOnlyWithoutLyricsAtom,
	);

	const { mutateAsync: createSong } = useCreateSongMutation();
	const { mutateAsync: updateSong } = useUpdateSongMutation();
	const { mutateAsync: deleteSong } = useDeleteSongMutation();

	const { mutateAsync: createVtuberSong } = useCreateVtuberSongMutation();
	const { mutateAsync: updateVtuberSong } = useUpdateVtuberSongMutation();
	const { mutateAsync: deleteVtuberSong } = useDeleteVtuberSongMutation();

	const [activeTab, setActiveTab] = useState<TabType>("songs");
	const [selectedSong, setSelectedSong] = useState<SongForEditOrCreate | null>(
		null,
	);
	const [selectedVtuberSong, setSelectedVtuberSong] = useState<VtuberSongForEditOrCreate | null>(
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
				lang: [],
				tag: [],
				lyricsFragment: null,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			create: true,
		});
	};

	const handleEditVtuberSong = (vtuberSong: VtuberSong) => {
		setSelectedVtuberSong({
			vtuberSong,
			create: false,
		});
	};

	const handleCreateVtuberSong = () => {
		if (!selectedProfile) {
			toast.error("请先选择一个个人资料");
			return;
		}
		setSelectedVtuberSong({
			vtuberSong: {
				id: 0,
				songId: 0,
				vtuberProfileId: selectedProfile.id,
				bvid: null,
				pubdate: null,
				audioUrl: null,
				numLikes: 0,
				numDislikes: 0,
				scStatusId: null,
				remark: null,
				premiumStatus: null,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			create: true,
		});
	};

	const handleCloseEditPanel = () => {
		setSelectedSong(null);
		setSelectedVtuberSong(null);
	};

	const handleNavigateToCreateSong = () => {
		setActiveTab("songs");
		handleCreateSong();
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

	const handleSaveVtuberSong = async (vtuberSong: VtuberSongForEditOrCreate) => {
		if (vtuberSong.create) {
			try {
				await createVtuberSong(vtuberSong.vtuberSong);
			} catch (error) {
				toast.error(`创建主播歌曲失败: ${error}`);
				return;
			}
			toast.success("已创建主播歌曲");
			refetchVtuberProfile();
			handleCloseEditPanel();
			return;
		}

		try {
			await updateVtuberSong(vtuberSong.vtuberSong);
		} catch (error) {
			toast.error(`更新主播歌曲失败: ${error}`);
			return;
		}

		toast.success("已更新主播歌曲");
		refetchVtuberProfile();
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

	const handleDeleteVtuberSong = async (vtuberSong: VtuberSong) => {
		// Prompt user for confirmation
		const confirmed = confirm("确定要删除主播歌曲吗？");

		if (!confirmed) return;

		try {
			await deleteVtuberSong(vtuberSong.id);
			toast.success("已删除主播歌曲");
			refetchVtuberProfile();
		} catch (error) {
			toast.error(`删除主播歌曲失败: ${error}`);
		}
	};

	const tabs = [
		{ id: "songs" as TabType, label: "编辑歌曲", icon: Music },
		{ id: "vtuber-songs" as TabType, label: "编辑主播歌单", icon: List },
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
							<EditSongPanel
								song={selectedSong}
								onSave={handleSaveSong}
								onCancel={handleCloseEditPanel}
							/>
						</div>
					</div>
				</div>
			)}

			{selectedVtuberSong && (
				<div className="fixed inset-0 z-50 lg:hidden bg-background">
					<div className="h-full flex flex-col">
						<div className="flex items-center justify-between p-4 border-b">
							<h2 className="text-lg font-semibold">
								{selectedVtuberSong.create ? "添加主播歌曲" : "编辑主播歌曲"}
							</h2>
							<Button variant="ghost" size="sm" onClick={handleCloseEditPanel}>
								<X className="w-4 h-4" />
							</Button>
						</div>
						<div className="flex-1 overflow-auto p-4">
							<EditVtuberSongPanel
								vtuberSong={selectedVtuberSong}
								onSave={handleSaveVtuberSong}
								onCancel={handleCloseEditPanel}
								onNavigateToCreateSong={handleNavigateToCreateSong}
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
									<EditSongPanel
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

			{activeTab === "vtuber-songs" && (
				<div className="space-y-6">
					{/* Profile Selector */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle>选择个人资料</CardTitle>
								{selectedProfile && (
									<Button onClick={handleCreateVtuberSong} size="sm">
										<Plus className="w-4 h-4 mr-2" />
										添加主播歌曲
									</Button>
								)}
							</div>
						</CardHeader>
						<CardContent>
							{selectedProfile ? (
								<div className="space-y-4">
									<Select
										value={selectedProfileId?.toString() || selectedProfile?.id.toString()}
										onValueChange={(profileId) => setSelectedProfileId(Number(profileId))}
									>
										<SelectTrigger>
											<SelectValue placeholder="选择个人资料" />
										</SelectTrigger>
										<SelectContent>
											{profilesAtomState.data?.map((profile) => (
												<SelectItem key={profile.id} value={profile.id.toString()}>
													{profile.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							) : (
								<div className="text-center py-8 text-gray-500">
									<p>请先在"个人资料"标签页创建个人资料。</p>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Vtuber Songs Table */}
					{selectedProfile && (
						<div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
							{/* Table Section */}
							<div className={`flex-1 ${selectedVtuberSong ? "lg:w-2/3" : "w-full"}`}>
								<Card className="h-full">
									<CardHeader className="pb-4">
										<div className="flex items-center justify-between">
											<CardTitle className="text-xl font-semibold">
												{selectedProfile.name} - 主播歌单管理
											</CardTitle>
										</div>
									</CardHeader>

									<CardContent className="p-0 flex-1">
										<VtuberSongTable
											onEditVtuberSong={handleEditVtuberSong}
											onDeleteVtuberSong={handleDeleteVtuberSong}
										/>
									</CardContent>
								</Card>
							</div>

					{/* Desktop Edit Panel */}
					{selectedVtuberSong && (
						<div className="hidden lg:block lg:w-1/3">
							<Card className="h-full">
								<CardHeader className="pb-4">
									<div className="flex items-center justify-between">
										<CardTitle className="text-lg font-semibold">
											{selectedVtuberSong.create ? "添加主播歌曲" : "编辑主播歌曲"}
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
									<EditVtuberSongPanel
										vtuberSong={selectedVtuberSong}
										onSave={handleSaveVtuberSong}
										onCancel={handleCloseEditPanel}
										onNavigateToCreateSong={handleNavigateToCreateSong}
									/>
								</CardContent>
							</Card>
						</div>
					)}
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
