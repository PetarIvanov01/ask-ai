"use client";
import { usePathname } from "next/navigation";

export default function ChatHeader() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const pathnameParts = pathname.split("/");
  const topic = pathnameParts[pathnameParts.length - 1];

  return (
    <article className="text-center bg-dark-gray-1 rounded-md py-4">
      <header>
        <h2>{CHAT_HEADERS[topic as keyof typeof CHAT_HEADERS] || ""}</h2>
      </header>
    </article>
  );
}

const CHAT_HEADERS = {
  runtime: "JavaScript - Runtime",
  concepts: "JavaScript - Concepts",
};
