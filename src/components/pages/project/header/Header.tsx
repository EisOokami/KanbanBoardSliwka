import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { IoChevronForward, IoSettingsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

interface HeaderProps {
    setOpenModalAddMember: Dispatch<SetStateAction<boolean>>;
}

const Header = memo(function Header({ setOpenModalAddMember }: HeaderProps) {
    const handleOpenModalAddMember = useCallback(
        (bool: boolean) => {
            setOpenModalAddMember(bool);
        },
        [setOpenModalAddMember],
    );

    return (
        <header className="header flex justify-between items-center px-6 pb-6 border-b">
            <div className="flex items-center space-x-2 text-gray-600">
                <span className="path__items cursor-not-allowed">Home</span>
                <IoChevronForward className="path__items-icon" />
                <span className="path__items cursor-not-allowed">Tasks</span>
                <IoChevronForward className="path__items-icon" />
                <span className="path__items path__items--active">Project</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="flex items-center gap-1 px-3 py-2 text-white bg-bright-blue hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg focus:outline-none transition"
                    onClick={() => handleOpenModalAddMember(true)}
                >
                    Find Members <FaPlus />
                </button>
                <span className="p-1 xl:p-2 lg:text-xl xl:text-2xl hover:bg-gray-100 rounded-md cursor-not-allowed">
                    <IoSettingsOutline />
                </span>
            </div>
        </header>
    );
});

export default Header;
