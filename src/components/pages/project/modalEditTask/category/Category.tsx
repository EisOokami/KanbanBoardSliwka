import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Field } from "formik";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LuTag } from "react-icons/lu";
import {
    IInitialValues,
    ITask,
} from "../../../../../interfaces/modalEditTask/interface";

interface CategoryProps {
    task: ITask;
    values: IInitialValues;
    categoryTask: string[];
    isLoadingCategory: boolean;
}

interface CategorySelectProps {
    setIsCategory: Dispatch<SetStateAction<boolean>>;
    categoryTask: string[];
    isLoadingCategory: boolean;
}

export default function Category({
    task,
    values,
    categoryTask,
    isLoadingCategory,
}: CategoryProps) {
    const [isCategory, setIsCategory] = useState<boolean>(false);

    const handleIsCategory = useCallback(
        (bool: boolean) => setIsCategory(bool),
        [],
    );

    const styleCategoryValue = task.readonly ? "" : "cursor-pointer";

    return (
        <div className="flex items-center gap-[29px]">
            <div className="flex items-center gap-1">
                <LuTag />
                <p>Category</p>
            </div>
            {!isCategory || task.readonly ? (
                <span
                    className={styleCategoryValue}
                    onClick={() => handleIsCategory(true)}
                >
                    {values.category}
                </span>
            ) : (
                <CategorySelect
                    setIsCategory={setIsCategory}
                    categoryTask={categoryTask}
                    isLoadingCategory={isLoadingCategory}
                />
            )}
        </div>
    );
}

const CategorySelect = ({
    setIsCategory,
    categoryTask,
    isLoadingCategory,
}: CategorySelectProps) => {
    const handleIsCategory = useCallback(
        (bool: boolean) => setIsCategory(bool),
        [setIsCategory],
    );

    return (
        <>
            {isLoadingCategory ? (
                <div className="w-full h-full">
                    <Skeleton width="100%" height={32} />
                </div>
            ) : (
                <Field
                    id="category"
                    name="category"
                    as="select"
                    className="edit-modal-edit-task__inputs"
                    onBlur={() => handleIsCategory(false)}
                >
                    <option value="" disabled hidden>
                        Select Category
                    </option>
                    {categoryTask.map((option, i) => (
                        <option key={i} value={option.replace(/-/g, " ")}>
                            {option}
                        </option>
                    ))}
                </Field>
            )}
        </>
    );
};
