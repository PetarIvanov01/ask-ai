import { getInjection } from "@/core/di/container";

import { ChatSchema } from "@/core/entities/models/chat";

export async function startConversationUseCase(
  chatId: string,
  chatTopic: string
): Promise<ChatSchema["messages"][number]> {
  const aiSerivce = getInjection("IAiService");
  const chatRepository = getInjection("IChat");

  const { instructions } = await chatRepository.getAiInstructions(chatTopic);
  const botResponse = await aiSerivce.startConversation(instructions);

  const { message, messageId } = await chatRepository.createBotMessage(
    botResponse,
    chatId
  );

  return {
    message,
    messageId,
    role: "ai",
  };
}
