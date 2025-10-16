"use client";

import { useState, useEffect, useRef, useMemo, type FC, type RefObject } from "react";
import { Loader2 } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { listArchives } from "../actions/v2/archive";
import Image from "next/image";
import type { LiveRecordingArchive } from "@prisma/client";
import { formatChineseDate, getCalendarThemeVars } from "@/lib/utils";
import { addDays, format, startOfDay, startOfWeek } from "date-fns";
import { zhCN } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/components/Icons";
import RecordingTimeline from "./RecordingTimeline";
import { useOnClickOutside } from "usehooks-ts";
import { toZonedTime } from "date-fns-tz";

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

const ActiveDayCell: FC<ActiveDayCellProps> = ({ day, setNoActiveDay }) => {
    const { date, recordings } = day;
    const dayOfWeek = date.getDay();

    const [expandedRecording, setExpandedRecording] = useState<LiveRecordingArchive | null>(null);

    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref as RefObject<HTMLElement>, () => {
        setNoActiveDay();
    });

    const recordingEntries = useMemo(() => {
        if (recordings.length === 0) {
            return null;
        }

        const parts = [];
        for (const recording of recordings) {
            const zonedDate = toZonedTime(recording.date, "Asia/Shanghai");
            const startTime = format(zonedDate, "HH:mm", { locale: zhCN });

            parts.push({
                start: startTime,
                recording,
            });
        }

        return parts;
    }, [recordings])

    const themeVars = getCalendarThemeVars(dayOfWeek);

    return (
        <motion.div
            className="absolute z-20"
            style={{
                left: '-1.5rem',
                right: '-1.5rem',
                top: '0.25rem',
                bottom: '0',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <motion.div
                className="m-2 rounded-xl border-2 shadow-xl backdrop-blur-sm"
                style={{
                    backgroundColor: themeVars.activeBg,
                    borderColor: themeVars.border,
                }}
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
                    <div className="text-xs md:text-sm mb-3 md:mb-4 font-semibold leading-tight" style={{ color: themeVars.activeText }}>
                        {formatChineseDate(date)}
                    </div>
                    {
                        !recordingEntries ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Icons.bilibili_live className="w-4 h-4" />
                                <span className="text-xs md:text-sm">今天没有直播</span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recordingEntries.map((part, index) => {
                                    return (
                                        <div key={index} className="w-full">
                                            <motion.div
                                                className="grid grid-cols-[auto_auto_1fr] gap-4 items-start"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: index * 0.1,
                                                    duration: 0.3,
                                                    ease: [0.25, 0.46, 0.45, 0.94]
                                                }}
                                            >
                                                <div className="flex flex-col justify-center">
                                                    <time
                                                        className="text-xs md:text-sm tracking-tight font-medium text-right text-muted-foreground"
                                                    >
                                                        {part.start}
                                                    </time>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                    <div className="relative z-10">
                                                        <Icons.bilibili_live className="w-4 h-4" />
                                                    </div>
                                                    <div className="h-16 w-0.5 bg-border mt-2" />
                                                </div>

                                                {part.recording && (
                                                    <div className="space-y-3">
                                                        <motion.div
                                                            className="flex items-center gap-4 p-3 rounded-lg bg-white/50 border border-white/20 cursor-pointer"
                                                            whileHover={{ scale: 1.02 }}
                                                            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                            // We use onClickOutside to close the whole overlay ActiveDayCell, which listens for such events
                                                            // on the entire document. Because this is an overlay, a click on the overlay propagates to a click of whatever
                                                            // divs it overlays on top, and get trapped by onClickOutside and closes the overlay.
                                                            // Workaround by stop propagation of all these events when we care.
                                                            onMouseDown={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                            onMouseUp={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                            onTouchStart={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                            onTouchEnd={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExpandedRecording(
                                                                    expandedRecording?.id === part.recording.id ? null : part.recording
                                                                );
                                                            }}
                                                        >
                                                            <Image
                                                                src={part.recording.cover}
                                                                alt={part.recording.title}
                                                                width={64}
                                                                height={48}
                                                                className="w-16 h-12 object-cover rounded-lg shadow-sm"
                                                            />
                                                            <div className="flex flex-col gap-1 flex-1">
                                                                <h3 className="font-semibold leading-none tracking-tight text-secondary-foreground text-xs md:text-sm">
                                                                    {part.recording.title}
                                                                </h3>
                                                                <p className="text-[10px] md:text-xs text-muted-foreground">
                                                                    时长: {Math.round(part.recording.duration / 60)}分钟
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                )}

                                            </motion.div>
                                            {part.recording && (
                                                // Expanded Timeline
                                                <AnimatePresence>
                                                    {expandedRecording?.id === part.recording.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                            className="my-2 overflow-hidden"
                                                        >
                                                            <RecordingTimeline recording={part.recording} calendarDate={date} />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            )}
                                        </div>
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
    const themeVars = getCalendarThemeVars(dayOfWeek);

    const handleCellClick = () => {
        setActiveDay(day);
    };

    const isActive = activeDay?.date && date && format(activeDay.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

    return (
        <motion.div className="w-full min-h-[100px] relative md:static">
            <AnimatePresence>
                {isActive ? (
                    <ActiveDayCell
                        key="active-day-cell"
                        day={activeDay}
                        setNoActiveDay={setNoActiveDay}
                    />
                ) : (
                    <motion.div
                        key="day-cell"
                        className="p-3 min-h-[100px] border border-gray-200/50 rounded-lg cursor-pointer hover:scale-105"
                        style={{
                            backgroundColor: themeVars.bg,
                            transition: 'transform 0.2s',
                            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                        onClick={handleCellClick}
                    >
                        <div className="text-xs mb-2 font-medium leading-tight" style={{ color: themeVars.text }}>
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
                                            className="text-xs md:text-xs px-2 md:px-2 py-0.5 rounded font-semibold md:font-semibold line-clamp-1"
                                            style={{
                                                backgroundColor: themeVars.recordingBg,
                                                color: themeVars.activeText,
                                            }}
                                            title={recording.title}
                                        >
                                            {titleStripped}
                                        </div>
                                    )
                                })}

                                {recordings.length > 2 && (
                                    <div className="text-xs md:text-xs text-blue-600 font-medium">
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
    const recordingsByDate = new Map<number, LiveRecordingArchive[]>();
    const allRecordings = data?.pages.flatMap((page) => page.archives).filter(Boolean) || [];

    for (const recording of allRecordings) {
        if (!recording) continue;

        const zonedDate = toZonedTime(recording.date, "Asia/Shanghai");
        const zonedDateStartOfDay = startOfDay(zonedDate);

        if (!recordingsByDate.has(zonedDateStartOfDay.getTime())) {
            recordingsByDate.set(zonedDateStartOfDay.getTime(), []);
        }

        recordingsByDate.get(zonedDateStartOfDay.getTime())!.push(recording);
    }

    const calendarDays: CalendarDay[] = Array.from(recordingsByDate.entries()).map(([dateKey, recordings]) => ({
        date: new Date(dateKey),
        recordings: recordings.sort((a, b) => a.date.getTime() - b.date.getTime()),
    })).sort((a, b) => a.date.getTime() - b.date.getTime());

    // The earliest date where we have a live recorded
    const earliestDate = calendarDays.length > 0 ? calendarDays[0].date : new Date();

    // The latest date where we have a live recorded
    let latestDate = calendarDays.length > 0 ? calendarDays[calendarDays.length - 1].date : new Date();

    // Always ensure we show at least the current week
    const today = new Date();
    const currentWeekStart = startOfWeek(today);
    const currentWeekEnd = addDays(currentWeekStart, 6);

    // If the current week extends beyond our latest recorded date, use the current week end
    if (currentWeekEnd > latestDate) {
        latestDate = currentWeekEnd;
    }

    // Interpolate all weeks from earliest to latest date
    const allWeeks = [];

    let currentDate = earliestDate;
    while (currentDate <= latestDate) {
        const weekStart = startOfWeek(currentDate);

        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = addDays(weekStart, i);
            const dateKey = date.getTime();
            const recordings = recordingsByDate.get(dateKey) || [];
            week.push({ date, recordings });
        }
        allWeeks.push(week);

        // Move to next week
        currentDate = addDays(currentDate, 7);
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