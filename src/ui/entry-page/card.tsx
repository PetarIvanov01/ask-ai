"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { createChat } from "./actions";

type CardProps = Readonly<{
  id: number;
  image: string;
  title: string;
  options: string[];
}>;

export default function Card({ image, title, options, id }: CardProps) {
  const route = useRouter();

  const onClickCreateChat =
    (chatTopic: string, categoryId: number) => async () => {
      const data = await createChat(chatTopic, categoryId);
      route.push(`/chat/${data.chatId}`);
    };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="size-14 rounded-full mb-4 bg-darker-gray flex justify-center items-center relative">
        <Image width={20} height={20} src={image} alt={title} />
      </div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="w-60">
        {options.map((option, index) => (
          <span
            onClick={onClickCreateChat(option, id)}
            key={index}
            className="flex justify-between items-center shadow-lg text-sm bg-darker-gray p-4 mb-2 rounded-lg cursor-pointer hover:bg-dark-gray-1 transition-colors duration-200"
          >
            {option} <span className="text-gray-600">→</span>
          </span>
        ))}
      </div>
    </div>
  );
}
