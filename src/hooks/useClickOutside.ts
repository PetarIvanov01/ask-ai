import React, { useEffect } from "react";

function useClickOutside<T extends HTMLElement>(
  onClickOutside: () => void,
  numberOfRefs = 2
): React.RefObject<T>[] {
  const refs = Array.from({ length: numberOfRefs }, () => React.createRef<T>());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as Node;

      const isClickOutsideAllRefs = refs.every(
        (ref) => ref.current && !ref.current.contains(clickedElement)
      );

      if (isClickOutsideAllRefs) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, refs]);

  return refs;
}

export default useClickOutside;
