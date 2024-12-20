import { Dispatch, memo, SetStateAction, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

import useClickEscape from "../../../../hooks/UseClickEscape";
import useClickOutside from "../../../../hooks/UseClickOutside";

interface ModalAddMemberProps {
    setOpenModalAddMember: Dispatch<SetStateAction<boolean>>;
}

const animationSettings = {
    initial: {
        opacity: 0,
        scale: 0.75,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeOut",
            duration: 0.15,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.75,
        transition: {
            ease: "easeIn",
            duration: 0.15,
        },
    },
};

const ModalAddMember = memo(function ModalAddMember({
    setOpenModalAddMember,
}: ModalAddMemberProps) {
    const modalContainerRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalContainerRef, () => setOpenModalAddMember(false));
    useClickEscape(modalContainerRef, () => setOpenModalAddMember(false));

    const handleOpenModalAddMember = useCallback(
        (bool: boolean) => {
            setOpenModalAddMember(bool);
        },
        [setOpenModalAddMember],
    );

    return (
        <div className="fixed grid place-items-center w-svw h-svh bg-black/50 z-50">
            <motion.section
                variants={animationSettings}
                initial="initial"
                animate="animate"
                exit="exit"
                className="modal-add-member grid gap-5 w-1/3 p-6 bg-white rounded-md"
                ref={modalContainerRef}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium">
                        Add member to workspace
                    </h3>
                    <IoClose
                        className="text-xl cursor-pointer"
                        onClick={() => handleOpenModalAddMember(false)}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="email-member">Email member</label>
                    <textarea
                        id="email-member"
                        className="h-[4lh] px-4 py-2 border rounded-md"
                        placeholder="example@mail.com, example@company.com..."
                    />
                </div>
                <button className="justify-self-end px-4 py-2.5 text-sm text-white bg-bright-blue hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg focus:outline-none transition cursor-not-allowed">
                    Add Member
                </button>
            </motion.section>
        </div>
    );
});

export default ModalAddMember;
