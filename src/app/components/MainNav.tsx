import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "../../components/Icons";
import vtuberProfile from "@/profile";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { externalLinks } = vtuberProfile;

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {externalLinks && externalLinks.map((link, idx) => {
        const title = link.value;
        const IconNode = link.icon && link.icon in Icons && Icons[link.icon as keyof typeof Icons];
        const href = link.href;
        return (
          <span key={idx}>
            {IconNode && <IconNode className="inline align-top" />}
            <Link href={href} className="font-medium text-muted-foreground transition-colors hover:text-primary">
              {title}
            </Link>
          </span>
        )
      })}
    </nav>
  );
}
