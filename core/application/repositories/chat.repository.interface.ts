import {
  BotMessageShema,
  ChatSchema,
  ConversationSchema,
  UserMessageShema,
} from "@/core/entities/models/chat";

export interface IChat {
  createUserMessage(
    input: UserMessageShema,
    chatId: string
  ): Promise<{ message: BotMessageShema; chatId: string; messageId: string }>;
  createBotMessage(
    input: BotMessageShema,
    chatId: string
  ): Promise<{ message: BotMessageShema; chatId: string; messageId: string }>;
  getChats(ownerId: string): Promise<ConversationSchema[]>;
  createChat(
    ownerId: string,
    chatTopic: string,
    categoryId: number
  ): Promise<void>;
  getChatByTopic(chatTopic: string, ownerId: string): Promise<ChatSchema>;
}
