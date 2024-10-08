"use client";
import { Nunito } from "next/font/google";

import { useState } from "react";

import useFocusMessage from "@/src/hooks/useFocusMessage";
import MessageInput from "@/src/ui/message-input";
import BotMessage from "./bot-message";
import UserMessage from "./user-message";

import { ChatSchema } from "@/core/entities/models/chat";
import { createBotMessageAction, createUserMessageAction } from "./actions";

const nunito = Nunito({ subsets: ["latin"], weight: "500" });

type Message = ChatSchema["messages"][number];

export default function ChatWindow({
  initialMessages,
  chatId,
  topic,
}: {
  initialMessages: Message[];
  chatId: string;
  topic: string;
}) {
  const { focusRef, onSubmitFocusMessage } = useFocusMessage();
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = async (userInput: string) => {
    const userMessage: Message = await createUserMessageAction(
      userInput,
      chatId
    );

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    try {
      const botMessage = await createBotMessageAction(userInput, chatId, topic);

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    }
  };

  return (
    <div className={`${nunito.className} flex flex-col text-sm h-full`}>
      <div className="flex-grow overflow-auto">
        {messages.map((message) =>
          message.role === "user" ? (
            <UserMessage message={message.message} key={message.messageId} />
          ) : (
            <BotMessage message={message.message} key={message.messageId} />
          )
        )}
        <div ref={focusRef} />
      </div>

      <MessageInput
        onSubmitFocusMessage={onSubmitFocusMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
