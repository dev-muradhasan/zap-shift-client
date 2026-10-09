import feature1 from "../../../assets/live-tracking.png";
import feature2 from "../../../assets/safe-delivery.png";
import feature3 from "../../../assets/safe-delivery.png";

const Features = () => {
    const features = [
        {
            image: feature1,
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        },
        {
            image: feature2,
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        },
        {
            image: feature3,
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        },
    ];

    return (
        <section className="bg-[#EEF0F0]">
            <div className="mx-auto max-w-5xl ">

                {/* Top dotted line */}
                <div className="mb-12 md:mb-14 border-t-[1.5px] border-dashed border-primary" />

                <div className="space-y-5">

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex min-h-[190px] items-center rounded-2xl bg-white px-6 py-6 md:px-8"
                        >
                            {/* Image */}
                            <div className="flex w-[180px] shrink-0 items-center justify-center md:w-[200px]">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="h-[150px] w-[160px] object-contain"
                                />
                            </div>

                            {/* Dotted Divider */}
                            <div className="mx-5 hidden h-28 border-l-[1.5px] border-dashed border-primary md:block" />

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="mb-3 text-xl font-bold text-primary">
                                    {feature.title}
                                </h3>

                                <p className="text-sm leading-6 text-secondary">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Bottom dotted line */}
                <div className="mt-12 md:mt-14 border-t-[1.5px] border-dashed border-primary" />

            </div>
        </section>
    );
};

export default Features;