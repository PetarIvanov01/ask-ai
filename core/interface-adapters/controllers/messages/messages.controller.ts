import { getInjection } from "@/core/di/container";

import { AuthenticationError } from "@/core/entities/custom-errors/errors";
import { Message } from "@/core/entities/models/chat";

import { createBotMessageUseCase } from "@/core/application/use-cases/chat/create-bot-message.use-case";
import { createUserMessageUseCase } from "@/core/application/use-cases/chat/create-user-message.use-case";

export async function createBotMessageController(
  message: string,
  chatId: string,
  chatTopic: string
): Promise<Message> {
  const authService = getInjection("IAuthenticationService");
  const session = await authService.getSession();

  if (!session) {
    throw new AuthenticationError("Not Authenticated");
  }

  const data = await createBotMessageUseCase(message, chatId, chatTopic);
  return {
    message: data.message,
    messageId: data.messageId,
    role: "ai",
  };
}

export async function createUserMessageController(
  message: string,
  chatId: string
): Promise<Message> {
  const authService = getInjection("IAuthenticationService");
  const session = await authService.getSession();

  if (!session) {
    throw new AuthenticationError("Not Authenticated");
  }

  const data = await createUserMessageUseCase(message, chatId);
  return {
    message: data.message,
    messageId: data.messageId,
    role: "user",
  };
}
