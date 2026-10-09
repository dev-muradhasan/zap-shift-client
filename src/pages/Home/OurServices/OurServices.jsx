import bookingIcon from "../../../assets/service.png";

const OurServices = () => {
    const services = [
        {
            title: "Express & Standard Delivery",
            description:
                "Deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        },
        {
            title: "Nationwide Delivery",
            description:
                "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
            featured: true,
        },
        {
            title: "Fulfillment Solution",
            description:
                "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        },
        {
            title: "Cash on Home Delivery",
            description:
                "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        },
        {
            title: "Corporate Service / Contract In Logistics",
            description:
                "Customized corporate services which includes warehouse and inventory management support.",
        },
        {
            title: "Parcel Return",
            description:
                "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        },
    ];

    return (
        <section className="bg-[#EEF0F0]">
            <div className="rounded-[20px] bg-primary px-5 py-12 md:px-10 lg:px-14 lg:py-14">

                {/* Heading */}
                <div className="mx-auto mb-7 max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                        Our Services
                    </h2>

                    <p className="mt-3 text-xs leading-5 text-white/70 md:text-sm">
                        Enjoy fast, reliable parcel delivery with real-time
                        tracking and zero hassle. From personal packages to
                        business shipments — we deliver on time, every time.
                    </p>
                </div>

                {/* Cards */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`min-h-44.5 rounded-xl px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#CAEB66] bg-white`}
                        >
                            {/* Icon */}
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEEDFC] p-2">
                                <img
                                    src={bookingIcon}
                                    alt=""
                                    className="h-9 w-9 object-contain"
                                />
                            </div>

                            {/* Title */}
                            <h3
                                className={`mx-auto max-w-60 font-bold leading-5 ${service.featured
                                    ? "text-primary"
                                    : "text-primary"
                                    }`}
                            >
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="mx-auto mt-2 max-w-66 text-[11px] leading-4 text-secondary">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;