import { Field, ErrorMessage } from "formik";

import ErrMessage from "../../../../ui/errMessage/ErrMessage";

export default function Title() {
    return (
        <div className="grid gap-1">
            <label htmlFor="titleTask" className="modal-new-task__label">
                Title
            </label>
            <Field
                type="text"
                id="titleTask"
                name="titleTask"
                className="modal-new-task__input"
                placeholder="Enter a title"
                autoComplete="off"
            />
            <ErrorMessage name="titleTask">
                {(msg) => <ErrMessage msg={msg} />}
            </ErrorMessage>
        </div>
    );
}
