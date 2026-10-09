
import car from '../../../assets/bookingIcon.png'

const HowItWorks = () => {
    const services = [
        {
            title: "Booking Pick & Drop",
            description:
                "From personal packages to business shipments — we deliver on time, every time.",
        },
        {
            title: "Cash On Delivery",
            description:
                "From personal packages to business shipments — we deliver on time, every time.",
        },
        {
            title: "Delivery Hub",
            description:
                "From personal packages to business shipments — we deliver on time, every time.",
        },
        {
            title: "Booking SME & Corporate",
            description:
                "From personal packages to business shipments — we deliver on time, every time.",
        },
    ];

    return (
        <section className="bg-[#EEF0F0] ">
            <div className="mx-auto max-w-5xl">

                {/* Heading */}
                <h2 className="mb-4 md:mb-6 text-2xl font-extrabold text-primary md:text-3xl">
                    How it Works
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="min-h-44 rounded-2xl bg-white px-5 py-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                        >
                            {/* Icon */}
                            <div className="mb-4 max-w-15 flex items-center text-primary">
                                <img src={car} alt="" />
                            </div>

                            {/* Title */}
                            <h3 className=" font-bold text-primary">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-[12px] leading-5 text-secondary">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;