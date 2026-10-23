import { Link } from "react-router";
import errorImg from "../../assets/18499954_bubble_gum200_89 1.png"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ErrorPage = () => {
    return (
        <div className="min-h-screen my-5">

            <div className="w-full min-h-125 bg-white rounded-2xl flex flex-col items-center justify-center text-center px-6">

                {/* Illustration */}
                <img
                    src={errorImg}
                    alt="404 Error"
                    className="w-30 md:w-40 lg:w-50"
                />

                {/* Error Text */}
                {/* <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
                    Error 404
                </h1> */}

                {/* Go Home Button */}
                <div className="flex justify-center items-center gap-2 mt-3">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-md bg-[#C5F23F] px-5 py-2.5 text-sm font-semibold text-[#1f2d16] transition duration-200 hover:bg-[#B8E936]"
                    >
                        <FaArrowLeft />
                        Go Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="
                        bg-primary
                        hover:bg-[#1f2d16]
                        font-semibold
                        text-white
                        text-sm
                        inline-flex 
                        items-center
                        gap-2
                        px-5
                        py-2.5
                        rounded-md
                        transition
                        duration-200
                    "
                    >
                        Go to dashboard
                        <FaArrowRight />
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default ErrorPage;