import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { auth } from "../../../services/firebaseConfig";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

const Sidebar = lazy(() => import("./sidebar/Sidebar"));
const Header = lazy(() => import("./header/Header"));
const Overview = lazy(() => import("./overview/Overview"));
const KanbanBoard = lazy(() => import("./kanban/kanbanBoard/KanbanBoard"));
const ModalAddMember = lazy(() => import("./modalAddMember/ModalAddMember"));
const ModalNewTask = lazy(() => import("./modalNewTask/ModalNewTask"));
const ModalEditTask = lazy(() => import("./modalEditTask/ModalEditTask"));

import LoadingSidebar from "../../ui/loadings/loadingSidebar/LoadingSidebar";
import LoadingHeader from "../../ui/loadings/loadingHeader/LoadingHeader";
import LoadingOverview from "../../ui/loadings/loadingOverview/LoadingOverview";
import LoadingKanbanBoard from "../../ui/loadings/loadingKanbanBoard/LoadingKanbanBoard";

export default function Project() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [openModalAddMember, setOpenModalAddMember] =
        useState<boolean>(false);
    const [openModalNewTask, setOpenModalNewTask] = useState<string | null>(
        null,
    );
    const [openModalEditTask, setOpenModalEditTask] = useState<string | null>(
        null,
    );
    const [updateColumns, setUpdateColumns] = useState<string | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                signInAnonymously(auth)
                    .then(() => {
                        setIsAuthenticated(true);
                    })
                    .catch((error) => {
                        console.error(error.message);
                    });
            }
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col justify-center items-center w-screen h-screen">
                <img
                    src="images/catastronaut.png"
                    alt="cat astronaut"
                    className="w-1/6"
                />
                <div className="grid justify-items-center gap-5">
                    <h3 className="text-4xl">Loading...</h3>
                    <h3 className="text-2xl">You are signing in as a Guest</h3>
                </div>
            </div>
        );
    }

    if (screenWidth < 800) {
        return (
            <div className="grid content-center justify-items-center h-screen p-32">
                <img src="images/cat.png" alt="cat" className="w-full" />
                <p className="text-2xl font-bold">
                    This site does not support tablets or phones. Please use a
                    desktop or laptop.
                </p>
            </div>
        );
    }

    return (
        <section className="flex h-svh">
            <Suspense fallback={<LoadingSidebar />}>
                <Sidebar />
            </Suspense>
            <main className="grid auto-rows-min-content w-full py-6 overflow-hidden">
                <Suspense fallback={<LoadingHeader />}>
                    <Header setOpenModalAddMember={setOpenModalAddMember} />
                </Suspense>
                <Suspense fallback={<LoadingOverview />}>
                    <Overview />
                </Suspense>
                <Suspense fallback={<LoadingKanbanBoard />}>
                    <KanbanBoard
                        setOpenModalNewTask={setOpenModalNewTask}
                        setOpenModalEditTask={setOpenModalEditTask}
                        updateColumns={updateColumns}
                    />
                </Suspense>
            </main>
            <AnimatePresence>
                {openModalAddMember && (
                    <Suspense>
                        <ModalAddMember
                            key="modal-add-member"
                            setOpenModalAddMember={setOpenModalAddMember}
                        />
                    </Suspense>
                )}
                {openModalNewTask && (
                    <Suspense>
                        <ModalNewTask
                            key="modal-new-task"
                            openModalNewTask={openModalNewTask}
                            setOpenModalNewTask={setOpenModalNewTask}
                            setUpdateColumns={setUpdateColumns}
                        />
                    </Suspense>
                )}
                {openModalEditTask && (
                    <Suspense>
                        <ModalEditTask
                            key="modal-edit-task"
                            openModalEditTask={openModalEditTask}
                            setOpenModalEditTask={setOpenModalEditTask}
                            setUpdateColumns={setUpdateColumns}
                        />
                    </Suspense>
                )}
            </AnimatePresence>
        </section>
    );
}
