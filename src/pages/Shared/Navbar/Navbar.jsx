import Logo from "../../../components/Logo/Logo";


import { Link, NavLink } from "react-router";
import { FaArrowRight, FaArrowRightFromBracket } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logOut } = useAuth();

    const handleSignOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error);
            })
    }

    const navLinks = [
        { name: "Services", path: "/services" },
        { name: "Coverage", path: "/coverage" },
        { name: "About Us", path: "/about" },
        { name: "Pricing", path: "/pricing" },
        { name: "Send Parcel", path: "/parcel" },
        { name: "Be a Rider", path: "/rider" },
    ];

    return (
        <header className="w-full py-5">
            <nav className="rounded-xl md:rounded-2xl bg-white px-5 py-3 shadow-sm">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Logo></Logo>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-7 lg:flex">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition ${isActive
                                        ? "bg-accent-content py-1 px-2.5 rounded-2xl"
                                        : "text-secondary hover:text-[#9fca32]"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="hidden items-center sm:flex">
                        {
                            user ? (<button
                                onClick={handleSignOut}
                                className="rounded-xl bg-accent-content px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-[#b4e83b] flex items-center justify-center gap-2"
                            >
                                <FaArrowRightFromBracket />
                                Sign Out
                            </button>) : (
                                <>
                                    <Link
                                        to="/signin"
                                        className="rounded-xl mr-2 border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="rounded-xl bg-accent-content px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-[#b4e83b]"
                                    >
                                        Sign Up
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#222] text-[#c2f34b] transition hover:scale-105"
                                    >
                                        {/* <FaArrowUpRightFromSquare className="text-sm" /> */}
                                        <FaArrowRight size={18} className="-rotate-45" />
                                    </Link>
                                </>
                            )
                        }

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded-lg p-2 text-2xl text-gray-700 sm:hidden"
                    >
                        {open ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="mt-4 border-t border-gray-100 pt-4 sm:hidden">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-secondary hover:bg-gray-50 hover:text-gray-900"
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        <div className="mt-3 flex border-t border-gray-100 pt-3">
                            <Link
                                to="/signin"
                                className="flex-1 mr-2 rounded-xl border border-gray-200 py-2.5 text-center text-sm font-semibold"
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/signup"
                                className="flex-1 rounded-xl bg-accent-content py-2.5 text-center text-sm font-semibold"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;