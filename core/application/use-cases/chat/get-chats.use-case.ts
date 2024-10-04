import { getInjection } from "@/core/di/container";

export async function getChatsUseCase(ownerId: string) {
  const chatRepository = getInjection("IChat");

  return await chatRepository.getChats(ownerId);
}
