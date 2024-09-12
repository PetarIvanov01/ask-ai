"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LiItem({
  title,
  icon,
  href,
}: {
  title: string;
  href: string;
  icon: ReactNode;
}) {
  const pathname = usePathname();
  const activeStyle =
    pathname === href ? "bg-gradient-to-r" : "hover:bg-gradient-to-r";

  return (
    <li className="">
      <Link
        className={`${activeStyle} flex items-center gap-4 from-gray-600 shadow shadow-dark-gray-1 p-2 rounded-lg  text-white cursor-pointer`}
        href={href}
      >
        <div>{icon}</div>
        {title}
      </Link>
    </li>
  );
}
