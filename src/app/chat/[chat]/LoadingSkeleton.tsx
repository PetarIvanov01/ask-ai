function BotMessage() {
  return (
    <article className="w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <div className="text-base py-[18px] px-3 m-auto md:px-5">
        <div className="mx-auto flex items-center flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="flex-shrink-0 flex flex-col relative self-start mb-6 pt-2">
            <div className="pt-0">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                <div className="relative p-1 size-10 bg-dark-gray-1 rounded-sm flex items-center justify-center"></div>
              </div>
            </div>
          </div>
          <div className="relative flex w-full min-w-0 flex-col agent-turn">
            <div className="skeleton h-5 w-3/4 mb-2 bg-gray-300 animate-pulse"></div>
            <div className="skeleton h-5 w-2/3 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </article>
  );
}

function UserMessage() {
  return (
    <article className="w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <div className="text-base py-[18px] px-3 m-auto md:px-5">
        <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-col flex-grow">
                <div className="min-h-[20px] flex w-full flex-col items-end gap-2 whitespace-pre-wrap break-words overflow-x-auto">
                  <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
                    <div className="w-2/3 flex flex-col px-5 py-2.5">
                      <div className="skeleton h-5 w-3/4 mb-2 bg-gray-300 animate-pulse"></div>
                      <div className="skeleton h-5 w-2/3 bg-gray-300 animate-pulse"></div>
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

export default function LoadingFallback() {
  return (
    <div className="flex flex-col text-sm h-full w-full">
      <div className="flex-grow overflow-auto h-full w-full">
        {[...Array(6)].map((_, index) => {
          if (index % 2 === 0) {
            return <BotMessage key={index} />;
          }
          return <UserMessage key={index} />;
        })}
      </div>

      <article className="w-full max-h-[600px] min-h-24 flex items-end">
        <div className="w-full">
          <div className="relative flex h-full max-w-full flex-1 flex-col">
            <div className="flex w-full flex-col gap-1.5 rounded-md p-1.5 transition-colors bg-dark-gray-1">
              <div className="flex items-end gap-1.5">
                <div className="flex min-w-0 flex-1 flex-col">
                  <textarea
                    disabled
                    tabIndex={0}
                    dir="auto"
                    rows={1}
                    placeholder="Placeholder message to invite the user to write his response"
                    className="border-gray-600 py-1 px-2 bg-dark-gray-1 outline-none rounded-md h-full w-full flex items-center resize-none focus:border max-h-52"
                    style={{ height: "60px", overflow: "hidden" }}
                  ></textarea>
                </div>
                <button className="mb-3 me-1 flex h-8 w-8 items-center justify-center rounded-full  hover:opacity-70 focus-visible:outline-none bg-white ">
                  <svg
                    className="size-5 me-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
