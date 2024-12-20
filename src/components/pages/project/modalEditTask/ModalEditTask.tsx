import {
    Dispatch,
    SetStateAction,
    useState,
    useEffect,
    useRef,
    memo,
    useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form } from "formik";
import {
    fetchCategoryTask,
    fetchTask,
} from "../../../../services/firebaseDatabase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { v4 as uuidv4 } from "uuid";
import useClickEscape from "../../../../hooks/UseClickEscape";
import { ITask } from "../../../../interfaces/modalEditTask/interface";

import Title from "./title/Title";
import Assignees from "./assignees/Assignees";
import DateTime from "./dateTime/DateTime";
import Status from "./status/Status";
import Category from "./category/Category";
import CreatedBy from "./createdBy/CreatedBy";
import Attachment from "./attachment/Attachment";
import Description from "./description/Description";
import Comments from "./comments/Comments";
import Subtasks from "./subtasks/Subtasks";
import Priority from "./priority/Priority";
import ModalDeleteTask from "./modalDeleteTask/ModalDeleteTask";

interface ModalEditTaskProps {
    openModalEditTask: string | null;
    setOpenModalEditTask: Dispatch<SetStateAction<string | null>>;
    setUpdateColumns: Dispatch<SetStateAction<string | null>>;
}

const animationSettings = {
    initial: {
        width: 0,
    },
    animate: {
        width: 500,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        width: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const animationActionButtonsSettings = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: { opacity: 0, y: 20 },
};

const ModalEditTask = memo(function ModalEditTask({
    openModalEditTask,
    setOpenModalEditTask,
    setUpdateColumns,
}: ModalEditTaskProps) {
    const [task, setTask] = useState<ITask>();
    const [activeTab, setActiveTab] = useState<string>("description");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categoryTask, setCategoryTask] = useState<string[]>([]);
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(true);
    const [updateTask, setUpdateTask] = useState<string | null>(null);
    const [openModalDeleteTask, setOpenModalDeleteTask] = useState<
        string | number | null
    >(null);
    const modalContainerRef = useRef<HTMLFormElement | null>(null);

    useClickEscape(modalContainerRef, () => setOpenModalEditTask(null));

    useEffect(() => {
        fetchTask(setTask, setIsLoading, openModalEditTask);
        fetchCategoryTask(setCategoryTask, setIsLoadingCategory);
    }, [openModalEditTask, updateTask]);

    const handleOpenModalEditTask = useCallback(
        () => setOpenModalEditTask(null),
        [setOpenModalEditTask],
    );

    const styleActiveTabDescription =
        activeTab === "description"
            ? "modal-edit-task__items modal-edit-task__items--active"
            : "modal-edit-task__items";
    const styleActiveTabComments =
        activeTab === "comments"
            ? "modal-edit-task__items modal-edit-task__items--active"
            : "modal-edit-task__items";
    const styleActiveTabSubtasks =
        activeTab === "subtasks"
            ? "modal-edit-task__items modal-edit-task__items--active"
            : "modal-edit-task__items";

    return (
        <>
            <div
                className="fixed top-0 left-0 grid place-content-end w-full h-full bg-black/10 z-50"
                onClick={handleOpenModalEditTask}
            ></div>
            {isLoading ? (
                <motion.div
                    className="absolute top-0 right-0 p-2 w-[500px] h-svh overflow-hidden"
                    variants={animationSettings}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <Skeleton width="100%" height="100%" />
                </motion.div>
            ) : (
                task && (
                    <motion.section
                        className="modal-edit-task absolute top-0 right-0 p-2 h-svh overflow-hidden z-[51]"
                        variants={animationSettings}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <Formik
                            initialValues={{
                                totalComments: task.totalComments,
                                complitiedSubtasks: task.complitiedSubtasks,
                                createdBy: task.createdBy,
                                descr: task.descr,
                                dueDate: task.dueDate,
                                time: task.time,
                                totalFiles: task.totalFiles,
                                id: task.id,
                                assignees: task.assignees,
                                priority: task.priority,
                                status: task.status,
                                subtasks: task.subtasks,
                                taskComments: task.taskComments,
                                title: task.title,
                                totalSubtasks: task.totalSubtasks,
                                category: task.category,
                                readonly: task.readonly,
                                columnIndex: task.columnIndex,
                            }}
                            enableReinitialize={true}
                            onSubmit={(values) => {
                                // console.log(values);

                                const tasksData = localStorage.getItem("tasks");

                                if (typeof tasksData === "string") {
                                    const tasks = JSON.parse(tasksData);

                                    const editedTasks = tasks.map(
                                        (item: ITask) => {
                                            if (item.id === values.id) {
                                                return values;
                                            }

                                            return item;
                                        },
                                    );

                                    localStorage.setItem(
                                        "tasks",
                                        JSON.stringify(editedTasks),
                                    );

                                    setUpdateColumns(uuidv4());
                                    setOpenModalEditTask(null);
                                } else {
                                    return;
                                }
                            }}
                        >
                            {({ setFieldValue, values, isValid, dirty }) => (
                                <Form
                                    className="relative grid h-full bg-white border rounded-md"
                                    ref={modalContainerRef}
                                >
                                    <div className="grid content-start gap-5 h-full p-5 overflow-x-hidden overflow-y-auto custom-scrollbar">
                                        <div className="grid gap-2">
                                            <Title
                                                task={task}
                                                values={values}
                                                setOpenModalEditTask={
                                                    setOpenModalEditTask
                                                }
                                                setOpenModalDeleteTask={
                                                    setOpenModalDeleteTask
                                                }
                                            />
                                            <Priority
                                                task={task}
                                                values={values}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Assignees
                                                task={task}
                                                setFieldValue={setFieldValue}
                                            />
                                            <DateTime
                                                task={task}
                                                values={values}
                                                setFieldValue={setFieldValue}
                                            />
                                            <Status values={values} />
                                            <Category
                                                task={task}
                                                values={values}
                                                categoryTask={categoryTask}
                                                isLoadingCategory={
                                                    isLoadingCategory
                                                }
                                            />
                                            <CreatedBy task={task} />
                                        </div>
                                        <Attachment />
                                        <div className="grid mb-2">
                                            <ul className="flex border-b">
                                                <li
                                                    className={
                                                        styleActiveTabDescription
                                                    }
                                                    onClick={() =>
                                                        setActiveTab(
                                                            "description",
                                                        )
                                                    }
                                                >
                                                    Description
                                                </li>
                                                <li
                                                    className={
                                                        styleActiveTabComments
                                                    }
                                                    onClick={() =>
                                                        setActiveTab("comments")
                                                    }
                                                >
                                                    Comments
                                                </li>
                                                <li
                                                    className={
                                                        styleActiveTabSubtasks
                                                    }
                                                    onClick={() =>
                                                        setActiveTab("subtasks")
                                                    }
                                                >
                                                    Subtasks
                                                </li>
                                            </ul>
                                            {activeTab === "description" && (
                                                <Description task={task} />
                                            )}
                                            {activeTab === "comments" && (
                                                <Comments
                                                    task={task}
                                                    setUpdateTask={
                                                        setUpdateTask
                                                    }
                                                    setUpdateColumns={
                                                        setUpdateColumns
                                                    }
                                                />
                                            )}
                                            {activeTab === "subtasks" && (
                                                <Subtasks
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                    values={values}
                                                    task={task}
                                                    isValid={isValid}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {!task.readonly && (
                                        <AnimatePresence>
                                            {dirty && (
                                                <motion.div
                                                    className="self-end flex justify-end h-min gap-2 p-4 border-t rounded-ee-md"
                                                    variants={
                                                        animationActionButtonsSettings
                                                    }
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                >
                                                    <button
                                                        type="reset"
                                                        className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg focus:outline-none transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="flex items-center gap-2 px-3 py-2 text-white bg-bright-blue hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg focus:outline-none transition"
                                                    >
                                                        Save Task
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </motion.section>
                )
            )}
            <AnimatePresence>
                {openModalDeleteTask && (
                    <ModalDeleteTask
                        openModalDeleteTask={openModalDeleteTask}
                        setOpenModalDeleteTask={setOpenModalDeleteTask}
                        setOpenModalEditTask={setOpenModalEditTask}
                        setUpdateColumns={setUpdateColumns}
                    />
                )}
            </AnimatePresence>
        </>
    );
});

export default ModalEditTask;
