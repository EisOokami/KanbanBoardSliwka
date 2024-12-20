export interface ISubtasks {
    checked: number;
    description: string;
}

export interface ITaskComments {
    comment: string;
    date: string;
    name: string;
    img: string;
}

export interface IMembers {
    avatar: string;
    email: string;
    id: number;
    name: string;
    surname: string;
}

export interface ITask {
    id: number | string;
    assignees: IMembers[];
    category: string;
    title: string;
    descr: string;
    complitiedSubtasks: number;
    totalSubtasks: number;
    totalComments: number;
    totalFiles: number;
    createdBy: string;
    dueDate: string;
    time: string;
    priority: string;
    status: string;
    subtasks: ISubtasks[];
    taskComments: ITaskComments[];
    readonly: number;
    columnIndex: number;
}

export interface IInitialValues {
    id: number | string;
    assignees: IMembers[];
    category: string;
    title: string;
    descr: string;
    complitiedSubtasks: number;
    totalSubtasks: number;
    totalComments: number;
    totalFiles: number;
    createdBy: string;
    dueDate: string;
    time: string;
    priority: string;
    status: string;
    subtasks: ISubtasks[];
    taskComments: ITaskComments[];
    readonly: number;
    columnIndex: number;
}
