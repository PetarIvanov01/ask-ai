import {
  BotMessageShema,
  ChatSchema,
  ConversationSchema,
  CustomChatSchema,
  UserMessageShema,
} from "@/core/entities/models/chat";

export interface IChat {
  getChatById(chatId: string, ownerId: string): Promise<ChatSchema | null>;
  getChatDetailsById(
    chatId: string,
    ownerId: string
  ): Promise<{ topic: string; createdAt: string; updatedAt: string }>;
  getChatByTopic(
    chatTopic: string,
    ownerId: string
  ): Promise<{ topic: string; chatId: string } | null>;
  getChats(ownerId: string): Promise<ConversationSchema[]>;
  getAiInstructions(chatTopic: string): Promise<{ instructions: string }>;
  createChat(
    ownerId: string,
    chatTopic: string,
    categoryId: number
  ): Promise<{ chatId: string }>;
  createCustomizableChat(
    ownerId: string,
    options: CustomChatSchema
  ): Promise<{ chatId: string }>;
  createUserMessage(
    input: UserMessageShema,
    chatId: string
  ): Promise<{ message: BotMessageShema; chatId: string; messageId: string }>;
  createBotMessage(
    input: BotMessageShema,
    chatId: string
  ): Promise<{ message: BotMessageShema; chatId: string; messageId: string }>;
  deleteChatById(chatId: string): Promise<void>;
  resetChatById(chatId: string): Promise<void>;
  renameChatById(chatId: string, newName: string): Promise<void>;
}
