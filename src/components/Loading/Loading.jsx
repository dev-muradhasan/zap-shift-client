import { FadeLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className="my-40 flex items-center justify-center">
            <FadeLoader color="#9fca32" />
        </div>
    );
};

export default Loading;