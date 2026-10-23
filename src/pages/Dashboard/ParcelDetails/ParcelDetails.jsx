import { useLoaderData } from "react-router";
import {
    FaBox,
    FaUser,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";

const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-[105px_1fr] gap-3 py-1 text-sm sm:grid-cols-[115px_1fr]">
        <span className="text-gray-400">{label}</span>
        <span className="wrap-break-word text-gray-700">
            {value ?? "N/A"}
        </span>
    </div>
);

const InfoCard = ({ title, icon, children }) => (
    <div className="rounded-2xl bg-[#F5F5F5] p-5 sm:p-6">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-800">
            {icon}
            {title}
        </h2>
        {children}
    </div>
);

const ParcelDetails = () => {
    const parcel = useLoaderData();

    const isPaid =
        parcel.paymentStatus?.toLowerCase() === "paid";

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Dhaka",
        });
    };

    return (
        <div className="min-h-screen rounded-xl bg-white">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-3xl font-bold text-primary sm:text-4xl">
                    Parcel Details
                </h1>

                <span
                    className={`badge gap-2 border-0 px-4 py-3 font-semibold ${isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                >
                    {isPaid ? <FaCheckCircle /> : <FaClock />}
                    {parcel.paymentStatus || "Pending"}
                </span>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <InfoCard
                    title="Sender Info"
                    icon={<FaUser className="text-primary" />}
                >
                    <InfoRow label="Name" value={parcel.senderName} />
                    <InfoRow label="Phone" value={parcel.senderPhnNb} />
                    <InfoRow label="Email" value={parcel.senderEmail} />
                    <InfoRow label="Region" value={parcel.senderRegion} />
                    <InfoRow label="District" value={parcel.senderDistrict} />
                    <InfoRow label="Address" value={parcel.senderAddress} />
                </InfoCard>

                <InfoCard
                    title="Receiver Info"
                    icon={<FaUser className="text-primary" />}
                >
                    <InfoRow label="Name" value={parcel.receiverName} />
                    <InfoRow label="Phone" value={parcel.receiverPhnNb} />
                    <InfoRow label="Email" value={parcel.receiverEmail} />
                    <InfoRow label="Region" value={parcel.receiverRegion} />
                    <InfoRow label="District" value={parcel.receiverDistrict} />
                    <InfoRow label="Address" value={parcel.receiverAddress} />
                </InfoCard>

                <InfoCard
                    title="Parcel Details"
                    icon={<FaBox className="text-primary" />}
                >
                    <InfoRow label="Title" value={parcel.parcelName} />
                    <InfoRow
                        label="Type"
                        value={
                            parcel.parcelType === "non-document"
                                ? "Non-document"
                                : parcel.parcelType
                        }
                    />
                    <InfoRow
                        label="Weight"
                        value={parcel.weight ? `${parcel.weight} KG` : "N/A"}
                    />
                    <InfoRow
                        label="Charge"
                        value={parcel.cost != null ? `Tk ${parcel.cost}` : "N/A"}
                    />
                    <InfoRow
                        label="Status"
                        value={parcel.paymentStatus || "Pending"}
                    />
                    <InfoRow
                        label="Pickup Instruction"
                        value={parcel.pickupInstruction}
                    />
                    <InfoRow
                        label="Delivery Instruction"
                        value={parcel.deliveryInstruction}
                    />
                    <InfoRow
                        label="Tracking Number"
                        value={parcel.trackingId}
                    />
                    <InfoRow
                        label="Created At"
                        value={formatDate(parcel.createdAt)}
                    />
                </InfoCard>
            </div>
        </div>
    );
};

export default ParcelDetails;