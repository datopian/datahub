import Link from "next/link.js";
import { GitHubIcon, DiscordIcon } from "../Icons";
import { SocialLink, SocialPlatform } from "../types";

interface Props {
  links: Array<SocialLink>;
}

const icons: { [K in SocialPlatform]: React.FC<any> } = {
  github: GitHubIcon,
  discord: DiscordIcon,
};

export const NavSocial: React.FC<Props> = ({ links }) => {
  return (
    <>
      {links.map(({ label, href }) => {
        const Icon = icons[label];
        return (
          <Link key={label} href={href} aria-label={label} className="group">
            <Icon className="h-6 w-6 dark:fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
          </Link>
        );
      })}
    </>
  );
};
