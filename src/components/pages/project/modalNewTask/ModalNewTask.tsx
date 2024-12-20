import {
    Dispatch,
    memo,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchCategoryTask } from "../../../../services/firebaseDatabase";
import useClickEscape from "../../../../hooks/UseClickEscape";
import { IoClose } from "react-icons/io5";
import {
    ISubtasks,
    IMembers,
} from "../../../../interfaces/modalNewTask/interface";

import UploadFile from "./uploadFile/UploadFile";
import Title from "./title/Title";
import Category from "./category/Category";
import DateTime from "./dateTime/DateTime";
import Members from "./members/Members";
import Subtasks from "./subtasks/Subtasks";
import Description from "./description/Description";
import Priority from "./priority/Priority";

interface ModalNewTaskProps {
    openModalNewTask: string;
    setOpenModalNewTask: Dispatch<SetStateAction<string | null>>;
    setUpdateColumns: Dispatch<SetStateAction<string | null>>;
}

const validationSchema = Yup.object().shape({
    titleTask: Yup.string().required("Title is required"),
    priorityTask: Yup.string().required("Priority is required"),
    categoryTask: Yup.string().required("Category is required"),
    membersTask: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number(),
                avatar: Yup.string(),
                email: Yup.string(),
                name: Yup.string(),
                surname: Yup.string(),
            }),
        )
        .min(1, "At least one member is required"),
    descrTask: Yup.string().required("Description is required"),
    dueDate: Yup.string().required("Due date is required"),
    time: Yup.string().required("Time is required"),
    subtasks: Yup.array()
        .of(
            Yup.object().shape({
                description: Yup.string().required(
                    "Subtask description is required",
                ),
                checked: Yup.number(),
            }),
        )
        .min(1, "At least one subtask is required")
        .test(
            "unique-subtasks",
            "Subtask descriptions must be unique",
            (subtasks) => {
                if (!subtasks || subtasks.length === 0) return true;

                const descriptions = subtasks
                    .map(
                        (task) => task?.description?.trim().toLowerCase() || "",
                    )
                    .filter((desc) => desc !== "");

                const uniqueDescriptions = new Set(descriptions);
                return descriptions.length === uniqueDescriptions.size;
            },
        )
        .required("Subtask(s) is required"),
});

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

const ModalNewTask = memo(function ModalNewTask({
    openModalNewTask,
    setOpenModalNewTask,
    setUpdateColumns,
}: ModalNewTaskProps) {
    const [categoryTask, setCategoryTask] = useState<string[]>([]);
    const [subtasks, setSubtasks] = useState<ISubtasks[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<IMembers[]>([]);
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(true);
    const modalContainerRef = useRef<HTMLFormElement | null>(null);

    useClickEscape(modalContainerRef, () => setOpenModalNewTask(null));

    useEffect(() => {
        fetchCategoryTask(setCategoryTask, setIsLoadingCategory);
    }, []);

    const handleOpenModalTask = useCallback(
        (arg: string | null) => setOpenModalNewTask(arg),
        [setOpenModalNewTask],
    );

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => handleOpenModalTask(null)}
        >
            <motion.section
                variants={animationSettings}
                initial="initial"
                animate="animate"
                exit="exit"
                className="modal-new-task relative w-full max-w-[960px] mx-5 bg-white rounded-lg shadow-lg z-[51]"
                onClick={(e) => e.stopPropagation()}
            >
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        titleTask: "",
                        priorityTask: "",
                        categoryTask: "",
                        dueDate: "",
                        time: "",
                        membersTask: [] as IMembers[],
                        descrTask: "",
                        fileTask: null as FileList | null,
                        subtasks: [] as ISubtasks[],
                    }}
                    onSubmit={(values) => {
                        const memberIndices = selectedMembers.map(
                            (member) => member.id,
                        );
                        const tasksData = localStorage.getItem("tasks");
                        const category = values.categoryTask.replace(/-/g, " ");
                        const newValues = {
                            totalComments: 0,
                            complitiedSubtasks: 0,
                            createdBy: "Guest",
                            descr: values.descrTask,
                            dueDate: values.dueDate,
                            time: values.time,
                            totalFiles: 0,
                            id: uuidv4(),
                            assignees: memberIndices,
                            priority: values.priorityTask,
                            status: openModalNewTask,
                            subtasks: values.subtasks,
                            taskComments: [],
                            title: values.titleTask,
                            totalSubtasks: values.subtasks.length,
                            category,
                            readonly: 0,
                            columnIndex: 1,
                        };

                        if (typeof tasksData === "string") {
                            const tasks = JSON.parse(tasksData);

                            localStorage.setItem(
                                "tasks",
                                JSON.stringify([...tasks, newValues]),
                            );
                        } else {
                            localStorage.setItem(
                                "tasks",
                                JSON.stringify([newValues]),
                            );
                        }

                        setOpenModalNewTask(null);
                        setUpdateColumns(uuidv4());
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form
                            className="flex max-h-[90vh] overflow-y-auto custom-scrollbar"
                            ref={modalContainerRef}
                        >
                            <UploadFile values={values} />
                            <div className="grid content-start gap-3 w-full h-full p-6 border-l-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold">
                                        Add New Task
                                    </h3>
                                    <IoClose
                                        className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
                                        onClick={() =>
                                            handleOpenModalTask(null)
                                        }
                                    />
                                </div>
                                <Title />
                                <Priority />
                                <div className="flex gap-3">
                                    {isLoadingCategory ? (
                                        <div className="w-full h-full">
                                            <Skeleton
                                                width="100%"
                                                height={32}
                                            />
                                        </div>
                                    ) : (
                                        <Category categoryTask={categoryTask} />
                                    )}
                                </div>
                                <DateTime setFieldValue={setFieldValue} />
                                <Members
                                    selectedMembers={selectedMembers}
                                    setSelectedMembers={setSelectedMembers}
                                    setFieldValue={setFieldValue}
                                />
                                <Subtasks
                                    subtasks={subtasks}
                                    setSubtasks={setSubtasks}
                                    setFieldValue={setFieldValue}
                                />
                                <Description />
                                <button
                                    type="submit"
                                    className="justify-self-end px-4 py-2.5 text-sm text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg focus:outline-none transition"
                                >
                                    Create
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </motion.section>
        </div>
    );
});

export default ModalNewTask;
