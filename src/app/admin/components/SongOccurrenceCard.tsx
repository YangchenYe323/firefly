"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, ImageOff, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { SongOccurrenceInLiveWithReferences } from "@/app/actions/v2/song";
interface SongOccurrenceCardProps {
	occurrence: SongOccurrenceInLiveWithReferences;
	index: number;
	songId: number;
	onDelete: (occurrence: SongOccurrenceInLiveWithReferences) => Promise<void>;
}

export function SongOccurrenceCard({
	occurrence,
	index,
	songId,
	onDelete,
}: SongOccurrenceCardProps) {
	const [imageError, setImageError] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	// Calculate progress percentage based on start time and duration
	const progressPercentage = (occurrence.start / occurrence.liveRecordingArchive.duration) * 100;

	// Format time for display
	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		}
		return `${minutes}:${secs.toString().padStart(2, "0")}`;
	};

	// Generate Bilibili URL with timestamp and page
	const generateBilibiliUrl = () => {
		const baseUrl = `https://www.bilibili.com/video/${occurrence.liveRecordingArchive.bvid}`;
		const params = new URLSearchParams();

		if (occurrence.start > 0) {
			params.set("t", occurrence.start.toString());
		}

		if (occurrence.page > 1) {
			params.set("p", occurrence.page.toString());
		}

		const queryString = params.toString();
		return queryString ? `${baseUrl}?${queryString}` : baseUrl;
	};

	const handleImageError = () => {
		setImageError(true);
	};

	const handleDelete = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (
			!confirm(
				`确定要删除这个播放记录吗？\n${occurrence.liveRecordingArchive.title}\nP${occurrence.page} - ${formatTime(occurrence.start)}`,
			)
		) {
			return;
		}

		setIsDeleting(true);
		await onDelete?.(occurrence);
		setIsDeleting(false);
	};

	const bilibiliUrl = generateBilibiliUrl();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.3,
				delay: index * 0.05,
				ease: "easeOut",
			}}
			whileHover={{
				scale: 1.02,
				transition: { duration: 0.2 },
			}}
			whileTap={{ scale: 0.98 }}
		>
			<Card className="relative group">
				<CardContent className="p-4">
					<div className="flex gap-4">
						{/* Cover Image */}
						<div className="relative flex-shrink-0">
							{!imageError ? (
								<img
									src={occurrence.liveRecordingArchive.cover}
									alt={occurrence.liveRecordingArchive.title}
									className="w-20 h-20 object-cover rounded-lg shadow-sm"
									loading="lazy"
									onError={handleImageError}
									referrerPolicy="no-referrer"
								/>
							) : (
								<div className="w-20 h-20 bg-muted rounded-lg shadow-sm flex items-center justify-center">
									<ImageOff className="w-8 h-8 text-muted-foreground" />
								</div>
							)}
							<div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
								<Play className="w-6 h-6 text-white" />
							</div>
						</div>

						{/* Content */}
						<div className="flex-1 min-w-0 relative">
							{/* Title and Page */}
							<div className="flex items-start justify-between gap-2 mb-2">
								<h3 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
									{occurrence.liveRecordingArchive.title}
								</h3>
								{occurrence.page > 1 && (
									<span className="text-xs bg-muted px-2 py-1 rounded flex-shrink-0">
										P{occurrence.page}
									</span>
								)}
							</div>

							{/* Progress Bar */}
							<div className="space-y-1">
								<div className="flex items-center justify-between text-xs text-muted-foreground">
									<span>开始时间: {formatTime(occurrence.start)}</span>
									<span>总时长: {formatTime(occurrence.liveRecordingArchive.duration)}</span>
								</div>
								<div className="relative">
									<Progress value={progressPercentage} className="h-2" />
									<div className="absolute inset-0 flex items-center justify-center">
										<ExternalLink className="w-3 h-3 text-muted-foreground/50" />
									</div>
								</div>
							</div>

							{/* Link overlay only for the content area */}
							<a
								href={bilibiliUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="absolute inset-0 z-10 cursor-pointer"
								aria-label={`观看 ${occurrence.liveRecordingArchive.title} 在 ${formatTime(occurrence.start)} 的播放`}
							>
								<span className="sr-only">
									观看 {occurrence.liveRecordingArchive.title} 在 {formatTime(occurrence.start)}{" "}
									的播放
								</span>
							</a>
						</div>

						{/* Delete Button */}
						<div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity relative z-20">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleDelete}
								disabled={isDeleting}
								className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
							>
								{isDeleting ? (
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-destructive"></div>
								) : (
									<Trash2 className="w-4 h-4" />
								)}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
