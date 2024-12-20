import { memo } from "react";
import { Field, ErrorMessage } from "formik";
import { checkCategoryProps } from "../../../../../script/memo";

import ErrMessage from "../../../../ui/errMessage/ErrMessage";

interface CategoryProps {
    categoryTask: string[];
}

const Category = memo(
    function Category({ categoryTask }: CategoryProps) {
        return (
            <div className="grid content-start gap-1 w-full">
                <label htmlFor="categoryTask" className="modal-new-task__label">
                    Category
                </label>
                <Field
                    id="categoryTask"
                    name="categoryTask"
                    as="select"
                    className="modal-new-task__input"
                >
                    <option value="" disabled hidden>
                        Select Category
                    </option>
                    {categoryTask.map((option, i) => (
                        <option key={i} value={option.replace(/ /g, "-")}>
                            {option}
                        </option>
                    ))}
                </Field>
                <ErrorMessage name="categoryTask">
                    {(msg) => <ErrMessage msg={msg} />}
                </ErrorMessage>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return checkCategoryProps(
            prevProps.categoryTask,
            nextProps.categoryTask,
        );
    },
);

export default Category;
