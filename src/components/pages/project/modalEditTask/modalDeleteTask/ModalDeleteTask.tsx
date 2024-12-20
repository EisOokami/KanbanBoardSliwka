import { Dispatch, memo, SetStateAction, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import useClickEscape from "../../../../../hooks/UseClickEscape";
import useClickOutside from "../../../../../hooks/UseClickOutside";
import { v4 as uuidv4 } from "uuid";
import { IoWarningOutline } from "react-icons/io5";
import { ITask } from "../../../../../interfaces/modalEditTask/interface";

interface ModalDeleteTaskProps {
    openModalDeleteTask: string | number | null;
    setOpenModalDeleteTask: Dispatch<SetStateAction<string | number | null>>;
    setOpenModalEditTask: Dispatch<SetStateAction<string | null>>;
    setUpdateColumns: Dispatch<SetStateAction<string | null>>;
}

const animationSettings = {
    initial: {
        opacity: 0,
        scale: 0.75,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeOut",
            duration: 0.15,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.75,
        transition: {
            ease: "easeIn",
            duration: 0.15,
        },
    },
};

const ModalDeleteTask = memo(function ModalDeleteTask({
    openModalDeleteTask,
    setOpenModalDeleteTask,
    setOpenModalEditTask,
    setUpdateColumns,
}: ModalDeleteTaskProps) {
    const modalContainerRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalContainerRef, () => setOpenModalDeleteTask(null));
    useClickEscape(modalContainerRef, () => setOpenModalDeleteTask(null));

    const handleOpenModalDeleteTask = useCallback(
        (arg: string | number | null) => {
            setOpenModalDeleteTask(arg);
        },
        [setOpenModalDeleteTask],
    );

    const handleDeleteTask = useCallback(() => {
        const tasksData = localStorage.getItem("tasks");

        if (typeof tasksData === "string") {
            const tasks: ITask[] = JSON.parse(tasksData);
            const updatedTasks = tasks.filter(
                (task) => task.id !== openModalDeleteTask,
            );

            setOpenModalEditTask(null);
            setOpenModalDeleteTask(null);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setUpdateColumns(uuidv4());
        }
    }, [
        openModalDeleteTask,
        setOpenModalDeleteTask,
        setOpenModalEditTask,
        setUpdateColumns,
    ]);

    return (
        <div className="absolute grid place-items-center w-svw h-svh bg-black/50 z-[52]">
            <motion.section
                variants={animationSettings}
                initial="initial"
                animate="animate"
                exit="exit"
                className="modal-delete-task grid w-full max-w-[500px] bg-white rounded-lg"
                ref={modalContainerRef}
            >
                <div className="flex justify-center p-6 bg-red-500 rounded-t-md">
                    <IoWarningOutline className="text-white text-6xl" />
                </div>
                <div className="grid justify-items-center gap-3 p-6">
                    <h2 className="text-2xl font-bold">Are you sure?</h2>
                    <p className="text-center text-gray-600">
                        This task will be permanently deleted and cannot be
                        recovered. Please confirm your decision.
                    </p>
                    <div className="grid gap-2 w-full">
                        <button
                            className="w-full px-4 py-2 text-white bg-red-500 hover:bg-red-400 rounded-md transition"
                            onClick={handleDeleteTask}
                        >
                            Delete task
                        </button>
                        <button
                            className="w-full px-4 py-2 hover:bg-gray-100 border rounded-md transition"
                            onClick={() => handleOpenModalDeleteTask(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.section>
        </div>
    );
});

export default ModalDeleteTask;
