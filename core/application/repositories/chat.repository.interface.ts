import {
  BotMessageShema,
  ChatSchema,
  ConversationSchema,
  UserMessageShema,
} from "@/core/entities/models/chat";

export interface IChat {
  createUserMessage(input: UserMessageShema): Promise<void>;
  createBotMessage(input: BotMessageShema): Promise<void>;
  getChats(ownerId: string): Promise<ConversationSchema[]>;
  getChatByTopic(chatTopic: string, ownerId: string): Promise<ChatSchema>;
}
