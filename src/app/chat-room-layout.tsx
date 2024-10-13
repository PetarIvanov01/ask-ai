import { ReactNode } from "react";
import ChatHeader from "./chat-header";
import MessageInputStatic from "../ui/message-input-static";

export default function ChatRoomLayout({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) {
  return (
    <section className="w-full justify-between max-h-screen flex flex-col flex-grow mx-auto">
      <ChatHeader userId={userId} />

      <div className="flex-grow h-full mt-3 flex flex-col justify-center items-center overflow-y-auto">
        {children}
      </div>

      <MessageInputStatic />
    </section>
  );
}
