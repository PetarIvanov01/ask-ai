import { headers } from "next/headers";
import { colorsMap } from "../utils/colorsMap";

import { getChatController } from "@/core/interface-adapters/controllers/chat/chat.controller";

import HeaderControllers from "../ui/chat-header/controllers";

export default async function ChatHeader({ userId }: { userId: string }) {
  const head = headers();
  const pathname = head.get("x-current-path");

  if (!pathname || pathname === "/" || pathname === "/create-chat") {
    return null;
  }

  const pathnameParts = pathname.split("/");
  const chatId = pathnameParts[pathnameParts.length - 1];

  const chat = await getChatController(chatId, userId);
  const createdAt = new Date(chat.createdAt);
  const firstStr = chat.topic[0].toUpperCase();
  const circleColor = colorsMap[firstStr];

  return (
    <article className="text-center bg-dark-gray-2 rounded-md py-4 px-2 shadow-lg sm:py-6 sm:px-4">
      <header className="flex items-center justify-between flex-wrap max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-3">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div
            className={`size-6 rounded-full flex items-center justify-center sm:size-10`}
            style={{
              backgroundColor: circleColor,
            }}
          >
            <span className="text-white font-bold">{firstStr}</span>
          </div>
          <div className="text-left">
            <h2 className="text-base text-light-gray font-bold sm:text-lg">
              {chat.topic}
            </h2>
            {createdAt && (
              <p className="text-xs text-gray-500 sm:text-sm">
                Started on: {createdAt.toLocaleDateString()} at{" "}
                {createdAt.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <HeaderControllers createdAt={createdAt} topic={chat.topic} />
      </header>
    </article>
  );
}
