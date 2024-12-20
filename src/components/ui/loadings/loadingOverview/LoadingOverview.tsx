import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingOverview() {
    return (
        <div className="flex justify-between items-end px-6 py-7">
            <div className="w-full">
                <Skeleton width="220px" height="100px" />
            </div>
            <div className="text-right w-full">
                <Skeleton width="200px" height="60px" />
            </div>
        </div>
    );
}
