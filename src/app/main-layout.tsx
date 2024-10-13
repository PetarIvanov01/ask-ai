import { ReactNode } from "react";

import SideNavigation from "../ui/navigation/side-bar";
import SideBarContent from "../ui/navigation/side-bar-content";

export default async function MainLayout({
  children,
  username,
}: {
  children: ReactNode;
  username: string;
}) {
  return (
    <div className="flex h-screen bg-gray-2 text-white">
      <div className="w-full flex flex-grow p-2 gap-2">
        <SideNavigation>
          <SideBarContent username={username} />
        </SideNavigation>

        {children}
      </div>
    </div>
  );
}
