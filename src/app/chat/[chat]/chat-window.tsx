"use client";
import { Nunito } from "next/font/google";

import { useState } from "react";

import useFocusMessage from "@/src/hooks/useFocusMessage";
import MessageInput from "@/src/ui/message-input";

import { ChatSchema } from "@/core/entities/models/chat";
import { createBotMessageAction, createUserMessageAction } from "./actions";
import ChatList from "@/src/ui/chat-window/chat-list";

const nunito = Nunito({ subsets: ["latin"], weight: "500" });

type Message = ChatSchema["messages"][number];

export default function ChatWindow({
  initialMessages,
  chatId,
  topic,
}: {
  initialMessages: (Message & { isSubmited?: boolean })[];
  chatId: string;
  topic: string;
}) {
  const { focusRef, onSubmitFocusMessage } = useFocusMessage();

  const [messages, setMessages] = useState(initialMessages);

  const handleBotMessage = async (userInput: string) => {
    try {
      const botMessage = await createBotMessageAction(userInput, chatId, topic);

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...botMessage, isSubmited: true },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    }
  };

  const handleUserMessage = async (userInput: string) => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: userInput, messageId: "optimistic", role: "user" },
      ]);

      const userMessage: Message = await createUserMessageAction(
        userInput,
        chatId
      );

      setMessages((prevMessages) =>
        prevMessages.map((e) =>
          e.messageId === "optimistic" ? userMessage : e
        )
      );
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.map((e) =>
          e.messageId === "optimistic" ? { ...e, messageId: "error" } : e
        )
      );
      return;
    }
  };

  const handleMessageFlow = async (userInput: string) => {
    await Promise.all([
      handleUserMessage(userInput),
      handleBotMessage(userInput),
    ]);
  };

  const handleRetryLastMessage = async () => {
    const lastMessage = messages[messages.length - 1];
    await handleBotMessage(lastMessage.message);
  };

  return (
    <div className={`${nunito.className} flex flex-col text-sm h-full`}>
      <ChatList
        messages={messages}
        focusRef={focusRef}
        handleRetryLastMessage={handleRetryLastMessage}
      />

      <MessageInput
        onSubmitFocusMessage={onSubmitFocusMessage}
        handleSendMessage={handleMessageFlow}
      />
    </div>
  );
}
