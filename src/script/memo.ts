import { ITask } from "../interfaces/kanban/interface";
import {
    IInitialValues,
    IMembers,
    ISubtasks,
} from "../interfaces/modalNewTask/interface";

export const checkColumnProps = (prevItems: ITask[], nextItems: ITask[]) => {
    if (prevItems.length !== nextItems.length) {
        return false;
    }

    for (let i = 0; i < prevItems.length; i++) {
        const prevTask = prevItems[i];
        const nextTask = nextItems[i];

        if (
            prevTask.id !== nextTask.id ||
            prevTask.category !== nextTask.category ||
            prevTask.title !== nextTask.title ||
            prevTask.descr !== nextTask.descr ||
            prevTask.complitiedSubtasks !== nextTask.complitiedSubtasks ||
            prevTask.totalSubtasks !== nextTask.totalSubtasks ||
            prevTask.totalComments !== nextTask.totalComments ||
            prevTask.totalFiles !== nextTask.totalFiles ||
            prevTask.createdBy !== nextTask.createdBy ||
            prevTask.dueDate !== nextTask.dueDate ||
            prevTask.time !== nextTask.time ||
            prevTask.priority !== nextTask.priority ||
            prevTask.status !== nextTask.status ||
            prevTask.readonly !== nextTask.readonly ||
            prevTask.columnIndex !== nextTask.columnIndex ||
            prevTask.assignees.length !== nextTask.assignees.length ||
            prevTask.subtasks.length !== nextTask.subtasks.length ||
            prevTask.taskComments.length !== nextTask.taskComments.length
        ) {
            return false;
        }

        for (let j = 0; j < prevTask.assignees.length; j++) {
            const prevAssignees = prevTask.assignees[j];
            const nextAssignees = nextTask.assignees[j];

            if (
                prevAssignees.avatar !== nextAssignees.avatar ||
                prevAssignees.email !== nextAssignees.email ||
                prevAssignees.id !== nextAssignees.id ||
                prevAssignees.name !== nextAssignees.name ||
                prevAssignees.surname !== nextAssignees.surname
            ) {
                return false;
            }
        }

        for (let j = 0; j < prevTask.subtasks.length; j++) {
            const prevSubtasks = prevTask.subtasks[j];
            const nextSubtasks = nextTask.subtasks[j];

            if (
                prevSubtasks.checked !== nextSubtasks.checked ||
                prevSubtasks.description !== nextSubtasks.description
            ) {
                return false;
            }
        }

        for (let j = 0; j < prevTask.taskComments.length; j++) {
            const prevTaskComments = prevTask.taskComments[j];
            const nextTaskComments = nextTask.taskComments[j];

            if (
                prevTaskComments.comment !== nextTaskComments.comment ||
                prevTaskComments.date !== nextTaskComments.date ||
                prevTaskComments.img !== nextTaskComments.img ||
                prevTaskComments.name !== nextTaskComments.name
            ) {
                return false;
            }
        }
    }

    return true;
};

export const checkTaskProps = (prevItems: ITask, nextItems: ITask) => {
    if (
        prevItems.id !== nextItems.id ||
        prevItems.category !== nextItems.category ||
        prevItems.title !== nextItems.title ||
        prevItems.descr !== nextItems.descr ||
        prevItems.complitiedSubtasks !== nextItems.complitiedSubtasks ||
        prevItems.totalSubtasks !== nextItems.totalSubtasks ||
        prevItems.totalComments !== nextItems.totalComments ||
        prevItems.totalFiles !== nextItems.totalFiles ||
        prevItems.createdBy !== nextItems.createdBy ||
        prevItems.dueDate !== nextItems.dueDate ||
        prevItems.time !== nextItems.time ||
        prevItems.priority !== nextItems.priority ||
        prevItems.status !== nextItems.status ||
        prevItems.readonly !== nextItems.readonly ||
        prevItems.columnIndex !== nextItems.columnIndex ||
        prevItems.assignees.length !== nextItems.assignees.length ||
        prevItems.subtasks.length !== nextItems.subtasks.length ||
        prevItems.taskComments.length !== nextItems.taskComments.length
    ) {
        return false;
    }

    for (let i = 0; i < prevItems.assignees.length; i++) {
        const prevAssignees = prevItems.assignees[i];
        const nextAssignees = nextItems.assignees[i];

        if (
            prevAssignees.avatar !== nextAssignees.avatar ||
            prevAssignees.email !== nextAssignees.email ||
            prevAssignees.id !== nextAssignees.id ||
            prevAssignees.name !== nextAssignees.name ||
            prevAssignees.surname !== nextAssignees.surname
        ) {
            return false;
        }
    }

    for (let i = 0; i < prevItems.subtasks.length; i++) {
        const prevSubtasks = prevItems.subtasks[i];
        const nextSubtasks = nextItems.subtasks[i];

        if (
            prevSubtasks.checked !== nextSubtasks.checked ||
            prevSubtasks.description !== nextSubtasks.description
        ) {
            return false;
        }
    }

    for (let i = 0; i < prevItems.taskComments.length; i++) {
        const prevTaskComments = prevItems.taskComments[i];
        const nextTaskComments = nextItems.taskComments[i];

        if (
            prevTaskComments.comment !== nextTaskComments.comment ||
            prevTaskComments.date !== nextTaskComments.date ||
            prevTaskComments.img !== nextTaskComments.img ||
            prevTaskComments.name !== nextTaskComments.name
        ) {
            return false;
        }
    }

    return true;
};

