import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSidebar() {
    return (
        <div className="grid p-5 border-r">
            <div className="h-full">
                <Skeleton width="65px" height="60%" />
            </div>
            <div className="self-end">
                <Skeleton width="65px" height="70px" />
            </div>
        </div>
    );
}
