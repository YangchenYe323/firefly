"use client";

import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, Eye, EyeOff } from "lucide-react";
import type { VtuberSong, Song, SuperChat } from "@prisma/client";
import { vtuberSongsAtom, superChatsAtom, songsAtom, useUpdateVtuberSongMutation } from "@/lib/admin-store";
import { toast } from "sonner";

interface VtuberSongTableProps {
	onEditVtuberSong: (vtuberSong: VtuberSong) => void;
	onDeleteVtuberSong: (vtuberSong: VtuberSong) => void;
}

export default function VtuberSongTable({ onEditVtuberSong, onDeleteVtuberSong }: VtuberSongTableProps) {
	const [vtuberSongsAtomState] = useAtom(vtuberSongsAtom);
	const [superChatsAtomState] = useAtom(superChatsAtom);
	const [songsAtomState] = useAtom(songsAtom);
	const [searchQuery, setSearchQuery] = useState("");
	const { mutateAsync: updateVtuberSong } = useUpdateVtuberSongMutation();

	const { data: vtuberSongs, isLoading, error, refetch: refetchVtuberSongs } = vtuberSongsAtomState;
	const { data: superChats } = superChatsAtomState;
	const { data: songs } = songsAtomState;

	// Filter vtuber songs based on search query
	const filteredVtuberSongs = (vtuberSongs || []).filter(vtuberSong => {
		const searchLower = searchQuery.toLowerCase();
		const song = songs?.find(s => s.id === vtuberSong.songId);
		const superChat = superChats?.find(sc => sc.id === vtuberSong.scStatusId);
		
		return (
			(vtuberSong.remark?.toLowerCase().includes(searchLower)) ||
			(vtuberSong.bvid?.toLowerCase().includes(searchLower)) ||
			(song && (
				song.title.toLowerCase().includes(searchLower) ||
				song.artist.toLowerCase().includes(searchLower)
			)) ||
			(superChat?.name.toLowerCase().includes(searchLower))
		);
	});

	const handleToggleHidden = async (vtuberSong: VtuberSong) => {
		try {
			await updateVtuberSong({
				...vtuberSong,
				hidden: !vtuberSong.hidden,
			});
			toast.success(`已${vtuberSong.hidden ? '显示' : '隐藏'}歌曲`);
			refetchVtuberSongs();
		} catch (error) {
			toast.error(`操作失败: ${error}`);
		}
	};

	if (error) {
		return (
			<div className="p-4 text-center text-red-500">
				<p>加载主播歌曲时出错: {error.message}</p>
				<Button
					variant="outline"
					size="sm"
					onClick={() => window.location.reload()}
					className="mt-2"
				>
					重试
				</Button>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="p-4 text-center">
				<p>正在加载主播歌曲...</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Search Bar */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
				<Input
					placeholder="搜索歌曲、歌手、备注、BVID..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="pl-10"
				/>
			</div>

			{/* Table */}
			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>歌曲</TableHead>
							<TableHead>歌手</TableHead>
							<TableHead>BVID</TableHead>
							<TableHead>音频</TableHead>
							<TableHead>付费状态</TableHead>
							<TableHead>SC点歌</TableHead>
							<TableHead>备注</TableHead>
							<TableHead>状态</TableHead>
							<TableHead>操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredVtuberSongs.map((vtuberSong) => {
							const song = songs?.find(s => s.id === vtuberSong.songId);
							const superChat = superChats?.find(sc => sc.id === vtuberSong.scStatusId);
							
							return (
							<TableRow 
								key={vtuberSong.id}
								className={vtuberSong.hidden ? "opacity-60 blur-[0.5px]" : ""}
							>
								<TableCell className="font-medium">
									{song ? song.title : `歌曲ID: ${vtuberSong.songId}`}
								</TableCell>
								<TableCell>
									{song ? song.artist : "未知歌手"}
								</TableCell>
								<TableCell>
									{vtuberSong.bvid ? (
										<Badge variant="outline" className="text-xs">
											{vtuberSong.bvid}
										</Badge>
									) : (
										<span className="text-muted-foreground">-</span>
									)}
								</TableCell>
								<TableCell>
									{vtuberSong.audioUrl ? (
										<Badge variant="secondary" className="text-xs">
											有音频
										</Badge>
									) : (
										<span className="text-muted-foreground">-</span>
									)}
								</TableCell>
								<TableCell>
									{vtuberSong.premiumStatus ? (
										<Badge variant="destructive" className="text-xs">
											{vtuberSong.premiumStatus}
										</Badge>
									) : (
										<Badge variant="default" className="text-xs">
											免费
										</Badge>
									)}
								</TableCell>
								<TableCell>
									{superChat ? (
										<Badge variant="secondary" className="text-xs">
											{superChat.name}
										</Badge>
									) : (
										<span className="text-muted-foreground">-</span>
									)}
								</TableCell>
								<TableCell>
									{vtuberSong.remark ? (
										<span className="text-sm text-muted-foreground">
											{vtuberSong.remark}
										</span>
									) : (
										<span className="text-muted-foreground">-</span>
									)}
								</TableCell>
								<TableCell>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleToggleHidden(vtuberSong)}
										title={vtuberSong.hidden ? "显示歌曲" : "隐藏歌曲"}
									>
										{vtuberSong.hidden ? (
											<EyeOff className="w-4 h-4 text-muted-foreground" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</Button>
								</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onEditVtuberSong(vtuberSong)}
										>
											<Edit className="w-4 h-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onDeleteVtuberSong(vtuberSong)}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>

			{/* Empty State */}
			{filteredVtuberSongs.length === 0 && (
				<div className="text-center py-8 text-muted-foreground">
					<p>暂无主播歌曲</p>
				</div>
			)}
		</div>
	);
} 