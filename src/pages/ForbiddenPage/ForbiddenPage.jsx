
import { Link } from "react-router";
import { FaLock, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ForbiddenPage = () => {
    return (
        <div className="min-h-screen my-5">
            <div className="w-full min-h-125 bg-white rounded-2xl flex flex-col items-center justify-center text-center px-6 py-10">

                {/* Illustration */}
                <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[#EAF5F4]">
                    <FaLock className="text-6xl text-[#03373D]" />
                </div>

                {/* Error Text */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#03373D]">
                    403
                </h1>

                <h2 className="mt-3 text-xl md:text-2xl font-bold text-[#03373D]">
                    Access Forbidden!
                </h2>

                <p className="mt-3 max-w-md text-sm md:text-base text-[#606060] leading-7">
                    Sorry, you don't have permission to access this page.
                    Please contact the administrator if you think this is a mistake.
                </p>

                {/* Go Home Button */}
                <div className="flex justify-center items-center mt-6 gap-2">
                    <Link
                        to="/"
                        className=" inline-flex items-center gap-2 rounded-md bg-[#C5F23F] px-5 py-2.5 text-sm font-semibold text-[#1f2d16] transition duration-200 hover:bg-[#B8E936]"
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

export default ForbiddenPage;
