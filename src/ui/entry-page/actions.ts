"use server";

import { createChatController } from "@/core/interface-adapters/controllers/chat/chat.controller";
import { revalidatePath } from "next/cache";

export async function createChat(chatTopic: string, categoryId: number) {
  try {
    return createChatController(chatTopic, categoryId);
  } finally {
    revalidatePath("/");
  }
}
