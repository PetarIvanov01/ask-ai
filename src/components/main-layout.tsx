import SideNavigation from "@/components/navigation/side-navigation";
import MessageInput from "./message-input";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-2 text-white">
      <div className="w-full flex flex-grow p-2 gap-2">
        <SideNavigation />
        <section className="w-full flex flex-col flex-grow mx-auto">
          <article className="text-center bg-dark-gray-1 rounded-md py-4">
            <header>
              <h2>JavaScript - Runtime ...</h2>
            </header>
          </article>

          <article className="flex-grow p-2 flex flex-col justify-center items-center text-center">
            {children}
          </article>

          <MessageInput />
        </section>
      </div>
    </div>
  );
}
