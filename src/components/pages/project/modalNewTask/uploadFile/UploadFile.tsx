import { memo } from "react";
import { checkInitialValuesProps } from "../../../../../script/memo";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiFile } from "react-icons/fi";
import { IInitialValues } from "../../../../../interfaces/modalNewTask/interface";

interface UploadFileProps {
    values: IInitialValues;
}

const UploadFile = memo(
    function UploadFile({ values }: UploadFileProps) {
        const formatFileSize = (size: number) => {
            if (size > 1024 * 1024) {
                return `${(size / (1024 * 1024)).toFixed(2)} MB`;
            } else {
                return `${(size / 1024).toFixed(2)} KB`;
            }
        };

        return (
            <div className="flex flex-col gap-2 w-full p-6">
                <label htmlFor="fileTask" className="text-xl font-semibold">
                    Upload a file
                </label>
                <label
                    htmlFor="fileTask"
                    className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
                >
                    <IoCloudUploadOutline className="text-3xl text-gray-400" />
                    <span className="text-sm text-gray-500 mt-2">
                        {values.fileTask
                            ? `${values.fileTask.length} file(s) selected`
                            : "Click or drag file to upload"}
                    </span>
                    <input
                        id="fileTask"
                        type="hidden"
                        className="hidden"
                        multiple
                    />
                </label>
                {values.fileTask && (
                    <div className="mt-4">
                        {Array.from(values.fileTask).map(
                            (file: File, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 border-b border-gray-200"
                                >
                                    <FiFile className="text-xl text-gray-500" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800">
                                            {file.name.length > 35
                                                ? `${file.name.slice(0, 35)}...`
                                                : file.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </span>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                )}
            </div>
        );
    },
    (prevProps, nextProps) => {
        return checkInitialValuesProps(prevProps.values, nextProps.values);
    },
);

export default UploadFile;
