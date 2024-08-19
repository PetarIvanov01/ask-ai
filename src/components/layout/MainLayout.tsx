import SideNavigation from "@/components/navigation/SideNavigation";
import MessageInput from "../MessageInput";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-2 text-white">
      <div className="w-full flex flex-grow p-2 gap-2">
        <SideNavigation />
        <section className="w-full justify-between max-h-screen flex flex-col flex-grow mx-auto">
          <article className="text-center bg-dark-gray-1 rounded-md py-4">
            <header>
              <h2>JavaScript - Runtime ...</h2>
            </header>
          </article>

          <div className="flex-grow h-full mt-3 flex flex-col justify-center items-center overflow-y-auto">
            {children}
          </div>

          <MessageInput />
        </section>
      </div>
    </div>
  );
}
