"use client";

import { type FC, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allThemesAtom, defaultThemeAtom } from "@/lib/store";
import { useAtom } from "jotai";

interface ThemeProviderProps {
	children: (props: { renderAvatar: () => React.ReactNode }) => React.ReactNode;
	avatarSize?: number;
}

const ThemeProvider: FC<ThemeProviderProps> = ({
	children,
	avatarSize = 240,
}) => {
	const [themes] = useAtom(allThemesAtom);
	const [defaultTheme] = useAtom(defaultThemeAtom);

	const [currentThemeIndex, setCurrentThemeIndex] = useState(
		defaultTheme
			? themes.findIndex((theme) => theme.id === defaultTheme.id)
			: 0,
	);
	const [previousThemeIndex, setPreviousThemeIndex] = useState(0);
	const [isHovering, setIsHovering] = useState(false);
	const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [showPrevious, setShowPrevious] = useState(false);
	const [previousTransform, setPreviousTransform] = useState("translateX(0)");
	const [currentTransform, setCurrentTransform] = useState("translateX(0)");

	const currentTheme = themes[currentThemeIndex];
	const previousTheme = themes[previousThemeIndex];

	const handlePreviousTheme = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setPreviousThemeIndex(currentThemeIndex);
		setShowPrevious(true);

		// Set initial positions for sliding animation
		setPreviousTransform("translateX(0)");
		setCurrentTransform("translateX(-100%)");

		const newIndex =
			currentThemeIndex === 0 ? themes.length - 1 : currentThemeIndex - 1;
		setCurrentThemeIndex(newIndex);

		// Trigger the slide animation
		requestAnimationFrame(() => {
			setPreviousTransform("translateX(100%)");
			setCurrentTransform("translateX(0)");
		});

		setTimeout(() => {
			setIsTransitioning(false);
			setShowPrevious(false);
		}, 300);
	};

	const handleNextTheme = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setPreviousThemeIndex(currentThemeIndex);
		setShowPrevious(true);

		// Set initial positions for sliding animation
		setPreviousTransform("translateX(0)");
		setCurrentTransform("translateX(100%)");

		const newIndex =
			currentThemeIndex === themes.length - 1 ? 0 : currentThemeIndex + 1;
		setCurrentThemeIndex(newIndex);

		// Trigger the slide animation
		requestAnimationFrame(() => {
			setPreviousTransform("translateX(-100%)");
			setCurrentTransform("translateX(0)");
		});

		setTimeout(() => {
			setIsTransitioning(false);
			setShowPrevious(false);
		}, 300);
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
			<div
				className="relative overflow-hidden rounded-full border border-black"
				style={{ width: avatarSize, height: avatarSize }}
			>
				{/* Previous Theme (slides out) */}
				{showPrevious && (
					<div
						key={`previous-${previousThemeIndex}`}
						className="absolute inset-0 transition-transform duration-300"
						style={{
							transform: previousTransform,
							transitionTimingFunction: "cubic-bezier(.455, .03, .515, .955)", // ease-in-out-quad
						}}
					>
						<Image
							src={previousTheme.avatarImagePath}
							alt={`Theme ${previousThemeIndex + 1}`}
							width={avatarSize}
							height={avatarSize}
							className="rounded-full"
							priority={true}
						/>
					</div>
				)}

				{/* Current Theme (slides in) */}
				<div
					key={`current-${currentThemeIndex}`}
					className="absolute inset-0 transition-transform duration-300"
					style={{
						transform: currentTransform,
						transitionTimingFunction: "cubic-bezier(.455, .03, .515, .955)", // ease-in-out-quad
					}}
				>
					<Image
						src={currentTheme.avatarImagePath}
						alt={`Theme ${currentThemeIndex + 1}`}
						width={avatarSize}
						height={avatarSize}
						className="rounded-full"
						priority={true}
					/>
				</div>
			</div>

			{/* Hover Controls */}
			<button
				onClick={handlePreviousTheme}
				className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-200 ${
					isHovering && hoverSide === "left" && !isTransitioning
						? "opacity-100 transform translate-x-0"
						: "opacity-0 transform -translate-x-4 pointer-events-none"
				}`}
				style={{
					transitionTimingFunction: "cubic-bezier(.455, .03, .515, .955)",
				}} // ease-in-out-quad
				aria-label="Previous theme"
				type="button"
			>
				<ChevronLeft className="w-6 h-6" />
			</button>

			<button
				onClick={handleNextTheme}
				className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-200 ${
					isHovering && hoverSide === "right" && !isTransitioning
						? "opacity-100 transform translate-x-0"
						: "opacity-0 transform translate-x-4 pointer-events-none"
				}`}
				style={{
					transitionTimingFunction: "cubic-bezier(.455, .03, .515, .955)",
				}} // ease-in-out-quad
				aria-label="Next theme"
				type="button"
			>
				<ChevronRight className="w-6 h-6" />
			</button>
		</div>
	);

	return (
		<>
			{/* Background Switcher with sliding animation */}
			{currentTheme.backgroundImagePath && (
				<div className="fixed top-0 left-0 h-full w-full overflow-hidden pointer-events-none -z-10">
					{/* Previous Background (slides out) */}
					{showPrevious && previousTheme.backgroundImagePath && (
						<div
							key={`bg-previous-${previousThemeIndex}`}
							className="absolute inset-0 transition-transform duration-300"
							style={{
								transform: previousTransform,
								transitionTimingFunction: "cubic-bezier(.455, .03, .515, .955)", // ease-in-out-quad
							}}
						>
							<Image
								src={previousTheme.backgroundImagePath}
								alt="background"
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: "100%", height: "100%" }}
								className="absolute inset-0 object-cover opacity-45"
								priority={true}
							/>
						</div>
					)}

					{/* Current Background (slides in) */}
					<div
						key={`bg-current-${currentThemeIndex}`}
						className="absolute inset-0 transition-transform duration-300"
						style={{
							transform: currentTransform,
							transitionTimingFunction: "cubic-bezier(.455, .03, .515, .955)", // ease-in-out-quad
						}}
					>
						<Image
							src={currentTheme.backgroundImagePath}
							alt="background"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: "100%", height: "100%" }}
							className="absolute inset-0 object-cover opacity-45"
							priority={true}
						/>
					</div>
				</div>
			)}

			{/* Render children with avatar render function */}
			{children({ renderAvatar })}
		</>
	);
}

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;