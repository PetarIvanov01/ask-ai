import { injectable } from "inversify";

import { IChat } from "@/core/application/repositories/chat.repository.interface";

import {
  ConversationSchema,
  UserMessageShema,
  BotMessageShema,
  ChatSchema,
  conversationSchema,
  chatSchema,
  CustomChatSchema,
} from "@/core/entities/models/chat";

import { createClient } from "../utils/supabase/server";

@injectable()
export class Chat implements IChat {
  private supabase = createClient();

  createCustomizableChat(
    ownerId: string,
    options: CustomChatSchema
  ): Promise<{ chatId: string }> {
    throw new Error("Method not implemented.");
  }
  /** GET -> Retriave Chat */
  async getChatById(
    chatId: string,
    ownerId: string
  ): Promise<ChatSchema | null> {
    const { data: cData, error: cError } = await this.supabase
      .from("chats")
      .select(
        `
      chat_id,
      topic,
      chat_name
      `
      )
      .eq("user_id", ownerId)
      .eq("chat_id", chatId)
      .single();

    if (cError) {
      if (cError.code === "PGRST116") {
        return null;
      }
      throw cError;
    }

    const { data: mData, error: mError } = await this.supabase
      .from("messages")
      .select(`*`)
      .eq("chat_id", cData.chat_id)
      .order("created_at", { ascending: true });

    if (mError) {
      throw mError;
    }

    return {
      chatId: cData.chat_id,
      chatName: cData.chat_name,
      chatTopic: cData.topic,
      messages: mData.map((e) =>
        chatSchema.parse({
          messageId: e.message_id,
          message: e.message,
          role: e.role,
        })
      ),
    };
  }

  async getChatByTopic(
    chatTopic: string,
    ownerId: string
  ): Promise<{ chatId: string; topic: string } | null> {
    const { data, error: cError } = await this.supabase
      .from("chats")
      .select(
        `
      chat_id,
      topic
      `
      )
      .eq("user_id", ownerId)
      .eq("topic", chatTopic)
      .single();

    if (cError) {
      if (cError.code === "PGRST116") {
        return null;
      }
      throw cError;
    }

    return {
      chatId: data.chat_id,
      topic: data.topic,
    };
  }

  async getChats(ownerId: string): Promise<ConversationSchema[]> {
    const { data, error } = await this.supabase
      .from("chats")
      .select(
        `
      chat_id,
      user_id,
      category_id,
      topic,
      chat_name,
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
        chatName: e.chat_name,
        categoryTitle: e.categories?.title,
      })
    );
  }

  async getChatDetailsById(
    chatId: string,
    ownerId: string
  ): Promise<{ topic: string; createdAt: string; updatedAt: string }> {
    const { data, error } = await this.supabase
      .from("chats")
      .select(
        `
      chat_id,
      topic,
      chat_name,
      created_at,
      updated_at
      `
      )
      .eq("user_id", ownerId)
      .eq("chat_id", chatId)
      .single();
    if (error) {
      throw error;
    }

    return {
      topic: data.chat_name,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  /** POST -> Create chat */
  async createChat(
    ownerId: string,
    chatTopic: string,
    categoryId: number
  ): Promise<{ chatId: string }> {
    const { data, error } = await this.supabase.from("chats").upsert({
      topic: chatTopic,
      user_id: ownerId,
      category_id: categoryId,
      chat_name: chatTopic,
    }).select(`
      chat_id
      `);

    if (error) {
      throw error;
    }

    return {
      chatId: data[0].chat_id,
    };
  }

  /** Chat messages methods */
  async createUserMessage(
    input: UserMessageShema,
    chatId: string
  ): Promise<{ message: BotMessageShema; chatId: string; messageId: string }> {
    const { data, error } = await this.supabase
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
    const { data, error } = await this.supabase
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

  /** PUT/DELETE -> Chat Actions */
  async renameChatById(chatId: string, newName: string): Promise<void> {
    const { error } = await this.supabase
      .from("chats")
      .update({ chat_name: newName })
      .eq("chat_id", chatId);

    if (error) {
      throw error;
    }
  }

  async resetChatById(chatId: string): Promise<void> {
    const { error } = await this.supabase
      .from("messages")
      .delete()
      .eq("chat_id", chatId);

    if (error) {
      throw error;
    }
  }

  async deleteChatById(chatId: string): Promise<void> {
    const { error } = await this.supabase
      .from("chats")
      .delete()
      .eq("chat_id", chatId);

    if (error) {
      throw error;
    }
  }

  async getAiInstructions(
    chatTopic: string
  ): Promise<{ instructions: string }> {
    const { error, data } = await this.supabase
      .from("category_options")
      .select(`topic, ai_instructions`)
      .eq("topic", chatTopic);

    if (error) {
      throw error;
    }

    const { ai_instructions } = data[0];

    return {
      instructions: ai_instructions,
    };
  }
}
