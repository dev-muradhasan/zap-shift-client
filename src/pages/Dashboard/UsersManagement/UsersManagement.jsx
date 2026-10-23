
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    FaUsers,
    FaSearch,
    FaEnvelope,
    FaUserShield,
    FaUser,
    FaTrash,
    FaUserCog,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import ErrorPage from "../../ErrorPage/ErrorPage";
import Swal from "sweetalert2";


const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");

    // Fetch users using TanStack Query
    const {
        refetch,
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

    const handleRoleChange = (user, role) => {
        const updateRole = { role: role };
        Swal.fire({
            title: "Are you sure?",
            text: `You want to mark ${user.displayName} as ${role === 'admin' ?'an Admin':'a User'}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, updateRole)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.displayName} marked as ${role === 'admin' ? 'an Admin' : 'a User'}`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
            }
        }))


    }


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
                                <th className="pr-6">Account</th>
                                <th className="pr-6">Actions</th>
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


                                    {/* Account */}
                                    <td className="pr-6">
                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                            Registered
                                        </span>
                                    </td>

                                    {/* action */}
                                    <td className="pr-6">
                                        <div className="flex min-w-57.5 flex-wrap items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleRoleChange(user, user.role === 'admin' ? 'user' : 'admin')}
                                                // disabled={isActionPending}
                                                className={`btn btn-sm gap-1.5 border-0 ${user.role === "admin"
                                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                                    : "bg-[#EAF5F4] text-[#03373D] hover:bg-[#D5EAE7]"
                                                    }`}
                                            >
                                                {user.role === "admin" ? (
                                                    <>
                                                        <FaUser />
                                                        Remove Admin
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaUserCog />
                                                        Make Admin
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                // onClick={() => handleDelete(user)}
                                                // disabled={isActionPending}
                                                title="Delete user"
                                                className="btn btn-sm gap-1.5 border-0 bg-red-100 text-red-600 hover:bg-red-200"
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>
                                        </div>
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

export default UsersManagement;






