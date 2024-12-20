import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { checkColumnProps } from "../../../../../script/memo";
import { FaCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { IColumnType } from "../../../../../interfaces/kanban/interface";

import Card from "../card/Card";

interface ColumnProps {
    columnId: string;
    column: IColumnType;
    setOpenModalNewTask: Dispatch<SetStateAction<string | null>>;
    setOpenModalEditTask: Dispatch<SetStateAction<string | null>>;
}

const initialColorOfCircle = {
    "To Do": "text-gray-400",
    "In Progress": "text-blue-400",
    "Need Review": "text-yellow-400",
    Done: "text-green-400",
} as const;

const Column = memo(
    function Column({
        columnId,
        column,
        setOpenModalNewTask,
        setOpenModalEditTask,
    }: ColumnProps) {
        const handleOpenModalNewTask = useCallback(() => {
            setOpenModalNewTask(column.title);
        }, [setOpenModalNewTask, column.title]);

        const styleColorCircle =
            initialColorOfCircle[
                column.title as keyof typeof initialColorOfCircle
            ];

        return (
            <div className="column px-3 py-6 bg-gray-100 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1">
                        <FaCircle
                            className={`w-2 mt-[2px] ${styleColorCircle}`}
                        />

                        <p className="text-xs lg:text-sm font-medium">
                            {column.title}
                        </p>
                        <span className="ml-1 px-2.5 lg:px-3.5 text-sm lg:text-base font-medium bg-white rounded-full">
                            {column.items.length}
                        </span>
                    </div>
                    <div className="grid justify-items-center lg:flex lg:items-center">
                        <div
                            className="p-1 lg:p-2 hover:bg-white rounded-full transition cursor-pointer"
                            onClick={handleOpenModalNewTask}
                        >
                            <FaPlus />
                        </div>
                        <div className="p-1 lg:p-2 hover:bg-white rounded-full transition">
                            <HiDotsVertical className="text-sm lg:text-base cursor-not-allowed" />
                        </div>
                    </div>
                </div>
                <Droppable key={columnId} droppableId={columnId}>
                    {(provided) => (
                        <div
                            className="grid content-start gap-5 h-[93%] mt-2"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {column.items.map((item, i) => (
                                <Card
                                    key={item.id}
                                    item={item}
                                    index={i}
                                    setOpenModalEditTask={setOpenModalEditTask}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.column.title === nextProps.column.title &&
            checkColumnProps(prevProps.column.items, nextProps.column.items)
        );
    },
);

export default Column;
