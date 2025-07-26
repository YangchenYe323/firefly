"use client";

import { useState, useEffect, useRef, useMemo, type FC } from "react";
import { Calendar, Clock, Loader2, Play, ExternalLink, Music, X, ImageOff } from "lucide-react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { listArchives } from "../actions/v2/archive";
import { listSongOccurrencesForArchive } from "../actions/v2/song";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { apiUrlAtom } from "@/lib/store";
import type { LiveRecordingArchive } from "@prisma/client";
import { formatChineseDate, formatChineseTime, formatMMSS, formatTime } from "@/lib/utils";
import { Presence } from "@/components/Pressence";
import RecordingTimeline from "./RecordingTimeline";
import { AnimatePresence, motion } from "framer-motion";
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
    setNoActiveDay: () => void;
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

    const recordingEntries = useMemo(() => {
        if (recordings.length === 0) {
            return null;
        }

        // Divide the day into recording.length + 2 parts: start -> <recording> -> end
        // Each part contains a start and end time within the day, the recordings of the period.
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const parts = [];
        parts.push({
            start: startOfDay,
            end: recordings[0].date,
            recording: null,
        });
        for (const recording of recordings) {
            parts.push({
                start: recording.date,
                end: new Date(recording.date.getTime() + recording.duration * 1000),
                recording,
            });
        }
        parts.push({
            start: recordings[recordings.length - 1].date,
            end: endOfDay,
            recording: null,
        });

        return parts;
    }, [recordings])

    const dayClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'bg-lime-50 border-lime-200';
            case 1:
                return 'bg-blue-50 border-blue-200';
            case 2:
                return 'bg-orange-50 border-orange-200';
            case 3:
                return 'bg-purple-50 border-purple-200';
            case 4:
                return 'bg-pink-50 border-pink-200';
            case 5:
                return 'bg-yellow-50 border-yellow-200';
            case 6:
                return 'bg-indigo-50 border-indigo-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    }

    const recordingBgClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'bg-lime-100';
            case 1:
                return 'bg-blue-100';
            case 2:
                return 'bg-orange-100';
            case 3:
                return 'bg-purple-100';
            case 4:
                return 'bg-pink-100';
            case 5:
                return 'bg-yellow-100';
            case 6:
                return 'bg-indigo-100';
            default:
                return 'bg-blue-100';
        }
    }

    const recordingTextClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'text-lime-800';
            case 1:
                return 'text-blue-800';
            case 2:
                return 'text-orange-800';
            case 3:
                return 'text-purple-800';
            case 4:
                return 'text-pink-800';
            case 5:
                return 'text-yellow-800';
            case 6:
                return 'text-indigo-800';
            default:
                return 'text-blue-800';
        }
    }

    const textClass = () => {
        switch (dayOfWeek) {
            case 0:
                return 'text-lime-700';
            case 1:
                return 'text-blue-700';
            case 2:
                return 'text-orange-700';
            case 3:
                return 'text-purple-700';
            case 4:
                return 'text-pink-700';
            case 5:
                return 'text-yellow-700';
            case 6:
                return 'text-indigo-700';
            default:
                return 'text-gray-700';
        }
    }

    return (
        <motion.div 
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <motion.div 
                className={`${dayClass()} m-2 rounded-xl border-2 shadow-xl backdrop-blur-sm`} 
                ref={ref}
                layout
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ 
                    duration: 0.3, 
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
            >
                <div className="p-4">
                    <div className={`text-sm ${textClass()} mb-4 font-semibold leading-tight`}>
                        {formatChineseDate(date)}
                    </div>
                    {
                        !recordingEntries ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Icons.bilibili_live className="w-4 h-4" />
                                <span className="text-sm">今天没有直播</span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recordingEntries.map((part, index) => {
                                    return (
                                        <motion.div 
                                            key={index} 
                                            className="grid grid-cols-[auto_auto_1fr] gap-4 items-center"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ 
                                                delay: index * 0.1,
                                                duration: 0.3,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                        >
                                            <div className="flex flex-col justify-start pt-1">
                                                <time
                                                    className="text-sm tracking-tight font-medium text-right text-muted-foreground"
                                                >
                                                    {formatChineseTime(part.start)}
                                                </time>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <div className="relative z-10">
                                                    <Icons.bilibili_live className="w-4 h-4" />
                                                </div>
                                                <div className="h-16 w-0.5 bg-border mt-2" />
                                            </div>

                                            {part.recording && (
                                                <motion.div 
                                                    className="flex items-center gap-4 p-3 rounded-lg bg-white/50 border border-white/20"
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                >
                                                    <Image
                                                        src={part.recording.cover}
                                                        alt={part.recording.title}
                                                        width={64}
                                                        height={48}
                                                        className="w-16 h-12 object-cover rounded-lg shadow-sm"
                                                    />
                                                    <div className="flex flex-col gap-1 flex-1">
                                                        <h3 className="font-semibold leading-none tracking-tight text-secondary-foreground text-sm">
                                                            {part.recording.title}
                                                        </h3>
                                                        <p className="text-xs text-muted-foreground">
                                                            时长: {Math.round(part.recording.duration / 60)}分钟
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )
                    }
                </div>
            </motion.div>
        </motion.div>
    )
}

// Individual day cell component with dialog
const DayCell: FC<DayCellProps> = ({ day, activeDay, setActiveDay, setNoActiveDay }) => {
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

    const isActive = activeDay?.date?.toISOString() === date.toISOString();

    return (
        <motion.div className="w-full min-h-[100px]">
            <AnimatePresence>
                {isActive ? (
                    <ActiveDayCell day={activeDay} setNoActiveDay={setNoActiveDay} />
                ) : (
                    <motion.div
                        className={`
					p-3 min-h-[100px] border border-gray-200/50 rounded-lg cursor-pointer
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
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
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
            const result = await listArchives(vtuberProfileId, pageParam, 50);
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
        recordings: recordings.sort((a, b) => a.date.getTime() - b.date.getTime()),
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
        <div className="relative bg-white/80 rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden p-6">
            <div className="space-y-6">
                {/* Calendar Grid */}
                <div className="space-y-2">
                    {/* Desktop Calendar - 7 columns */}
                    <div className="hidden md:block">
                        {reversedWeeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="relative grid grid-cols-7 gap-2 mb-2 last:mb-0">
                                {week.map((dayData, dayIndex) => (
                                    <DayCell
                                        key={dayIndex}
                                        day={dayData}
                                        activeDay={activeDay}
                                        setActiveDay={setActiveDay}
                                        setNoActiveDay={setNoActiveDay}
                                    />
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
                                activeDay={activeDay}
                                setActiveDay={setActiveDay}
                                setNoActiveDay={setNoActiveDay}
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