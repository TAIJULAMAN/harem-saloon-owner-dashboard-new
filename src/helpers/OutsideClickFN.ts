import { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  cb: () => void,
  enabled: boolean,
): void {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, cb, enabled]);
}
