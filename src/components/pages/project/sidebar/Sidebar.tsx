import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineProject } from "react-icons/ai";
import { IoHelpCircleOutline, IoCalendarClearOutline } from "react-icons/io5";
import { IoMdNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

import Option from "./option/Option";

export default function Sidebar() {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const handleOpenSidebar = useCallback(
        (bool: boolean) => setIsOpenSidebar(bool),
        [],
    );

    return (
        <>
            <div className="relative w-28"></div>
            <motion.nav
                onMouseEnter={() => handleOpenSidebar(true)}
                onMouseLeave={() => handleOpenSidebar(false)}
                layout
                style={{ width: isOpenSidebar ? "250px" : "fit-content" }}
                className="sidebar absolute grid p-5 h-full bg-white border-r z-50"
            >
                <div className="grid content-start gap-5">
                    <div className="pb-4 border-b-4">
                        <div className="logo flex justify-center cursor-pointer">
                            <motion.div layout className="animation">
                                <img
                                    src="images/generallogoblue.png"
                                    alt="logo"
                                    className="w-14"
                                />
                            </motion.div>
                        </div>
                    </div>
                    <ul className="grid content-center gap-2">
                        <Option
                            Icon={AiOutlineProject}
                            title="Tasks"
                            isOpen={isOpenSidebar}
                            active={true}
                            isAllowed={true}
                        />
                        <Option
                            Icon={IoCalendarClearOutline}
                            title="Schedule"
                            isOpen={isOpenSidebar}
                            active={false}
                            isAllowed={false}
                        />
                        <Option
                            Icon={IoMdNotificationsOutline}
                            title="Notification"
                            isOpen={isOpenSidebar}
                            active={false}
                            isAllowed={false}
                        />
                        <Option
                            Icon={IoHelpCircleOutline}
                            title="FAQ"
                            isOpen={isOpenSidebar}
                            active={false}
                            isAllowed={false}
                        />
                        <Option
                            Icon={FaGithub}
                            title="Github"
                            isOpen={isOpenSidebar}
                            active={false}
                            isAllowed={true}
                            href="https://github.com/LakioLive"
                            target="_blank"
                        />
                    </ul>
                </div>
                <motion.div
                    layout
                    className="self-end flex justify-between items-center gap-10 w-full h-min p-3 bg-gray-100 border rounded-2xl cursor-not-allowed"
                >
                    <div className="flex gap-2">
                        <div className="flex">
                            <motion.div layout>
                                <img
                                    src="images/generallogowhite.png"
                                    alt="profile"
                                    className="w-10 h-10 bg-white rounded-2xl"
                                />
                            </motion.div>
                        </div>
                        {isOpenSidebar && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.125 }}
                                className="grid place-content-start"
                            >
                                <p className="w-max text-sm">Guest</p>
                                <p className="w-max text-xs text-gray-500">
                                    Guest role
                                </p>
                            </motion.div>
                        )}
                    </div>
                    {isOpenSidebar && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
                            <IoIosLogOut className="cursor-not-allowed" />
                        </motion.div>
                    )}
                </motion.div>
            </motion.nav>
        </>
    );
}
