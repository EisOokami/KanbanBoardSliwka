import { memo } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface OptionProps {
    Icon: IconType;
    title: string;
    isOpen: boolean;
    active: boolean;
    isAllowed: boolean;
    href?: string;
    target?: string;
}

const Option = memo(function Option({
    Icon,
    title,
    isOpen,
    active,
    isAllowed,
    href,
    target,
}: OptionProps) {
    const styleActiveOption = active ? "sidebar__tabs--active" : "";
    const styleIsOpenOption = !isOpen ? "justify-center" : "";
    const styleIsAllowedOption = !isAllowed
        ? "cursor-not-allowed"
        : "cursor-pointer";

    return (
        <motion.li
            layout
            className={`sidebar__tabs ${styleIsAllowedOption} ${styleActiveOption} ${styleIsOpenOption}`}
        >
            <motion.div layout className="grid justify-items-center p-2">
                <Icon className="sidebar__tabs-icon" />
            </motion.div>
            {isOpen && (
                <motion.a
                    href={href}
                    target={target}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className={`${styleIsAllowedOption}`}
                >
                    {title}
                </motion.a>
            )}
        </motion.li>
    );
});

export default Option;
