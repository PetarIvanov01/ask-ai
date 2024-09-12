import { ReactNode } from "react";
import { cardsData } from "./cards-data";

export default function Categories() {
  return (
    <div className="flex justify-center items-center flex-wrap">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          options={card.options}
        />
      ))}
    </div>
  );
}

type CardProps = Readonly<{
  image: ReactNode;
  title: string;
  options: string[];
}>;

const Card = ({ image, title, options }: CardProps) => {
  return (
    <div className="flex flex-col items-center p-6">
      <div
        className={`size-14 rounded-full mb-4 bg-darker-gray  flex justify-center items-center`}
      >
        {image}
      </div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="w-60">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex justify-between items-center shadow-lg text-sm bg-darker-gray p-4 mb-2 rounded-lg cursor-pointer hover:bg-dark-gray-1 transition-colors duration-200"
          >
            {option} <span className="text-gray-600">→</span>
          </div>
        ))}
      </div>
    </div>
  );
};
