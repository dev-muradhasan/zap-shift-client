import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router";
import { FaEye, FaTrash, FaUserMinus, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";


const ApproveRider = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, isLoading, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const riderStatusUpdate = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has been ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = rider => {
        riderStatusUpdate(rider, 'approved')
    }
    const handleReject = rider => {
        riderStatusUpdate(rider, 'rejected')
    }

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: 'You want to delete it',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/riders/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Rider has been deleted.",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
            }

        })
    }
    return (
        <div className="w-full min-w-0">
            {/* Heading */}
            <h2 className="mb-6 text-3xl font-bold text-primary sm:text-4xl">
                Riders application: {riders.length}
            </h2>

            {/* Table Container */}
            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-base-200 bg-white">
                <div className="w-full overflow-x-auto">
                    <table className="table w-full min-w-187.5 text-xs sm:text-sm">
                        {/* Table Head */}
                        <thead>
                            <tr className="border-b border-base-200 bg-gray-50 text-primary">
                                <th className="whitespace-nowrap font-bold">
                                    #
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Rider Name
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Email
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    District
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Status
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {riders.map((rider, index) => (
                                <tr
                                    key={rider._id}
                                    className="border-b border-base-200 transition-colors even:bg-gray-100 odd:bg-white hover:bg-[#F0F7F7]"
                                >
                                    {/* Serial Number */}
                                    <td className="font-semibold text-gray-600">
                                        {index + 1}
                                    </td>

                                    {/* Rider Name */}
                                    <td className="whitespace-nowrap font-semibold text-primary">
                                        {rider.name}
                                    </td>

                                    {/* Email */}
                                    <td className="whitespace-nowrap text-gray-600">
                                        {rider.email}
                                    </td>

                                    {/* District */}
                                    <td className="whitespace-nowrap text-gray-600">
                                        {rider.district}
                                    </td>

                                    {/* Status */}
                                    <td>
                                        <span
                                            className={`badge border-none px-3 py-3 font-semibold capitalize ${rider.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : rider.status === "rejected"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {rider.status}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/dashboard/riders/${rider._id}`}
                                                className="btn btn-sm min-h-8 border-none bg-[#E5F0F2] px-3 text-xs text-gray-800 hover:bg-[#d5e5e8] sm:text-sm"
                                            >
                                                <FaEye />
                                                View
                                            </Link>

                                            {rider.status === "pending" ?
                                                <>
                                                    <button
                                                        onClick={() => handleApproval(rider)}
                                                        type="button"
                                                        title="Approve rider"
                                                        className="btn btn-square btn-sm min-h-8 h-8 w-8 border-none bg-green-100 text-green-700 hover:bg-green-200"
                                                    >
                                                        <FaUserPlus />
                                                    </button>

                                                    <button
                                                        onClick={() => handleReject(rider)}
                                                        type="button"
                                                        title="Reject rider"
                                                        className="btn btn-square btn-sm min-h-8 h-8 w-8 border-none bg-red-100 text-red-600 hover:bg-red-200"
                                                    >
                                                        <FaUserMinus />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(rider._id)}
                                                        type="button"
                                                        title="Delete rider"
                                                        className="btn btn-square btn-sm min-h-8 h-8 w-8 border-none bg-red-100 text-red-600 hover:bg-red-200"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </> : rider.status === "approved" ?
                                                    <>
                                                        <button
                                                            onClick={() => handleReject(rider)}
                                                            type="button"
                                                            title="Reject rider"
                                                            className="btn btn-square btn-sm min-h-8 h-8 w-8 border-none bg-red-100 text-red-600 hover:bg-red-200"
                                                        >
                                                            <FaUserMinus />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(rider._id)}
                                                            type="button"
                                                            title="Delete rider"
                                                            className="btn btn-square btn-sm min-h-8 h-8 w-8 border-none bg-red-100 text-red-600 hover:bg-red-200"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </> : <>
                                                        <button
                                                            onClick={() => handleApproval(rider)}
                                                            type="button"
                                                            title="Approve rider"
                                                            className="btn btn-square btn-sm min-h-8 h-8 w-8 border-none bg-green-100 text-green-700 hover:bg-green-200"
                                                        >
                                                            <FaUserPlus />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(rider._id)}
                                                            type="button"
                                                            title="Delete rider"
                                                            className="btn btn-square btn-sm min-h-8 h-8 w-8 border-none bg-red-100 text-red-600 hover:bg-red-200"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {/* Empty State */}
                            {riders.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-10 text-center text-gray-500"
                                    >
                                        No riders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApproveRider;