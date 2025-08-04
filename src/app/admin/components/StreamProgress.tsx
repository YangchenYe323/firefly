"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";

interface ChunkInfo {
    chunkId: string;
    chunkIndex: number;
    startByte: number;
    endByte: number;
    size: number;
    progress: number;
    uploadedBytes: number;
    status: 'pending' | 'uploading' | 'complete' | 'error';
}

interface StreamProgress {
    streamId: string;
    pageNumber: number;
    objectKey: string;
    totalPages: number;
    status: 'pending' | 'downloading' | 'complete' | 'error' | 'skip';
    chunks: Map<string, ChunkInfo>;
    message?: string;
}

interface StreamProgressProps {
    recordingId: number;
    bvid: string;
    onClose: () => void;
    onComplete: () => void;
    onCancel?: () => void;
}

// Helper function to format bytes
function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / (k ** i)).toFixed(1))} ${sizes[i]}`;
}

async function streamAudio(signal: AbortSignal, recordingId: number) {
    const response = await fetch('/api/admin/stream-audio', {
        method: 'POST',
        signal,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordingId }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.body;
}

export default function StreamProgress({
    recordingId,
    bvid,
    onClose,
    onComplete,
    onCancel
}: StreamProgressProps) {
    const [streams, setStreams] = useState<Map<string, StreamProgress>>(new Map());
    const [overallStatus, setOverallStatus] = useState<'pending' | 'downloading' | 'complete' | 'error' | 'cancelled'>('pending');
    const [error, setError] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [lastProgressTime, setLastProgressTime] = useState<number | null>(null);
    const [lastProgressBytes, setLastProgressBytes] = useState<number>(0);
    const [abortController, setAbortController] = useState<AbortController | null>(null);

    const startStream = useCallback(async (controller: AbortController) => {
        setAbortController(controller);

        const response = await fetch('/api/admin/stream-audio', {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recordingId }),
        });

        if (!response.ok) {
            const body = await response.text();
            setError(`HTTP error! status: ${response.status}, body: ${body}`);
            return;
        }

        const reader = response.body!.getReader();

        const decoder = new TextDecoder();

        let buffer = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const { event: eventType, data } = JSON.parse(line.slice(6));
                        switch (eventType) {
                            case 'start':
                                setOverallStatus('downloading');
                                setStartTime(Date.now());
                                break;
                            case 'page_start':
                                setStreams(prev => new Map(prev).set(data.streamId, {
                                    streamId: data.streamId,
                                    pageNumber: data.pageNumber,
                                    objectKey: data.objectKey,
                                    totalPages: data.totalPages,
                                    status: 'downloading',
                                    chunks: new Map(),
                                }));
                                break;
                            case 'page_chunks_ready':
                                setStreams(prev => {
                                    const newMap = new Map(prev);
                                    const stream = newMap.get(data.streamId);
                                    if (stream) {
                                        // Create chunk info for each chunk
                                        const chunks = new Map<string, ChunkInfo>();
                                        for (const chunk of data.chunks) {
                                            chunks.set(chunk.chunkId, {
                                                chunkId: chunk.chunkId,
                                                chunkIndex: chunk.chunkIndex,
                                                startByte: chunk.startByte,
                                                endByte: chunk.endByte,
                                                size: chunk.size,
                                                progress: 0,
                                                uploadedBytes: 0,
                                                status: 'pending'
                                            });
                                        }

                                        newMap.set(data.streamId, {
                                            ...stream,
                                            chunks,
                                        });
                                    }
                                    return newMap;
                                });
                                break;
                            case 'chunk_progress': {
                                console.log('Chunk progress event:', data);
                                setStreams(prev => {
                                    const newMap = new Map(prev);
                                    const stream = newMap.get(data.streamId);
                                    if (stream) {
                                        const newChunks = new Map(stream.chunks);
                                        const chunk = newChunks.get(data.chunkId);
                                        if (chunk) {
                                            newChunks.set(data.chunkId, {
                                                ...chunk,
                                                progress: data.chunkProgress,
                                                uploadedBytes: data.uploadedBytes,
                                                status: 'uploading'
                                            });
                                        }

                                        newMap.set(data.streamId, {
                                            ...stream,
                                            chunks: newChunks,
                                        });
                                    }
                                    return newMap;
                                });

                                // Update speed calculation
                                const now = Date.now();
                                setLastProgressTime(now);
                                setLastProgressBytes(data.uploadedBytes);
                                break;
                            }
                            case 'chunk_complete':
                                console.log('Chunk complete event:', data);
                                setStreams(prev => {
                                    const newMap = new Map(prev);
                                    const stream = newMap.get(data.streamId);
                                    if (stream) {
                                        const newChunks = new Map(stream.chunks);
                                        const chunk = newChunks.get(data.chunkId);
                                        if (chunk) {
                                            newChunks.set(data.chunkId, {
                                                ...chunk,
                                                progress: 100,
                                                uploadedBytes: data.uploadedBytes,
                                                status: 'complete'
                                            });
                                        }
                                        newMap.set(data.streamId, {
                                            ...stream,
                                            chunks: newChunks,
                                        });
                                    }
                                    return newMap;
                                });
                                break;
                            case 'page_complete':
                                setStreams(prev => {
                                    const newMap = new Map(prev);
                                    const stream = newMap.get(data.streamId);
                                    if (stream) {
                                        newMap.set(data.streamId, {
                                            ...stream,
                                            status: 'complete',
                                            message: data.message,
                                        });
                                    }
                                    return newMap;
                                });
                                toast.success(`页面 ${data.streamId} 上传完成`);
                                break;
                            case 'page_skip':
                                setStreams(prev => {
                                    const newMap = new Map(prev);
                                    const stream = newMap.get(data.streamId);
                                    if (stream) {
                                        newMap.set(data.streamId, {
                                            ...stream,
                                            status: 'skip',
                                            message: data.message,
                                        });
                                    }
                                    return newMap;
                                });
                                toast.info(`页面 ${data.streamId} 已存在，跳过`);
                                break;
                            case 'page_error':
                                setStreams(prev => {
                                    const newMap = new Map(prev);
                                    const stream = newMap.get(data.streamId);
                                    if (stream) {
                                        newMap.set(data.streamId, {
                                            ...stream,
                                            status: 'error',
                                            message: data.message,
                                        });
                                    }
                                    return newMap;
                                });
                                toast.error(`页面 ${data.streamId} 上传失败: ${data.message}`);
                                break;
                            case 'complete':
                                setOverallStatus('complete');
                                toast.success('所有音频上传完成');
                                onComplete();
                                return;
                            case 'cancelled':
                                setOverallStatus('cancelled');
                                toast.info('上传已取消');
                                if (onCancel) {
                                    onCancel();
                                }
                                return;
                            case 'error':
                                setOverallStatus('error');
                                setError(data.message);
                                toast.error(`上传失败: ${data.message}`);
                                return;
                        }
                    } catch (error) {
                        console.error('Error parsing SSE message:', error);
                    }
                }
            }
        }
    }, [recordingId, onComplete, onCancel]);

    const handleCancel = useCallback(() => {
        if (abortController) {
            abortController.abort();
            setOverallStatus('cancelled');
            toast.info('上传已取消...');
        }
    }, [abortController]);

    // Cleanup function to abort on unmount
    useEffect(() => {
        return () => {
            if (abortController) {
                abortController.abort();
            }
        };
    }, [abortController]);

    useEffect(() => {
        const controller = new AbortController();

        startStream(controller);

        return () => {
            controller.abort();
        };
    }, [startStream]);

    const streamsArray = Array.from(streams.values()).sort((a, b) => a.pageNumber - b.pageNumber);
    const completedStreams = streamsArray.filter(s => s.status === 'complete' || s.status === 'skip').length;
    const totalStreams = streamsArray.length;

    // Calculate total progress and bytes
    const totalProgress = streamsArray.reduce((acc, stream) => {
        if (stream.status === 'complete' || stream.status === 'skip') {
            return acc + 100;
        }
        if (stream.status === 'downloading' && stream.chunks.size > 0) {
            const chunkProgress = Array.from(stream.chunks.values()).reduce((chunkAcc, chunk) => {
                return chunkAcc + chunk.progress;
            }, 0) / stream.chunks.size;
            return acc + chunkProgress;
        }
        return acc;
    }, 0) / totalStreams;

    const totalUploaded = streamsArray.reduce((acc, stream) => {
        return acc + Array.from(stream.chunks.values()).reduce((chunkAcc, chunk) => {
            return chunkAcc + chunk.uploadedBytes;
        }, 0);
    }, 0);

    const totalSize = streamsArray.reduce((acc, stream) => {
        return acc + Array.from(stream.chunks.values()).reduce((chunkAcc, chunk) => {
            return chunkAcc + chunk.size;
        }, 0);
    }, 0);

    const getStatusIcon = (status: StreamProgress['status']) => {
        switch (status) {
            case 'pending':
                return <Download className="w-4 h-4" />;
            case 'downloading':
                return <Download className="w-4 h-4 animate-pulse" />;
            case 'complete':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'skip':
                return <CheckCircle className="w-4 h-4 text-blue-500" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
        }
    };

    const getStatusColor = (status: StreamProgress['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-gray-100 text-gray-800';
            case 'downloading':
                return 'bg-blue-100 text-blue-800';
            case 'complete':
                return 'bg-green-100 text-green-800';
            case 'skip':
                return 'bg-blue-100 text-blue-800';
            case 'error':
                return 'bg-red-100 text-red-800';
        }
    };

    const getChunkStatusIcon = (status: ChunkInfo['status']) => {
        switch (status) {
            case 'pending':
                return <div className="w-2 h-2 bg-gray-300 rounded-full" />;
            case 'uploading':
                return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />;
            case 'complete':
                return <CheckCircle className="w-3 h-3 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-3 h-3 text-red-500" />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        音频上传进度 - {bvid}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {overallStatus === 'downloading' && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleCancel}
                            >
                                取消上传
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            disabled={overallStatus === 'downloading'}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 overflow-y-auto max-h-[60vh]">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-2 text-red-800">
                                <AlertCircle className="w-4 h-4" />
                                <span className="font-medium">错误</span>
                            </div>
                            <p className="text-red-700 mt-1">{error}</p>
                        </div>
                    )}

                    {overallStatus === 'downloading' && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-blue-800 font-medium">总体进度</span>
                                <span className="text-blue-600 text-sm">
                                    {completedStreams} / {totalStreams} 页面完成
                                </span>
                            </div>
                            {totalUploaded > 0 && (
                                <div className="text-blue-600 text-xs mb-2">
                                    {(() => {
                                        // Calculate speed
                                        let speedText = '';
                                        if (lastProgressTime && startTime) {
                                            const timeDiff = (lastProgressTime - startTime) / 1000; // seconds
                                            if (timeDiff > 0) {
                                                const speed = totalUploaded / timeDiff; // bytes per second
                                                speedText = ` (${formatBytes(speed)}/s)`;
                                            }
                                        }

                                        return `已传输: ${formatBytes(totalUploaded)} / ${formatBytes(totalSize)}${speedText}`;
                                    })()}
                                </div>
                            )}
                            <Progress
                                value={totalStreams > 0 ? totalProgress : 0}
                                className="h-2"
                            />
                        </div>
                    )}

                    {streamsArray.length === 0 && overallStatus === 'pending' && (
                        <div className="text-center py-8 text-muted-foreground">
                            <Download className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                            <p>正在初始化上传...</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {streamsArray.map((stream) => (
                            <div key={stream.streamId} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(stream.status)}
                                        <span className="font-medium">页面 {stream.pageNumber}</span>
                                        <Badge variant="outline" className={getStatusColor(stream.status)}>
                                            {stream.status === 'pending' && '等待中'}
                                            {stream.status === 'downloading' && '下载中'}
                                            {stream.status === 'complete' && '完成'}
                                            {stream.status === 'skip' && '跳过'}
                                            {stream.status === 'error' && '错误'}
                                        </Badge>
                                    </div>
                                    {stream.chunks.size > 0 && (
                                        <span className="text-sm text-muted-foreground">
                                            {Array.from(stream.chunks.values()).filter(c => c.status === 'complete').length} / {stream.chunks.size} 块
                                        </span>
                                    )}
                                </div>

                                {stream.chunks.size > 0 && (
                                    <div className="space-y-2">
                                        {Array.from(stream.chunks.values())
                                            .sort((a, b) => a.chunkIndex - b.chunkIndex)
                                            .map((chunk) => (
                                                <div key={chunk.chunkId} className="flex items-center gap-3">
                                                    {getChunkStatusIcon(chunk.status)}
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                                            <span>块 {chunk.chunkIndex}</span>
                                                            <span>{formatBytes(chunk.uploadedBytes)} / {formatBytes(chunk.size)}</span>
                                                        </div>
                                                        <Progress value={chunk.progress} className="h-1" />
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                {stream.message && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {stream.message}
                                    </p>
                                )}

                                {stream.status === 'error' && (
                                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                        {stream.message}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {overallStatus === 'complete' && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-green-800">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">上传完成</span>
                            </div>
                            <p className="text-green-700 mt-1">
                                所有音频文件已成功上传到存储
                            </p>
                        </div>
                    )}

                    {overallStatus === 'cancelled' && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2 text-yellow-800">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-medium">上传已取消</span>
                            </div>
                            <p className="text-yellow-700 mt-1">
                                用户已取消上传操作
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 