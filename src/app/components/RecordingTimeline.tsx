"use client";

import { formatTime } from "@/lib/utils";
import type { LiveRecordingArchive } from "@prisma/client";
import { type FC, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Icons } from "@/components/Icons";
import { useQuery } from "@tanstack/react-query";
import { listSongOccurrencesForArchive } from "../actions/v2/song";
import { apiUrlAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";

interface RecordingTimelineItemProps {
    idx: number; // index of the item
    numItems: number; // number of items in the timeline
    startTime: number; // unix seconds of the timestamp of the item
    title: string; // title of the item
    picture?: string; // picture url of the item
    icon: React.ReactNode; // icon of the item
    showConnector: boolean;
}

interface RecordingTimelineProps {
    recording: LiveRecordingArchive;
}

const RecordingTimeline: FC<RecordingTimelineProps> = ({ recording }) => {
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

    return (
        <motion.ol
            aria-label="Recording Timeline"
            className="relative w-full max-w-2xl mx-auto py-4"
            initial={{
                opacity: 0,
                height: 0,
            }}
            animate={{
                opacity: 1,
                height: "auto",
            }}
            exit={{
                opacity: 0,
                height: 0,
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        // style={{
        //     maxHeight: isExpanded ? bounds.height * 2 : 0,
        //     opacity: isExpanded ? 1 : 0,
        //     transition: "max-height 0.3s, opacity 0.3s",
        //     transitionTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        //     transitionDelay: isExpanded ? "0s" : "0.1s",
        // }}
        >
            <div ref={ref}>
                {isLoading && <div className="absolute inset-0 flex items-center justify-center">
                    <Icons.spinner className="w-10 h-10 animate-spin" />
                </div>}

                {occurrences.sort((a, b) => a.start - b.start).map((occurrence, idx) => {
                    const picture = `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(occurrence.vtuberSong.song.title)}&artist=${encodeURIComponent(occurrence.vtuberSong.song.artist)}&size=large`;
                    return <RecordingTimelineItem
                        key={idx}
                        idx={idx}
                        numItems={occurrences.length}
                        startTime={occurrence.start}
                        title={`唱了 ${occurrence.vtuberSong.song.title}`}
                        picture={picture}
                        icon={<Icons.sing />}
                        showConnector={idx !== occurrences.length - 1}
                    />
                })}
            </div>
        </motion.ol>
    )
}

RecordingTimeline.displayName = "RecordingTimeline";

const RecordingTimelineItem: FC<RecordingTimelineItemProps> = ({ idx, numItems, startTime, title, picture, icon, showConnector }) => {
    const [mounted, setMounted] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const picIcon = useMemo(() => {
        if (imgError || !picture) {
            return <Icons.music_note className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />;
        }

        return <Image
            src={picture}
            alt={title}
            width={40}
            height={40}
            className="rounded-md"
            onError={() => setImgError(true)}
        />
    }, [imgError, picture, title]);

    return (
        <motion.li
            className="relative w-full mb-8 last:mb-0"
            initial={{
                opacity: 0,
                transform: "translateX(-50%)",
            }}
            animate={{
                opacity: 1,
                transform: "translateX(0)",
                transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: idx * 0.1,
                }
            }}
            exit={{
                opacity: 0,
                transform: "translateX(-50%)",
                transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: (numItems - 1 - idx) * 0.1,
                }
            }}
        >
            <div
                className="grid grid-cols-[auto_auto_1fr] gap-4 items-start"
            >
                {/* Date */}
                <div className="flex flex-col justify-start pt-1">
                    <time
                        className="text-sm tracking-tight font-medium text-right text-muted-foreground"
                    >
                        {formatTime(startTime, true)}
                    </time>
                </div>

                {/* Timeline dot and connector */}
                <div className="flex flex-col items-center">
                    <div className="relative z-10">
                        <div className="relative flex items-center justify-center rounded-full ring-8 ring-background shadow-sm">
                            {icon}
                        </div>
                    </div>
                    {showConnector && <div className="h-16 w-0.5 bg-border mt-2" />}
                </div>

                {/* Content */}
                <motion.div
                    className="flex items-center gap-4"
                >
                    {/* Picture */}
                    {picIcon}
                    {/* Title */}
                    <div className="flex flex-col gap-1">
                        <h3 className="font-semibold leading-none tracking-tight text-secondary-foreground">{title}</h3>
                    </div>
                </motion.div>
            </div>
        </motion.li>
    )
}

RecordingTimelineItem.displayName = "RecordingTimelineItem";

export default RecordingTimeline;