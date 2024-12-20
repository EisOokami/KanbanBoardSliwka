import { memo, useCallback, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment, { Moment } from "moment";
import useClickOutside from "../../../../../hooks/UseClickOutside";
import { checkTaskProps } from "../../../../../script/memo";
import { IoCalendarClearOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import {
    ITask,
    IInitialValues,
} from "../../../../../interfaces/modalEditTask/interface";

interface DateTimeProps {
    task: ITask;
    values: IInitialValues;
    setFieldValue: (field: string, value: string) => void;
}

const DateTime = memo(
    function DateTime({ task, values, setFieldValue }: DateTimeProps) {
        const [startDate, setStartDate] = useState<Date | null>(new Date());
        const [isDueDate, setIsDueDate] = useState<boolean>(true);
        const [isTime, setIsTime] = useState<boolean>(true);
        const [isOpenPanelTime, setIsOpenPanelTime] = useState<boolean>(false);
        const timePickerContainerRef = useRef<HTMLDivElement | null>(null);

        useClickOutside(timePickerContainerRef, () => {
            if (!isOpenPanelTime) {
                setIsTime(true);
            }
        });

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
            (time: Moment) => {
                if (time !== undefined && time !== null) {
                    const formattedTime = time.format("kk:mm");

                    setFieldValue("time", formattedTime);
                }
            },
            [setFieldValue],
        );

        const handleIsDueDate = useCallback(
            (bool: boolean) => setIsDueDate(bool),
            [],
        );
        const handleIsTime = useCallback(
            (bool: boolean) => setIsTime(bool),
            [],
        );

        const styleDueDateValue = task.readonly ? "" : "cursor-pointer";
        const styleTimeValue = task.readonly ? "" : "cursor-pointer";

        return (
            <div className="flex items-center gap-7">
                <div className="flex items-center gap-1">
                    <IoCalendarClearOutline />
                    <p>Due date</p>
                </div>
                <div className="flex gap-2">
                    {isDueDate || task.readonly ? (
                        <span
                            className={`font-medium ${styleDueDateValue}`}
                            onClick={() => handleIsDueDate(false)}
                        >
                            {values.dueDate}
                        </span>
                    ) : (
                        <DatePicker
                            className="w-32 !pl-7 border rounded-lg"
                            selected={startDate}
                            onChange={(date) => handlePickDate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            showIcon
                            toggleCalendarOnIconClick
                            icon={<IoCalendarClearOutline />}
                            onBlur={() => handleIsDueDate(true)}
                        />
                    )}
                    {isTime || task.readonly ? (
                        <span
                            className={`font-medium ${styleTimeValue}`}
                            onClick={() => handleIsTime(false)}
                        >
                            {values.time}
                        </span>
                    ) : (
                        <div ref={timePickerContainerRef}>
                            <TimePicker
                                onOpen={() => setIsOpenPanelTime(true)}
                                onClose={() => setIsOpenPanelTime(false)}
                                onChange={(time) => handlePickTime(time)}
                                showSecond={false}
                                inputIcon={<GoClock />}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return (
            checkTaskProps(prevProps.task, nextProps.task) ||
            checkTaskProps(prevProps.values, nextProps.values)
        );
    },
);

export default DateTime;
