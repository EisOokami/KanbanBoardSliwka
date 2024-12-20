import { lazy, Suspense } from "react";
import "../styles/style.scss";

import LoadingProject from "./ui/loadings/loadingProject/LoadingProject";
const Project = lazy(() => import("./pages/project/Project"));

export default function App() {
    return (
        <Suspense fallback={<LoadingProject />}>
            <Project />
        </Suspense>
    );
}
