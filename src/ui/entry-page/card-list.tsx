"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { createChat } from "./actions";

import Card from "./card";

type Props = Readonly<{
  data: {
    id: number;
    image: string;
    title: string;
    options: string[];
  }[];
}>;

export default function CardList({ data }: Props) {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClickCreateChat = (chatTopic: string, categoryId: number) => () => {
    startTransition(async () => {
      const data = await createChat(chatTopic, categoryId);
      route.push(`/chat/${data.chatId}`);
    });
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
          <div className="loader" />
        </div>
      )}
      {data.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          id={card.id}
          options={card.options}
          onClickCreateChat={onClickCreateChat}
        />
      ))}
    </>
  );
}
