import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { ErrorMessage, Field } from "formik";
import { IoClose } from "react-icons/io5";
import { ISubtasks } from "../../../../../interfaces/modalNewTask/interface";

import ErrMessage from "../../../../ui/errMessage/ErrMessage";

interface SubtasksProps {
    subtasks: ISubtasks[];
    setSubtasks: Dispatch<SetStateAction<ISubtasks[]>>;
    setFieldValue: (field: string, value: ISubtasks[] | null) => void;
}

const Subtasks = function Subtasks({
    subtasks,
    setSubtasks,
    setFieldValue,
}: SubtasksProps) {
    const checkEmptyDescription = useCallback(
        (subtask: ISubtasks[]) => {
            subtask.forEach((subtask) => {
                if (!subtask.description) {
                    setFieldValue("subtasks", []);
                }
            });
        },
        [setFieldValue],
    );

    const handleAddSubtask = useCallback(() => {
        const newSubtasksData = [...subtasks, { description: "", checked: 0 }];

        setSubtasks(newSubtasksData);

        checkEmptyDescription(newSubtasksData);
    }, [checkEmptyDescription, setSubtasks, subtasks]);

    const handleRemoveSubtask = useCallback(
        (index: number) => {
            const filteredSubtasks = subtasks.filter((_, i) => i !== index);

            setSubtasks(filteredSubtasks);
            setFieldValue("subtasks", filteredSubtasks);

            if (!filteredSubtasks.length) {
                setFieldValue("subtasks", []);
            }

            checkEmptyDescription(filteredSubtasks);
        },
        [checkEmptyDescription, setFieldValue, setSubtasks, subtasks],
    );

    const handleChangeSubtask = useCallback(
        (index: number, value: string) => {
            const updatedSubtasks = [...subtasks];
            updatedSubtasks[index].description = value;

            setSubtasks(updatedSubtasks);
            setFieldValue("subtasks", updatedSubtasks);

            checkEmptyDescription(updatedSubtasks);
        },
        [checkEmptyDescription, setFieldValue, setSubtasks, subtasks],
    );

    return (
        <div className="grid gap-1">
            <label className="modal-new-task__label" onClick={handleAddSubtask}>
                Subtasks
            </label>
            <div className="grid gap-2">
                {subtasks.map((subtask, index) => (
                    <div key={index} className="flex gap-3 items-center">
                        <Field
                            type="text"
                            id="subtasks"
                            name="subtasks"
                            placeholder="Subtask title"
                            value={subtask.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleChangeSubtask(index, e.target.value)
                            }
                            className="w-full p-2 border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                            autoComplete="off"
                        />
                        <IoClose
                            className="text-xl text-gray-600 hover:text-gray-800 transition cursor-pointer"
                            onClick={() => handleRemoveSubtask(index)}
                        />
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={handleAddSubtask}
                className="justify-self-start text-blue-500 hover:text-blue-700 transition"
            >
                + Add Subtask
            </button>
            <ErrorMessage name="subtasks">
                {(msg) =>
                    typeof msg === "string" ? <ErrMessage msg={msg} /> : null
                }
            </ErrorMessage>
        </div>
    );
};

export default Subtasks;
