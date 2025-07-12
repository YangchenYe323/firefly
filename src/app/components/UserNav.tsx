import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { VtuberProfileWithThemesAndLinks } from "../actions/crud";

interface PropType extends DropdownMenuProps {
	profile: VtuberProfileWithThemesAndLinks;
}

export default function UserNav({ profile, ...props }: PropType) {
	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={profile.themes[0].avatarImagePath} alt={profile.name} />
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							更多功能，钱不够演员未定剧本暂无，敬请期待
						</p>
					</div>
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
