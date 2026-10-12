// import { Outlet } from "react-router";
// import Logo from "../components/Logo/Logo";
// import image from '../assets/authImage.png'

// const AuthLayout = () => {
//     return (
//         <div className="mx-auto max-w-300 min-h-screen px-4 md:px-7">
//             <div className="my-10">
//                 <Logo></Logo>
//             </div>
//             <div className="max-w-230 mx-auto flex justify-between items-center gap-20">
//                 <div className="flex-1 bg-white">
//                     <Outlet></Outlet>
//                 </div>
//                 <div className="flex-1 bg-[#FAFDF0] w-full h-full">
//                     <img src={image} alt="" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthLayout;


// import { Outlet } from "react-router";
// import Logo from "../components/Logo/Logo";
// import image from "../assets/authImage.png";

// const AuthLayout = () => {
//     return (
//         <div className="min-h-screen bg-[#1f1f1f] py-1 px-4">
//             <div className="max-w-300 mx-auto min-h-screen bg-white">
//                 {/* Logo */}
//                 <div className="px-8 md:px-10 lg:px-12 pt-7">
//                     <Logo />
//                 </div>

//                 {/* Main Content */}
//                 <div className="max-w-230 mx-auto min-h-[500px] lg:min-h-[560px] flex items-center">
//                     {/* Form / Outlet */}
//                     <div className="w-full lg:w-1/2 bg-white px-4 md:px-0">
//                         <Outlet />
//                     </div>
//                     {/* Image */}
//                     <div className="hidden lg:flex w-1/2 min-h-[500px] lg:min-h-[560px] bg-[#FAFDF0] items-center justify-center">
//                         <img
//                             src={image}
//                             alt="Authentication"
//                             className="w-[75%] max-w-md object-contain"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthLayout;



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