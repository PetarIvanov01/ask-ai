import { useCallback, useMemo, useRef } from "react";

export default function useFocusMessage() {
  const focusRef = useRef<HTMLDivElement>(null);

  const onSubmitFocusMessage = useCallback(() => {
    if (focusRef.current) {
      focusRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  return useMemo(
    () => ({
      focusRef,
      onSubmitFocusMessage,
    }),
    [onSubmitFocusMessage]
  );
}
