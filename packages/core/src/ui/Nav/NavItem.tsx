import { Menu } from "@headlessui/react";
import Link from "next/link.js";
import { BaseLink } from "../Base";
import { NavLink } from "../types";

interface Props {
  link: NavLink;
}

export const NavItem: React.FC<Props> = ({ link }) => {
  return (
    <Menu as="div" className="relative">
      <Link
        href={link.href}
        className="text-slate-500 inline-flex items-center mr-2 px-1 pt-1 text-sm font-medium hover:text-slate-600"
      >
        {link.name}
      </Link>
    </Menu>
  );
};
