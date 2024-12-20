import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";

export default function Overview() {
    return (
        <section className="overview flex justify-between items-center px-6 py-7">
            <div className="project-card flex items-center gap-4 w-full">
                <div className="grid gap-5 items-center w-full">
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-medium">
                        Project
                    </h1>
                    <div className="flex justify-between w-full">
                        <ul className="flex items-center gap-1 p-1 bg-gray-200 rounded-md">
                            <li className="overview__items cursor-not-allowed">
                                List
                            </li>
                            <li className="overview__items overview__items--active">
                                Board
                            </li>
                            <li className="overview__items cursor-not-allowed">
                                Calendar
                            </li>
                        </ul>
                        <div className="flex gap-2">
                            <div className="relative">
                                <button className="overview__btns cursor-not-allowed">
                                    <IoFilter className="text-lg" /> Filter
                                </button>
                            </div>
                            <div className="relative">
                                <button className="overview__btns cursor-not-allowed">
                                    <FaSortAmountDown /> Sort
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
