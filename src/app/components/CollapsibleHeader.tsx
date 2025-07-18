"use client";

import { Icons } from "@/components/Icons";
import Link from "next/link";
import type { VtuberProfileWithThemesAndLinks } from "../actions/crud";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
	profile: VtuberProfileWithThemesAndLinks;
}

export default function CollapsibleHeader({ profile }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [dragStartY, setDragStartY] = useState<number | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [showButton, setShowButton] = useState(true);
	const headerRef = useRef<HTMLDivElement>(null);
	const { externalLinks } = profile;

	// Handle drag gestures for mobile
	const handleTouchStart = (e: React.TouchEvent) => {
		setDragStartY(e.touches[0].clientY);
		setIsDragging(true);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!dragStartY || !isDragging) return;

		const currentY = e.touches[0].clientY;
		const deltaY = currentY - dragStartY;

		// If dragging down more than 50px, open the header
		if (deltaY > 50 && !isOpen) {
			setIsOpen(true);
			setIsDragging(false);
			setDragStartY(null);
		}
		// If dragging up more than 50px, close the header
		else if (deltaY < -50 && isOpen) {
			setIsOpen(false);
			setIsDragging(false);
			setDragStartY(null);
		}
	};

	const handleTouchEnd = () => {
		setIsDragging(false);
		setDragStartY(null);
	};

	// Handle scroll-based button visibility
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			
			// Show button only when near the top (first 20% of page) or when header is open
			const shouldShow = scrollY < windowHeight * 0.2 || isOpen;
			setShowButton(shouldShow);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isOpen]);

	// Close header when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const toggleHeader = () => {
		if (!isOpen) {
			// Scroll to top when opening the header
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative z-50" ref={headerRef}>
			{/* Simple arrow trigger */}
			<motion.div
				className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
				initial={{ opacity: 0, y: -10 }}
				animate={{ 
					opacity: showButton && !isOpen ? 1 : 0, 
					y: showButton && !isOpen ? 0 : -10,
					scale: showButton && !isOpen ? 1 : 0.8
				}}
				transition={{ 
					duration: 0.3, 
					delay: showButton && !isOpen ? 0.1 : 0,
					ease: [0.25, 0.46, 0.45, 0.94]
				}}
			>
				<button
					type="button"
					onClick={toggleHeader}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					className="text-white/70 hover:text-white/90 transition-colors duration-200 p-1"
					aria-label={isOpen ? "收起菜单" : "展开菜单"}
				>
					<AnimatePresence mode="wait">
						{isOpen ? (
							<motion.div
								key="up"
								initial={{ rotate: 0 }}
								animate={{ rotate: 180 }}
								exit={{ rotate: 0 }}
								transition={{ duration: 0.2 }}
							>
								<ChevronUp className="w-6 h-6 drop-shadow-lg" />
							</motion.div>
						) : (
							<motion.div
								key="down"
								initial={{ rotate: 180 }}
								animate={{ rotate: 0 }}
								exit={{ rotate: 180 }}
								transition={{ duration: 0.2 }}
							>
								<ChevronDown className="w-6 h-6 drop-shadow-lg" />
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</motion.div>

			{/* Collapsible header content */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ 
							duration: 0.3,
							ease: [0.25, 0.46, 0.45, 0.94]
						}}
						className="relative bg-gradient-to-b from-white/70 via-white/30 to-white/5 backdrop-blur-sm border-b border-white/10 shadow-sm"
					>
						<div className="container mx-auto px-4 py-6 pt-8">

							{/* External links grid */}
							<div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
								{externalLinks?.map((link, idx) => {
									const title = link.value;
									const IconNode =
										link.icon &&
										link.icon in Icons &&
										Icons[link.icon as keyof typeof Icons];
									const href = link.href;

									return (
										<motion.div
											key={idx}
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ 
												duration: 0.3, 
												delay: idx * 0.1,
												ease: [0.25, 0.46, 0.45, 0.94]
											}}
											whileHover={{ 
												scale: 1.05,
												transition: { duration: 0.2 }
											}}
											whileTap={{ 
												scale: 0.95,
												transition: { duration: 0.1 }
											}}
										>
											<Link
												href={href}
												target="_blank"
												className="block px-3 py-2 bg-gradient-to-br from-white/30 to-white/10 hover:from-white/50 hover:to-white/20 rounded-lg border border-white/20 transition-all duration-200 group backdrop-blur-sm shadow-sm hover:shadow-md w-24 sm:w-28 md:w-32"
											>
												<div className="flex items-center gap-2">
													{IconNode && (
														<IconNode className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors flex-shrink-0" />
													)}
													<span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors truncate">
														{title}
													</span>
												</div>
											</Link>
										</motion.div>
									);
								})}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
} 