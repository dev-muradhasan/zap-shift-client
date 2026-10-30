

import { useQuery } from "@tanstack/react-query";
import {
    FaBox,
    FaCheckCircle,
    FaMapMarkerAlt,
    FaUser,
    FaPhone,
} from "react-icons/fa";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const CompletedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [search, setSearch] = useState("");

    const {
        data: parcels = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["parcels", user?.email, "delivered"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider?riderEmail=${encodeURIComponent(
                    user.email
                )}&deliveryStatus=delivered`
            );
            return res.data;
        },
    });

    const handlePayOut = parcel =>{
        if(parcel.senderDistrict===parcel.receiverDistrict){
            return parcel.cost*0.8;
        }
        else{
            return parcel.cost*0.6;
        }
    }

    const filteredParcels = parcels.filter((parcel) => {
        const searchText = search.toLowerCase();

        return (
            parcel.parcelName?.toLowerCase().includes(searchText) ||
            parcel.trackingId?.toLowerCase().includes(searchText) ||
            parcel.receiverName?.toLowerCase().includes(searchText) ||
            parcel.receiverAddress?.toLowerCase().includes(searchText)
        );
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (isError) {
        return (
            <div className="alert alert-error">
                <span>
                    Failed to load completed deliveries:{" "}
                    {error?.message || "Something went wrong"}
                </span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-primary md:text-3xl">
                        Completed Deliveries
                    </h2>

                    <p className="mt-2 text-sm text-secondary">
                        Track and review all parcels you have successfully delivered.
                    </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#DADADA] bg-white p-4 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8DC] text-2xl text-primary">
                        <FaCheckCircle />
                    </div>

                    <div>
                        <p className="text-sm text-secondary">
                            Total Completed
                        </p>
                        <h3 className="text-2xl font-bold text-primary">
                            {parcels.length}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#DADADA] bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-secondary">
                                Delivery Status
                            </p>
                            <h3 className="mt-2 text-xl font-bold text-primary">
                                All Completed
                            </h3>
                            <p className="mt-2 text-xs text-secondary">
                                Showing your delivered parcels
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F7F5] text-2xl text-primary">
                            <FaCheckCircle />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-hidden rounded-2xl border border-[#DADADA] bg-white shadow-sm">
                <div className="flex flex-col justify-between gap-4 border-b border-[#DADADA] p-5 md:flex-row md:items-center">
                    <div>
                        <h3 className="text-lg font-bold text-primary">
                            Delivery History
                        </h3>
                        <p className="mt-1 text-sm text-secondary">
                            {filteredParcels.length} parcel
                            {filteredParcels.length !== 1 ? "s" : ""} found
                        </p>
                    </div>

                    <label className="input input-bordered flex w-full items-center gap-2 rounded-xl md:max-w-xs">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4 text-secondary"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-4-4" />
                        </svg>

                        <input
                            type="text"
                            className="grow"
                            placeholder="Search parcel..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-[#F5F8F3] text-xs uppercase text-secondary">
                                <th className="py-4">#</th>
                                <th>Parcel Details</th>
                                <th>Receiver</th>
                                <th>Delivery Address</th>
                                <th>Weight</th>
                                <th>Cost</th>
                                <th>Payout</th>
                                <th>CashOut</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredParcels.length > 0 ? (
                                filteredParcels.map((parcel, index) => (
                                    <tr
                                        key={parcel._id}
                                        className="border-b border-base-200 transition hover:bg-[#F8FAF6]"
                                    >
                                        <td className="font-medium text-secondary">
                                            {index + 1}
                                        </td>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1EF] text-lg text-primary">
                                                    <FaBox />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-primary">
                                                        {parcel.parcelName || "Unnamed Parcel"}
                                                    </p>
                                                    <p className="mt-1 text-xs text-secondary">
                                                        {parcel.parcelType || "Parcel"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FaUser className="shrink-0 text-secondary" />
                                                <div>
                                                    <p className="font-medium text-primary">
                                                        {parcel.receiverName || "N/A"}
                                                    </p>
                                                    {parcel.receiverPhnNb && (
                                                        <p className="mt-1 flex items-center gap-1 text-xs text-secondary">
                                                            <FaPhone />
                                                            {parcel.receiverPhnNb}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex max-w-48 items-start gap-2 whitespace-normal">
                                                <FaMapMarkerAlt className="mt-1 shrink-0 text-primary" />
                                                <span className="text-sm text-secondary">
                                                    {parcel.receiverAddress || "N/A"}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="font-medium text-primary">
                                                {parcel.weight
                                                    ? `${parcel.weight} kg`
                                                    : "N/A"}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="font-medium text-primary">
                                                {parcel.cost
                                                    ? `$${parcel.cost}`
                                                    : "$0"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="font-medium text-primary">
                                                ${handlePayOut(parcel)}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm bg-accent-content text-primary">
                                                CashOut
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-16 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F5E9] text-3xl text-primary">
                                                {search ? (
                                                    <FaBox />
                                                ) : (
                                                    <FaCheckCircle />
                                                )}
                                            </div>

                                            <h4 className="text-lg font-bold text-primary">
                                                {search
                                                    ? "No matching parcels found"
                                                    : "No completed deliveries yet"}
                                            </h4>

                                            <p className="mt-2 max-w-sm text-sm text-secondary">
                                                {search
                                                    ? "Try searching with another parcel name, tracking ID, or receiver."
                                                    : "Your successfully delivered parcels will appear here."}
                                            </p>

                                            {search && (
                                                <button
                                                    onClick={() => setSearch("")}
                                                    className="btn btn-sm mt-4 rounded-lg bg-primary text-white hover:bg-primary/90"
                                                >
                                                    Clear Search
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                {filteredParcels.length > 0 && (
                    <div className="flex flex-col justify-between gap-2 bg-[#FAFCF8] px-5 py-4 text-sm text-secondary sm:flex-row sm:items-center">
                        <p>
                            Showing {filteredParcels.length} of {parcels.length} completed deliveries
                        </p>

                        <div className="flex items-center gap-2 font-medium text-primary">
                            <FaCheckCircle className="text-[#6B9B30]" />
                            All listed deliveries are completed
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompletedDeliveries;
