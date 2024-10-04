"use server";

import { createChatController } from "@/core/interface-adapters/controllers/chat/chat.controller";

export async function createChat(chatTopic: string, categoryId: number) {
  return createChatController(chatTopic, categoryId);
}
