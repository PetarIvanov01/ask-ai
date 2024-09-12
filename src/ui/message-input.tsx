"use client";
import { KeyboardEvent, useEffect, useRef } from "react";

import { useMessage } from "@/context/MessageContext";

const MAX_HEIGHT = 208;
const MAX_CHARACTERS_BEFORE_EXPAND = 205;
export default function MessageInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { handleMessage } = useMessage(); // Access the setMessage function from context

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const minHeight = textarea.scrollHeight;

    const handleInput = () => {
      if (minHeight > textarea.scrollHeight) {
        return;
      }

      if (textarea.textLength < MAX_CHARACTERS_BEFORE_EXPAND) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      const currentHeight = `${Math.min(textarea.scrollHeight, MAX_HEIGHT)}px`;

      textarea.style.height = currentHeight;

      if (textarea.scrollHeight > MAX_HEIGHT) {
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.overflowY = "hidden";
      }
    };

    textarea.addEventListener("input", handleInput);

    return () => {
      textarea.removeEventListener("input", handleInput);
    };
  }, []);

  const invokeAction = async (message: string | undefined) => {
    if (message) {
      handleMessage(message);
      //invoke
      if (textareaRef.current) {
        textareaRef.current.value = "";
      }
    }
  };

  const enterSubmit = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await invokeAction(textareaRef.current?.value);
    }
  };

  return (
    <article className="w-full max-h-[600px] min-h-24 flex items-end">
      <form className="w-full">
        <div className="relative flex h-full max-w-full flex-1 flex-col">
          <div className="flex w-full flex-col gap-1.5 rounded-md p-1.5 transition-colors bg-dark-gray-1">
            <div className="flex items-end gap-1.5">
              <div className="flex min-w-0 flex-1 flex-col">
                <textarea
                  onKeyDown={enterSubmit}
                  ref={textareaRef}
                  tabIndex={0}
                  dir="auto"
                  rows={1}
                  placeholder="Placeholder message to invite the user to write his response"
                  className="border-gray-600 py-1 px-2 bg-dark-gray-1 outline-none rounded-md h-full w-full flex items-center resize-none focus:border max-h-52"
                  style={{ height: "60px", overflow: "hidden" }}
                ></textarea>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  invokeAction(textareaRef.current?.value);
                }}
                className="mb-3 me-1 flex h-8 w-8 items-center justify-center rounded-full  hover:opacity-70 focus-visible:outline-none bg-white "
              >
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
      </form>
    </article>
  );
}
