import { z } from "zod";

const userMessageSchema = z.string().min(2);
const botMessageSchema = z.string().min(2);

export const conversationSchema = z.object({
  chatId: z.string(),
  userId: z.string().uuid(),
  updatedAt: z.coerce.date(),
  categoryTitle: z.string(),
  chatName: z.string(),
  topic: z.string(),
  imageUrl: z.string(),
});

export const chatSchema = z.object({
  messageId: z.string().uuid(),
  message: z.string(),
  role: z.enum(["user", "ai"]),
});

export const customChatSchema = z.object({
  topic: z
    .string()
    .min(5, { message: "Chat topic must be at least 5 characters long." })
    .max(100, { message: "Chat topic must not exceed 100 characters." }),
  title: z
    .string()
    .min(3, { message: "Chat title must be at least 3 characters long." })
    .max(50, { message: "Chat title must not exceed 50 characters." }),
  proficiency: z.enum(["beginner", "intermediate", "advanced"], {
    errorMap: () => ({
      message: "Proficiency must be one of: beginner, intermediate, advanced.",
    }),
  }),
  personality: z.enum(["friendly", "professional", "humorous"], {
    errorMap: () => ({
      message: "Personality must be one of: friendly, professional, humorous.",
    }),
  }),
  language: z.enum(["english", "bulgarian"], {
    errorMap: () => ({
      message: "Language must be either 'english' or 'bulgarian'.",
    }),
  }),
  responseLength: z.enum(["short", "medium", "detailed"], {
    errorMap: () => ({
      message: "Response length must be one of: short, medium, detailed.",
    }),
  }),
  background: z
    .string()
    .max(500, {
      message: "Background information must not exceed 500 characters.",
    })
    .optional(),
  tags: z
    .string()
    .regex(/^[a-zA-Z0-9, ]*$/, {
      message: "Tags must only contain letters, numbers, commas, and spaces.",
    })
    .optional(),
});

export type UserMessageShema = z.infer<typeof userMessageSchema>;
export type BotMessageShema = z.infer<typeof botMessageSchema>;
export type ConversationSchema = z.infer<typeof conversationSchema>;
export type CustomChatSchema = Readonly<z.infer<typeof customChatSchema>>;

export type ChatSchema = {
  chatId: string;
  chatName: string;
  chatTopic: string;
  messages: z.infer<typeof chatSchema>[];
};

export type Message = ChatSchema["messages"][number];
