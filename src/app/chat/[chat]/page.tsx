import { getConversationController } from "@/core/interface-adapters/controllers/chat/chat.controller";

import ChatWindow from "./chat-window";
import { normalizeString } from "@/core/infrastructure/utils/string";

export default async function ChatRoom({
  params,
}: Readonly<{ params: { chat: string } }>) {
  const normalizeChatStr = normalizeString(params.chat);
  const chat = await getConversationController(normalizeChatStr);

  return (
    <ChatWindow
      topic={normalizeChatStr}
      initialMessages={chat.messages}
      chatId={chat.chatId}
    />
  );
}
