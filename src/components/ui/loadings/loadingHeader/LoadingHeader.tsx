import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingHeader() {
    return (
        <div className="flex justify-between px-6 pb-6 border-b">
            <div className="w-full">
                <Skeleton width="250px" height="43px" />
            </div>
            <div className="text-right w-full">
                <Skeleton width="250px" height="43px" />
            </div>
        </div>
    );
}
