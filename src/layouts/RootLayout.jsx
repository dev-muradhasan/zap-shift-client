import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";


const RootLayout = () => {
    return (
        <div className="bg-[#eef0f1] flex flex-col min-h-screen">
            <Navbar></Navbar>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;