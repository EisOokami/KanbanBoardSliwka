import { memo } from "react";
import { checkTaskProps } from "../../../../../script/memo";
import { IoMdPerson } from "react-icons/io";
import { ITask } from "../../../../../interfaces/modalEditTask/interface";

interface CreatedByProps {
    task: ITask;
}

const CreatedBy = memo(
    function CreatedBy({ task }: CreatedByProps) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <IoMdPerson />
                    <p>Created by</p>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full">
                    <img
                        src={
                            task.createdBy === "Lakio Live"
                                ? "images/generallogo.png"
                                : "images/generallogowhite.png"
                        }
                        alt="profile2"
                        className="w-8 p-1 rounded-full"
                    />
                    <span className="pr-2">{task.createdBy}</span>
                </div>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return checkTaskProps(prevProps.task, nextProps.task);
    },
);

export default CreatedBy;
