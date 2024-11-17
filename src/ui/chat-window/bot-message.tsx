import { memo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import Image from "next/image";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function BotMessage({
  message,
  isInitial,
  isUserScrollingRef,
}: {
  isUserScrollingRef: { current: boolean };
  message: string;
  isInitial?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasBlink, setBlink] = useState(false);
  const codeBlockIndices = useRef({
    start: -1,
    end: -1,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInitial) {
      setDisplayedText(message);
      return;
    }

    const codeBlockRegex = /```[a-z]*\n([\s\S]*?)```/gm;
    const match = codeBlockRegex.exec(message);

    if (match) {
      const startIndex = match.index;
      const endIndex = match.index + match[0].length;
      codeBlockIndices.current = { start: startIndex, end: endIndex };
    } else {
      codeBlockIndices.current = { start: -1, end: -1 };
    }

    let i = -1;
    setBlink(true);

    const interval = setInterval(() => {
      if (i >= message.length) {
        setBlink(false);
        clearInterval(interval);
        return;
      }

      if (
        codeBlockIndices.current.start <= i &&
        codeBlockIndices.current.end > i
      ) {
        setBlink(false);
      } else {
        setBlink(true);
      }

      setDisplayedText((prev) => prev + message.charAt(i) || "");
      i++;

      if (!isUserScrollingRef.current && scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [message, isInitial, isUserScrollingRef]);

  const displayedTextWithBlink = hasBlink
    ? displayedText + "<span className='blink'>|</span>"
    : displayedText;

  return (
    <article className="w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <div className="text-base py-[18px] px-3 m-auto md:px-5">
        <div className="mx-auto flex items-center flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="flex-shrink-0 flex flex-col relative self-start pt-2">
            <div className="pt-0">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                <div className="relative p-1 rounded-sm flex items-center justify-center">
                  <Image
                    src="/original-icon.png"
                    width={100}
                    height={65}
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <div className="text-writer">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className="text-gray-200 prose-li:text-base prose-strong:font-bold prose-headings:text-white prose-p:text-gray-200 prose-a:text-blue-300 prose-strong:text-white prose-code:text-gray-300 prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-th:text-gray-300 prose-td:text-gray-200 prose-blockquote:text-gray-400 prose-blockquote:border-gray-600 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs lg:prose-xl"
              >
                {displayedTextWithBlink}
              </ReactMarkdown>
              <div ref={scrollRef} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(BotMessage);
