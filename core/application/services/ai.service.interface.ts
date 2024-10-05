import { BotMessageShema } from "@/core/entities/models/chat";

// Only the interface that will be implemented inside the infrastructure part.
export interface IAiService {
  startConversation: (topic: string) => Promise<BotMessageShema>;
  createBotResponse: (message: string) => Promise<BotMessageShema>;
}
