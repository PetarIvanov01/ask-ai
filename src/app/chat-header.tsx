"use client";
import { usePathname } from "next/navigation";

export default function ChatHeader() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const pathnameParts = pathname.split("/");
  const topic = pathnameParts[pathnameParts.length - 1].replace("-", " ");

  const topicTitle = topic
    .split(" ")
    .map((e) => e[0].toUpperCase().concat(e.slice(1)))
    .join(" ");

  return (
    <article className="text-center bg-dark-gray-1 rounded-md py-4">
      <header>
        <h2>Chatting About: {topicTitle}</h2>
      </header>
    </article>
  );
}
