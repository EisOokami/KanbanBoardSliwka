import { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment, { Moment } from "moment";
import { ErrorMessage } from "formik";
import { IoCalendarClearOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";

import ErrMessage from "../../../../ui/errMessage/ErrMessage";

interface DateTimeProps {
    setFieldValue: (field: string, value: string) => void;
}

export default function DateTime({ setFieldValue }: DateTimeProps) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handlePickDate = useCallback(
        (date: Date | null) => {
            if (date !== null) {
                const formattedDate = moment(date).format("DD.MM.YYYY");

                setStartDate(date);
                setFieldValue("dueDate", formattedDate);
            }
        },
        [setFieldValue],
    );

    const handlePickTime = useCallback(
        (time: Moment | null) => {
            if (time) {
                const formattedTime = time.format("kk:mm");
                setFieldValue("time", formattedTime);
            } else {
                setFieldValue("time", "");
            }
        },
        [setFieldValue],
    );

    return (
        <div className="flex items-start gap-3">
            <div className="grid gap-1 w-full">
                <p className="modal-new-task__label">Due Date</p>
                <DatePicker
                    className="w-full !pl-7 border rounded-lg"
                    selected={startDate}
                    onChange={(date) => handlePickDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    showIcon
                    toggleCalendarOnIconClick
                    icon={<IoCalendarClearOutline />}
                />
                <ErrorMessage name="dueDate">
                    {(msg) => <ErrMessage msg={msg} />}
                </ErrorMessage>
            </div>
            <div className="grid gap-1 w-full">
                <p className="modal-new-task__label">Time</p>
                <TimePicker
                    onChange={(time) => handlePickTime(time)}
                    showSecond={false}
                    inputIcon={<GoClock />}
                />
                <ErrorMessage name="time">
                    {(msg) => <ErrMessage msg={msg} />}
                </ErrorMessage>
            </div>
        </div>
    );
}
