"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Theme } from "@prisma/client";

interface ThemeProviderProps {
    themes: Theme[];
    defaultTheme?: Theme;
    children: (props: { renderAvatar: () => React.ReactNode }) => React.ReactNode;
    avatarSize?: number;
}

export default function ThemeProvider({ themes, defaultTheme, children, avatarSize = 240 }: ThemeProviderProps) {
    const [currentThemeIndex, setCurrentThemeIndex] = useState(defaultTheme ? themes.findIndex(theme => theme.id === defaultTheme.id) : 0);
    const [previousThemeIndex, setPreviousThemeIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");

    const currentTheme = themes[currentThemeIndex];
    const previousTheme = themes[previousThemeIndex];

    const handlePreviousTheme = () => {
        if (isTransitioning) return;
        setDirection("left");
        setIsTransitioning(true);
        setPreviousThemeIndex(currentThemeIndex);
        const newIndex = currentThemeIndex === 0 ? themes.length - 1 : currentThemeIndex - 1;
        setCurrentThemeIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 1000);
    };

    const handleNextTheme = () => {
        if (isTransitioning) return;
        setDirection("right");
        setIsTransitioning(true);
        setPreviousThemeIndex(currentThemeIndex);
        const newIndex = currentThemeIndex === themes.length - 1 ? 0 : currentThemeIndex + 1;
        setCurrentThemeIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 1000);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const threshold = width * 0.3; // 30% from each side

        if (x < threshold) {
            setHoverSide("left");
        } else if (x > width - threshold) {
            setHoverSide("right");
        } else {
            setHoverSide(null);
        }
    };

    const renderAvatar = () => (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setHoverSide(null);
            }}
            onMouseMove={handleMouseMove}
        >
            {/* Avatar Container with sliding animation */}
            <div className="relative overflow-hidden rounded-full border border-black" style={{ width: avatarSize, height: avatarSize }}>
                {/* Previous Theme (slides out) */}
                {isTransitioning && (
                    <motion.div
                        key={`previous-${previousThemeIndex}`}
                        initial={{ x: 0, opacity: 1 }}
                        animate={{
                            x: direction === "right" ? -avatarSize : avatarSize,
                            opacity: 1
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={previousTheme.avatarImagePath}
                            alt={`Theme ${previousThemeIndex + 1}`}
                            width={avatarSize}
                            height={avatarSize}
                            className="rounded-full"
                            priority={true}
                        />
                    </motion.div>
                )}

                {/* Current Theme (slides in) */}
                <motion.div
                    key={`current-${currentThemeIndex}`}
                    initial={isTransitioning ? {
                        x: direction === "right" ? avatarSize : -avatarSize,
                        opacity: 1
                    } : { x: 0, opacity: 1 }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src={currentTheme.avatarImagePath}
                        alt={`Theme ${currentThemeIndex + 1}`}
                        width={avatarSize}
                        height={avatarSize}
                        className="rounded-full"
                        priority={true}
                    />
                </motion.div>
            </div>

            {/* Hover Controls */}
            <AnimatePresence>
                {isHovering && hoverSide && !isTransitioning && (
                    <>
                        {/* Left Control */}
                        {hoverSide === "left" && (
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                onClick={handlePreviousTheme}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                                aria-label="Previous theme"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                        )}

                        {/* Right Control */}
                        {hoverSide === "right" && (
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                onClick={handleNextTheme}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                                aria-label="Next theme"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        )}
                    </>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <>
            {/* Background Switcher with sliding animation */}
            {currentTheme.backgroundImagePath && (
                <div className="fixed top-0 left-0 h-full w-full overflow-hidden pointer-events-none -z-10">
                    {/* Previous Background (slides out) */}
                    {isTransitioning && previousTheme.backgroundImagePath && (
                        <motion.div
                            key={`bg-previous-${previousThemeIndex}`}
                            initial={{ x: 0, opacity: 0.45 }}
                            animate={{
                                x: direction === "right" ? "-100%" : "100%",
                                opacity: 0.45
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                            }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={previousTheme.backgroundImagePath}
                                alt="background"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "100%", height: "100%" }}
                                className="absolute inset-0 object-cover"
                                priority={true}
                            />
                        </motion.div>
                    )}

                    {/* Current Background (slides in) */}
                    <motion.div
                        key={`bg-current-${currentThemeIndex}`}
                        initial={isTransitioning ? {
                            x: direction === "right" ? "100%" : "-100%",
                            opacity: 0.45
                        } : { x: 0, opacity: 0.45 }}
                        animate={{
                            x: 0,
                            opacity: 0.45
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={currentTheme.backgroundImagePath}
                            alt="background"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "100%" }}
                            className="absolute inset-0 object-cover"
                            priority={true}
                        />
                    </motion.div>
                </div>
            )}

            {/* Render children with avatar render function */}
            {children({ renderAvatar })}
        </>
    );
} 