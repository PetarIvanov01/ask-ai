import {
  getCategories,
  getIconURL,
} from "@/core/interface-adapters/controllers/category.controller";
import Card from "./card";

export default async function Categories() {
  const cardsData = await getCategories();

  return (
    <div className="flex justify-center items-center flex-wrap">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          image={getIconURL(card.iconUrl)}
          title={card.title}
          id={card.id}
          options={card.options}
        />
      ))}
    </div>
  );
}
