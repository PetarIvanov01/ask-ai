"use server";

import { Message } from "@/core/entities/models/chat";

import {
  createBotMessageController,
  createUserMessageController,
} from "@/core/interface-adapters/controllers/messages/messages.controller";

export async function createUserMessageAction(
  message: string,
  chatId: string
): Promise<Message> {
  if (message === "") {
    throw new Error("Message should be atleast 10 charactars.");
  }

  return await createUserMessageController(message, chatId);
}

export async function createBotMessageAction(
  message: string,
  chatId: string,
  chatTopic: string
): Promise<Message> {
  if (message === "") {
    throw new Error("Message should be atleast 10 charactars.");
  }
  return await createBotMessageController(message, chatId, chatTopic);
}
