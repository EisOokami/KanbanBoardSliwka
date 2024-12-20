import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    memo,
    SetStateAction,
    useCallback,
    useState,
} from "react";
import moment from "moment";
import { checkTaskProps } from "../../../../../script/memo";
import { Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { LuSendHorizonal, LuPencilLine } from "react-icons/lu";
import { MdErrorOutline, MdOutlineDone } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { ITask } from "../../../../../interfaces/modalEditTask/interface";

interface CommentsProps {
    task: ITask;
    setUpdateTask: Dispatch<SetStateAction<string | null>>;
    setUpdateColumns: Dispatch<SetStateAction<string | null>>;
}

const Comments = memo(
    function Comments({
        task,
        setUpdateTask,
        setUpdateColumns,
    }: CommentsProps) {
        const [commentValue, setCommentValue] = useState<string>("");
        const [sendErrorMsg, setSendErrorMsg] = useState<string | null>(null);
        const [isEditedComment, setIsEditedComment] = useState<number | null>(
            null,
        );
        const [isChangedComment, setIsChangedComment] = useState<number | null>(
            null,
        );
        const [editCommentValue, setEditCommentValue] = useState<string>("");
        const [editError, setEditError] = useState<number | null>(null);
        const [editErrorMsg, setEditErrorMsg] = useState<string | null>(null);

        const validateComment = useCallback(
            (comment: string): string | null => {
                if (!comment.trim())
                    return "Comment cannot be empty or just spaces.";
                if (comment.length < 3)
                    return "Comment must be at least 3 characters.";
                if (comment.length > 300)
                    return "Comment cannot exceed 300 characters.";
                return null;
            },
            [],
        );

        const handleSendComment = useCallback(() => {
            const validationError = validateComment(commentValue);

            if (validationError) {
                setSendErrorMsg(validationError);
                return;
            }

            setSendErrorMsg(null);

            const tasksData = localStorage.getItem("tasks");

            if (typeof tasksData === "string") {
                const parsedTasksData = JSON.parse(tasksData);
                const newTasksData: ITask[] = [];
                const newTaskComment = {
                    comment: commentValue,
                    date: moment().format("MMMM D, YYYY"),
                    name: "Guest",
                    img: "images/generallogowhite.png",
                };

                parsedTasksData.forEach((parsedTask: ITask) => {
                    if (parsedTask.id !== task.id) {
                        newTasksData.push(parsedTask);
                    } else {
                        parsedTask.taskComments.push(newTaskComment);
                        parsedTask.totalComments += 1;
                        newTasksData.push(parsedTask);
                    }
                });

                localStorage.setItem("tasks", JSON.stringify(newTasksData));
            }

            setUpdateTask(commentValue);
            setCommentValue("");
            setUpdateColumns(commentValue);
        }, [
            validateComment,
            commentValue,
            setUpdateColumns,
            setUpdateTask,
            task.id,
        ]);

        const onKeyDown = useCallback(
            (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendComment();
                }
            },
            [handleSendComment],
        );

        const handleDeleteComment = (id: string | number, index: number) => {
            const tasksData = localStorage.getItem("tasks");

            if (typeof tasksData === "string") {
                const parsedTasksData: ITask[] = JSON.parse(tasksData);
                const newTasksData: ITask[] = [];

                parsedTasksData.forEach((parsedTask: ITask) => {
                    if (parsedTask.id !== id) {
                        console.log("!==");
                        newTasksData.push(parsedTask);
                    } else {
                        parsedTask.taskComments.splice(index, 1);
                        parsedTask.totalComments -= 1;
                        newTasksData.push(parsedTask);
                    }
                });

                localStorage.setItem("tasks", JSON.stringify(newTasksData));
                setEditError(null);
                setUpdateTask(uuidv4());
                setUpdateColumns(uuidv4());
            }
        };

        const handleChangeEditedComment = (
            id: string | number,
            index: number,
        ) => {
            const tasksData = localStorage.getItem("tasks");

            if (typeof tasksData === "string") {
                const parsedTasksData: ITask[] = JSON.parse(tasksData);

                parsedTasksData.forEach((parsedTask: ITask) => {
                    if (parsedTask.id !== id) {
                        return;
                    }

                    console.log(index);

                    const initialComment =
                        parsedTask.taskComments[index].comment;

                    if (editCommentValue !== initialComment) {
                        setEditCommentValue(initialComment);
                    }

                    if (isEditedComment === index) {
                        setIsEditedComment(null);
                        return;
                    }

                    setIsEditedComment(index);
                });
            }
        };

        const handleEditComment = (
            id: string | number,
            index: number,
            value: string,
        ) => {
            const tasksData = localStorage.getItem("tasks");

            if (typeof tasksData === "string") {
                const parsedTasksData: ITask[] = JSON.parse(tasksData);

                parsedTasksData.forEach((parsedTask: ITask) => {
                    if (parsedTask.id !== id) {
                        return;
                    }

                    const initialComment =
                        parsedTask.taskComments[index].comment;

                    if (value === initialComment) {
                        setIsChangedComment(null);
                        setEditCommentValue(value);
                        return;
                    }

                    if (!value.length) {
                        setIsChangedComment(null);
                        setEditCommentValue(value);
                        return;
                    }

                    setIsChangedComment(index);
                    setEditCommentValue(value);
                });
            }
        };

        const handleCloseEditedComment = () => {
            setEditError(null);
            setIsEditedComment(null);
            setIsChangedComment(null);
        };

        const handleAddEditedComment = (index: number) => {
            const validationError = validateComment(editCommentValue);

            if (validationError) {
                setEditErrorMsg(validationError);
                setEditError(index);
                return;
            }

            setEditError(null);

            const tasksData = localStorage.getItem("tasks");

            if (typeof tasksData === "string") {
                const parsedTasksData: ITask[] = JSON.parse(tasksData);
                const newTasksData: ITask[] = [];

                parsedTasksData.forEach((parsedTask: ITask) => {
                    if (parsedTask.id !== task.id) {
                        newTasksData.push(parsedTask);
                    } else {
                        const updatedTaskComments = [
                            ...parsedTask.taskComments,
                        ];

                        updatedTaskComments[index].comment = editCommentValue;
                        parsedTask.taskComments = updatedTaskComments;

                        newTasksData.push(parsedTask);
                    }

                    localStorage.setItem("tasks", JSON.stringify(newTasksData));
                    setIsEditedComment(null);
                    setIsChangedComment(null);
                    setUpdateTask(uuidv4());
                    setUpdateColumns(uuidv4());
                });
            }
        };

        const styleCommentError = sendErrorMsg
            ? "border-red-500"
            : "border-gray-300";

        return (
            <div className="grid gap-4 w-full h-full pt-5 overflow-y-visible">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={commentValue}
                        className={`w-full h-full px-3 py-1 border rounded-lg ${styleCommentError}`}
                        placeholder="Add a comment"
                        onInput={(e: ChangeEvent<HTMLInputElement>) =>
                            setCommentValue(e.target.value)
                        }
                        onKeyDown={onKeyDown}
                        readOnly={!!task.readonly}
                    />
                    <button
                        type="button"
                        className="h-full px-2 text-white bg-bright-blue rounded-lg"
                        onClick={handleSendComment}
                        disabled={!!task.readonly}
                    >
                        <LuSendHorizonal className="text-xl" />
                    </button>
                </div>
                {sendErrorMsg && (
                    <div className="flex items-center gap-1 text-red-500">
                        <MdErrorOutline />
                        <p>{sendErrorMsg}</p>
                    </div>
                )}
                <div className="grid gap-4">
                    {task.taskComments.map((comment, i) => (
                        <div key={i} className="p-3 bg-gray-100 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                        <img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src={comment.img}
                                            alt={comment.name}
                                        />
                                        {comment.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {comment.date}
                                    </p>
                                </div>
                                {!task.readonly && (
                                    <div className="flex items-center gap-1">
                                        {isEditedComment === i && (
                                            <>
                                                {isChangedComment === i && (
                                                    <div
                                                        onClick={() =>
                                                            handleAddEditedComment(
                                                                i,
                                                            )
                                                        }
                                                    >
                                                        <MdOutlineDone className="text-xl text-gray-600 hover:text-gray-800 transition cursor-pointer" />
                                                    </div>
                                                )}
                                                <div
                                                    onClick={
                                                        handleCloseEditedComment
                                                    }
                                                >
                                                    <IoClose className="text-xl text-gray-600 hover:text-gray-800 transition cursor-pointer" />
                                                </div>
                                            </>
                                        )}
                                        {isEditedComment !== i &&
                                            isChangedComment !== i && (
                                                <>
                                                    <div
                                                        onClick={() =>
                                                            handleChangeEditedComment(
                                                                task.id,
                                                                i,
                                                            )
                                                        }
                                                    >
                                                        <LuPencilLine className="text-xl text-gray-600 hover:text-gray-800 transition cursor-pointer" />
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                task.id,
                                                                i,
                                                            )
                                                        }
                                                    >
                                                        <FaRegTrashCan className="text-lg text-red-500 hover:text-red-400 transition cursor-pointer" />
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                )}
                            </div>
                            {isEditedComment === i ? (
                                <Field
                                    name="editSubtask"
                                    id="editSubtask"
                                    value={editCommentValue}
                                    className="modal-edit-task__inputs h-min bg-gray-100"
                                    autoFocus
                                    readOnly={!!task.readonly}
                                    onChange={(
                                        e: ChangeEvent<HTMLFormElement>,
                                    ) =>
                                        handleEditComment(
                                            task.id,
                                            i,
                                            e.target.value,
                                        )
                                    }
                                />
                            ) : (
                                <p className="text-gray-500">
                                    {comment.comment}
                                </p>
                            )}
                            {editError === i && (
                                <div className="flex items-center gap-1 text-red-500">
                                    <MdErrorOutline />
                                    <p>{editErrorMsg}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return checkTaskProps(prevProps.task, nextProps.task);
    },
);

export default Comments;
