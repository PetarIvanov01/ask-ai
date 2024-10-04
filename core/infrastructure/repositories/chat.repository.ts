import { injectable } from "inversify";

import { IChat } from "@/core/application/repositories/chat.repository.interface";
import {
  ConversationSchema,
  UserMessageShema,
  BotMessageShema,
  ChatSchema,
  conversationSchema,
  chatSchema,
} from "@/core/entities/models/chat";

import { createClient } from "../utils/supabase/server";

@injectable()
export class Chat implements IChat {
  async getChatByTopic(
    chatTopic: string,
    ownerId: string
  ): Promise<ChatSchema> {
    const supabase = createClient();

    const { data: cData, error: cError } = await supabase
      .from("chats")
      .select(
        `
      chat_id
      `
      )
      .eq("user_id", ownerId)
      .eq("topic", chatTopic)
      .single();

    if (cError) {
      throw cError;
    }

    const { data: mData, error: mError } = await supabase
      .from("messages")
      .select(`*`)
      .eq("chat_id", cData.chat_id);

    if (mError) {
      throw mError;
    }

    return {
      chatId: cData.chat_id,
      messages: mData.map((e) =>
        chatSchema.parse({
          messageId: e.message_id,
          message: e.message,
          role: e.role,
        })
      ),
    };
  }

  async getChats(ownerId: string): Promise<ConversationSchema[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("chats")
      .select(
        `
      chat_id,
      user_id,
      category_id,
      topic,
      updated_at,
      categories ( id, title, icon_url )
      `
      )
      .eq("user_id", ownerId);

    if (error) {
      throw error;
    }

    return data.map((e) =>
      conversationSchema.parse({
        chatId: e.chat_id,
        userId: e.user_id,
        updatedAt: e.updated_at,
        imageUrl: e.categories?.icon_url,
        topic: e.topic,
        categoryTitle: e.categories?.title,
      })
    );
  }

  async createChat(
    ownerId: string,
    chatTopic: string,
    categoryId: number
  ): Promise<void> {
    const supabase = createClient();

    await supabase.from("chats").upsert({
      topic: chatTopic,
      user_id: ownerId,
      category_id: categoryId,
    });

    return;
  }

  async createUserMessage(
    input: UserMessageShema,
    chatId: string
  ): Promise<{ message: BotMessageShema; chatId: string; messageId: string }> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        message: input,
        role: "user",
      })
      .select();

    if (error) {
      throw error;
    }

    const { chat_id, message, message_id } = data[0];

    return {
      chatId: chat_id,
      message,
      messageId: message_id,
    };
  }

  async createBotMessage(
    input: BotMessageShema,
    chatId: string
  ): Promise<{ message: BotMessageShema; chatId: string; messageId: string }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        message: input,
        role: "ai",
      })
      .select();

    if (error) {
      throw error;
    }

    const { chat_id, message, message_id } = data[0];

    return {
      message: message,
      messageId: message_id,
      chatId: chat_id,
    };
  }
}
