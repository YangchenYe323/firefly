"use client";

import { Icons } from "../../components/Icons";
import Link from "next/link";
import type { VtuberProfile } from "@/profile";

import { cn } from "@/lib/utils";

interface PropType extends React.HTMLAttributes<HTMLElement> {
	profile: VtuberProfile;
}

export default function MainNav({ className, profile, ...props }: PropType) {
	const { externalLinks } = profile;

	return (
		<nav
			className={cn("flex items-center space-x-4 lg:space-x-6", className)}
			{...props}
		>
			{externalLinks?.map((link, idx) => {
				const title = link.value;
				const IconNode =
					link.icon &&
					link.icon in Icons &&
					Icons[link.icon as keyof typeof Icons];
				const href = link.href;
				return (
					<span key={idx}>
						<Link
							href={href}
							target="_blank"
							className="font-medium text-muted-foreground transition-colors hover:text-primary"
						>
							{IconNode && <IconNode className="inline align-top" />}
							<span className="hidden md:inline">{title}</span>
						</Link>
					</span>
				);
			})}
		</nav>
	);
}
