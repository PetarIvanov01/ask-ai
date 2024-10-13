import { Suspense } from "react";

import LoadingFallback from "./LoadingSkeleton";
import MainLayout from "../../main-layout";
import ChatRoomLayout from "../../chat-room-layout";
import { getSession } from "@/core/interface-adapters/controllers/authentication/session.controller";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <MainLayout username={session.username}>
      <ChatRoomLayout userId={session.userId}>
        <section className="flex-grow pt-2 h-full flex flex-col justify-center items-center w-full">
          <div className="flex w-full h-full flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <div className="h-full w-full">{children}</div>
            </Suspense>
          </div>
        </section>
      </ChatRoomLayout>
    </MainLayout>
  );
}
