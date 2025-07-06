"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { EditableSong } from "../page";
import SongTable from "./SongTable";
import EditPanel from "./EditPanel";
import { createSong, deleteSong, updateSong } from "@/app/actions/crud";

interface AdminLayoutProps {
	initialSongs: EditableSong[];
}

export default function AdminLayout({ initialSongs }: AdminLayoutProps) {
	const [songs, setSongs] = useState<EditableSong[]>(initialSongs);
	const [searchQuery, setSearchQuery] = useState("");
	const [showOnlyWithoutLyrics, setShowOnlyWithoutLyrics] = useState(false);
	const [selectedSong, setSelectedSong] = useState<EditableSong | null>(null);
	const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Filter songs based on search query and lyrics filter
	const filteredSongs = songs.filter((song) => {
		// First filter by lyrics if enabled
		if (showOnlyWithoutLyrics && song.lyrics_fragment) {
			return false;
		}

		// Then filter by search query
		const query = searchQuery.toLowerCase();
		return (
			song.title.toLowerCase().includes(query) ||
			song.artist.toLowerCase().includes(query) ||
			song.lang.some((lang) => lang.toLowerCase().includes(query)) ||
			song.tag.some((tag) => tag.toLowerCase().includes(query)) ||
			song.remark.toLowerCase().includes(query) ||
			song.lyrics_fragment?.toLowerCase().includes(query)
		);
	});

	const handleEditSong = (song: EditableSong) => {
		setSelectedSong(song);
		setIsEditPanelOpen(true);
		setIsCreating(false);
	};

	const handleCreateSong = () => {
		setSelectedSong({
			id: 0,
			title: "",
			artist: "",
			lang: [],
			tag: [],
			url: "",
			remark: "",
			lyrics_fragment: "",
			bucket_url: "",
		});
		setIsEditPanelOpen(true);
		setIsCreating(true);
	};

	const handleDeleteSong = async (song: EditableSong) => {
		if (!confirm(`确定要删除歌曲 "${song.title}" 吗？`)) {
			return;
		}

		setIsLoading(true);
		try {
			const result = await deleteSong(song.id!);
			if (result.success) {
				setSongs(songs.filter((s) => s.id !== song.id));
				toast.success("歌曲删除成功");
			} else {
				toast.error(result.message || "删除失败");
			}
		} catch (error) {
			toast.error("删除失败，请稍后重试");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSaveSong = async (songData: EditableSong) => {
		setIsLoading(true);
		try {
			if (isCreating) {
				const result = await createSong(songData);
				if (result.success && result.song) {
					const newSong: EditableSong = {
						...result.song,
						bucket_url: result.song.extra?.bucket_url || "",
					};
					setSongs([newSong, ...songs]);
					toast.success("歌曲创建成功");
					setIsEditPanelOpen(false);
				} else {
					toast.error(result.message || "创建失败");
				}
			} else {
				const result = await updateSong(songData);
				if (result.success && result.song) {
					const updatedSong: EditableSong = {
						...result.song,
						bucket_url: result.song.extra?.bucket_url || "",
					};
					setSongs(songs.map((s) => (s.id === songData.id ? updatedSong : s)));
					toast.success("歌曲更新成功");
					setIsEditPanelOpen(false);
				} else {
					toast.error(result.message || "更新失败");
				}
			}
		} catch (error) {
			toast.error("操作失败，请稍后重试");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCloseEditPanel = () => {
		setIsEditPanelOpen(false);
		setSelectedSong(null);
	};

	return (
		<div className="container mx-auto p-4 lg:p-6 max-w-7xl">
			{/* Mobile Edit Panel Overlay */}
			{isEditPanelOpen && selectedSong && (
				<div className="fixed inset-0 z-50 lg:hidden bg-background">
					<div className="h-full flex flex-col">
						<div className="flex items-center justify-between p-4 border-b">
							<h2 className="text-lg font-semibold">
								{isCreating ? "添加歌曲" : "编辑歌曲"}
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
								isLoading={isLoading}
								isCreating={isCreating}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Desktop Layout */}
			<div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-2rem)]">
				{/* Table Section */}
				<div className={`flex-1 ${isEditPanelOpen ? "lg:w-2/3" : "w-full"}`}>
					<Card className="h-full">
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<CardTitle className="text-xl font-semibold">
									歌曲管理
								</CardTitle>
								<Button onClick={handleCreateSong} size="sm">
									<Plus className="w-4 h-4 mr-2" />
									添加歌曲
								</Button>
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
											({filteredSongs.length} 首歌曲)
										</span>
									)}
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-0 flex-1">
							<SongTable
								songs={filteredSongs}
								onEditSong={handleEditSong}
								onDeleteSong={handleDeleteSong}
								isLoading={isLoading}
							/>
						</CardContent>
					</Card>
				</div>

				{/* Desktop Edit Panel */}
				{isEditPanelOpen && selectedSong && (
					<div className="hidden lg:block lg:w-1/3">
						<Card className="h-full">
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<CardTitle className="text-lg font-semibold">
										{isCreating ? "添加歌曲" : "编辑歌曲"}
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
									isLoading={isLoading}
									isCreating={isCreating}
								/>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</div>
	);
}
