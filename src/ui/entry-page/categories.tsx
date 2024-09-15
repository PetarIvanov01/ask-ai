import Link from "next/link";
import Image from "next/image";

import {
  getCategories,
  getIconURL,
} from "@/core/interface-adapters/controllers/category.controller";

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function Categories() {
  const cardsData = await getCategories();

  await wait(2000);
  return (
    <div className="flex justify-center items-center flex-wrap">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          image={getIconURL(card.iconUrl)}
          title={card.title}
          options={card.options}
        />
      ))}
    </div>
  );
}

type CardProps = Readonly<{
  image: string;
  title: string;
  options: string[];
}>;

const Card = ({ image, title, options }: CardProps) => {
  return (
    <div className="flex flex-col items-center p-6">
      <div
        className={`size-14 rounded-full mb-4 bg-darker-gray  flex justify-center items-center`}
      >
        <Image width={50} height={50} src={image} alt={title} />
      </div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="w-60">
        {options.map((option, index) => (
          <Link
            href={`/chat/${option.toLowerCase().replace(/\/| /g, "-")}`}
            key={index}
            className="flex justify-between items-center shadow-lg text-sm bg-darker-gray p-4 mb-2 rounded-lg cursor-pointer hover:bg-dark-gray-1 transition-colors duration-200"
          >
            {option} <span className="text-gray-600">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
