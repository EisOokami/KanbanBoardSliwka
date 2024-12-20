import { useEffect, RefObject } from "react";

export default function useClickEscape<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: (event: Event) => void,
) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handler(e);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [ref, handler]);
}
