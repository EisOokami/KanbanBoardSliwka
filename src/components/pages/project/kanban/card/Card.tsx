import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { checkTaskProps } from "../../../../../script/memo";
import { BsListCheck } from "react-icons/bs";
import { MdOutlineComment, MdGroup } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import { ITask } from "../../../../../interfaces/kanban/interface";

interface CardProps {
    item: ITask;
    index: number;
    setOpenModalEditTask: Dispatch<SetStateAction<string | null>>;
}

const initialColorOfPriority = {
    Critical: { text: "text-red-700", bg: "bg-red-100" },
    High: { text: "text-orange-700", bg: "bg-orange-100" },
    Medium: { text: "text-yellow-700", bg: "bg-yellow-100" },
    Low: { text: "text-green-700", bg: "bg-green-100" },
} as const;

const initialColorOfCategory = {
    Development: { text: "text-blue-700", bg: "bg-blue-100" },
    Design: { text: "text-purple-700", bg: "bg-purple-100" },
    "UX stages": { text: "text-indigo-700", bg: "bg-indigo-100" },
    Testing: { text: "text-teal-700", bg: "bg-teal-100" },
} as const;

const Card = memo(
    function Card({ item, index, setOpenModalEditTask }: CardProps) {
        const handleOpenModalEditTask = useCallback(() => {
            setOpenModalEditTask(item.id.toString());
        }, [setOpenModalEditTask, item.id]);

        const styleBgPriority =
            initialColorOfPriority[
                item.priority as keyof typeof initialColorOfPriority
            ].bg;
        const styleTextPriority =
            initialColorOfPriority[
                item.priority as keyof typeof initialColorOfPriority
            ].text;
        const styleBgCategory =
            initialColorOfCategory[
                item.category as keyof typeof initialColorOfCategory
            ].bg;
        const styleTextCategory =
            initialColorOfCategory[
                item.category as keyof typeof initialColorOfCategory
            ].text;

        return (
            <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
            >
                {(provided) => (
                    <div
                        className="card h-min bg-white border rounded-md overflow-hidden"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={handleOpenModalEditTask}
                    >
                        <div className="p-3 lg:p-4">
                            <div className="grid place-items-start xl:flex xl:items-center gap-1">
                                <div
                                    className={`px-3 py-1 rounded-full ${styleBgPriority}`}
                                >
                                    <p
                                        className={`text-xs lg:text-sm font-medium ${styleTextPriority}`}
                                    >
                                        {item.priority}
                                    </p>
                                </div>
                                <div
                                    className={`px-3 py-1 rounded-full ${styleBgCategory}`}
                                >
                                    <p
                                        className={`text-xs lg:text-sm font-medium ${styleTextCategory}`}
                                    >
                                        {item.category}
                                    </p>
                                </div>
                            </div>
                            <div className="my-3">
                                <h6 className="text-sm lg:text-base mb-2 font-medium break-all">
                                    {item.title}
                                </h6>
                                <p className="text-xs text-gray-500 break-all">
                                    {item.descr}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 lg:gap-2 w-min px-1 lg:px-2 py-0.5 lg:py-1 text-gray-500 border rounded-md">
                                <BsListCheck className="text-lg lg:text-xl" />
                                <p className="mb-[1px] lg:mb-[3px] text-sm lg:text-base">
                                    {item.complitiedSubtasks}/
                                    {item.totalSubtasks}
                                </p>
                            </div>
                        </div>
                        <div className="grid lg:flex lg:justify-between p-3 lg:p-4 border-t">
                            <div className="flex items-center lg:gap-1">
                                <MdGroup className="lg:text-xl xl:text-2xl text-gray-500" />
                                <div className="flex -space-x-3">
                                    {item.assignees
                                        .slice(0, 4)
                                        .map((assignee, i) => (
                                            <div
                                                key={i}
                                                className="w-5 lg:w-6 xl:w-7"
                                            >
                                                <img
                                                    className="border-2 border-white rounded-full cursor-not-allowed"
                                                    src={assignee.avatar}
                                                    alt={`assignee${i}`}
                                                />
                                            </div>
                                        ))}
                                    {item.assignees.length - 4 > 0 && (
                                        <div className="flex items-center justify-center w-5 lg:w-6 xl:w-7 h-5 lg:h-6 xl:h-7 text-xs lg:text-sm xl:text-base text-gray-600 bg-gray-200 border-4 rounded-full cursor-not-allowed">
                                            +{item.assignees.length - 4}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-1 lg:gap-2 text-gray-500">
                                <span className="flex gap-0.5 items-center text-sm lg:text-base">
                                    <MdOutlineComment />
                                    {item.totalComments}
                                </span>
                                <span className="flex gap-0.5 items-center text-sm lg:text-base">
                                    <GoPaperclip />
                                    {item.totalFiles}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    },
    (prevProps, nextProps) => {
        return checkTaskProps(prevProps.item, nextProps.item);
    },
);

export default Card;
