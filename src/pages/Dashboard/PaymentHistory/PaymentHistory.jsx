
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";


const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="w-full min-w-0">
            <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl">
                Payment History: {payments.length}
            </h2>

            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-base-200 bg-white">
                <div className="w-full overflow-x-auto">
                    <table className="table w-full min-w-187.5 text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-base-200 bg-gray-50 text-primary">
                                <th className="whitespace-nowrap font-bold">
                                    Parcel Info
                                </th>

                                <th className="min-w-37.5 font-bold">
                                    Recipient Info
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Tracking Number
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Payment Info
                                </th>

                                <th className="whitespace-nowrap font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((payment, index) => (
                                <tr
                                    key={payment._id || index}
                                    className={`border-b hover:bg-[#F0F7F7] border-base-200 even:bg-gray-100 odd:bg-white transition-colors`}
                                >
                                    {/* Parcel Info */}
                                    <td className="max-w-32.5 whitespace-normal wrap-break-word font-medium text-gray-600">
                                        {payment.parcelName}
                                    </td>

                                    {/* Recipient Info */}
                                    <td className="min-w-37.5 py-2">
                                        {payment.receiverName && (
                                            <p className="mb-1 font-semibold text-primary">
                                                {payment.receiverName}
                                            </p>
                                        )}

                                        <p className="whitespace-pre-line wrap-break-word text-gray-600">
                                            {payment.receiverAddress}
                                        </p>

                                        {payment.receiverPhnNb && (
                                            <p className="mt-1 whitespace-nowrap text-gray-600">
                                                {payment.receiverPhnNb}
                                            </p>
                                        )}
                                    </td>

                                    {/* Tracking Number */}
                                    <td className="whitespace-nowrap text-gray-600">
                                        {payment.trackingId || "N/A"}
                                    </td>

                                    {/* Payment Info */}
                                    <td className="whitespace-nowrap">
                                        <div className="flex items-center gap-1 text-primary font-medium">
                                            <span>
                                                $ {payment.amount}
                                            </span>

                                            <span className="text-green-500">({payment.paymentStatus})</span>
                                        </div>
                                    </td>

                                    {/* Action */}
                                    <td>
                                        <Link
                                            to={`/dashboard/payment-history/${payment._id}`}
                                            className="btn btn-sm min-h-8 border-none bg-[#E5F0F2] px-3 text-xs text-gray-800 hover:bg-[#d5e5e8] sm:text-sm"
                                        >
                                            <FaEye />
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {payments.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-10 text-center text-gray-500"
                                    >
                                        No payment history found.
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

export default PaymentHistory;
