"use client";

import { useState, useEffect, useRef, useMemo, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Loader2, Play, ExternalLink, Music, X, ImageOff } from "lucide-react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { listArchives } from "../actions/v2/archive";
import { listSongOccurrencesForArchive } from "../actions/v2/song";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { apiUrlAtom } from "@/lib/store";
import type { LiveRecordingArchive } from "@prisma/client";
import { formatChineseDate, formatTime } from "@/lib/utils";
import { Presence } from "@/components/Pressence";
import RecordingTimeline from "./RecordingTimeline";
import { AnimatePresence } from "framer-motion";
import { Icons } from "@/components/Icons";
import { useOnClickOutside } from "usehooks-ts";

interface CalendarDay {
    date: Date;
    recordings: LiveRecordingArchive[];
}

interface RecordingCalendarProps {
    vtuberProfileId: number;
}

interface DayCellProps {
    day: CalendarDay;
    activeDay: CalendarDay | null;
    setActiveDay: (day: CalendarDay) => void;
}

interface ActiveDayCellProps {
    day: CalendarDay;
    setNoActiveDay: () => void;
}

interface RecordingTimelinePanelProps {
    recording: LiveRecordingArchive;
}

// Overlay for active day cell
const ActiveDayCell: FC<ActiveDayCellProps> = ({ day, setNoActiveDay }) => {
    const { date, recordings } = day;
    const dayOfWeek = date.getDay();

    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, setNoActiveDay);

    // Divide the day into recording.length + 2 parts: start -> <recording> -> end
    // Each part contains a start and end time within the day, the recordings of the period.
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const parts = [
        {
            start: startOfDay,
            end: recordings.length > 0 ? recordings[0].date : endOfDay,
            recording: null,
        },
        ...recordings.map((recording) => ({
            start: recording.date,
            end: new Date(recording.date.getTime() + recording.duration * 1000),
            recording,
        })),
    ]

    if (recordings.length > 0) {
        parts.push({
            start: recordings[recordings.length - 1].date,
            end: endOfDay,
            recording: null,
        });
    }

    const dayClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'bg-lime-400/10';
            case 1:
                return 'bg-blue-400/10';
            case 2:
                return 'bg-orange-400/10';
            case 3:
                return 'bg-purple-400/10';
            case 4:
                return 'bg-pink-400/10';
            case 5:
                return 'bg-yellow-400/10';
            case 6:
                return 'bg-indigo-400/10';
            default:
                return 'bg-gray-400/10';
        }
    }

    const recordingBgClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'bg-lime-400/20';
            case 1:
                return 'bg-blue-400/20';
            case 2:
                return 'bg-orange-400/20';
            case 3:
                return 'bg-purple-400/20';
            case 4:
                return 'bg-pink-400/20';
            case 5:
                return 'bg-yellow-400/20';
            case 6:
                return 'bg-indigo-400/20';
            default:
                return 'bg-blue-400/20';
        }
    }

    const recordingTextClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'text-lime-900';
            case 1:
                return 'text-blue-900';
            case 2:
                return 'text-orange-900';
            case 3:
                return 'text-purple-900';
            case 4:
                return 'text-pink-900';
            case 5:
                return 'text-yellow-900';
            case 6:
                return 'text-indigo-900';
            default:
                return 'text-blue-900';
        }
    }

    const textClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'text-lime-600';
            case 1:
                return 'text-blue-600';
            case 2:
                return 'text-orange-600';
            case 3:
                return 'text-purple-600';
            case 4:
                return 'text-pink-600';
            case 5:
                return 'text-yellow-600';
            case 6:
                return 'text-indigo-600';
            default:
                return 'text-gray-600';
        }
    }

    return (
        <div className="absolute inset-0 z-10 bg-white">
            <div className={`${dayClass()} m-2 rounded-lg border border-gray-200/50 z-10`} ref={ref}>
                <div className={`text-xs ${textClass()} mb-2 font-medium leading-tight`}>
                    {formatChineseDate(date)}
                </div>

                {parts.map((part, index) => {
                    return <div key={index} className="grid grid-cols-[auto_auto_1fr] gap-4 items-start">
                        <div className="flex flex-col justify-start pt-1">
                            <time
                                className="text-sm tracking-tight font-medium text-right text-muted-foreground"
                            >
                                {formatTime(part.start.getTime() / 1000, true)}
                            </time>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative z-10">
                                <div className="relative flex items-center justify-center rounded-full ring-8 ring-background shadow-sm">
                                    <Icons.bilibili_live />
                                </div>
                            </div>
                            <div className="h-16 w-0.5 bg-border mt-2" />
                        </div>

                        {part.recording && (
                            <div className="flex items-center gap-4">
                                <Image
                                    src={part.recording.cover}
                                    alt={part.recording.title}
                                    width={64}
                                    height={48}
                                    className="w-16 h-12 object-cover rounded-lg"
                                />
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-semibold leading-none tracking-tight text-secondary-foreground">{part.recording.title}</h3>
                                </div>
                            </div>
                        )}
                    </div>
                })}
            </div>
        </div>
    )
}

