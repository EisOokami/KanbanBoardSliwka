import { memo, useCallback, useEffect, useRef, useState } from "react";
import { fetchAssignees } from "../../../../../services/firebaseDatabase";
import useClickOutside from "../../../../../hooks/UseClickOutside";
import { checkTaskProps } from "../../../../../script/memo";
import { IoIosAdd } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import {
    IMembers,
    ITask,
} from "../../../../../interfaces/modalEditTask/interface";

interface AssigneesProps {
    task: ITask;
    setFieldValue: (field: string, value: number[]) => void;
}

const Assignees = memo(
    function Assignees({ task, setFieldValue }: AssigneesProps) {
        const [taskWithAssignees, setTaskWithAssignees] = useState<IMembers[]>(
            [],
        );
        const [isLoading, setIsLoading] = useState<boolean>();
        const [showDropdown, setShowDropdown] = useState<boolean>(false);
        const [filteredAssignees, setFilteredAssignees] = useState<IMembers[]>(
            [],
        );
        const dropdownContainerRef = useRef<HTMLDivElement | null>(null);

        useClickOutside(dropdownContainerRef, () => {
            setShowDropdown(false);
        });

        useEffect(() => {
            fetchAssignees(
                task,
                setTaskWithAssignees,
                setIsLoading,
                setFilteredAssignees,
            );
        }, [task]);

        const handleAddAssignee = useCallback(
            (index: number) => {
                const selectedAssignee = filteredAssignees[index];
                const filteredItems = filteredAssignees.filter(
                    (_, i) => index !== i,
                );
                const updatedAssigneesData = [
                    ...taskWithAssignees,
                    selectedAssignee,
                ];
                const assigneesIdData = updatedAssigneesData.map(
                    (assignee) => assignee.id,
                );

                setFilteredAssignees(filteredItems);
                setTaskWithAssignees(updatedAssigneesData);
                setShowDropdown(false);
                setFieldValue("assignees", assigneesIdData);
            },
            [filteredAssignees, setFieldValue, taskWithAssignees],
        );

        const handleDeleteAssignee = useCallback(
            (index: number) => {
                if (taskWithAssignees.length === 1) {
                    return;
                }

                if (!task.readonly) {
                    const selectedAssignee = taskWithAssignees[index];
                    const updatedAssigneesData = taskWithAssignees.filter(
                        (_, i) => index !== i,
                    );
                    const assigneesIdData = updatedAssigneesData.map(
                        (assignee) => assignee.id,
                    );

                    setFilteredAssignees([
                        ...filteredAssignees,
                        selectedAssignee,
                    ]);
                    setTaskWithAssignees(updatedAssigneesData);
                    setShowDropdown(false);
                    setFieldValue("assignees", assigneesIdData);
                }
            },
            [
                task.readonly,
                setFieldValue,
                taskWithAssignees,
                filteredAssignees,
            ],
        );

        const handleShowDropdown = useCallback(
            (bool: boolean) => setShowDropdown(bool),
            [],
        );

        const styleAssignees = task.readonly
            ? "cursor-not-allowed"
            : "cursor-pointer";

        return (
            <>
                {isLoading || !taskWithAssignees ? (
                    <div></div>
                ) : (
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1">
                            <MdGroup />
                            <p>Assignees</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-1">
                            {taskWithAssignees.map((assignee, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full cursor-pointer ${styleAssignees}`}
                                    onClick={() => handleDeleteAssignee(i)}
                                >
                                    <img
                                        src={assignee.avatar}
                                        alt={`assignee${i}`}
                                        className="w-5 rounded-full"
                                    />
                                    <span className="text-sm">
                                        {assignee.name} {assignee.surname}
                                    </span>
                                </div>
                            ))}
                            <div className="relative">
                                {!task.readonly &&
                                    !!filteredAssignees.length && (
                                        <div
                                            className={`grid p-1 place-items-center bg-gray-100 rounded-full ${styleAssignees}`}
                                            onClick={() =>
                                                handleShowDropdown(true)
                                            }
                                        >
                                            <IoIosAdd className="text-xl" />
                                        </div>
                                    )}
                                {showDropdown && (
                                    <div
                                        ref={dropdownContainerRef}
                                        className="absolute top-8 -right-6 grid w-max p-2 bg-white rounded-md shadow-md"
                                    >
                                        {filteredAssignees.map(
                                            (assignee, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-1 p-2 hover:text-white hover:bg-bright-blue rounded-md cursor-pointer transition"
                                                    onClick={() =>
                                                        handleAddAssignee(i)
                                                    }
                                                >
                                                    <img
                                                        src={assignee.avatar}
                                                        alt={`assignee${i}`}
                                                        className="w-5 rounded-full"
                                                    />
                                                    <span className="text-sm">
                                                        {assignee.name}{" "}
                                                        {assignee.surname}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    },
    (prevProps, nextProps) => {
        return checkTaskProps(prevProps.task, nextProps.task);
    },
);

export default Assignees;
