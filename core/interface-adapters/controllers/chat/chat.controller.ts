import { getInjection } from "@/core/di/container";

import { AuthenticationError } from "@/core/entities/custom-errors/errors";

import { formatDateAndCompare } from "@/core/infrastructure/utils/dates";
import { normalizeString } from "@/core/infrastructure/utils/string";

import { getConversationUseCase } from "@/core/application/use-cases/chat/get-conversation.use-case";
import { getChatsUseCase } from "@/core/application/use-cases/chat/get-chats.use-case";
import { createChatUseCase } from "@/core/application/use-cases/chat/create-chat.use-case";
import { startConversationUseCase } from "@/core/application/use-cases/chat/start-chat.use-case";

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

  const conversation = await getConversationUseCase(
    normalizeChatTopic,
    session.userId
  );

  if (conversation.messages.length === 0) {
    const message = await startConversationUseCase(
      conversation.chatId,
      session.userId
    );
    conversation.messages = [message];
  }

  return conversation;
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
