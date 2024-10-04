import { getInjection } from "@/core/di/container";

export async function createBotMessageUseCase(message: string, chatId: string) {
  const chatRepository = getInjection("IChat");
  const aiService = getInjection("IAiService");

  const botResponse = await aiService.createBotResponse(message);

  return await chatRepository.createBotMessage(botResponse, chatId);
}
