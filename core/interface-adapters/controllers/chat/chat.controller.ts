import { getInjection } from "@/core/di/container";

import { AuthenticationError } from "@/core/entities/custom-errors/errors";

import { formatDateAndCompare } from "@/core/infrastructure/utils/dates";

import { getConversationUseCase } from "@/core/application/use-cases/chat/get-conversation.use-case";
import { getChatsUseCase } from "@/core/application/use-cases/chat/get-chats.use-case";
import { createChatUseCase } from "@/core/application/use-cases/chat/create-chat.use-case";
import { startConversationUseCase } from "@/core/application/use-cases/chat/start-chat.use-case";
import { ChatSchema } from "@/core/entities/models/chat";

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

export async function getConversationController(chatId: string) {
  const authRepository = getInjection("IAuthenticationService");

  const session = await authRepository.getSession();

  if (!session) {
    throw new AuthenticationError("Not Authenticated");
  }

  const conversation = await getConversationUseCase(chatId, session.userId);

  if (!conversation) {
    throw new Error("Conversation doesn't exist");
  }

  if (conversation.messages.length === 0) {
    const newMessage = await startConversationUseCase(
      conversation.chatId,
      conversation.chatTopic
    );

    return {
      chatId: conversation.chatId,
      messages: [newMessage],
    } as ChatSchema;
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

export async function getChatController(chatId: string, ownerId: string) {
  const authRepository = getInjection("IAuthenticationService");
  const chatRepository = getInjection("IChat");

  const session = await authRepository.getSession();

  if (!session) {
    throw new AuthenticationError("Not Authenticated");
  }

  try {
    return await chatRepository.getChatDetailsById(chatId, ownerId);
  } catch (error) {
    return {
      topic: "Chat Not Found",
      createdAt: "",
      updatedAt: "",
    };
  }
  // This should be called in use-case but it is one line of code
}
