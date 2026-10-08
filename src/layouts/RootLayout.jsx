import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";


const RootLayout = () => {
    return (
        <div className="bg-[#eef0f1]">
            <div className="mx-auto max-w-300 flex flex-col min-h-screen px-4 md:px-7">
                <Navbar></Navbar>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;