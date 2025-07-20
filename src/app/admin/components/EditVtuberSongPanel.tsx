"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X, Plus } from "lucide-react";
import type { VtuberSong, Song, SuperChat, PremiumStatus } from "@prisma/client";
import type { VtuberSongForEditOrCreate } from "./AdminLayout";
import { SongOccurrencesPanel } from "./SongOccurrencesPanel";
import { listSongs } from "@/app/actions/v2/song";
import { superChatsAtom } from "@/lib/admin-store";
import { useAtom } from "jotai";

interface EditVtuberSongPanelProps {
	vtuberSong: VtuberSongForEditOrCreate;
	onSave: (vtuberSong: VtuberSongForEditOrCreate) => Promise<void>;
	onCancel: () => void;
	onNavigateToCreateSong?: () => void;
}

export default function EditVtuberSongPanel({ vtuberSong, onSave, onCancel, onNavigateToCreateSong }: EditVtuberSongPanelProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<VtuberSongForEditOrCreate>(vtuberSong);
	const [allSongs, setAllSongs] = useState<Song[]>([]);
	const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
	const [isLoadingSongs, setIsLoadingSongs] = useState(false);
	const [showCreateSongForm, setShowCreateSongForm] = useState(false);
	const [isOccurrencesExpanded, setIsOccurrencesExpanded] = useState(false);
	const [songSearchQuery, setSongSearchQuery] = useState("");
	const [showSongDropdown, setShowSongDropdown] = useState(false);
	
	// Load SuperChats from admin store
	const [superChatsAtomState] = useAtom(superChatsAtom);
	const { data: superChats } = superChatsAtomState;

	// Load available songs for dropdown
	useEffect(() => {
		const loadSongs = async () => {
			setIsLoadingSongs(true);
			try {
				const result = await listSongs();
				if (result.success && result.songs) {
					setAllSongs(result.songs);
					setFilteredSongs(result.songs);
				}
			} catch (error) {
				console.error('Failed to load songs:', error);
			} finally {
				setIsLoadingSongs(false);
			}
		};

		loadSongs();
	}, []);

	const handleInputChange = (field: keyof VtuberSong, value: any) => {
		setFormData((prev: VtuberSongForEditOrCreate) => ({
			...prev,
			vtuberSong: {
				...prev.vtuberSong,
				[field]: value,
			},
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		await onSave(formData);
		setIsLoading(false);
	};

	const selectedSong = allSongs.find((song: Song) => song.id === formData.vtuberSong.songId);

	// Filter songs based on search query
	useEffect(() => {
		if (songSearchQuery.trim() === "") {
			setFilteredSongs(allSongs);
		} else {
			const filtered = allSongs.filter((song: Song) =>
				song.title.toLowerCase().includes(songSearchQuery.toLowerCase()) ||
				song.artist.toLowerCase().includes(songSearchQuery.toLowerCase())
			);
			setFilteredSongs(filtered);
		}
	}, [songSearchQuery, allSongs]);

	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest('.song-search-container')) {
				setShowSongDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Set initial search query when song is selected
	useEffect(() => {
		if (selectedSong) {
			setSongSearchQuery(`${selectedSong.title} - ${selectedSong.artist}`);
		}
	}, [selectedSong]);

	return (
		<form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
			<div className="flex-1 space-y-4 overflow-y-auto">
								{/* Song Selection - Only show when creating new vtuber song */}
				{formData.create && (
					<div className="space-y-2">
						<Label htmlFor="song">选择歌曲 *</Label>
						<div className="flex gap-2">
							<div className="flex-1">
								<div className="relative song-search-container">
									<Input
										placeholder="搜索歌曲或歌手..."
										value={songSearchQuery}
										onChange={(e) => setSongSearchQuery(e.target.value)}
										onFocus={() => setShowSongDropdown(true)}
										className="w-full"
									/>
									{showSongDropdown && (
										<div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto">
											{filteredSongs.length > 0 ? (
												filteredSongs.map((song: Song) => (
													<div
														key={song.id}
														className="px-3 py-2 hover:bg-accent cursor-pointer text-sm"
														onClick={() => {
															handleInputChange("songId", song.id);
															setSongSearchQuery(`${song.title} - ${song.artist}`);
															setShowSongDropdown(false);
														}}
													>
														<div className="font-medium">{song.title}</div>
														<div className="text-muted-foreground text-xs">{song.artist}</div>
													</div>
												))
											) : (
												<div className="px-3 py-2 text-muted-foreground text-sm">
													未找到匹配的歌曲
												</div>
											)}
										</div>
									)}
								</div>
							</div>
							<Button
								type="button"
								variant="outline"
								size="icon"
								onClick={() => setShowCreateSongForm(true)}
								title="创建新歌曲"
							>
								<Plus className="w-4 h-4" />
							</Button>
						</div>
						{selectedSong && (
							<div className="text-sm text-muted-foreground">
								已选择: {selectedSong.title} - {selectedSong.artist}
							</div>
						)}
						{showCreateSongForm && (
							<div className="p-4 border rounded-lg bg-muted/50">
								<div className="text-sm font-medium mb-2">创建新歌曲</div>
								<div className="text-sm text-muted-foreground mb-3">
									如果歌曲不在列表中，请先创建歌曲，然后再选择。
								</div>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => {
										// Navigate to song creation tab
										if (onNavigateToCreateSong) {
											onNavigateToCreateSong();
										}
									}}
								>
									跳转到创建歌曲
								</Button>
							</div>
						)}
					</div>
				)}

				{/* Show selected song info when editing */}
				{!formData.create && selectedSong && (
					<div className="space-y-2">
						<Label>关联歌曲</Label>
						<div className="p-3 border rounded-lg bg-muted/30">
							<div className="font-medium">{selectedSong.title}</div>
							<div className="text-sm text-muted-foreground">{selectedSong.artist}</div>
						</div>
					</div>
				)}

				{/* BVID */}
				<div className="space-y-2">
					<Label htmlFor="bvid">B站视频ID</Label>
					<Input
						id="bvid"
						value={formData.vtuberSong.bvid || ""}
						onChange={(e) => handleInputChange("bvid", e.target.value)}
						placeholder="BV1xx411c7mD"
						className="text-base"
					/>
				</div>

				{/* Audio URL */}
				<div className="space-y-2">
					<Label htmlFor="audioUrl">音频文件链接</Label>
					<Input
						id="audioUrl"
						type="url"
						value={formData.vtuberSong.audioUrl || ""}
						onChange={(e) => handleInputChange("audioUrl", e.target.value)}
						placeholder="https://example.com/audio.mp3"
						className="text-base"
					/>
				</div>

				{/* SC点歌 */}
				<div className="space-y-2">
					<Label htmlFor="scStatus">SC点歌</Label>
					<Select
						value={formData.vtuberSong.scStatusId?.toString() || "none"}
						onValueChange={(value) => handleInputChange("scStatusId", value === "none" ? null : Number.parseInt(value))}
					>
						<SelectTrigger>
							<SelectValue placeholder="选择SC点歌状态" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="none">无</SelectItem>
							{superChats?.map((sc) => (
								<SelectItem key={sc.id} value={sc.id.toString()}>
									{sc.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Premium Status */}
				<div className="space-y-2">
					<Label htmlFor="premiumStatus">付费状态</Label>
					<Select
						value={formData.vtuberSong.premiumStatus || "free"}
						onValueChange={(value) => handleInputChange("premiumStatus", value === "free" ? null : value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="选择付费状态" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="free">免费</SelectItem>
							<SelectItem value="Captain">舰长</SelectItem>
							<SelectItem value="Admiral">提督</SelectItem>
							<SelectItem value="Governor">总督</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Remark */}
				<div className="space-y-2">
					<Label htmlFor="remark">备注</Label>
					<Textarea
						id="remark"
						value={formData.vtuberSong.remark || ""}
						onChange={(e) => handleInputChange("remark", e.target.value)}
						placeholder="添加备注信息"
						rows={3}
						className="text-base resize-none"
					/>
				</div>

				{/* Song Occurrences Panel - Only show when editing existing vtuber song */}
				{!formData.create && formData.vtuberSong.id > 0 && selectedSong && (
					<div className="space-y-2">
						<Label>直播记录</Label>
						<SongOccurrencesPanel 
							vtuberSong={formData.vtuberSong}
							isExpanded={isOccurrencesExpanded}
							onToggleExpanded={() => setIsOccurrencesExpanded(!isOccurrencesExpanded)}
						/>
					</div>
				)}
			</div>

			{/* Action Buttons */}
			<div className="flex gap-2 pt-4 border-t flex-shrink-0">
				<Button
					type="submit"
					disabled={isLoading}
					className="flex-1 h-12 text-base"
				>
					{isLoading ? (
						<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
					) : (
						<>
							<Save className="w-5 h-5 mr-2" />
							{formData.create ? "创建" : "保存"}
						</>
					)}
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={isLoading}
					className="h-12 px-6 text-base"
				>
					取消
				</Button>
			</div>
		</form>
	);
} 