export const checkInitialValuesProps = (
    prevItems: IInitialValues,
    nextItems: IInitialValues,
) => {
    if (
        prevItems.titleTask !== nextItems.titleTask ||
        prevItems.categoryTask !== nextItems.categoryTask ||
        prevItems.descrTask !== nextItems.descrTask ||
        prevItems.membersTask.length !== nextItems.membersTask.length ||
        prevItems.subtasks.length !== nextItems.subtasks.length ||
        (prevItems.fileTask === null) !== (nextItems.fileTask === null)
    ) {
        return false;
    }

    if (prevItems.fileTask && nextItems.fileTask) {
        if (prevItems.fileTask.length !== nextItems.fileTask.length) {
            return false;
        }

        for (let i = 0; i < prevItems.fileTask.length; i++) {
            const prevFile = prevItems.fileTask[i];
            const nextFile = nextItems.fileTask[i];

            if (
                prevFile.name !== nextFile.name ||
                prevFile.size !== nextFile.size ||
                prevFile.type !== nextFile.type ||
                prevFile.lastModified !== nextFile.lastModified
            ) {
                return false;
            }
        }
    }

    for (let i = 0; i < prevItems.membersTask.length; i++) {
        const prevMembers = prevItems.membersTask[i];
        const nextMembers = nextItems.membersTask[i];

        if (
            prevMembers.avatar !== nextMembers.avatar ||
            prevMembers.email !== nextMembers.email ||
            prevMembers.id !== nextMembers.id ||
            prevMembers.name !== nextMembers.name ||
            prevMembers.surname !== nextMembers.surname
        ) {
            return false;
        }
    }

    for (let i = 0; i < prevItems.subtasks.length; i++) {
        const prevSubtasks = prevItems.subtasks[i];
        const nextSubtasks = nextItems.subtasks[i];

        if (
            prevSubtasks.checked !== nextSubtasks.checked ||
            prevSubtasks.description !== nextSubtasks.description
        ) {
            return false;
        }
    }

    return true;
};

export const checkSubtasksProps = (
    prevItems: ISubtasks[],
    nextItems: ISubtasks[],
) => {
    if (prevItems.length !== nextItems.length) {
        return false;
    }

    for (let i = 0; i < prevItems.length; i++) {
        const prevSubtasks = prevItems[i];
        const nextSubtasks = nextItems[i];

        if (
            prevSubtasks.checked !== nextSubtasks.checked ||
            prevSubtasks.description !== nextSubtasks.description
        ) {
            return false;
        }
    }

    return true;
};

export const checkMembersProps = (
    prevItems: IMembers[],
    nextItems: IMembers[],
) => {
    if (prevItems.length !== nextItems.length) {
        return false;
    }

    for (let i = 0; i < prevItems.length; i++) {
        const prevMembers = prevItems[i];
        const nextMembers = nextItems[i];

        if (
            prevMembers.avatar !== nextMembers.avatar ||
            prevMembers.email !== nextMembers.email ||
            prevMembers.id !== nextMembers.id ||
            prevMembers.name !== nextMembers.name ||
            prevMembers.surname !== nextMembers.surname
        ) {
            return false;
        }
    }

    return true;
};

export const checkCategoryProps = (
    prevItems: string[],
    nextItems: string[],
) => {
    if (prevItems.length !== nextItems.length) {
        return false;
    }

    for (let i = 0; i < prevItems.length; i++) {
        const prevMembers = prevItems[i];
        const nextMembers = nextItems[i];

        if (prevMembers !== nextMembers) {
            return false;
        }
    }

    return true;
};
