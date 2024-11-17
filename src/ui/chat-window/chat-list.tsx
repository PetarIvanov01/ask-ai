import { useEffect, useRef } from "react";
import BotMessage from "./bot-message";
import UserMessage from "./user-message";

type Props = {
  focusRef: React.RefObject<HTMLDivElement>;
  messages: {
    role: "user" | "ai";
    messageId: string;
    message: string;
    isSubmited?: boolean;
  }[];
  handleRetryLastMessage: () => void;
};

export default function ChatList({
  messages,
  focusRef,
  handleRetryLastMessage,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      const isNearBottom = scrollHeight - scrollTop - clientHeight < 10;

      isUserScrolling.current = !isNearBottom;
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="flex-grow overflow-auto">
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        const isUserMessagePending =
          isUser && message.messageId === "optimistic";
        const isUserMessageHasError = isUser && message.messageId === "error";

        const isUserMessageWithoutResponse =
          isUser && index === messages.length - 1 && isUserMessagePending;

        if (isUserMessageWithoutResponse) {
          return (
            <UserMessage
              errorRetry={true}
              onRetry={handleRetryLastMessage}
              pending={isUserMessagePending}
              message={message.message}
              key={message.messageId}
            />
          );
        }
        if (isUser) {
          return (
            <UserMessage
              errorFetching={isUserMessageHasError}
              pending={isUserMessagePending}
              message={message.message}
              key={message.messageId}
            />
          );
        }
        return (
          <BotMessage
            isUserScrollingRef={isUserScrolling}
            isInitial={message.isSubmited}
            message={message.message}
            key={message.messageId}
          />
        );
      })}

      <div ref={focusRef} />
    </div>
  );
}
