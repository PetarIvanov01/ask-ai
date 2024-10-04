import { BotMessageShema } from "@/core/entities/models/chat";

// Only the interface that will be implemented inside the infrastructure part.
export interface IAiService {
  createBotResponse: (message: string) => Promise<BotMessageShema>;
}
