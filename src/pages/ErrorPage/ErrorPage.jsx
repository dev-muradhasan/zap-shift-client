import { Link } from "react-router";
import errorImg from "../../assets/18499954_bubble_gum200_89 1.png"

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-[#eef0f1] my-5">

            <div className="w-full min-h-125 bg-white rounded-2xl flex flex-col items-center justify-center text-center px-6">

                {/* Illustration */}
                <img
                    src={errorImg}
                    alt="404 Error"
                    className="w-44 md:w-54 lg:w-65"
                />

                {/* Error Text */}
                {/* <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
                    Error 404
                </h1> */}

                {/* Go Home Button */}
                <Link
                    to="/"
                    className="
                        mt-3
                        bg-[#c5f23f]
                        hover:bg-[#b8e936]
                        text-[#1f2d16]
                        font-semibold
                        text-sm
                        px-5
                        py-2.5
                        rounded-md
                        transition
                        duration-200
                    "
                >
                    Go Home
                </Link>

            </div>

        </div>
    );
};

export default ErrorPage;