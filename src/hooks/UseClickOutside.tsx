import { useEffect } from "react";

const useClickOutside = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void,
    exceptions?: React.RefObject<HTMLElement>[],
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isException =
                exceptions?.some(
                    (exception) =>
                        exception.current &&
                        exception.current.contains(event.target as Node),
                ) ?? false;

            if (
                ref.current &&
                !ref.current.contains(event.target as Node) &&
                !isException
            ) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback, exceptions]);
};

export default useClickOutside;
