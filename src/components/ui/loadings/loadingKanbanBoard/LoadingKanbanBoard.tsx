import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingKanbanBoard() {
    return (
        <div className="flex gap-5 w-full px-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full">
                    <Skeleton width="100%" height="100%" />
                </div>
            ))}
        </div>
    );
}
