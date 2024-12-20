import { BeatLoader } from "react-spinners";

export default function LoadingProject() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <img
                src="images/catastronaut.png"
                alt="cat astronaut"
                className="w-1/6"
            />
            <div className="flex items-center gap-3">
                <h3 className="text-4xl">Loading...</h3>
                <BeatLoader className="mt-2" color="#0096FF" size={15} />
            </div>
        </div>
    );
}
