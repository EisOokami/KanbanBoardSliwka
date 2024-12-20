import { Field, ErrorMessage } from "formik";

import ErrMessage from "../../../../ui/errMessage/ErrMessage";

export default function Description() {
    return (
        <div className="grid gap-1">
            <label htmlFor="descrTask" className="modal-new-task__label">
                Description
            </label>
            <Field
                id="descrTask"
                name="descrTask"
                as="textarea"
                className="modal-new-task__input h-36 max-h-40 resize-none overflow-y-auto"
                placeholder="Enter a Description"
            />
            <ErrorMessage name="descrTask">
                {(msg) => <ErrMessage msg={msg} />}
            </ErrorMessage>
        </div>
    );
}
