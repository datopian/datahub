import Link from "next/link";
import HomeIcon from "../icons/HomeIcon";

export default function Breadcrumbs({
  links,
}: {
  links: { title: string; href?: string; target?: string }[];
}) {
  const current = links.at(-1);

  return (
    <div className="flex items-center uppercase font-black text-xs">
      <Link className="flex items-center" href="/">
        <HomeIcon />
      </Link>

      {/* {links.length > 1 && links.slice(0, -1).map((link) => {
      return <>
        <span className="mx-4">/</span>
        <Link href={link.href}>{link.title}</Link>
      </>
    })} */}

      <span className="mx-4">/</span>
      <span>{current.title}</span>
    </div>
  );
}
