import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
    FaBars,
    FaBell,
    FaChevronDown,
    FaChevronRight,
    FaTachometerAlt,
    FaFileInvoice,
    FaStore,
    FaTags,
    FaMapMarkedAlt,
    FaCog,
    FaLock,
    FaQuestionCircle,
    FaSignOutAlt,
    FaTimes,
    FaUserCircle,
    FaBox,
    FaMotorcycle,
    FaUsers,
    FaCreditCard,
    FaUserCheck,
    FaTasks,
} from "react-icons/fa";
import Logo from "../components/Logo/Logo";
import useAuth from "../hooks/useAuth";
import { FaBoxOpen } from "react-icons/fa6";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
    const { role, roleLoading } = useRole()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const { user, logOut } = useAuth();

    const handleSignOut = () => {
        logOut().catch((error) => {
            console.error(error);
        });
    };

    const menuItems = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <FaTachometerAlt />,
        },
        {
            title: "Send Parcel",
            path: "/dashboard/parcel",
            icon: <FaBoxOpen />
        },
        {   
            title: "My Parcel",
            path: "/dashboard/my_parcel",
            icon: <FaBox />,
        },
                
        {
            title: "Payment History",
            path: "/dashboard/payment-history",
            icon: <FaCreditCard />,
        },
        {
            title: "Users Management",
            path: "/dashboard/users-management",
            icon: <FaUsers />,
        },
        {
            title: "Rider Management",
            path: "/dashboard/approve-rider",
            icon: <FaMotorcycle />,
        },
        {
            title: 'Assign Rider',
            path: "/dashboard/assign-rider",
            icon: <FaUserCheck />,
        },
        {
            title: 'Assigned Deliveries',
            path: "/dashboard/assigned-deliveries",
            icon: <FaTasks />,
        },
        {
            title: 'Completed Deliveries',
            path: "/dashboard/completed-deliveries",
            icon: <FaTasks />,
        },
        {
            title: "Invoices",
            path: "/dashboard/invoices",
            icon: <FaFileInvoice />,
        },
        {
            title: "Stores",
            path: "/dashboard/stores",
            icon: <FaStore />,
        },
        {
            title: "Pricing Plan",
            path: "/dashboard/pricing",
            icon: <FaTags />,
        },
        {
            title: "Coverage Area",
            path: "/coverage",
            icon: <FaMapMarkedAlt />,
        },
    ];

    const generalItems = [
        {
            title: "Settings",
            path: "/dashboard/settings",
            icon: <FaCog />,
        },
        {
            title: "Change Password",
            path: "/dashboard/change-password",
            icon: <FaLock />,
        },
        {
            title: "Help",
            path: "/dashboard/help",
            icon: <FaQuestionCircle />,
        },
    ];

    const filteredMenuItems = menuItems.filter((item) => {
        const adminRoutes = [
            "Rider Management",
            "Users Management",
            "Assign Rider",
        ];
        const riderRoutes = [
            "Assigned Deliveries",
            "Completed Deliveries",
        ]
        if (adminRoutes.includes(item.title)) {
            return role === "admin";
        }
        if (riderRoutes.includes(item.title)) {
            return role === "rider";
        }
        return true;
    });

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="flex h-15 items-center justify-between border-b border-gray-100 px-4">
                <div onClick={() => setSidebarOpen(false)}>
                    <Logo />
                </div>

                <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-xl text-gray-500 lg:hidden"
                >
                    <FaTimes />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
                {/* Menu */}
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                    Menu
                </p>

                <div className="space-y-1">
                    {!roleLoading && filteredMenuItems.map((item) => (
                      
                        <NavLink
                            key={item.title}
                            to={item.path}
                            end={item.path === "/dashboard"}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center justify-between rounded-lg px-3 py-2.5 text-xs transition ${isActive
                                    ? "bg-[#C8F24A] font-semibold text-gray-900"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-sm">{item.icon}</span>
                                {item.title}
                            </span>

                            {item.expandable && (
                                <FaChevronRight className="text-xs" />
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* General */}
                <p className="mb-3 mt-7 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                    General
                </p>

                <div className="space-y-1">
                    {generalItems.map((item) => (
                        <NavLink
                            key={item.title}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition ${isActive
                                    ? "bg-[#C8F24A] font-semibold text-gray-900"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <span className="text-sm">{item.icon}</span>
                            {item.title}
                        </NavLink>
                    ))}

                    <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                    >
                        <FaSignOutAlt className="text-sm" />
                       Sign Out
                    </button>
                </div>
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-100 px-4 py-3">
                <p className="text-center text-[10px] text-gray-400">
                    © 2026 ZapShift
                </p>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#EAECED] text-gray-800">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <button
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-62.5 flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:w-60 ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {sidebarContent}
            </aside>

            {/* Main Section */}
            <div className="min-h-screen lg:ml-60">
                {/* Topbar */}
                <header className="sticky top-0 z-30 flex h-15 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-5">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-lg cursor-pointer text-gray-600 transition hover:text-gray-900"
                            aria-label="Open sidebar"
                        >
                            <FaBars/>
                        </button>

                        <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
                            <span>Dashboard</span>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3">
                        <button
                            aria-label="Notifications"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-600 transition hover:bg-gray-50"
                        >
                            <FaBell />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-gray-50 cursor-pointer"
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="h-9 w-9 text-gray-300" />
                                )}

                                <div className="hidden text-left sm:block">
                                    <p className="max-w-32 truncate font-semibold text-gray-800">
                                        {user?.displayName || "User"}
                                    </p>
                                    <p className="text-[12px] text-gray-500">
                                       {role}
                                    </p>
                                </div>

                                <FaChevronDown className="ml-1 text-[10px] text-gray-500" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                                    <Link
                                        to="/"
                                        onClick={() => setProfileOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setProfileOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
                                    >
                                        Dashboard
                                    </Link>

                                    <button
                                        onClick={handleSignOut}
                                        className="mt-1 flex w-full items-center gap-2 border-t border-gray-100 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <FaSignOutAlt />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-3 sm:p-4">
                    <div className="min-h-[calc(100vh-100px)] rounded-2xl bg-white p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;