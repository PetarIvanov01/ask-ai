import { getInjection } from "@/core/di/container";

export async function createBotMessageUseCase(
  message: string,
  chatId: string,
  chatTopic: string
) {
  const chatRepository = getInjection("IChat");
  const aiService = getInjection("IAiService");

  const { instructions } = await chatRepository.getAiInstructions(chatTopic);

  const botResponse = await aiService.createBotResponse(message, instructions);

  return await chatRepository.createBotMessage(botResponse, chatId);
}
