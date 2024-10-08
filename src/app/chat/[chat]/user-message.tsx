import { memo } from "react";

function UserMessage({ message }: { message: string }) {
  return (
    <article className="w-full text-token-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <div className="text-base py-[18px] px-3 m-auto md:px-5">
        <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-col flex-grow">
                <div className="min-h-[20px] text-message flex w-full flex-col items-end gap-2 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto">
                  <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
                    <div className="max-w-[70%] px-5 py-2.5 dark:bg-token-main-surface-secondary">
                      <div className="border rounded-lg bg-dark-gray-5 px-2 py-3 border-dark-gray-1 ">
                        {message}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default memo(UserMessage);
