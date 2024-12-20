import { memo } from "react";
import { Field } from "formik";
import { checkTaskProps } from "../../../../../script/memo";
import { ITask } from "../../../../../interfaces/modalEditTask/interface";

interface DescriptionProps {
    task: ITask;
}

const Description = memo(
    function Description({ task }: DescriptionProps) {
        return (
            <Field
                as="textarea"
                name="descr"
                id="descr"
                className="w-full h-[10lh] mt-5 p-2 bg-gray-100 rounded-md"
                readOnly={task.readonly}
            />
        );
    },
    (prevProps, nextProps) => {
        return checkTaskProps(prevProps.task, nextProps.task);
    },
);

export default Description;
