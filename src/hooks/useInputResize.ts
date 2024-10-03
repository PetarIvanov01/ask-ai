import { useEffect, useRef } from "react";

const MAX_HEIGHT = 208;
const MAX_CHARACTERS_BEFORE_EXPAND = 205;

export default function useResizerInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  return {
    textareaRef,
  };
}
