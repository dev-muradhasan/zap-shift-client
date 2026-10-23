
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    FaUsers,
    FaSearch,
    FaEnvelope,
    FaCalendarAlt,
    FaUserShield,
    FaUser,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import ErrorPage from "../../ErrorPage/ErrorPage";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");

    // Fetch users using TanStack Query
    const {
        data: users = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // Search and role filtering
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchText = search.toLowerCase().trim();

            const matchesSearch =
                (user.displayName || "")
                    .toLowerCase()
                    .includes(searchText) ||
                (user.email || "")
                    .toLowerCase()
                    .includes(searchText);

            const matchesRole =
                selectedRole === "all" ||
                (user.role || "user").toLowerCase() === selectedRole;

            return matchesSearch && matchesRole;
        });
    }, [users, search, selectedRole]);

    // Format registration date
    const formatDate = (date) => {
        if (!date) return "N/A";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "N/A";
        }

        return parsedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Dhaka",
        });
    };

    // Role badge styles
    const getRoleStyle = (role) => {
        switch ((role || "user").toLowerCase()) {
            case "admin":
                return "bg-purple-100 text-purple-700";

            case "rider":
                return "bg-blue-100 text-blue-700";

            default:
                return "bg-[#EAF5F4] text-[#03373D]";
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <Loading></Loading>
        );
    }

    // Error state
    if (isError) {
        return <ErrorPage></ErrorPage>;
    }

    return (
        <div className="min-h-screen rounded-2xl bg-white">
            {/* Page Heading */}
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-gray-400">
                        Dashboard / Users
                    </p>

                    <h1 className="text-3xl font-bold text-[#03373D] sm:text-4xl">
                        All Users
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        View and manage all registered users.
                    </p>
                </div>

                {/* Total Users */}
                <div className="flex items-center gap-3 self-start rounded-xl bg-[#03373D] px-5 py-4 text-white shadow-sm sm:self-auto">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#CAEB66]">
                        <FaUsers size={21} />
                    </div>

                    <div>
                        <p className="text-sm text-white/70">
                            Total Users
                        </p>

                        <p className="text-2xl font-bold">
                            {users.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered input-sm w-full text-sm"
                        />
                    </div>

                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="select select-bordered select-sm w-full text-sm md:w-44"
                    >
                        <option value="all">All Roles</option>
                        <option value="user">Users</option>
                        <option value="rider">Riders</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-5 py-5">
                    <h2 className="text-lg font-bold text-[#03373D]">
                        Registered Users
                    </h2>

                    <span className="rounded-full bg-[#F0F7F6] px-3 py-1.5 text-xs font-semibold text-[#03373D]">
                        {filteredUsers.length} users found
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="table min-w-187.5">
                        <thead>
                            <tr className="bg-[#F7FAFA] text-xs uppercase tracking-wider text-gray-500">
                                <th className="py-4 pl-6">#</th>
                                <th>User Information</th>
                                <th>Role</th>
                                <th>Registration Date</th>
                                <th className="pr-6">Account</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr
                                    key={user._id || user.email}
                                    className="border-b border-gray-50 transition hover:bg-[#F8FBFB]"
                                >
                                    <td className="pl-6 font-medium text-gray-400">
                                        {index + 1}
                                    </td>

                                    {/* User Info */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gray-100 bg-[#EAF5F4]">
                                                {user.photoURL ? (
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user.displayName || "User"}
                                                        referrerPolicy="no-referrer"
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = "none";
                                                            e.currentTarget.nextElementSibling.style.display = "flex";
                                                        }}
                                                    />
                                                ) : null}

                                                <div
                                                    className="h-full w-full items-center justify-center text-[#03373D]"
                                                    style={{
                                                        display: user.photoURL
                                                            ? "none"
                                                            : "flex",
                                                    }}
                                                >
                                                    <FaUser size={18} />
                                                </div>
                                            </div>

                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-800">
                                                    {user.displayName || "Unnamed User"}
                                                </p>

                                                <p className="mt-1 flex items-center gap-1.5 break-all text-xs text-gray-400">
                                                    <FaEnvelope className="shrink-0" />
                                                    {user.email || "No email"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td>
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getRoleStyle(user.role)}`}
                                        >
                                            {user.role === "admin" ? (
                                                <FaUserShield />
                                            ) : (
                                                <FaUser />
                                            )}

                                            {user.role || "user"}
                                        </span>
                                    </td>

                                    {/* Registration Date */}
                                    <td>
                                        <span className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaCalendarAlt className="shrink-0 text-gray-400" />

                                            {formatDate(user.createdAt)}
                                        </span>
                                    </td>

                                    {/* Account */}
                                    <td className="pr-6">
                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                            Registered
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {/* Empty State */}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-16 text-center"
                                    >
                                        <FaUsers className="mx-auto mb-3 text-4xl text-gray-300" />

                                        <p className="font-semibold text-gray-600">
                                            No users found
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            Try another name, email, or role.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 px-5 py-4 text-xs text-gray-400">
                    <p>
                        Showing {filteredUsers.length} of {users.length} users
                    </p>

                    <p>Zap-shift User Management</p>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
