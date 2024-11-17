import { memo } from "react";

function UserMessage({
  message,
  pending,
  errorFetching,
  errorRetry,
  onRetry,
}: {
  message: string;
  pending: boolean;
  errorFetching?: boolean;
  errorRetry?: boolean;
  onRetry?: () => void;
}) {
  return (
    <article className="w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <div className="text-base py-[18px] px-3 m-auto md:px-5">
        <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-col flex-grow">
                <div className="min-h-[20px] flex w-full flex-col items-end gap-2 whitespace-pre-wrap break-words">
                  <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
                    <div className="max-w-[70%] px-5 py-2.5">
                      <div className="border rounded-lg bg-dark-gray-5 px-2 py-3 border-dark-gray-1 relative">
                        {message}
                        {pending && (
                          <div className="absolute bottom-1 right-1 flex space-x-1">
                            <div className="dot dot1"></div>
                            <div className="dot dot2"></div>
                            <div className="dot dot3"></div>
                          </div>
                        )}
                        {errorFetching && <ErrorWhileFetching />}
                        {errorRetry && onRetry && (
                          <RetryRequest onRetry={onRetry} />
                        )}
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

function IoInformationCircle(props: { className: any }) {
  return (
    <svg
      fill="#000000"
      width="12px"
      height="12px"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm64,226H200V332h44V244H212V212h64V332h44Z" />
    </svg>
  );
}

function RetryIcon(props: { className: any; color: string }) {
  return (
    <svg
      width="12px"
      height="12px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={props.color}
        d="M14.9547098,7.98576084 L15.0711,7.99552 C15.6179,8.07328 15.9981,8.57957 15.9204,9.12636 C15.6826,10.7983 14.9218,12.3522 13.747,13.5654 C12.5721,14.7785 11.0435,15.5888 9.37999,15.8801 C7.7165,16.1714 6.00349,15.9288 4.48631,15.187 C3.77335,14.8385 3.12082,14.3881 2.5472,13.8537 L1.70711,14.6938 C1.07714,15.3238 3.55271368e-15,14.8776 3.55271368e-15,13.9867 L3.55271368e-15,9.99998 L3.98673,9.99998 C4.87763,9.99998 5.3238,11.0771 4.69383,11.7071 L3.9626,12.4383 C4.38006,12.8181 4.85153,13.1394 5.36475,13.3903 C6.50264,13.9466 7.78739,14.1285 9.03501,13.9101 C10.2826,13.6916 11.4291,13.0839 12.3102,12.174 C13.1914,11.2641 13.762,10.0988 13.9403,8.84476 C14.0181,8.29798 14.5244,7.91776 15.0711,7.99552 L14.9547098,7.98576084 Z M11.5137,0.812976 C12.2279,1.16215 12.8814,1.61349 13.4558,2.14905 L14.2929,1.31193 C14.9229,0.681961 16,1.12813 16,2.01904 L16,6.00001 L12.019,6.00001 C11.1281,6.00001 10.6819,4.92287 11.3119,4.29291 L12.0404,3.56441 C11.6222,3.18346 11.1497,2.86125 10.6353,2.60973 C9.49736,2.05342 8.21261,1.87146 6.96499,2.08994 C5.71737,2.30841 4.57089,2.91611 3.68976,3.82599 C2.80862,4.73586 2.23802,5.90125 2.05969,7.15524 C1.98193,7.70202 1.47564,8.08224 0.928858,8.00448 C0.382075,7.92672 0.00185585,7.42043 0.0796146,6.87364 C0.31739,5.20166 1.07818,3.64782 2.25303,2.43465 C3.42788,1.22148 4.95652,0.411217 6.62001,0.119916 C8.2835,-0.171384 9.99651,0.0712178 11.5137,0.812976 Z"
      />
    </svg>
  );
}

function ErrorWhileFetching() {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div
      className="absolute -bottom-1 -right-1.5 w-4 h-4 z-50 bg-red-500 rounded-full flex items-center justify-center cursor-pointer group"
      onClick={handleReload}
    >
      <IoInformationCircle className="text-white w-4 h-4" />
      <div className="absolute bottom-full z-50 hidden group-hover:block bg-gray-800 text-white text-xs rounded whitespace-nowrap">
        An Error occur please, click to reload the page!
      </div>
    </div>
  );
}

function RetryRequest({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="absolute -bottom-1 -right-1.5 w-4 h-4 z-50 rounded-full flex items-center justify-center cursor-pointer group"
      onClick={onRetry}
    >
      <RetryIcon className="w-4 h-4" color="#842d2d" />
      <div className="absolute bottom-full z-50 hidden group-hover:block bg-gray-800 text-white text-xs rounded whitespace-nowrap px-2 py-1">
        Click to retry
      </div>
    </div>
  );
}
