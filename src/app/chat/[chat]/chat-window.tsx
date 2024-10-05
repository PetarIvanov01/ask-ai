"use client";
import { Nunito } from "next/font/google";

import { useRef, useState } from "react";

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
}: {
  initialMessages: Message[];
  chatId: string;
}) {
  const focusRef = useRef<HTMLDivElement>(null);
  const onSubmitFocusMessage = () => {
    focusRef.current?.scrollTo(0, focusRef.current.scrollHeight);
  };

  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = async (userInput: string) => {
    const userMessage: Message = await createUserMessageAction(
      userInput,
      chatId
    );

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    try {
      const botMessage = await createBotMessageAction(userInput, chatId);

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    }
  };

  return (
    <div className={`${nunito.className} flex flex-col text-sm h-full`}>
      <div ref={focusRef} className="flex-grow overflow-auto">
        {messages.map((message) =>
          message.role === "user" ? (
            <UserMessage message={message.message} key={message.messageId} />
          ) : (
            <BotMessage message={message.message} key={message.messageId} />
          )
        )}
      </div>

      <MessageInput
        onSubmitFocusMessage={onSubmitFocusMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
