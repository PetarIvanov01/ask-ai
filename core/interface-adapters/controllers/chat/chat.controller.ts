import { getInjection } from "@/core/di/container";

import { AuthenticationError } from "@/core/entities/custom-errors/errors";
import { Message } from "@/core/entities/models/chat";

import { formatDateAndCompare } from "@/core/infrastructure/utils/dates";

import { getConversationUseCase } from "@/core/application/use-cases/chat/get-conversation.use-case";
import { getChatsUseCase } from "@/core/application/use-cases/chat/get-chats.use-case";
import { createChatUseCase } from "@/core/application/use-cases/chat/create-chat.use-case";
import { createBotMessageUseCase } from "@/core/application/use-cases/chat/create-bot-message.use-case";
import { createUserMessageUseCase } from "@/core/application/use-cases/chat/create-user-message.use-case";

export async function getChatsController() {
  try {
    const authRepository = getInjection("IAuthenticationService");

    const session = await authRepository.getSession();

    if (!session) {
      throw new AuthenticationError("Not Authenticated");
    }

    const data = await getChatsUseCase(session.userId);

    data.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const groupedChats: [string, typeof data][] = [];

    data.forEach((chat) => {
      const dateLabel = formatDateAndCompare(chat.updatedAt);

      let tuple = groupedChats.find(([label]) => label === dateLabel);

      if (!tuple) {
        tuple = [dateLabel, []];
        groupedChats.push(tuple);
      }

      tuple[1].push(chat);
    });

    return groupedChats;
  } catch (error) {
    return [];
  }
}

export async function getConversationController(chatTopic: string) {
  const authRepository = getInjection("IAuthenticationService");

  const session = await authRepository.getSession();

  if (!session) {
    throw new AuthenticationError("Not Authenticated");
  }

  const normalizeChatTopic = normalizeString(chatTopic);

  return getConversationUseCase(normalizeChatTopic, session.userId);
}

export async function createChatController(
  chatTopic: string,
  categoryId: number
) {
  const authRepository = getInjection("IAuthenticationService");

  const session = await authRepository.getSession();

  if (!session) {
    throw new AuthenticationError("Not Authenticated");
  }

  return createChatUseCase(chatTopic, categoryId, session.userId);
}

export async function createBotMessageController(
  message: string,
  chatId: string
): Promise<Message> {
  const authService = getInjection("IAuthenticationService");
  const session = await authService.getSession();

  if (!session) {
    throw new AuthenticationError("Not Authenticated");
  }

  const data = await createBotMessageUseCase(message, chatId);
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

  if (!session?.userId) {
    throw new AuthenticationError("Not Authenticated");
  }

  const data = await createUserMessageUseCase(message, chatId);
  return {
    message: data.message,
    messageId: data.messageId,
    role: "user",
  };
}

function normalizeString(input: string): string {
  if (input.includes("async") && input.includes("await")) {
    return "Async/Await";
  }

  return input
    .split("-")
    .map(
      (word, index) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}
