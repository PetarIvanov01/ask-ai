import Image from "next/image";
import logo from "/public/original-icon.png";

export default function BotMessage({ message }: { message: string }) {
  return (
    <article className="w-full text-token-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <div className="text-base py-[18px] px-3 m-auto md:px-5">
        <div className="mx-auto flex items-center flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="flex-shrink-0 flex flex-col relative items-end">
            <div className="pt-0">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                <div className="relative p-1 rounded-sm flex items-center justify-center bg-token-main-surface-primary text-token-text-primary">
                  <Image src={logo} width={100} height={65} alt="logo" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex w-full min-w-0 flex-col agent-turn">
            {message}
          </div>
        </div>
      </div>
    </article>
  );
}
