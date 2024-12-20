import { memo, useCallback, useState } from "react";
import { Field } from "formik";
import { checkTaskProps } from "../../../../../script/memo";
import { TiFlag } from "react-icons/ti";
import {
    IInitialValues,
    ITask,
} from "../../../../../interfaces/modalEditTask/interface";

interface PriorityProps {
    task: ITask;
    values: IInitialValues;
}

const initialColorOfPriority = {
    Critical: { text: "text-red-700", bg: "bg-red-100" },
    High: { text: "text-orange-700", bg: "bg-orange-100" },
    Medium: { text: "text-yellow-700", bg: "bg-yellow-100" },
    Low: { text: "text-green-700", bg: "bg-green-100" },
} as const;

const Priority = memo(
    function Priority({ task, values }: PriorityProps) {
        const [isPriority, setIsPriority] = useState<boolean>(true);

        const handleIsPriority = useCallback(
            (bool: boolean) => setIsPriority(bool),
            [],
        );

        const styleBgPriority =
            initialColorOfPriority[
                values.priority as keyof typeof initialColorOfPriority
            ].bg;
        const styleTextPriority =
            initialColorOfPriority[
                values.priority as keyof typeof initialColorOfPriority
            ].text;

        return (
            <div className="flex items-center gap-2">
                <p>Priority:</p>
                {isPriority || task.readonly ? (
                    <div
                        className={`px-1 py-0.5 rounded ${styleBgPriority}`}
                        onClick={() => handleIsPriority(false)}
                    >
                        <span
                            className={`flex items-center font-medium ${styleTextPriority}`}
                        >
                            <TiFlag />
                            {values.priority}
                        </span>
                    </div>
                ) : (
                    <Field
                        id="priority"
                        name="priority"
                        as="select"
                        className="modal-edit-task__inputs-edit"
                        onBlur={() => handleIsPriority(true)}
                    >
                        <option value="" disabled hidden>
                            Select Priority
                        </option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Field>
                )}
            </div>
        );
    },
    (prevProps, nextProps) => {
        return (
            checkTaskProps(prevProps.task, nextProps.task) ||
            checkTaskProps(prevProps.values, nextProps.values)
        );
    },
);

export default Priority;
