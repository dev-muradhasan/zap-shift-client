
import { Link } from "react-router";
import {
    FaTimes,
    FaCreditCard,
    FaArrowRight,
    FaHome,
    FaBox,
    FaRedoAlt,
    FaHeadset,
} from "react-icons/fa";

const PaymentCancel = () => {
    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F8FAFA] px-4 py-10">
            <div className="w-full max-w-2xl">

                {/* Cancel Icon */}
                <div className="flex justify-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-red-50 md:h-40 md:w-40">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#03373D] text-[#CAEB66] shadow-lg md:h-28 md:w-28">
                            <FaTimes className="text-5xl md:text-6xl" />
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <div className="mt-7 text-center">
                    <h1 className="text-3xl font-extrabold text-[#03373D] md:text-5xl">
                        Payment Cancelled!
                    </h1>

                    <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#606060] md:text-lg">
                        Your payment was not completed. Don't worry,
                        your parcel information is safe. You can try
                        again whenever you're ready.
                    </p>
                </div>

                {/* Information Card */}
                <div className="mt-8 rounded-2xl border border-[#DADADA] bg-white p-5 shadow-sm sm:p-7">

                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66]/30 text-[#03373D]">
                            <FaCreditCard className="text-xl" />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-[#03373D]">
                                No payment was completed
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#606060]">
                                The checkout process was cancelled or
                                interrupted. If you were not charged,
                                you can safely return to your parcels
                                and try again.
                            </p>
                        </div>
                    </div>

                    <div className="my-6 border-t border-dashed border-[#DADADA]" />

                    {/* Helpful Tips */}
                    <h3 className="mb-4 font-bold text-[#03373D]">
                        What would you like to do?
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#CAEB66]/30 text-[#03373D]">
                                <FaRedoAlt />
                            </div>

                            <p className="text-sm text-[#606060]">
                                Return to your parcels and try paying again.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#CAEB66]/30 text-[#03373D]">
                                <FaHeadset />
                            </div>

                            <p className="text-sm text-[#606060]">
                                Contact support if you need help with your payment.
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/dashboard/my_parcel"
                            className="group flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#03373D] px-5 font-bold text-white transition hover:bg-[#CAEB66] hover:text-[#03373D]"
                        >
                            <FaBox />
                            Back to My Parcels
                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            to="/"
                            className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#DADADA] px-5 font-semibold text-[#03373D] transition hover:bg-[#F3F5F5]"
                        >
                            <FaHome />
                            Home
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-[#606060]">
                        Need help? We're here for you.
                    </p>

                    <p className="mt-2 font-bold text-[#03373D]">
                        Zap-Shift — Fast Delivery, Happy People
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
