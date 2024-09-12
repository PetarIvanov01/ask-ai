import { ReactNode } from "react";

import MessageInput from "../ui/message-input";
import SideNavigation from "../ui/navigation/side-bar";
import SideBarContent from "../ui/navigation/side-bar-content";
import ChatHeader from "./chat-header";

import MessageProvider from "../context/MessageContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-2 text-white">
      <div className="w-full flex flex-grow p-2 gap-2">
        <SideNavigation>
          <SideBarContent />
        </SideNavigation>

        <section className="w-full justify-between max-h-screen flex flex-col flex-grow mx-auto">
          <ChatHeader />
          <MessageProvider>
            <div className="flex-grow h-full mt-3 flex flex-col justify-center items-center overflow-y-auto">
              {children}
            </div>

            <MessageInput />
          </MessageProvider>
        </section>
      </div>
    </div>
  );
}
