import { getInjection } from "@/core/di/container";

export async function createChatUseCase(
  chatTopic: string,
  categoryId: number,
  ownerId: string
) {
  const chatRepository = getInjection("IChat");

  const existing = await chatRepository.getChatByTopic(chatTopic, ownerId);

  if (existing) {
    return existing;
  }

  return await chatRepository.createChat(ownerId, chatTopic, categoryId);
}
