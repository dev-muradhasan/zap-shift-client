
import { Link, useSearchParams } from "react-router";
import {
    FaCheck,
    FaBox,
    FaCreditCard,
    FaHashtag,
    FaCalendarAlt,
    FaArrowRight,
    FaHome,
    FaTruck,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        if (sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                // console.log(res.data)
                setPaymentInfo({
                    trackingId: res.data.trackingId,
                    transactionId: res.data.transactionId,
                    amount: res.data.amount,
                    paidAt: res.data.paidAt,
                })
            })
        }
    }, [sessionId, axiosSecure])

    const localDateTime = new Date(paymentInfo.paidAt).toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });


    return (
        <div className="min-h-screen bg-[#F8FAFA] px-4 py-10 rounded-2xl">
            <div className="mx-auto max-w-4xl">

                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#CAEB66]/20 md:h-44 md:w-44">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#03373D] text-[#CAEB66] shadow-lg md:h-32 md:w-32">
                            <FaCheck className="text-5xl md:text-6xl" />
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <div className="mt-6 text-center">
                    <h1 className="text-3xl font-extrabold text-[#03373D] md:text-5xl">
                        Payment Successful!
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#606060] md:text-lg">
                        Your payment has been processed successfully.
                        Thank you for choosing Zap-Shift. Your parcel
                        is ready for its next journey!
                    </p>
                </div>

                {/* Payment Details */}
                <div className="mt-8 rounded-2xl border border-[#DADADA] bg-white p-5 shadow-sm md:p-8">
                    <div className="grid gap-7 sm:grid-cols-2">

                        {/* Parcel trackingId */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#CAEB66]/25 text-[#03373D]">
                                <FaBox className="text-2xl" />
                            </div>

                            <div>
                                <p className="text-sm text-[#606060]">
                                   Tracking Id
                                </p>
                                <h3 className="mt-1 font-bold text-[#03373D]">
                                    {paymentInfo.trackingId}
                                </h3>
                            </div>
                        </div>

                        {/* Payment Amount */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#CAEB66]/25 text-[#03373D]">
                                <FaCreditCard className="text-2xl" />
                            </div>

                            <div>
                                <p className="text-sm text-[#606060]">
                                    Payment Amount
                                </p>
                                <h3 className="mt-1 font-bold text-[#03373D]">
                                    {paymentInfo.amount}
                                </h3>
                            </div>
                        </div>

                        {/* Transaction ID */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#CAEB66]/25 text-[#03373D]">
                                <FaHashtag className="text-2xl" />
                            </div>

                            <div>
                                <p className="text-sm text-[#606060]">
                                    Transaction ID
                                </p>
                                <h3 className="mt-1 break-all font-bold text-[#03373D]">
                                    {paymentInfo.transactionId}
                                </h3>
                            </div>
                        </div>

                        {/* Payment Date */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#CAEB66]/25 text-[#03373D]">
                                <FaCalendarAlt className="text-2xl" />
                            </div>

                            <div>
                                <p className="text-sm text-[#606060]">
                                    Payment Date
                                </p>
                                <h3 className="mt-1 font-bold text-[#03373D]">
                                    {localDateTime}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Message */}
                    <div className="mt-7 flex items-center gap-3 rounded-xl border border-[#CAEB66]/50 bg-[#CAEB66]/20 p-4 text-sm text-[#03373D]">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#03373D] text-[#CAEB66]">
                            <FaCheck className="text-sm" />
                        </div>

                        <p>
                            Thank you! Your payment confirmation has been received.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <Link
                        to="/dashboard/my_parcel"
                        className="group flex h-14 w-full max-w-xs items-center justify-center gap-3 rounded-xl bg-[#03373D] px-6 font-bold text-white shadow-md transition hover:bg-[#CAEB66] hover:text-[#03373D]"
                    >
                        Go to My Parcels
                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center gap-2 font-medium text-[#606060] transition hover:text-[#03373D]"
                    >
                        <FaHome />
                        Back to Home
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-12 flex items-center justify-center gap-3 text-[#03373D]/50">
                    <FaTruck className="text-3xl" />
                    <p className="text-sm font-medium">
                        Zap-Shift — Fast Delivery, Happy People
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
