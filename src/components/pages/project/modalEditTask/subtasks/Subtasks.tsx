import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { Field } from "formik";
import { IoClose } from "react-icons/io5";
import { MdErrorOutline, MdOutlineDone } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import {
    IInitialValues,
    ISubtasks,
    ITask,
} from "../../../../../interfaces/modalEditTask/interface";

interface SubtasksProps {
    setFieldValue: (
        field: string,
        value: ISubtasks[] | string | number | null,
    ) => void;
    values: IInitialValues;
    task: ITask;
    isValid: boolean;
}

const Subtasks = function Subtasks({
    setFieldValue,
    values,
    task,
    isValid,
}: SubtasksProps) {
    const [isAddSubtask, setIsAddSubtask] = useState<boolean>(false);
    const [subtaskValue, setSubtaskValue] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isEditedSubtask, setIsEditedSubtask] = useState<number | null>(null);
    const [isChangedSubtask, setIsChangedSubtask] = useState<number | null>(
        null,
    );
    const [editSubtaskValue, setEditSubtaskValue] = useState<string>("");

    const handleCheckBox = useCallback(
        (e: ChangeEvent<HTMLInputElement>, descr: string) => {
            const checkbox = e.target;

            values.subtasks.forEach((subtask) => {
                if (subtask.description === descr) {
                    const complitiedTask =
                        values.complitiedSubtasks + (checkbox.checked ? 1 : -1);
                    subtask.checked = checkbox.checked ? 1 : 0;

                    setFieldValue("subtasks", values.subtasks);
                    setFieldValue("complitiedSubtasks", complitiedTask);
                }
            });
        },
        [setFieldValue, values],
    );

    const handleCancelAddSubtask = () => {
        setIsAddSubtask(false);
        setSubtaskValue("");
        setError("");
    };

    const validateInput = () => {
        if (!subtaskValue.trim()) {
            setError("Description cannot be empty.");
            return false;
        }

        if (
            values.subtasks.some(
                (subtask) => subtask.description === subtaskValue.trim(),
            )
        ) {
            setError("Subtask with this description already exists.");
            return false;
        }

        if (subtaskValue.trim().length > 100) {
            setError("Description must be less than 100 characters.");
            return false;
        }

        setError("");
        return true;
    };

    const handleAddSubtask = () => {
        if (validateInput()) {
            const newSubtask = {
                description: subtaskValue.trim(),
                checked: 0,
            };

            setFieldValue("subtasks", [...values.subtasks, newSubtask]);
            setFieldValue("totalSubtasks", ++values.totalSubtasks);
            setIsAddSubtask(false);
            setSubtaskValue("");
        }
    };

    const handleDeleteSubtask = (index: number) => {
        const editedSubtasks = values.subtasks.filter((_, i) => i !== index);
        const deletedSubtasks = values.subtasks.filter((_, i) => i === index);
        const complitiedTask =
            values.complitiedSubtasks - (deletedSubtasks[0].checked ? 1 : 0);

        setFieldValue("subtasks", editedSubtasks);
        setFieldValue("totalSubtasks", --values.totalSubtasks);
        setFieldValue("complitiedSubtasks", complitiedTask);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddSubtask();
        }
    };

    const handleIsAddSubtask = useCallback(
        (bool: boolean) => setIsAddSubtask(bool),
        [],
    );

    const handleChangeEditSubtask = (index: number) => {
        const initialSubtaskDescr = values.subtasks[index].description;

        if (editSubtaskValue !== initialSubtaskDescr) {
            setEditSubtaskValue(initialSubtaskDescr);
        }

        if (isEditedSubtask === index) {
            setIsEditedSubtask(null);
            return;
        }

        setIsEditedSubtask(index);
    };

    const handleEditSubtask = (index: number, value: string) => {
        const initialSubtaskDescr = values.subtasks[index].description;

        if (value === initialSubtaskDescr) {
            setIsChangedSubtask(null);
            setEditSubtaskValue(value);
            return;
        }

        if (!value.length) {
            setIsChangedSubtask(null);
            setEditSubtaskValue(value);
            return;
        }

        setIsChangedSubtask(index);
        setEditSubtaskValue(value);
    };

    const handleCloseEditedSubtask = () => {
        setIsEditedSubtask(null);
        setIsChangedSubtask(null);
    };

    const handleAddEditedSubtask = (index: number) => {
        const updatedSubtasks = [...values.subtasks];
        updatedSubtasks[index].description = editSubtaskValue;

        setFieldValue("subtasks", updatedSubtasks);
        setIsEditedSubtask(null);
        setIsChangedSubtask(null);
    };

    return (
        <div className="grid gap-3 mt-1">
            <div className="grid">
                {values.subtasks.map((subtask, i) => (
                    <div
                        key={i}
                        className="flex justify-between items-center gap-1 py-3 border-t first:border-t-0 last:border-b"
                    >
                        <label className="flex items-center gap-2 w-full cursor-pointer">
                            <Field
                                type="checkbox"
                                name="checked"
                                value={subtask.description}
                                checked={subtask.checked}
                                className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    !task.readonly &&
                                    handleCheckBox(e, subtask.description)
                                }
                                readOnly={task.readonly}
                            />
                            {isEditedSubtask === i ? (
                                <Field
                                    name="editSubtask"
                                    id="editSubtask"
                                    value={editSubtaskValue}
                                    className="modal-edit-task__inputs"
                                    autoFocus
                                    readOnly={!!task.readonly}
                                    onChange={(
                                        e: ChangeEvent<HTMLFormElement>,
                                    ) => handleEditSubtask(i, e.target.value)}
                                />
                            ) : (
                                <span className="break-words whitespace-normal">
                                    {subtask.description}
                                </span>
                            )}
                        </label>
                        {!task.readonly && (
                            <>
                                {isEditedSubtask === i && (
                                    <>
                                        {isChangedSubtask === i && (
                                            <div
                                                onClick={() =>
                                                    handleAddEditedSubtask(i)
                                                }
                                            >
                                                <MdOutlineDone className="text-xl text-gray-600 hover:text-gray-800 transition cursor-pointer" />
                                            </div>
                                        )}
                                        <div onClick={handleCloseEditedSubtask}>
                                            <IoClose className="text-xl text-gray-600 hover:text-gray-800 transition cursor-pointer" />
                                        </div>
                                    </>
                                )}
                                {isEditedSubtask !== i &&
                                    isChangedSubtask !== i && (
                                        <>
                                            <div
                                                onClick={() =>
                                                    handleChangeEditSubtask(i)
                                                }
                                            >
                                                <LuPencilLine className="text-xl text-gray-600 hover:text-gray-800 transition cursor-pointer" />
                                            </div>
                                            {values.totalSubtasks > 1 && (
                                                <div
                                                    onClick={() =>
                                                        handleDeleteSubtask(i)
                                                    }
                                                >
                                                    <FaRegTrashCan className="text-lg text-red-500 hover:text-red-400 transition cursor-pointer" />
                                                </div>
                                            )}
                                        </>
                                    )}
                            </>
                        )}
                    </div>
                ))}
            </div>
            {!task.readonly &&
                (!isAddSubtask ? (
                    <button
                        type="button"
                        className="justify-self-start text-blue-500 hover:text-blue-700 transition"
                        onClick={() => handleIsAddSubtask(true)}
                    >
                        + Add Subtask
                    </button>
                ) : (
                    <div className="grid gap-2">
                        <input
                            placeholder="Type a description"
                            className={`w-full px-3 py-1 border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 ${
                                error ? "border-red-500" : ""
                            }`}
                            autoFocus={true}
                            onInput={(e: ChangeEvent<HTMLInputElement>) =>
                                setSubtaskValue(e.target.value)
                            }
                            onKeyDown={onKeyDown}
                        />
                        {error && (
                            <div className="flex items-center gap-1 text-red-500">
                                <MdErrorOutline />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-2 text-white bg-bright-blue hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg focus:outline-none transition"
                                disabled={!isValid}
                                onClick={handleAddSubtask}
                            >
                                Add Subtask
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg focus:outline-none transition"
                                onClick={handleCancelAddSubtask}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Subtasks;
