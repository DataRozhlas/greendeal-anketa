import { useLayoutEffect, useRef, useState } from "react";

export function useClampedText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useLayoutEffect(() => {
    function checkClamp() {
      if (ref.current) {
        setIsClamped(ref.current.scrollHeight > ref.current.clientHeight);
      }
    }

    checkClamp(); // Check clamp initially

    window.addEventListener("resize", checkClamp); // Check clamp on window resize

    return () => {
      window.removeEventListener("resize", checkClamp); // Clean up event listener
    };
  }, []);

  return [ref, isClamped] as const;
}
