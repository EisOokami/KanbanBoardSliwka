import { getDatabase, ref, onValue } from "firebase/database";
import app from "./firebaseConfig";
import {
    IStatusTask,
    IColumns,
    IMembers,
    ITask,
    IColumnType,
} from "../interfaces/services/interface";

export const fetchCategoryTask = (
    setData: (data: string[]) => void,
    setLoading: (data: boolean) => void,
) => {
    const database = getDatabase(app);
    const categoryTaskRef = ref(database, "category-task");

    onValue(categoryTaskRef, (snapshot) => {
        setLoading(true);
        const dataItem = snapshot.val();

        if (dataItem) {
            const displayItem: string[] = Object.values(dataItem.type);

            setData(displayItem);
            setLoading(false);
        }
    });
};

export const fetchStatusTask = (
    setData: (data: IStatusTask[]) => void,
    setLoading: (data: boolean) => void,
) => {
    const database = getDatabase(app);
    const statusRef = ref(database, "column");

    onValue(statusRef, (snapshot) => {
        setLoading(true);
        const dataItem = snapshot.val();

        if (dataItem) {
            const displayItem: IStatusTask[] = Object.values(dataItem);

            setData(displayItem);
            setLoading(false);
        }
    });
};

export const fetchColumns = (
    setData: (data: IColumns) => void,
    setLoading: (data: boolean) => void,
) => {
    const tasksData = localStorage.getItem("tasks");
    let newTasksData = [];

    if (tasksData !== null) {
        newTasksData = JSON.parse(tasksData);
    }

    const database = getDatabase(app);

    const columnsRef = ref(database, "column");
    const tasksRef = ref(database, "tasks");
    const membersRef = ref(database, "members");

    const fetchData = () => {
        let fetchedColumns: IColumns = {};
        let fetchedTasks: ITask[] = [];
        let fetchedMembers: IMembers[] = [];

        onValue(columnsRef, (snapshot) => {
            setLoading(true);
            const dataItem = snapshot.val();

            if (dataItem) {
                const result: IColumns = {};

                dataItem.forEach((item: IColumnType) => {
                    result[item.title] = item;
                });

                fetchedColumns = result;

                if (fetchedTasks.length > 0 && fetchedMembers.length > 0) {
                    updateColumnsWithTasks(
                        fetchedColumns,
                        fetchedTasks,
                        fetchedMembers,
                    );
                }
            }
        });

        onValue(membersRef, (snapshot) => {
            setLoading(true);
            const dataItem = snapshot.val();

            if (dataItem) {
                const displayItem: IMembers[] = Object.values(dataItem);

                fetchedMembers = displayItem;
            }
        });

        onValue(tasksRef, (snapshot) => {
            setLoading(true);
            const dataItem = snapshot.val();

            if (dataItem) {
                const displayItem: ITask[] = Object.values(dataItem);

                fetchedTasks = displayItem.concat(newTasksData);

                if (Object.keys(fetchedColumns).length > 0) {
                    updateColumnsWithTasks(
                        fetchedColumns,
                        fetchedTasks,
                        fetchedMembers,
                    );
                }
            }
        });
    };

    const updateAssigneesInTask = (
        tasksData: ITask[],
        membersData: IMembers[],
    ) => {
        return tasksData.map((task) => {
            if (task) {
                const updatedAssignees = task.assignees.map((assigneeId) => {
                    return membersData.find(
                        (member) => member.id === +assigneeId,
                    ) as IMembers;
                });

                return {
                    ...task,
                    assignees: updatedAssignees,
                };
            }
            return task;
        });
    };

    const updateColumnsWithTasks = (
        columnsData: IColumns,
        tasksData: ITask[],
        membersData: IMembers[],
    ) => {
        const updatedColumns = { ...columnsData };
        const updatedTasks = updateAssigneesInTask(tasksData, membersData);

        Object.entries(updatedColumns).forEach(([columnId, column]) => {
            let updatedItems: ITask[] = [];

            // if (typeof column.items !== "string") {
            //     updatedItems = column.items.map(
            //         (index) => updatedTasks[+index - 1],
            //     );
            // }

            updatedItems = updatedTasks.filter(
                (task) => task.status === column.title,
            );

            updatedItems.sort((a, b) => a.columnIndex - b.columnIndex);

            updatedColumns[columnId] = {
                ...column,
                items: updatedItems,
            };
        });

        setData(updatedColumns);
        setLoading(false);
    };

    fetchData();
};

export const fetchTask = (
    setData: (data: ITask) => void,
    setLoading: (data: boolean) => void,
    openModalEditTask: string | null,
) => {
    const tasksData = localStorage.getItem("tasks");
    let newTasksData = [];

    if (tasksData !== null) {
        newTasksData = JSON.parse(tasksData);
    }

    const database = getDatabase(app);

    const tasksRef = ref(database, "tasks");

    let fetchedTasks: ITask[] = [];

    onValue(tasksRef, (snapshot) => {
        setLoading(true);
        const dataItem = snapshot.val();

        if (dataItem) {
            const displayItem: ITask[] = Object.values(dataItem);

            fetchedTasks = displayItem.concat(newTasksData);

            fetchedTasks.forEach((task) => {
                if (
                    openModalEditTask === task.id.toString() &&
                    typeof task.id.toString() !== "undefined"
                ) {
                    setData(task);
                    setLoading(false);
                }
            });
        }
    });
};

export const fetchAssignees = (
    taskData: ITask,
    setData: (data: IMembers[]) => void,
    setLoading: (data: boolean) => void,
    setFilteredAssignees: (data: IMembers[]) => void,
) => {
    const database = getDatabase(app);
    const membersRef = ref(database, "members");
    let fetchedMembers: IMembers[] = [];

    const getAssigneesFromTask = (taskData: ITask, membersData: IMembers[]) => {
        const assigneesData = taskData.assignees.map((assigneeId) => {
            return membersData.find(
                (member) => member.id === +assigneeId,
            ) as IMembers;
        });

        const filteredAssigneesData = membersData.filter((member) => {
            return !taskData.assignees.some((assigneeId) => {
                return +assigneeId === member.id;
            });
        });

        return { assigneesData, filteredAssigneesData };
    };

    onValue(membersRef, (snapshot) => {
        setLoading(true);
        const dataItem = snapshot.val();

        if (dataItem) {
            const displayItem: IMembers[] = Object.values(dataItem);

            fetchedMembers = displayItem;
        }
    });

    const { assigneesData, filteredAssigneesData } = getAssigneesFromTask(
        taskData,
        fetchedMembers,
    );

    setData(assigneesData);
    setFilteredAssignees(filteredAssigneesData);
    setLoading(false);
};

export const fetchMembers = (
    setData: (data: IMembers[]) => void,
    setLoading: (data: boolean) => void,
    setFilteredMembers: (data: IMembers[]) => void,
    setShowList: (data: boolean) => void,
) => {
    const database = getDatabase(app);
    const membersRef = ref(database, "members");

    onValue(membersRef, (snapshot) => {
        setLoading(true);
        setShowList(false);
        const dataItem = snapshot.val();

        if (dataItem) {
            const displayItem: IMembers[] = Object.values(dataItem);

            setData(displayItem);
            setFilteredMembers(displayItem);
            setLoading(false);
        }
    });
};
