import { ReactNode } from "react";

import SideNavigation from "../ui/navigation/side-bar";
import SideBarContent from "../ui/navigation/side-bar-content";
import ChatHeader from "./chat-header";

import { getSession } from "@/core/interface-adapters/controllers/authentication/session.controller";
import MessageInputStatic from "../ui/message-input-static";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex h-screen bg-gray-2 text-white">
      <div className="w-full flex flex-grow p-2 gap-2">
        <SideNavigation>
          <SideBarContent username={session.username} />
        </SideNavigation>

        <section className="w-full justify-between max-h-screen flex flex-col flex-grow mx-auto">
          <ChatHeader />

          <div className="flex-grow h-full mt-3 flex flex-col justify-center items-center overflow-y-auto">
            {children}
          </div>

          <MessageInputStatic />
        </section>
      </div>
    </div>
  );
}
