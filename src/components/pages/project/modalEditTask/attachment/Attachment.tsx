import { FiDownload } from "react-icons/fi";
import { GoPaperclip } from "react-icons/go";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function Attachment() {
    return (
        <div className="mb-1 h-min">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <GoPaperclip />
                    <p>Attachment</p>
                </div>
                <button
                    type="button"
                    className="flex items-center gap-1 text-blue-500 cursor-not-allowed"
                >
                    <FiDownload />
                    <span>Download All</span>
                </button>
            </div>
            <div className="mt-3 p-4 border border-dashed border-gray-300 rounded-lg cursor-not-allowed">
                <input
                    type="hidden"
                    id="fileUpload"
                    multiple
                    className="hidden"
                />
                <label
                    htmlFor="fileUpload"
                    className="flex flex-col items-center justify-center gap-2 p-6 text-gray-500 cursor-not-allowed"
                >
                    <AiOutlineCloudUpload className="text-3xl" />
                    <p>Click to upload or drag and drop</p>
                </label>

                <div className="mt-4"></div>
            </div>
        </div>
    );
}
