import {
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    useCallback,
    useState,
} from "react";
import { Field } from "formik";
import { IoClose } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import {
    IInitialValues,
    ITask,
} from "../../../../../interfaces/modalEditTask/interface";

interface TitleProps {
    task: ITask;
    values: IInitialValues;
    setOpenModalEditTask: Dispatch<SetStateAction<string | null>>;
    setOpenModalDeleteTask: Dispatch<SetStateAction<string | number | null>>;
}

const Title = function Title({
    task,
    values,
    setOpenModalEditTask,
    setOpenModalDeleteTask,
}: TitleProps) {
    const [isTitle, setIsTitle] = useState<boolean>(true);

    const hanldeSetOpenModalEditTask = useCallback(
        () => setOpenModalEditTask(null),
        [setOpenModalEditTask],
    );

    const handleSetOpenModalDeleteTask = useCallback(
        () => setOpenModalDeleteTask(task.id),
        [setOpenModalDeleteTask, task.id],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                event.preventDefault();
                setIsTitle(true);
            }
        },
        [],
    );

    const styleTitle = task.readonly ? "" : "cursor-pointer";
    const styleDeleteBtn = task.readonly ? "hidden" : "";

    return (
        <div className="flex justify-between items-center">
            {(isTitle && values.title.length) || task.readonly ? (
                <h1
                    className={`text-4xl font-medium break-all ${styleTitle}`}
                    onClick={() => setIsTitle(false)}
                >
                    {values.title}
                </h1>
            ) : (
                <Field
                    name="title"
                    id="title"
                    className="modal-edit-task__inputs text-4xl font-medium"
                    autoFocus
                    readOnly={task.readonly}
                    onBlur={() => setIsTitle(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a title"
                />
            )}
            <div className="flex gap-1">
                <button
                    type="button"
                    className={`${styleDeleteBtn}`}
                    onClick={handleSetOpenModalDeleteTask}
                >
                    <FaRegTrashCan className="text-xl text-red-500 hover:text-red-400 cursor-pointer" />
                </button>
                <button type="button" onClick={hanldeSetOpenModalEditTask}>
                    <IoClose className="hover:text-gray-900 text-xl cursor-pointer" />
                </button>
            </div>
        </div>
    );
};

export default Title;
