import { BotMessageShema } from "@/core/entities/models/chat";

// Only the interface that will be implemented inside the infrastructure part.
export interface IAiService {
  startConversation: (instructions: string) => Promise<BotMessageShema>;
  createBotResponse: (
    message: string,
    instructions: string
  ) => Promise<BotMessageShema>;
}
