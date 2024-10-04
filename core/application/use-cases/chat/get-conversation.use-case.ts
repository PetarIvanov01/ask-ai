import { getInjection } from "@/core/di/container";

export async function getConversationUseCase(
  chatTopic: string,
  ownerId: string
) {
  const chatRepository = getInjection("IChat");

  const history = await chatRepository.getChatByTopic(chatTopic, ownerId);

  return history;
}
