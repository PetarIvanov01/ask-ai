import {
  getCategories,
  getIconURL,
} from "@/core/interface-adapters/controllers/category.controller";
import CardList from "./card-list";

export default async function Categories() {
  const cardsData = await getCategories();

  return (
    <div className="flex justify-center items-center flex-wrap">
      <CardList
        data={cardsData.map((e) => ({ ...e, image: getIconURL(e.iconUrl) }))}
      />
    </div>
  );
}
