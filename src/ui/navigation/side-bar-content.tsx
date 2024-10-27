import Image from "next/image";
import ChatListItem from "./components/chat-link";

import { getChatsController } from "@/core/interface-adapters/controllers/chat/chat.controller";

import ChatSideRow from "./components/chat-side-row";

export default async function SideBarContent({
  username,
}: {
  username: string;
}) {
  const data = await getChatsController();

  return (
    <>
      <div className="flex flex-col gap-4 pt-1 text-sm text-nowrap overflow-y-auto h-full">
        <ul className="flex flex-col text-nowrap gap-2">
          <ChatListItem
            chatName="Home"
            chatId="Home"
            extendable={false}
            href="/"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            }
            title="Home"
          />

          <ChatListItem
            href="/create-chat"
            chatId="Create Chat"
            chatName="Create your chat"
            extendable={false}
            title="Create Chat"
            styles={{
              color: "gray",
            }}
            icon={
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.5"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="gray"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                  stroke="gray"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
        </ul>

        {data.map(([date, chats]) => (
          <ChatSideRow key={date} date={date} chats={chats} />
        ))}
      </div>

      <div className="mt-auto flex items-center rounded-xl p-2 shadow bg-gradient-to-r shadow-black text-sm text-nowrap overflow-hidden">
        <div>
          <Image
            src="/prof-icon.png"
            alt="profile icon"
            width={40}
            height={40}
          />
        </div>

        <p className="pl-3 mr-auto">@{username}</p>
        <div className="opacity-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
