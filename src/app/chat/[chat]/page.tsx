import { getConversationController } from "@/core/interface-adapters/controllers/chat/chat.controller";

import ChatWindow from "./chat-window";

export default async function ChatRoom({
  params,
}: Readonly<{ params: { chat: string } }>) {
  const chat = await getConversationController(params.chat);

  return (
    <ChatWindow
      topic={chat.chatTopic}
      initialMessages={chat.messages}
      chatId={chat.chatId}
    />
  );
}
