import { Suspense } from "react";

import { getSession } from "@/core/interface-adapters/controllers/authentication/session.controller";

import MainLayout from "./main-layout";

import Categories from "../ui/entry-page/categories";
import { SkeletonLoader } from "../ui/entry-page/skeleton";
import ChatRoomLayout from "./chat-room-layout";

export default async function EntryPage() {
  const session = await getSession();

  return (
    <MainLayout username={session.username}>
      <ChatRoomLayout userId={session.userId}>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">
            Learn Programming Concepts with AI
          </h2>
          <p className="mb-4">
            Improve your theoretical knowledge through AI conversations.
          </p>

          <Suspense fallback={<SkeletonLoader />}>
            <Categories />
          </Suspense>
        </div>
      </ChatRoomLayout>
    </MainLayout>
  );
}
