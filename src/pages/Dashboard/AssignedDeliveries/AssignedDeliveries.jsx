
import { useQuery } from "@tanstack/react-query";
import {
    FaBox,
    FaCalendarAlt,
    FaCheck,
    FaCheckCircle,
    FaClock,
    FaDollarSign,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaRoute,
    FaShippingFast,
    FaTimes,
    FaUser,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: parcels = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["parcels", user?.email, "rider-assigned"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider?riderEmail=${encodeURIComponent(
                    user.email
                )}&deliveryStatus=rider-assigned`
            );
            return res.data;
        },
    });

    const handleDelivery = (parcel, deliveryStatus, icon, title) => {
        const statusInfo = { deliveryStatus, riderId:parcel.riderId, trackingId:parcel.trackingId };
        axiosSecure.patch(`parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: icon,
                        title: title,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            })
    }


    const handleReject = async (parcel) => {
        const result = await Swal.fire({
            title: "Reject this parcel?",
            text: "The parcel will be returned to the admin for reassignment.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Reject",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
        });
        if (!result.isConfirmed) return;
        try {
            const res = await axiosSecure.patch(
                `/parcels/${parcel._id}/reject`
            );
            if (res.data.parcelResult?.modifiedCount > 0) {
                await refetch();
                Swal.fire({
                    icon: "success",
                    title: "Parcel Rejected",
                    text: "The rider is available again.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text:
                    error.response?.data?.message ||
                    "Could not reject the parcel.",
            });
        }
    };


    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Dhaka",
        });
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                <h3 className="text-lg font-bold text-red-700">
                    Failed to load deliveries
                </h3>
                <p className="mt-2 text-sm text-red-600">
                    {error?.message || "Something went wrong. Please try again."}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full min-w-0 bg-[#F7F9F8] p-1 sm:p-2 lg:p-3 rounded-2xl">
            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#606060]">
                        Rider Dashboard
                    </p>
                    <h1 className="text-2xl font-extrabold text-[#03373D] sm:text-3xl lg:text-4xl">
                        Assigned Deliveries
                    </h1>
                    <p className="mt-2 text-sm text-[#606060] sm:text-base">
                        Manage your parcels and delivery information.
                    </p>
                </div>

                <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#DADADA] bg-white px-5 py-4 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#03373D] text-xl text-[#CAEB66]">
                        <FaShippingFast />
                    </div>
                    <div>
                        <p className="text-sm text-[#606060]">
                            Assigned Parcels
                        </p>
                        <p className="text-2xl font-extrabold text-[#03373D]">
                            {parcels.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {parcels.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#DADADA] bg-white px-5 py-16 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F0F7F7] text-4xl text-[#03373D]">
                        <FaBox />
                    </div>
                    <h2 className="mt-5 text-xl font-bold text-[#03373D]">
                        No Assigned Deliveries
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#606060]">
                        You don't have any parcels assigned to you right now.
                        New assignments will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {parcels.map((parcel, index) => (
                        <div
                            key={parcel._id}
                            className="overflow-hidden rounded-2xl border border-[#DADADA] bg-white shadow-sm transition hover:shadow-md"
                        >
                            {/* Card Header */}
                            <div className="flex flex-col gap-4 border-b border-[#DADADA] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#03373D] text-xl text-[#CAEB66]">
                                        <FaBox />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-[#606060]">
                                            Parcel #{index + 1}
                                        </p>
                                        <h2 className="mt-1 wrap-break-word text-xl font-bold text-[#03373D]">
                                            {parcel.parcelName}
                                        </h2>
                                        <p className="mt-1 text-sm text-[#606060]">
                                            {parcel.parcelType === "document"
                                                ? "Document"
                                                : "Non-document"}
                                            {" · "}
                                            {parcel.weight || "N/A"} kg
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F7F7] px-3 py-2 text-xs font-bold text-[#03373D]">
                                        <FaShippingFast />
                                        {parcel.deliveryStatus.split('-').join(' ')}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                                        <FaCheckCircle />
                                        {parcel.paymentStatus || "Unpaid"}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6 p-5 sm:p-6">
                                {/* Tracking and Cost */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl bg-[#F7F9F8] p-4">
                                        <div className="flex items-center gap-2 text-sm text-[#606060]">
                                            <FaRoute />
                                            Tracking ID
                                        </div>
                                        <p className="mt-2 break-all font-bold text-[#03373D]">
                                            {parcel.trackingId || "Not available"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-[#F7F9F8] p-4">
                                        <div className="flex items-center gap-2 text-sm text-[#606060]">
                                            <FaDollarSign />
                                            Delivery Cost
                                        </div>
                                        <p className="mt-2 text-2xl font-extrabold text-[#03373D]">
                                            ${parcel.cost ?? 0}
                                        </p>
                                    </div>
                                </div>

                                {/* Pickup and Drop-off */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* Pickup */}
                                    <div className="rounded-xl border border-[#DADADA] p-4 sm:p-5">
                                        <div className="mb-4 flex items-center gap-2">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F5E9] text-green-700">
                                                <FaMapMarkerAlt />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#03373D]">
                                                    Pickup Location
                                                </h3>
                                                <p className="text-xs text-[#606060]">
                                                    Collect the parcel here
                                                </p>
                                            </div>
                                        </div>

                                        <p className="font-semibold text-[#03373D]">
                                            {parcel.senderDistrict || "N/A"},{" "}
                                            {parcel.senderRegion || ""}
                                        </p>
                                        <p className="mt-2 wrap-break-word text-sm leading-6 text-[#606060]">
                                            {parcel.senderAddress || "No address provided"}
                                        </p>

                                        <div className="mt-4 border-t border-dashed border-[#DADADA] pt-4">
                                            <p className="flex items-center gap-2 text-sm font-semibold text-[#03373D]">
                                                <FaUser className="text-[#606060]" />
                                                {parcel.senderName || "Unknown sender"}
                                            </p>
                                            <p className="mt-2 flex items-center gap-2 break-all text-sm text-[#606060]">
                                                <FaPhoneAlt className="shrink-0" />
                                                {parcel.senderPhnNb || "No phone"}
                                            </p>
                                        </div>

                                        {parcel.pickupInstruction && (
                                            <div className="mt-4 rounded-lg bg-[#F7F9F8] p-3">
                                                <p className="text-xs font-bold text-[#03373D]">
                                                    Pickup Instructions
                                                </p>
                                                <p className="mt-1 wrap-break-word text-sm text-[#606060]">
                                                    {parcel.pickupInstruction}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Delivery */}
                                    <div className="rounded-xl border border-[#DADADA] p-4 sm:p-5">
                                        <div className="mb-4 flex items-center gap-2">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF7E6] text-amber-700">
                                                <MdLocationOn size={22} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#03373D]">
                                                    Delivery Location
                                                </h3>
                                                <p className="text-xs text-[#606060]">
                                                    Deliver the parcel here
                                                </p>
                                            </div>
                                        </div>

                                        <p className="font-semibold text-[#03373D]">
                                            {parcel.receiverDistrict || "N/A"},{" "}
                                            {parcel.receiverRegion || ""}
                                        </p>
                                        <p className="mt-2 wrap-break-word text-sm leading-6 text-[#606060]">
                                            {parcel.receiverAddress || "No address provided"}
                                        </p>

                                        <div className="mt-4 border-t border-dashed border-[#DADADA] pt-4">
                                            <p className="flex items-center gap-2 text-sm font-semibold text-[#03373D]">
                                                <FaUser className="text-[#606060]" />
                                                {parcel.receiverName || "Unknown receiver"}
                                            </p>
                                            <p className="mt-2 flex items-center gap-2 break-all text-sm text-[#606060]">
                                                <FaPhoneAlt className="shrink-0" />
                                                {parcel.receiverPhnNb || "No phone"}
                                            </p>
                                        </div>

                                        {parcel.deliveryInstruction && (
                                            <div className="mt-4 rounded-lg bg-[#F7F9F8] p-3">
                                                <p className="text-xs font-bold text-[#03373D]">
                                                    Delivery Instructions
                                                </p>
                                                <p className="mt-1 wrap-break-word text-sm text-[#606060]">
                                                    {parcel.deliveryInstruction}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                {/* {parcel.deliveryStatus === "rider-assigned" ? (
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <button
                                            onClick={() => handleAcceptDelivery(parcel)}
                                            className="btn flex-1 border-none bg-[#03373D] text-white hover:bg-[#02292D]"
                                        >
                                            <FaCheck />
                                            Accept
                                        </button>

                                        <button
                                            onClick={() => handleRejectDelivery(parcel)}
                                            className="btn flex-1 border border-red-200 bg-white text-red-600 hover:bg-red-50"
                                        >
                                            <FaTimes />
                                            Reject
                                        </button>
                                    </div>
                                ) : parcel.deliveryStatus === "rider-arriving" ? (
                                    <div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 font-semibold text-green-700">
                                        <FaCheckCircle />
                                        Accepted
                                    </div>
                                ) : null} */}
                                {parcel.deliveryStatus === "rider-assigned" ? (
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <button
                                            onClick={() => handleDelivery(parcel, 'rider-arriving', 'success', 'Thank for accepting.')}
                                            className="btn flex-1 border-none bg-[#03373D] text-white hover:bg-[#02292D]"
                                        >
                                            <FaCheck />
                                            Accept
                                        </button>

                                        <button
                                            onClick={() => handleReject(parcel, 'pending-pickup', 'warning', 'You have rejected this delivery.')}
                                            className="btn flex-1 border border-red-200 bg-white text-red-600 hover:bg-red-50"
                                        >
                                            <FaTimes />
                                            Reject
                                        </button>
                                    </div>
                                ) : parcel.deliveryStatus === "rider-arriving" ? (
                                    <button
                                        onClick={() =>
                                            handleDelivery(
                                                parcel,
                                                "parcel-picked-up",
                                                "success",
                                                "Parcel Picked Up!"
                                            )
                                        }
                                        className="btn w-full border-none bg-[#03373D] text-white hover:bg-[#02292D]"
                                    >
                                        <FaBox />
                                        Mark as Picked Up
                                    </button>
                                ) : parcel.deliveryStatus === "parcel-picked-up" ? (
                                    <button
                                        onClick={() =>
                                            handleDelivery(
                                                parcel,
                                                "delivered",
                                                "success",
                                                "Parcel Delivered Successfully!"
                                            )
                                        }
                                        className="btn w-full border-none bg-[#CAEB66] text-[#03373D] hover:bg-[#b8d957]"
                                    >
                                        <FaCheckCircle />
                                        Mark as Delivered
                                    </button>
                                ) : parcel.deliveryStatus === "delivered" ? (
                                    <div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 font-semibold text-green-700">
                                        <FaCheckCircle />
                                        Delivered Successfully
                                    </div>
                                ) : null}

                                {/* Footer */}
                                <div className="flex flex-col gap-3 border-t border-[#DADADA] pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-2 text-sm text-[#606060]">
                                        <FaCalendarAlt className="shrink-0" />
                                        <span>
                                            Created: {formatDate(parcel.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-lg bg-[#F7F9F8] px-3 py-2 text-sm">
                                        <FaClock className="text-[#03373D]" />
                                        <span className="text-[#606060]">
                                            Status:
                                        </span>
                                        <span className="font-bold text-[#03373D]">
                                            {parcel.deliveryStatus.split('-').join(' ')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssignedDeliveries;
