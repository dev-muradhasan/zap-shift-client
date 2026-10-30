

import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import image from "../assets/authImage.png";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-white">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">

                {/* ================= LEFT SIDE ================= */}
                <div className="flex flex-col pb-5">

                    {/* Logo */}
                    <div className="px-8 md:px-10 lg:px-12 pt-8">
                        <Logo />
                    </div>

                    {/* Outlet */}
                    <div className="flex-1 flex items-center justify-center py-20 lg:py-10">
                        <div className="w-full max-w-md">
                            <Outlet />
                        </div>
                    </div>

                </div>


                {/* ================= RIGHT SIDE ================= */}
                <div className="hidden lg:flex bg-[#FAFDF0] items-center justify-center pb-5">

                    <img
                        src={image}
                        alt="Authentication"
                        className="w-[70%] max-w-md object-contain"
                    />

                </div>

            </div>

        </div>
    );
};

export default AuthLayout;