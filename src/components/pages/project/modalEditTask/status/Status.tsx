import { memo } from "react";
import { checkTaskProps } from "../../../../../script/memo";
import { FiInfo } from "react-icons/fi";
import { IInitialValues } from "../../../../../interfaces/modalEditTask/interface";

interface StatusProps {
    values: IInitialValues;
}

const Status = memo(
    function Status({ values }: StatusProps) {
        return (
            <div className="flex items-center gap-[3.1rem]">
                <div className="flex items-center gap-1">
                    <FiInfo />
                    <p>Status</p>
                </div>
                <span>{values.status}</span>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return checkTaskProps(prevProps.values, nextProps.values);
    },
);

export default Status;
