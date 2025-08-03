"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
	RefreshCw, 
	Download, 
	Play, 
	Calendar, 
	Clock, 
	FileAudio,
} from "lucide-react";
import { toast } from "sonner";
import { LiveRecordingArchive } from "@prisma/client";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { useStreamVideoToR2Mutation, vtuberLiveRecordingsAtom } from "@/lib/admin-store";
import { formatMMSS } from "@/lib/utils";

interface LiveRecordingsPanelProps {
	selectedProfileId: number;
}

export default function LiveRecordingsPanel({ selectedProfileId }: LiveRecordingsPanelProps) {
    const [{
        data: recordings,
        isLoading,
        error,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isRefetching,
    }] = useAtom(vtuberLiveRecordingsAtom);

    const flagRecordings = recordings?.pages.flatMap((page) => page.archives || []);

    const [downloadingRecording, setDownloadingRecording] = useState<LiveRecordingArchive | null>(null);
    const { mutateAsync: streamVideoToR2, isPending: isStreamVideoToR2Pending } = useStreamVideoToR2Mutation();

	const handleDownloadAudio = async (recording: LiveRecordingArchive) => {
        try {
            setDownloadingRecording(recording);
            await streamVideoToR2(recording);
            toast.success("音频下载完成");
            refetch();
        } catch (error) {
            toast.error(`下载音频时发生错误: ${error}`);
        }
        setDownloadingRecording(null);
	};

    const loadMoreRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 },
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<div className="space-y-6">
			<Card ref={loadMoreRef}>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<Play className="w-5 h-5" />
							直播录像管理
						</CardTitle>
						<div className="flex gap-2">
							<Button 
								onClick={() => refetch()} 
								disabled={isLoading || isRefetching}
								variant="outline"
								size="sm"
							>
								{isLoading || isRefetching ? (
									<RefreshCw className="w-4 h-4 animate-spin" />
								) : (
									<RefreshCw className="w-4 h-4" />
								)}
								刷新
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="text-center py-8">
							<RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
							<p>正在加载录像...</p>
						</div>
					) : flagRecordings?.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							<p>暂无直播录像</p>
						</div>
					) : (
						<div className="space-y-4">
							{flagRecordings?.map((recording) => (
								<div key={recording.id} className="border rounded-lg p-4">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<h3 className="font-medium">{recording.title}</h3>
												<Badge variant="outline">{recording.bvid}</Badge>
												{recording.audioObjectKeys.length > 0 && (
													<Badge variant="secondary" className="flex items-center gap-1">
														<FileAudio className="w-3 h-3" />
														{recording.audioObjectKeys.length} 个音频
													</Badge>
												)}
											</div>
											
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<Calendar className="w-4 h-4" />
													<span>发布时间: {format(new Date(recording.pubdate * 1000), 'yyyy-MM-dd HH:mm')}</span>
												</div>
												<div className="flex items-center gap-1">
													<Calendar className="w-4 h-4" />
													<span>直播时间: {format(recording.date, 'yyyy-MM-dd HH:mm')}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="w-4 h-4" />
													<span>时长: {formatMMSS(recording.duration)}</span>
												</div>
											</div>
										</div>
										
										<div className="flex gap-2 ml-4">
											<Button
												onClick={() => handleDownloadAudio(recording)}
												disabled={recording.audioObjectKeys.length > 0 || downloadingRecording?.id === recording.id}
												size="sm"
												variant="outline"
											>
                                                {downloadingRecording?.id === recording.id && isStreamVideoToR2Pending ? (
                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Download className="w-4 h-4" />
                                                )}
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
} 