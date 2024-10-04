import { z } from "zod";

const userMessageSchema = z.string().min(2);
const botMessageSchema = z.string().min(2);

export const conversationSchema = z.object({
  chatId: z.string(),
  userId: z.string().uuid(),
  updatedAt: z.coerce.date(),
  categoryTitle: z.string(),
  topic: z.string(),
  imageUrl: z.string(),
});

export const messageSchema = z.object({
  chatId: z.string(),
  messageId: z.number(),
  userMessage: z.string().min(2),
  botResponse: z.string().min(2),
  createdAt: z.string(),
});

export const chatSchema = z.object({
  messageId: z.string().uuid(),
  message: z.string(),
  role: z.enum(["user", "ai"]),
});

export type MessageSchema = z.infer<typeof messageSchema>;
export type UserMessageShema = z.infer<typeof userMessageSchema>;
export type BotMessageShema = z.infer<typeof botMessageSchema>;
export type ConversationSchema = z.infer<typeof conversationSchema>;
export type ChatSchema = {
  chatId: string;
  messages: z.infer<typeof chatSchema>[];
};

export type Message = ChatSchema["messages"][number];
