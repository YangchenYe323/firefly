"use client";

import { formatTime, getCalendarThemeVars } from "@/lib/utils";
import type { LiveRecordingArchive } from "@prisma/client";
import { type FC, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Icons } from "@/components/Icons";
import { useQuery } from "@tanstack/react-query";
import { listSongOccurrencesForArchive } from "../actions/v2/song";
import { apiUrlAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";

// We know bilibili cut page by roughly 2 hours, so we use it to normalize the start time
// from within each page to within the start of the live. Not great, but works for now
const PAGE_DURATION = 2 * 60 * 60; // 2 hours

interface RecordingTimelineItemProps {
    idx: number; // index of the item
    numItems: number; // number of items in the timeline
    startTime: number; // unix seconds of the timestamp of the item
    title: string; // title of the item
    picture?: string; // picture url of the item
    icon: React.ReactNode; // icon of the item
    showConnector: boolean;
    dayOfWeek: number; // for consistent color theming
    url: string; // href url of the item
}

interface RecordingTimelineProps {
    recording: LiveRecordingArchive;
    calendarDate: Date; // The calendar cell date for consistent theming
}

const RecordingTimeline: FC<RecordingTimelineProps> = ({ recording, calendarDate }) => {
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

    const [ref, bounds] = useMeasure()
    const apiUrl = useAtomValue(apiUrlAtom);
    const occurrences = occurrencesData?.occurrences || [];

    // Get day of week for consistent color theming - use calendar date instead of recording date
    const dayOfWeek = calendarDate.getDay();

    return (
        <div className="w-full">
            <AnimatePresence>
                {isLoading ? (
                    <motion.div
                        className="flex items-center justify-center py-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Icons.spinner className="w-4 h-4 animate-spin" />
                            <span className="text-xs md:text-sm">加载歌曲信息...</span>
                        </div>
                    </motion.div>
                ) : occurrences.length === 0 ? (
                    <motion.div
                        className="flex items-center justify-center py-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Icons.music_note className="w-4 h-4" />
                            <span className="text-xs md:text-sm">暂无歌曲记录</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.ol
                        ref={ref}
                        aria-label="Recording Timeline"
                        className="relative w-full space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {occurrences.map((occurrence, idx) => {
                            const picture = `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(occurrence.vtuberSong.song.title)}&artist=${encodeURIComponent(occurrence.vtuberSong.song.artist)}&size=large`;
                            const bilibiliUrl = `https://www.bilibili.com/video/${recording.bvid}?p=${occurrence.page}&t=${occurrence.start}`;
                            return <RecordingTimelineItem
                                key={`${occurrence.vtuberSongId}-${occurrence.liveRecordingArchiveId}-${occurrence.start}`}
                                idx={idx}
                                numItems={occurrences.length}
                                startTime={occurrence.start + (occurrence.page - 1) * PAGE_DURATION}
                                title={`唱了 ${occurrence.vtuberSong.song.title}`}
                                picture={picture}
                                icon={<Icons.sing />}
                                showConnector={idx !== occurrences.length - 1}
                                dayOfWeek={dayOfWeek}
                                url={bilibiliUrl}
                            />
                        })}
                    </motion.ol>
                )}
            </AnimatePresence>
        </div>
    )
}

RecordingTimeline.displayName = "RecordingTimeline";

const RecordingTimelineItem: FC<RecordingTimelineItemProps> = ({ idx, numItems, startTime, title, picture, icon, showConnector, dayOfWeek, url }) => {
    const [mounted, setMounted] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const picIcon = useMemo(() => {
        if (imgError || !picture) {
            return <Icons.music_note className="text-muted-foreground" width="32px" height="32px" />;
        }

        return <Image
            src={picture}
            alt={title}
            width={32}
            height={32}
            className="rounded-md object-cover shadow-sm"
            onError={() => setImgError(true)}
        />
    }, [imgError, picture, title]);

    const themeVars = getCalendarThemeVars(dayOfWeek);

    return (
        <motion.li
            className="relative w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: idx * 0.05
            }}
        >
            <div className="grid grid-cols-[auto_auto_1fr] gap-3 items-start">
                {/* Time */}
                <div className="flex flex-col justify-start pt-1">
                    <time
                        className="text-[10px] md:text-xs tracking-tight font-medium text-right text-muted-foreground"
                    >
                        {formatTime(startTime, true)}
                    </time>
                </div>

                                {/* Timeline dot and connector */}
                <div className="flex flex-col items-center relative">
                    <div className="relative z-10 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 flex items-center justify-center">
                            {icon}
                        </div>
                    </div>
                    {showConnector && (
                        <div className="h-8 w-0.5 rounded-full absolute top-8 left-1/2 transform -translate-x-1/2" style={{ backgroundColor: themeVars.border }} />
                    )}
                </div>

                {/* Content */}
                <motion.div
                    className="relative flex items-center gap-3 p-2.5 rounded-lg border backdrop-blur-sm shadow-sm"
                    style={{
                        backgroundColor: themeVars.occurrenceBg,
                        borderColor: themeVars.border,
                    }}
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
                    }}
                >
                    {/* Picture */}
                    <div className="flex-shrink-0">
                        {picIcon}
                    </div>
                    
                    {/* Title */}
                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <h4 className="text-xs md:text-sm font-medium leading-tight truncate" style={{ color: themeVars.activeText }}>
                            {title}
                        </h4>
                        <p className="text-[10px] md:text-xs text-muted-foreground">
                            {formatTime(startTime, false)}
                        </p>
                    </div>
                    {/* Invisible link overlay for better accessibility and click handling */}
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10 cursor-pointer"
                    >
                        <span className="sr-only">观看 {title} 在 {formatTime(startTime, false)} 的播放</span>
                    </a>
                </motion.div>
            </div>
        </motion.li>
    )
}

RecordingTimelineItem.displayName = "RecordingTimelineItem";

export default RecordingTimeline;