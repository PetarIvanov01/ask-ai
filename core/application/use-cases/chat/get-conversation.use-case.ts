import { getInjection } from "@/core/di/container";

export async function getConversationUseCase(chatId: string, ownerId: string) {
  const chatRepository = getInjection("IChat");

  const history = await chatRepository.getChatById(chatId, ownerId);

  return history;
}
