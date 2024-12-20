import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
    useCallback,
} from "react";
import { Field, ErrorMessage } from "formik";
import { BeatLoader } from "react-spinners";
import { fetchMembers } from "../../../../../services/firebaseDatabase";
import { checkMembersProps } from "../../../../../script/memo";
import { IoClose } from "react-icons/io5";
import { IMembers } from "../../../../../interfaces/modalNewTask/interface";

import ErrMessage from "../../../../ui/errMessage/ErrMessage";

interface MembersProps {
    selectedMembers: IMembers[];
    setSelectedMembers: Dispatch<SetStateAction<IMembers[]>>;
    setFieldValue: (field: string, value: IMembers[] | null) => void;
}

const Members = memo(
    function Members({
        selectedMembers,
        setSelectedMembers,
        setFieldValue,
    }: MembersProps) {
        const [membersData, setMemberData] = useState<IMembers[]>([]);
        const [searchItem, setSearchItem] = useState<string>("");
        const [filteredMembers, setFilteredMembers] = useState<IMembers[]>([]);
        const [showList, setShowList] = useState<boolean>(false);
        const [isLoading, setIsLoading] = useState<boolean>(true);

        useEffect(() => {
            fetchMembers(
                setMemberData,
                setIsLoading,
                setFilteredMembers,
                setShowList,
            );
        }, []);

        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const searchTerm = e.target.value;
                setSearchItem(searchTerm);

                const filteredItems = membersData.filter((member) => {
                    const connectedMemberData =
                        member.name + member.surname + member.email;

                    return connectedMemberData
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                });

                setFilteredMembers(filteredItems);
            },
            [membersData],
        );

        const handleSelectMember = useCallback(
            (listIndex: number) => {
                const selectedMember = filteredMembers[listIndex];
                const filteredItems = filteredMembers.filter(
                    (_, i) => listIndex !== i,
                );
                const newMemberData = membersData.filter(
                    (member) => member.id !== selectedMember.id,
                );

                setSelectedMembers([...selectedMembers, selectedMember]);
                setFilteredMembers(filteredItems);
                setMemberData(newMemberData);
                setFieldValue("membersTask", [
                    ...selectedMembers,
                    selectedMember,
                ]);
            },
            [
                filteredMembers,
                membersData,
                selectedMembers,
                setFieldValue,
                setSelectedMembers,
            ],
        );

        const handleRemoveSelectedMember = useCallback(
            (listIndex: number) => {
                const selectedMember = selectedMembers[listIndex];
                const newSelectedMembers = selectedMembers.filter(
                    (_, i) => listIndex !== i,
                );

                setMemberData([...membersData, selectedMember]);
                setFilteredMembers([...filteredMembers, selectedMember]);
                setSelectedMembers(newSelectedMembers);
                setFieldValue("membersTask", newSelectedMembers);
            },
            [
                filteredMembers,
                membersData,
                selectedMembers,
                setFieldValue,
                setSelectedMembers,
            ],
        );

        const handleShowList = useCallback((bool: boolean) => {
            setShowList(bool);
        }, []);

        const handleCloseList = useCallback(() => {
            setTimeout(() => handleShowList(false), 300);
        }, [handleShowList]);

        return (
            <div className="grid">
                <label
                    htmlFor="membersTask"
                    className="modal-new-task__label mb-2"
                >
                    Engaged Members
                </label>
                <Field
                    type="text"
                    id="membersTask"
                    name="membersTask"
                    value={searchItem}
                    className="modal-new-task__input"
                    placeholder="Enter members"
                    autoComplete="off"
                    onFocus={() => handleShowList(true)}
                    onBlur={handleCloseList}
                    onChange={handleInputChange}
                />
                <ErrorMessage name="membersTask">
                    {(msg) => <ErrMessage msg={msg} />}
                </ErrorMessage>
                {showList && isLoading && (
                    <div className="loader flex justify-center items-center w-full">
                        <BeatLoader color="#0096FF" size={15} />
                    </div>
                )}
                {showList && !isLoading && (
                    <div className="relative">
                        <ul className="absolute top-0 left-0 w-full bg-white border rounded-lg shadow">
                            {filteredMembers.map((member, i) => (
                                <li
                                    key={member.id}
                                    className="flex gap-1 px-3 py-2 hover:bg-gray-100 rounded-md transition cursor-pointer"
                                    onClick={() => handleSelectMember(i)}
                                >
                                    <img
                                        src={member.avatar}
                                        alt={member.surname}
                                        width={20}
                                    />
                                    <p className="text-sm">
                                        {member.name} {member.surname}
                                    </p>
                                    <p className="text-sm">{member.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedMembers.length !== 0 && (
                    <div className="mt-1 cursor-pointer">
                        <ul className="flex flex-wrap gap-2">
                            {selectedMembers.map((member, i) => (
                                <li
                                    key={member.id}
                                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-2xl transition"
                                    onClick={() =>
                                        handleRemoveSelectedMember(i)
                                    }
                                >
                                    <img
                                        src={member.avatar}
                                        alt={member.surname}
                                        width={20}
                                        className="rounded-2xl"
                                    />
                                    <p className="text-sm">
                                        {member.name} {member.surname}
                                    </p>
                                    <IoClose />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    },
    (prevProps, nextProps) => {
        return checkMembersProps(
            prevProps.selectedMembers,
            nextProps.selectedMembers,
        );
    },
);

export default Members;
