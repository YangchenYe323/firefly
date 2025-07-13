"use client";

import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Edit,
	Trash2,
	ExternalLink,
	Music,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Song } from "@prisma/client";
import { SongOccurrencesPanel } from "./SongOccurrencesPanel";

interface SongTableProps {
	songs: Song[];
	onEditSong: (song: Song) => void;
	onDeleteSong: (song: Song) => Promise<void>;
}

export default function SongTable({
	songs,
	onEditSong,
	onDeleteSong,
}: SongTableProps) {
	const [hoveredRow, setHoveredRow] = useState<number | null>(null);
	const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

	const toggleRowExpansion = (songId: number) => {
		const newExpandedRows = new Set(expandedRows);
		if (newExpandedRows.has(songId)) {
			newExpandedRows.delete(songId);
		} else {
			newExpandedRows.add(songId);
		}
		setExpandedRows(newExpandedRows);
	};

	if (songs.length === 0) {
		return (
			<div className="flex items-center justify-center h-64 text-gray-500">
				没有找到歌曲
			</div>
		);
	}

	return (
		<div className="overflow-auto h-full">
			<Table>
				<TableHeader className="sticky top-0 bg-background z-10">
					<TableRow>
						<TableHead className="w-12">ID</TableHead>
						<TableHead className="min-w-[200px]">歌曲名</TableHead>
						{/* Desktop-only columns */}
						<TableHead className="min-w-[150px] hidden md:table-cell">
							歌手
						</TableHead>
						<TableHead className="min-w-[100px] hidden md:table-cell">
							语种
						</TableHead>
						<TableHead className="min-w-[120px] hidden md:table-cell">
							标签
						</TableHead>
						<TableHead className="min-w-[150px] hidden md:table-cell">
							歌词片段
						</TableHead>
						<TableHead className="min-w-[100px] hidden md:table-cell">
							链接
						</TableHead>
						<TableHead className="min-w-[100px] hidden md:table-cell">
							备注
						</TableHead>
						<TableHead className="w-20">操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{songs.map((song) => {
						const isExpanded = expandedRows.has(song.id!);

						return (
							<>
								<TableRow
									key={song.id}
									className="hover:bg-muted/50 transition-colors"
									onMouseEnter={() => setHoveredRow(song.id!)}
									onMouseLeave={() => setHoveredRow(null)}
								>
									<TableCell className="font-mono text-sm">{song.id}</TableCell>

									<TableCell className="font-medium">
										<div className="flex items-center gap-2">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => toggleRowExpansion(song.id!)}
												className="h-6 w-6 p-0 hover:bg-muted"
											>
												<motion.div
													animate={{ rotate: isExpanded ? 90 : 0 }}
													transition={{ duration: 0.2 }}
												>
													<ChevronRight className="w-3 h-3" />
												</motion.div>
											</Button>
											{(song.extra as any)?.bucket_url && (
												<Music className="w-4 h-4 text-blue-500" />
											)}
											<div className="min-w-0 flex-1">
												<div className="truncate" title={song.title}>
													{song.title}
												</div>
												{/* Show artist on mobile as subtitle */}
												<div
													className="text-sm text-muted-foreground truncate md:hidden"
													title={song.artist}
												>
													{song.artist}
												</div>
											</div>
										</div>
									</TableCell>

									{/* Desktop-only cells */}
									<TableCell className="hidden md:table-cell">
										<span
											className="truncate max-w-[130px] block"
											title={song.artist}
										>
											{song.artist}
										</span>
									</TableCell>

									<TableCell className="hidden md:table-cell">
										<div className="flex flex-wrap gap-1">
											{song.lang.slice(0, 2).map((lang, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="text-xs"
												>
													{lang}
												</Badge>
											))}
											{song.lang.length > 2 && (
												<Badge variant="outline" className="text-xs">
													+{song.lang.length - 2}
												</Badge>
											)}
										</div>
									</TableCell>

									<TableCell className="hidden md:table-cell">
										<div className="flex flex-wrap gap-1">
											{song.tag.slice(0, 2).map((tag, index) => (
												<Badge
													key={index}
													variant="outline"
													className="text-xs"
												>
													{tag}
												</Badge>
											))}
											{song.tag.length > 2 && (
												<Badge variant="outline" className="text-xs">
													+{song.tag.length - 2}
												</Badge>
											)}
										</div>
									</TableCell>

									<TableCell className="hidden md:table-cell">
										<span
											className="truncate max-w-[130px] block text-sm text-muted-foreground"
											title={song.lyrics_fragment || "无歌词"}
										>
											{song.lyrics_fragment ? (
												song.lyrics_fragment.length > 50 ? (
													`${song.lyrics_fragment.substring(0, 50)}...`
												) : (
													song.lyrics_fragment
												)
											) : (
												<span className="text-muted-foreground">-</span>
											)}
										</span>
									</TableCell>

									<TableCell className="hidden md:table-cell">
										{song.url ? (
											<Button
												variant="ghost"
												size="sm"
												onClick={() => window.open(song.url!, "_blank")}
												className="h-6 px-2"
											>
												<ExternalLink className="w-3 h-3" />
											</Button>
										) : (
											<span className="text-muted-foreground text-sm">-</span>
										)}
									</TableCell>

									<TableCell className="hidden md:table-cell">
										<span
											className="truncate max-w-[80px] block text-sm text-muted-foreground"
											title={song.remark}
										>
											{song.remark || "-"}
										</span>
									</TableCell>

									<TableCell>
										<div className="flex items-center gap-1">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => onEditSong(song)}
												className="h-6 w-6 p-0"
											>
												<Edit className="w-3 h-3" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => onDeleteSong(song)}
												className="h-6 w-6 p-0 text-destructive hover:text-destructive"
											>
												<Trash2 className="w-3 h-3" />
											</Button>
										</div>
									</TableCell>
								</TableRow>

								{/* Expanded Row for Occurrences */}
								<AnimatePresence>
									{isExpanded && (
										<TableRow key={`${song.id}-expanded`}>
											<TableCell colSpan={8} className="p-0">
												<SongOccurrencesPanel
													song={song}
													isExpanded={isExpanded}
													onToggleExpanded={() => toggleRowExpansion(song.id!)}
												/>
											</TableCell>
										</TableRow>
									)}
								</AnimatePresence>
							</>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
