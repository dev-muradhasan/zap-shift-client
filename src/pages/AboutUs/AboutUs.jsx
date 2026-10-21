import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState("Story");
    const tabs = ["Story", "Mission", "Success", "Team & Others"];

    const tabScrollRef = useRef(null);
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const el = tabScrollRef.current;
            if (el) {
                setShowArrow(el.scrollWidth > el.clientWidth);
            }
        };
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => {
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const tabContent = {
        Story: (
            <>
                <p>
                    We started with a simple promise — to make parcel delivery
                    fast, reliable, and stress-free. What began as a small idea
                    has grown into a trusted delivery service focused on making
                    every shipment simple and convenient.
                </p>

                <p>
                    With real-time tracking, efficient logistics, and a dedicated
                    delivery team, we work hard to ensure every parcel reaches
                    its destination safely and on time. Whether you're sending a
                    personal gift or an important business package, you can count
                    on us.
                </p>

                <p>
                    Our customers are at the heart of everything we do. We
                    continuously improve our technology, delivery network, and
                    support services to create a faster, smoother, and more
                    dependable delivery experience for everyone.
                </p>
            </>
        ),

        Mission: (
            <>
                <p>
                    Our mission is to make parcel delivery simple, reliable,
                    and accessible for everyone. We use technology, efficient
                    logistics, and customer-focused service to create a smooth
                    delivery experience.
                </p>
                <p>
                    We continuously improve our services so that every parcel
                    reaches its destination safely and on time. Our goal is to
                    build a delivery network that people can trust every day.
                </p>
                <p>
                    From individuals to businesses, we aim to provide dependable
                    logistics solutions that make sending and receiving parcels
                    easier.
                </p>
            </>
        ),

        Success: (
            <>
                <p>
                    Our success comes from the trust of thousands of customers
                    who rely on our delivery services every day.
                </p>
                <p>
                    We have built a strong delivery network by focusing on
                    speed, reliability, technology, and customer satisfaction.
                </p>
                <p>
                    Every successful delivery motivates us to improve our service
                    and provide an even better experience for our customers.
                </p>
            </>
        ),

        "Team & Others": (
            <>
                <p>
                    Our team is made up of passionate people who work together
                    to provide fast and reliable delivery services.
                </p>
                <p>
                    From delivery partners to customer support and technology
                    teams, everyone plays an important role in creating a smooth
                    experience.
                </p>
                <p>
                    We believe that teamwork, dedication, and customer-first
                    thinking are the keys to building a successful delivery
                    service.
                </p>
            </>
        ),
    };

    return (
        <section className="bg-[#eef0f1] py-5 md:py-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Card */}
                <div
                    className="
                        bg-white
                        rounded-2xl
                        px-6
                        py-10
                        md:px-10
                        lg:px-16
                        md:py-14
                    "
                >
                    {/* ================= HEADER ================= */}
                    <div>
                        <h2
                            className="
                                text-3xl
                                md:text-4xl
                                lg:text-5xl
                                font-bold
                                text-primary
                            "
                        >
                            About Us
                        </h2>
                        <p
                            className="
                                text-xs
                                md:text-sm
                                text-secondary
                                leading-5
                                max-w-xl
                                mt-4
                            "
                        >
                            Enjoy fast, reliable parcel delivery with real-time
                            tracking and zero hassle. From personal packages to
                            business shipments — we deliver on time, every time.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 mt-8"></div>

                    {/* ================= TABS ================= */}
                    <div className="mt-8">

                        {/* Tab Buttons */}
                        <div className="relative">

                            <div
                                ref={tabScrollRef}
                                className="w-full overflow-x-auto scrollbar-hide"
                            >
                                <div className="flex w-max min-w-full">

                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`
                                            shrink-0
                                            px-5
                                            py-3
                                            text-base
                                            md:text-lg
                                            font-semibold
                                            whitespace-nowrap
                                            transition-all
                                            duration-200
                                            border-b-2
                                             cursor-pointer
                                            ${activeTab === tab
                                                    ? "text-[#5B6A2E] font-bold border-[#5B6A2E]"
                                                    : "text-gray-400 border-transparent"
                                                }
                        `}
                                        >
                                            {tab}
                                        </button>
                                    ))}

                                </div>
                            </div>

                            {/* Right Arrow */}
                            {showArrow && (
                                <button
                                    onClick={() => {
                                        tabScrollRef.current?.scrollBy({
                                            left: 150,
                                            behavior: "smooth",
                                        });
                                    }}
                                    className="
                                    absolute
                                    right-0
                                    top-1/2
                                    -translate-y-1/2
                                    z-10
                                    w-8
                                    h-8
                                    rounded-full
                                    bg-white
                                    shadow-md
                                    flex
                                    items-center
                                    justify-center
                                    text-[#5B6A2E]
                                    hover:bg-[#5B6A2E]
                                    hover:text-white
                                    transition
                                    md:hidden
                "
                                >
                                    <FaChevronRight size={11} />
                                </button>
                            )}

                        </div>

                        {/* ================= CONTENT ================= */}
                        <div
                            className="
                            bg-white
                            border
                            border-base-300
                            rounded-b-xl
                            p-5
                            md:p-6
                            space-y-4
                            text-sm
                            md:text-base
                            leading-7
                            text-secondary
                            md:min-h-65
        "
                        >
                            {tabContent[activeTab]}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;