// Individual day cell component with dialog
const DayCell: FC<DayCellProps> = ({ day, activeDay, setActiveDay }) => {
    const { date, recordings } = day;
    const hasRecordings = recordings.length > 0;
    const dayOfWeek = date.getDay();

    const handleCellClick = () => {
        setActiveDay(day);
    };

    const dayClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'bg-lime-400/10';
            case 1:
                return 'bg-blue-400/10';
            case 2:
                return 'bg-orange-400/10';
            case 3:
                return 'bg-purple-400/10';
            case 4:
                return 'bg-pink-400/10';
            case 5:
                return 'bg-yellow-400/10';
            case 6:
                return 'bg-indigo-400/10';
            default:
                return 'bg-gray-400/10';
        }
    }

    const recordingBgClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'bg-lime-400/20';
            case 1:
                return 'bg-blue-400/20';
            case 2:
                return 'bg-orange-400/20';
            case 3:
                return 'bg-purple-400/20';
            case 4:
                return 'bg-pink-400/20';
            case 5:
                return 'bg-yellow-400/20';
            case 6:
                return 'bg-indigo-400/20';
            default:
                return 'bg-blue-400/20';
        }
    }

    const recordingTextClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'text-lime-900';
            case 1:
                return 'text-blue-900';
            case 2:
                return 'text-orange-900';
            case 3:
                return 'text-purple-900';
            case 4:
                return 'text-pink-900';
            case 5:
                return 'text-yellow-900';
            case 6:
                return 'text-indigo-900';
            default:
                return 'text-blue-900';
        }
    }

    const textClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'text-lime-600';
            case 1:
                return 'text-blue-600';
            case 2:
                return 'text-orange-600';
            case 3:
                return 'text-purple-600';
            case 4:
                return 'text-pink-600';
            case 5:
                return 'text-yellow-600';
            case 6:
                return 'text-indigo-600';
            default:
                return 'text-gray-600';
        }
    }

    return (
        <div className="relative w-full">
            <div
                className={`
					relative min-h-[100px] p-3 border border-gray-200/50 rounded-lg cursor-pointer
                    ${dayClass()}
                    hover:scale-105
				`}
                style={{
                    transition: 'transform 0.2s',
                    transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onClick={handleCellClick}
            >
                <div className={`text-xs ${textClass()} mb-2 font-medium leading-tight`}>
                    {formatChineseDate(date)}
                </div>
                {hasRecordings && (
                    <div className="space-y-1">
                        {recordings.slice(0, 2).map((recording) => {
                            // Strip the 【直播回放】 prefix
                            // Strip the xxxx年x月x日xx点场 suffix
                            const titleStripped = recording.title.replace('【直播回放】', '').replace(/(\d{4}年\d{1,2}月\d{1,2}日\d{1,2}点场)/, '').trim();

                            return (
                                <div
                                    key={recording.id}
                                    className={`text-xs ${recordingBgClass()} ${recordingTextClass()} px-2 rounded font-semibold line-clamp-1`}
                                    title={recording.title}
                                >
                                    {titleStripped}
                                </div>
                            )
                        })}

                        {recordings.length > 2 && (
                            <div className="text-xs text-blue-600 font-medium">
                                +{recordings.length - 2} more
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Panel to show song timeline for a specific recording
const RecordingTimelinePanel: FC<RecordingTimelinePanelProps> = ({ recording }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const apiUrl = useAtomValue(apiUrlAtom);

    const {
        data: occurrencesData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["occurrences", recording.id],
        queryFn: async () => {
            const result = await listSongOccurrencesForArchive(recording.id);
            return result;
        },
        staleTime: 60 * 60 * 1000, // 1 hour
    });

    const occurrences = occurrencesData?.occurrences || [];

    const handleRecordingClick = () => {
        setIsExpanded(!isExpanded);
    };

    const liveCoverIcon = () => {
        if (imageError) {
            return <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <ImageOff className="w-6 h-6 text-gray-400" />
            </div>
        }

        return <Image
            src={recording.cover}
            alt={recording.title}
            width={64}
            height={48}
            className="w-16 h-12 object-cover rounded-lg"
            loading="lazy"
            onError={() => setImageError(true)}
        />
    };

    return (
        <div className="hover:shadow-md transition-shadow duration-200">
            <div className="p-0">
                <div
                    className="w-full p-4 text-left cursor-pointer"
                    onClick={handleRecordingClick}
                >
                    <div className="flex items-start gap-4">
                        {/* Cover image */}
                        {liveCoverIcon()}

                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-2">
                                {recording.title}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(recording.duration)}
                                </span>
                                <span>BV{recording.bvid}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 relative z-20">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(`https://www.bilibili.com/video/${recording.bvid}`, '_blank');
                                }}
                                title="观看直播回放"
                            >
                                <ExternalLink className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Expansion content */}
                <AnimatePresence>
                    {isExpanded && <RecordingTimeline recording={recording} />}
                </AnimatePresence>
            </div>
        </div>
    );
};

// Main calendar component
const RecordingCalendar: FC<RecordingCalendarProps> = ({ vtuberProfileId }) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        error,
    } = useInfiniteQuery({
        queryKey: ["archives", vtuberProfileId],
        queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
            console.log("Fetching archives for profile:", vtuberProfileId, "pageParam:", pageParam);
            const result = await listArchives(vtuberProfileId, pageParam, 50);
            console.log("Archives result:", result);
            console.log("Archives count:", result.archives?.length || 0);
            console.log("Next token:", result.nextToken);
            return result;
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.nextToken,
        staleTime: 60 * 60 * 1000, // 1 hour
    });

    const [activeDay, setActiveDay] = useState<CalendarDay | null>(null);

    const setNoActiveDay = () => {
        setActiveDay(null);
    };

    // Ref for infinite scroll
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Clean up previous observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetchingNextPage) {
                    console.log("Loading more archives...");
                    fetchNextPage();
                }
            },
            { threshold: 0.1, rootMargin: "50px" },
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        observerRef.current = observer;

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Group recordings by date
    const recordingsByDate = new Map<string, LiveRecordingArchive[]>();
    const allRecordings = data?.pages.flatMap((page) => page.archives).filter(Boolean) || [];

    for (const recording of allRecordings) {
        if (!recording) continue;
        const dateKey = recording.date.toISOString().split('T')[0];
        if (!recordingsByDate.has(dateKey)) {
            recordingsByDate.set(dateKey, []);
        }
        recordingsByDate.get(dateKey)!.push(recording);
    }

    const calendarDays: CalendarDay[] = Array.from(recordingsByDate.entries()).map(([dateKey, recordings]) => ({
        date: new Date(dateKey),
        recordings,
    })).sort((a, b) => a.date.getTime() - b.date.getTime());

    const earliestDate = calendarDays.length > 0 ? calendarDays[0].date : new Date();
    const latestDate = calendarDays.length > 0 ? calendarDays[calendarDays.length - 1].date : new Date();

    // Generate all weeks from earliest to latest date
    const allWeeks = [];
    const currentDate = new Date(earliestDate);

    while (currentDate <= latestDate) {
        const weekStart = new Date(currentDate);
        // Adjust to start of week (Sunday)
        const dayOfWeek = weekStart.getDay();
        weekStart.setDate(weekStart.getDate() - dayOfWeek);

        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const dateKey = date.toISOString().split('T')[0];
            const recordings = recordingsByDate.get(dateKey) || [];
            week.push({ date, recordings });
        }
        allWeeks.push(week);

        // Move to next week
        currentDate.setDate(currentDate.getDate() + 7);
    }

    // Reverse the weeks to show most recent first
    const reversedWeeks = allWeeks.reverse();

    return (
        <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden p-6">
            {activeDay && (
                <div className="absolute inset-0 z-5 backdrop-blur-xs bg-background/80" />
            )}
            <div className="space-y-6">
                {/* Calendar Grid */}
                <div className="space-y-2">
                    {/* Desktop Calendar - 7 columns */}
                    <div className="hidden md:block">
                        {reversedWeeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="relative grid grid-cols-7 gap-2 mb-2 last:mb-0">
                                {week.map((dayData, dayIndex) => (
                                    <AnimatePresence>
                                        {activeDay && activeDay.date.toISOString() === dayData.date.toISOString() ?
                                            <ActiveDayCell day={activeDay} setNoActiveDay={setNoActiveDay} />
                                            :
                                            <DayCell
                                                key={dayIndex}
                                                day={dayData}
                                                activeDay={activeDay}
                                                setActiveDay={setActiveDay}
                                        />}
                                    </AnimatePresence>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Mobile Calendar - 1 column */}
                    <div className="md:hidden space-y-2">
                        {reversedWeeks.flat().map((dayData, dayIndex) => (
                            <DayCell
                                key={dayIndex}
                                day={dayData}
                                setActiveDay={() => { }}
                            />
                        ))}
                    </div>
                </div>

                {/* Loading indicator */}
                {isFetching && (
                    <div className="flex items-center justify-center py-4">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>加载中...</span>
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-sm text-red-500 bg-red-50 p-3 rounded">
                        <strong>Error:</strong> {error.message}
                        <br />
                        <details className="mt-2">
                            <summary className="cursor-pointer">Error Details</summary>
                            <pre className="text-xs mt-1 overflow-auto">
                                {JSON.stringify(error, null, 2)}
                            </pre>
                        </details>
                    </div>
                )}

                {/* Infinite scroll trigger */}
                {hasNextPage && (
                    <div ref={loadMoreRef} className="flex items-center justify-center py-8">
                        {isFetchingNextPage ? (
                            <div className="flex items-center gap-2 text-gray-500">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>加载更多...</span>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-400">
                                滚动加载更多...
                            </div>
                        )}
                    </div>
                )}

                {/* End of results indicator */}
                {!hasNextPage && allRecordings.length > 0 && (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        已显示全部直播记录
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecordingCalendar; 