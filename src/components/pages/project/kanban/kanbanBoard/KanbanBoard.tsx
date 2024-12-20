import { Dispatch, SetStateAction, useState, useEffect, memo } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { fetchColumns } from "../../../../../services/firebaseDatabase";
import { IColumns, ITask } from "../../../../../interfaces/kanban/interface";

import Column from "../column/Column";
import LoadingKanbanBoard from "../../../../ui/loadings/loadingKanbanBoard/LoadingKanbanBoard";

interface KanbanBoardProps {
    setOpenModalNewTask: Dispatch<SetStateAction<string | null>>;
    setOpenModalEditTask: Dispatch<SetStateAction<string | null>>;
    updateColumns: string | null;
}

const KanbanBoard = memo(function KanbanBoard({
    setOpenModalNewTask,
    setOpenModalEditTask,
    updateColumns,
}: KanbanBoardProps) {
    const [columns, setColumns] = useState<IColumns>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchColumns(setColumns, setIsLoading);
    }, [updateColumns]);

    const onDragEnd = (
        result: DropResult,
        columns: IColumns,
        setColumns: React.Dispatch<React.SetStateAction<IColumns>>,
    ) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });

            const tasksData = localStorage.getItem("tasks");

            if (typeof tasksData === "string" && !removed.readonly) {
                const tasks: ITask[] = JSON.parse(tasksData);
                const filteredTasks = tasks.map((task) => {
                    if (task.id === removed.id) {
                        task.status = destination.droppableId;
                        task.columnIndex = destination.index;
                    }

                    return task;
                });

                localStorage.setItem("tasks", JSON.stringify(filteredTasks));
            }
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);

            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });

            const tasksData = localStorage.getItem("tasks");

            if (typeof tasksData === "string" && !removed.readonly) {
                const tasks: ITask[] = JSON.parse(tasksData);
                const filteredTasks = tasks.map((task) => {
                    if (task.id === removed.id) {
                        task.columnIndex = destination.index;
                    }

                    return task;
                });

                localStorage.setItem("tasks", JSON.stringify(filteredTasks));
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingKanbanBoard />
            ) : (
                <section className="kanban-board relative grid grid-cols-4 gap-5 px-6 overflow-y-auto custom-scrollbar">
                    <DragDropContext
                        onDragEnd={(result) =>
                            onDragEnd(result, columns, setColumns)
                        }
                    >
                        {Object.entries(columns).map(([columnId, column]) => {
                            return (
                                <Column
                                    key={columnId}
                                    columnId={columnId.toString()}
                                    column={column}
                                    setOpenModalNewTask={setOpenModalNewTask}
                                    setOpenModalEditTask={setOpenModalEditTask}
                                />
                            );
                        })}
                    </DragDropContext>
                </section>
            )}
        </>
    );
});

export default KanbanBoard;
