import Image from "next/image";
import ChatListItem from "./chat-link";

import { getIconURL } from "@/core/interface-adapters/controllers/category.controller";

type Props = Readonly<{
  date: string;
  chats: {
    chatId: string;
    userId: string;
    updatedAt: Date;
    categoryTitle: string;
    topic: string;
    chatName: string;
    imageUrl: string;
  }[];
}>;

export default function ChatSideRow({ chats, date }: Props) {
  return (
    <div>
      <p className="opacity-30 text-sm pb-2">{date}</p>
      <ul className="flex flex-col gap-1 pb-4">
        {chats?.map((e) => (
          <ChatListItem
            key={e.chatId}
            chatId={e.chatId}
            href={`/chat/${e.chatId}`}
            icon={
              <Image
                src={getIconURL(e.imageUrl)}
                width={18}
                height={18}
                className="size-full"
                alt={e.categoryTitle}
              />
            }
            title={e.topic}
            chatName={e.chatName}
          />
        ))}
      </ul>
    </div>
  );
}
