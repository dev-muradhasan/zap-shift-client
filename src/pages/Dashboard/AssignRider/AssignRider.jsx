import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMapMarkerAlt, FaMotorcycle, FaUserPlus, FaUsers } from "react-icons/fa";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const AssignRider = () => {
    const [selectedParcel, setSelectedParcel] = useState(null)
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();
    const queryClient = useQueryClient();

    const { data: parcels = [], refetch: parcelRefetch } = useQuery({
        queryKey: ['parcels', 'Pending pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    })

    const { isLoading, data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&workStatus=available&district=${selectedParcel?.senderDistrict}`);
            return res.data
        }
    })

    const openAssignRiderModal = (parcel) => {
        setSelectedParcel(parcel)
        riderModalRef.current.showModal()
    }

    const handleAssignRider = (rider) => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
        }
        axiosSecure.patch(`/parcels/${selectedParcel?._id}`, riderAssignInfo)
            .then(async (res) => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close();
                    parcelRefetch();
                    await queryClient.invalidateQueries({
                        queryKey: ["riders"],
                    });
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Rider has been assigned.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div className="w-full min-w-0">
            <h2 className="mb-6 text-3xl font-bold text-primary sm:text-4xl">
                Pending Parcels: {parcels.length}
            </h2>

            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-base-200 bg-white">
                <div className="w-full overflow-x-auto">
                    <table className="table w-full min-w-187.5 text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-base-200 bg-gray-50 text-primary">
                                <th className="whitespace-nowrap font-bold">
                                    SL
                                </th>

                                <th className="min-w-35 font-bold">
                                    Parcel Name
                                </th>

                                <th className="min-w-35 font-bold">
                                    Sender Name
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Amount
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Created At
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Pickup District
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className="border-b border-base-200 transition-colors odd:bg-white even:bg-gray-100 hover:bg-[#F0F7F7]"
                                >
                                    {/* Serial */}
                                    <td className="whitespace-nowrap font-medium text-gray-600">
                                        {index + 1}
                                    </td>

                                    {/* Parcel Name */}
                                    <td className="max-w-40 whitespace-normal wrap-break-word font-semibold text-primary">
                                        {parcel.parcelName}
                                    </td>

                                    {/* Sender Name */}
                                    <td className="whitespace-normal wrap-break-word font-medium text-primary">
                                        {parcel.senderName}
                                    </td>

                                    {/* Amount */}
                                    <td className="whitespace-nowrap font-medium text-gray-600">
                                        ${parcel.cost ?? 0}
                                    </td>

                                    {/* Created At */}
                                    <td className="whitespace-nowrap text-gray-600">
                                        {parcel.createdAt
                                            ? new Date(
                                                parcel.createdAt
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                timeZone: "Asia/Dhaka",
                                            })
                                            : "N/A"}
                                    </td>

                                    {/* Pickup District */}
                                    <td className="whitespace-nowrap text-gray-600">
                                        {parcel.senderDistrict || "N/A"}
                                    </td>

                                    {/* Action */}
                                    <td>
                                        <button
                                            onClick={() => openAssignRiderModal(parcel)}
                                            className="btn btn-sm btn-primary "
                                        >
                                            <FaUserPlus />
                                            Find Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {parcels.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-10 text-center text-gray-500"
                                    >
                                        No parcels available for rider assignment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* modal */}
            <dialog
                ref={riderModalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box max-w-2xl rounded-2xl p-0">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                        <div>
                            <h3 className="text-xl font-bold text-[#03373D]">
                                Assign a Rider
                            </h3>
                            <p className="mt-1 text-sm text-[#606060]">
                                Select a rider to assign this parcel.
                            </p>
                        </div>

                        <div className="badge border-none bg-[#CAEB66] px-3 py-3 font-semibold text-[#03373D]">
                            {riders?.length || 0} Riders
                        </div>
                    </div>

                    {/* Rider List */}
                    {isLoading ? <div className="flex flex-col items-center justify-center py-12">
                        <span className="loading loading-spinner loading-lg text-[#03373D]"></span>
                        <p className="mt-4 text-sm font-medium text-[#606060]">
                            Loading riders...
                        </p>
                    </div> : <div className="max-h-[60vh] space-y-3 overflow-y-auto px-6 py-5">
                        {riders?.length > 0 ? (
                            riders.map((rider) => (
                                <div
                                    key={rider._id}
                                    className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-[#03373D]/40 hover:bg-[#F8FAF8] sm:flex-row sm:items-center sm:justify-between"
                                >
                                    {/* Rider Information */}
                                    <div className="flex min-w-0 items-start gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#03373D] text-lg font-bold text-[#CAEB66]">
                                            {rider.name?.charAt(0)?.toUpperCase() || "R"}
                                        </div>

                                        <div className="min-w-0">
                                            <h4 className="font-bold text-[#03373D]">
                                                {rider.name || "Unknown Rider"}
                                            </h4>

                                            <p className="mt-1 break-all text-sm text-[#606060]">
                                                {rider.email}
                                            </p>

                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-[#606060]">
                                                    <FaMapMarkerAlt size={12} className="inline" />{" "}
                                                    {rider.district || "N/A"}
                                                </span>

                                                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-[#606060]">
                                                    <FaMotorcycle size={12} className="inline" />{" "}
                                                    {rider.bikeModel || "Bike not specified"}
                                                </span>
                                            </div>

                                            <div className="mt-2">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${rider.workStatus === "available"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-orange-100 text-orange-700"
                                                        }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${rider.workStatus === "available"
                                                            ? "bg-green-600"
                                                            : "bg-orange-600"
                                                            }`}
                                                    ></span>
                                                    {rider.workStatus || "Unavailable"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assign Button */}
                                    <button
                                        type="button"
                                        disabled={rider.workStatus !== "available"}
                                        onClick={() => handleAssignRider(rider)}
                                        className="btn w-full shrink-0 border-none bg-[#03373D] text-white hover:bg-[#02292D] disabled:bg-gray-300 sm:w-auto"
                                    >
                                        <FaUserPlus size={16} />
                                        Assign Rider
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center">
                                <FaUsers size={40} color="#9CA3AF" />
                                <h4 className="mt-3 font-semibold text-[#03373D]">
                                    No Riders Found
                                </h4>
                                <p className="mt-1 text-sm text-[#606060]">
                                    There are no riders available to display.
                                </p>
                            </div>
                        )}
                    </div>}


                    {/* Modal Footer */}
                    <div className="flex justify-end border-t border-gray-200 px-6 py-4">
                        <form method="dialog">
                            <button className="btn rounded-lg border-gray-300 bg-white px-6 text-[#606060] hover:bg-gray-100">
                                Close
                            </button>
                        </form>
                    </div>
                </div>

                {/* Click outside to close */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default AssignRider;