
import { useLoaderData } from "react-router";
import {
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaIdCard,
    FaMotorcycle,
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaInfoCircle,
    FaClipboardCheck,
} from "react-icons/fa";

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 py-3">
        <div className="mt-1 text-primary">
            <Icon />
        </div>

        <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-1 wrap-break-word font-medium text-gray-700">
                {value || "N/A"}
            </p>
        </div>
    </div>
);

const SectionCard = ({ title, icon: Icon, children }) => (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="flex items-center gap-3 border-b border-gray-100 pb-4 text-lg font-bold text-primary sm:text-xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3F3]">
                <Icon size={18} />
            </span>
            {title}
        </h2>

        <div className="divide-y divide-gray-100">
            {children}
        </div>
    </section>
);

const RiderDetails = () => {
    const riderData = useLoaderData();

    const {
        name,
        email,
        phone,
        region,
        district,
        drivingLicense,
        nid,
        bikeModel,
        bikeRegistration,
        about,
        status,
        createdAt,
    } = riderData;

    const riderStatus = (status || "pending").toLowerCase();

    const statusStyle = {
        pending: "bg-amber-100 text-amber-700",
        approved: "bg-green-100 text-green-700",
        active: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        suspended: "bg-red-100 text-red-700",
    };

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
        <div className="min-h-screen rounded-2xl bg-[#F8FAFA] p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
                        Rider Management
                    </p>

                    <h1 className="text-3xl font-bold text-primary sm:text-4xl">
                        Rider Details
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        View rider information and application details.
                    </p>
                </div>

                <div
                    className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold capitalize ${statusStyle[riderStatus] ||
                        "bg-gray-100 text-gray-600"
                        }`}
                >
                    {riderStatus === "approved" ||
                        riderStatus === "active" ? (
                        <FaCheckCircle />
                    ) : (
                        <FaClock />
                    )}

                    {riderStatus}
                </div>
            </div>

            {/* Rider overview */}
            <div className="mb-6 overflow-hidden rounded-2xl bg-primary text-white shadow-sm">
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#CAEB66]">
                        <FaUser size={36} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-sm text-white/60">
                            Rider Profile
                        </p>

                        <h2 className="mt-1 wrap-break-word text-2xl font-bold sm:text-3xl">
                            {name || "Unknown Rider"}
                        </h2>

                        <p className="mt-2 flex items-center gap-2 break-all text-sm text-white/75">
                            <FaEnvelope className="shrink-0" />
                            {email || "N/A"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-white/5 p-4 sm:min-w-44">
                        <p className="text-xs text-white/60">
                            Application Submitted
                        </p>
                        <p className="mt-2 flex items-center gap-2 font-semibold">
                            <FaCalendarAlt className="text-[#CAEB66]" />
                            {createdAt
                                ? new Date(createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        timeZone: "Asia/Dhaka",
                                    }
                                )
                                : "N/A"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
                    <div className="p-5 sm:border-r sm:border-white/10">
                        <p className="text-sm text-white/60">Phone Number</p>
                        <p className="mt-2 font-semibold">{phone || "N/A"}</p>
                    </div>

                    <div className="p-5 sm:border-r sm:border-white/10">
                        <p className="text-sm text-white/60">Service Region</p>
                        <p className="mt-2 font-semibold">
                            {region || "N/A"}
                        </p>
                    </div>

                    <div className="p-5">
                        <p className="text-sm text-white/60">District</p>
                        <p className="mt-2 font-semibold">
                            {district || "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
                {/* Personal information */}
                <SectionCard
                    title="Personal Information"
                    icon={FaUser}
                >
                    <InfoRow
                        icon={FaUser}
                        label="Full Name"
                        value={name}
                    />
                    <InfoRow
                        icon={FaEnvelope}
                        label="Email Address"
                        value={email}
                    />
                    <InfoRow
                        icon={FaPhoneAlt}
                        label="Phone Number"
                        value={phone}
                    />
                    <InfoRow
                        icon={FaMapMarkerAlt}
                        label="Region"
                        value={region}
                    />
                    <InfoRow
                        icon={FaMapMarkerAlt}
                        label="District"
                        value={district}
                    />
                </SectionCard>

                {/* Verification information */}
                <SectionCard
                    title="Verification Details"
                    icon={FaClipboardCheck}
                >
                    <InfoRow
                        icon={FaIdCard}
                        label="Driving License"
                        value={drivingLicense}
                    />
                    <InfoRow
                        icon={FaIdCard}
                        label="National ID (NID)"
                        value={nid}
                    />
                    <InfoRow
                        icon={FaCalendarAlt}
                        label="Application Date"
                        value={formatDate(createdAt)}
                    />
                    <InfoRow
                        icon={FaCheckCircle}
                        label="Application Status"
                        value={riderStatus}
                    />
                </SectionCard>

                {/* Bike information */}
                <SectionCard
                    title="Bike Information"
                    icon={FaMotorcycle}
                >
                    <InfoRow
                        icon={FaMotorcycle}
                        label="Bike Model"
                        value={bikeModel}
                    />
                    <InfoRow
                        icon={FaIdCard}
                        label="Registration Number"
                        value={bikeRegistration}
                    />
                </SectionCard>

                {/* About rider */}
                <SectionCard
                    title="About Rider"
                    icon={FaInfoCircle}
                >
                    <div className="py-4">
                        <p className="mb-3 text-sm text-gray-400">
                            Rider Description
                        </p>

                        <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
                            {about || "No description provided."}
                        </p>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export default RiderDetails;
