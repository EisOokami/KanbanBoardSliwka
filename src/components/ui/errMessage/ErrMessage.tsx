import { memo } from "react";
import { MdErrorOutline } from "react-icons/md";

interface ErrMessageProps {
    msg: string;
}

const ErrMessage = memo(function ErrMessage({ msg }: ErrMessageProps) {
    return (
        <div className="flex items-center gap-1 text-red-500">
            <MdErrorOutline />
            <p>{msg}</p>
        </div>
    );
});

export default ErrMessage;
