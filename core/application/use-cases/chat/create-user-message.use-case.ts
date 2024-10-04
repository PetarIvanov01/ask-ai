import { getInjection } from "@/core/di/container";

export async function createUserMessageUseCase(
  message: string,
  chatId: string
) {
  const chatRepository = getInjection("IChat");

  return await chatRepository.createUserMessage(message, chatId);
}
