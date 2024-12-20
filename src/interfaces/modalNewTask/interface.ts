export interface ISubtasks {
    checked: number;
    description: string;
}

export interface IMembers {
    avatar: string;
    email: string;
    id: number;
    name: string;
    surname: string;
}

export interface IStatusTask {
    items: number[];
    title: string;
}

export interface IInitialValues {
    titleTask: string;
    categoryTask: string;
    membersTask: IMembers[];
    descrTask: string;
    fileTask: FileList | null;
    subtasks: ISubtasks[];
}
