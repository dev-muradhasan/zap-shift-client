import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import { FaArrowRight, FaArrowRightFromBracket, FaChevronDown } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { BeatLoader } from "react-spinners";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logOut, loading } = useAuth();

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
        { name: "Send Parcel", path: "/dashboard/parcel" },
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
                    {loading ?
                    <BeatLoader color="#36d7b7" /> 
                    : <div className="hidden items-center sm:flex">
                        {
                            user ? (<div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex items-center gap-3 px-3 transition bg-gray-50 rounded-2xl"
                                >
                                    {
                                        user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={""}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                                <FaUserCircle className="text-3xl text-gray-500" />
                                            </div>
                                        )
                                    }

                                    <div className="max-w-32 text-left">
                                        <p className="truncate text-sm font-semibold text-gray-800">
                                            {user.displayName || "User"}
                                        </p>
                                        <p className="text-xs text-gray-500">My Account</p>
                                    </div>

                                    <FaChevronDown className="text-xs text-gray-500" />
                                </div>



                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu z-50 mt-3 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
                                >
                                    <li>
                                        <Link to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li className="mt-1 border-t border-gray-100 pt-1">
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                                        >
                                            <FaArrowRightFromBracket />
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>) : (
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

                    </div>}
                   

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

                        {/* Mobile User Dropdown */}
                        {user ? (
                            <div className="dropdown dropdown-end mt-3 w-full">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-3"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={"User"}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-500">
                                                <FaUserCircle />
                                            </div>
                                        )}

                                        <div className="min-w-0 text-left">
                                            <p className="truncate text-sm font-semibold text-gray-800">
                                                {user.displayName || "User"}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                My Account
                                            </p>
                                        </div>
                                    </div>

                                    <FaChevronDown className="ml-2 shrink-0 text-xs text-gray-500" />
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu z-50 mt-2 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
                                >
                                    <li>
                                        <Link
                                            to="/"
                                            onClick={() => setOpen(false)}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li className="mt-1 border-t border-gray-100 pt-1">
                                        <button
                                            onClick={() => {
                                                setOpen(false);
                                                handleSignOut();
                                            }}
                                            className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                                        >
                                            <FaArrowRightFromBracket />
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="mt-3 flex border-t border-gray-100 pt-3">
                                <Link
                                    to="/signin"
                                    onClick={() => setOpen(false)}
                                    className="mr-2 flex-1 rounded-xl border border-gray-200 py-2.5 text-center text-sm font-semibold"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 rounded-xl bg-accent-content py-2.5 text-center text-sm font-semibold"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;