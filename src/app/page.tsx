import Categories from "../ui/entry-page/categories";
import MainLayout from "./main-layout";

export default function EntryPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">
          Learn Programming Concepts with AI
        </h2>
        <p className="mb-4">
          Improve your theoretical knowledge through AI conversations.
        </p>

        <Categories />
      </div>
    </MainLayout>
  );
}
