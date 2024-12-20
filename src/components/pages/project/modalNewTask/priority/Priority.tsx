import { Field, ErrorMessage } from "formik";

import ErrMessage from "../../../../ui/errMessage/ErrMessage";

export default function Priority() {
    return (
        <div className="grid gap-1 w-full">
            <label htmlFor="priorityTask" className="modal-new-task__label">
                Priority
            </label>
            <Field
                id="priorityTask"
                name="priorityTask"
                as="select"
                className="modal-new-task__input"
            >
                <option value="" disabled hidden>
                    Select Priority
                </option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </Field>
            <ErrorMessage name="priorityTask">
                {(msg) => <ErrMessage msg={msg} />}
            </ErrorMessage>
        </div>
    );
}
