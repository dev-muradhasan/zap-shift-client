import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaCreditCard, FaEye, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";


const statusColors = {
    "Paid Return": "text-green-600",
    Delivered: "text-green-600",
    Pending: "text-green-600",
    Cancelled: "text-green-600",
    Refunded: "text-green-600",
};


const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {isLoading, data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcel', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handleParcelDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            receiverName: parcel.receiverName,
            receiverAddress: parcel.receiverAddress,
            receiverPhnNb: parcel.receiverPhnNb,
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        window.location.assign(res.data.url);
    }

    return (
        <div className="w-full min-w-0">
            <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl">
                All of my parcels {parcels.length}
            </h2>

            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-base-200 bg-white">
                <div className="w-full overflow-x-auto">
                    <table className="table w-full min-w-187.5 text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-base-200 bg-gray-50 text-primary">
                                <th className="whitespace-nowrap font-bold">Name</th>
                                <th className="min-w-37.5 font-bold">
                                    Recipient Info
                                </th>
                                <th className="whitespace-nowrap font-bold">
                                    Delivery Status
                                </th>
                                <th className="whitespace-nowrap font-bold">
                                    Amount
                                </th>
                                <th className="whitespace-nowrap font-bold">
                                    Payment
                                </th>
                                <th className="whitespace-nowrap font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id || index}
                                    className={`border-b border-base-200 hover:bg-[#F0F7F7] even:bg-gray-100 odd:bg-white transition-colors`}
                                >
                                    <td className="max-w-32.5 whitespace-normal wrap-break-word font-medium text-gray-600">
                                        {parcel.parcelName}
                                    </td>

                                    <td className="min-w-37.5 py-2">
                                        {parcel.receiverName && (
                                            <p className="mb-1 font-semibold text-primary">
                                                {parcel.receiverName}
                                            </p>
                                        )}

                                        <p className="whitespace-pre-line wrap-break-word text-gray-600">
                                            {parcel.receiverAddress}
                                        </p>

                                        {parcel.receiverPhnNb && (
                                            <p className="mt-1 whitespace-nowrap text-gray-600">
                                                {parcel.receiverPhnNb}
                                            </p>
                                        )}
                                    </td>

                                    <td className="whitespace-nowrap">
                                        <span
                                            className={`font-medium ${statusColors[parcel.status]
                                                }`}
                                        >
                                            {parcel.status}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap text-gray-600">
                                        $ {parcel.cost}
                                    </td>

                                    <td className="whitespace-nowrap">
                                        {
                                            parcel.paymentStatus === "paid"
                                                ? <span className="btn btn-sm rounded-full border border-[#CAEB66] bg-[#CAEB66]/20  font-bold text-[#03373D] shadow-sm ">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#03373D] text-[#CAEB66]">
                                                        <FaCheck className="" />
                                                    </span>
                                                    Paid
                                                </span>
                                                : <button onClick={() => handlePayment(parcel)} className="btn btn-sm min-h-8 border-none bg-[#C9F158] px-3 text-xs text-gray-800 hover:bg-[#b9e344] sm:px-4 sm:text-sm">
                                                    <FaCreditCard />
                                                    Pay
                                                </button>
                                        }
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button className="btn btn-sm min-h-8 border-none bg-[#E5F0F2] px-3 text-xs text-gray-800 hover:bg-[#d5e5e8] sm:text-sm">
                                                <FaEye />
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleParcelDelete(parcel._id)
                                                }
                                                className="btn btn-sm min-h-8 border-none bg-red-50 px-3 text-xs text-red-500 hover:bg-red-100 sm:text-sm"
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyParcel;