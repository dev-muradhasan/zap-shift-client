import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

const faqData = [
    {
        id: 1,
        question: "How does this posture corrector work?",
        answer:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
        id: 2,
        question: "Is it suitable for all ages and body types?",
        answer:
            "Yes, the posture corrector is designed to provide comfortable support for different ages and body types. However, proper sizing and adjustment are important for the best experience.",
    },
    {
        id: 3,
        question: "Does it really help with back pain and posture improvement?",
        answer:
            "It can help encourage better posture by gently supporting your shoulders and back. Consistent use along with proper exercise and healthy habits can contribute to improved posture.",
    },
    {
        id: 4,
        question: "Does it have smart features like vibration alerts?",
        answer:
            "Some posture correctors include smart vibration alerts that remind you when your posture starts to become poor, helping you maintain better posture throughout the day.",
    },
    {
        id: 5,
        question: "How will I be notified when the product is back in stock?",
        answer:
            "You can subscribe to stock notifications and we will notify you through your registered email when the product becomes available again.",
    },
];


const FAQ = () => {
    const [activeId, setActiveId] = useState(1);

    const handleToggle = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section className="mb-10 md:mb-14">

            <div className="max-w-3xl mx-auto">

                {/* ================= HEADER ================= */}

                <div className="text-center mb-5 md:mb-8">

                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Frequently Asked Question (FAQ)
                    </h2>

                    <p className="text-sm md:text-base text-secondary mt-4 leading-6 max-w-2xl mx-auto">
                        Enhance posture, mobility, and well-being effortlessly
                        with Posture Pro. Achieve proper alignment, reduce
                        pain, and strengthen your body with ease!
                    </p>

                </div>


                {/* ================= FAQ ================= */}

                <div className="space-y-2 md:space-y-3">

                    {faqData.map((faq) => {
                        const isOpen = activeId === faq.id;

                        return (
                            <div
                                key={faq.id}
                                className={`
                                    rounded-xl
                                    overflow-hidden
                                    border
                                    transition-all
                                    duration-300
                                    ${isOpen
                                    ? "border-[#067A87] bg-[#E6F2F3]"
                                    : "border-[#DADADA] bg-white"
                                    }
                                `}
                            >

                                {/* Question */}
                                <button
                                    onClick={() => handleToggle(faq.id)}
                                    className={`
                                        w-full
                                        flex
                                        items-center
                                        justify-between
                                        px-4
                                        py-4
                                        text-left
                                        cursor-pointer
                                        ${isOpen
                                            ? "text-primary"
                                            : "text-primary"
                                        }
                                    `}
                                >

                                    <span className="text-xs text-primary md:text-sm font-semibold">
                                        {faq.question}
                                    </span>

                                    {isOpen ? (
                                        <FaChevronUp
                                            className="text-[#168d98] shrink-0"
                                            size={12}
                                        />
                                    ) : (
                                        <FaChevronDown
                                            className="text-primary shrink-0"
                                            size={12}
                                        />
                                    )}

                                </button>


                                {/* Answer */}
                                <div
                                    className={`
                                        grid
                                        transition-all
                                        duration-300
                                        ${isOpen
                                            ? "grid-rows-[1fr]"
                                            : "grid-rows-[0fr]"
                                        }
                                    `}
                                >

                                    <div className="overflow-hidden">

                                        <div className="mx-4 border-t-2 border-[#C3DFE2]"></div>

                                        <p className="px-4 py-3 text-xs md:text-sm leading-5 text-secondary">
                                            {faq.answer}
                                        </p>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>


                {/* ================= BUTTON ================= */}

                <div className="flex justify-center mt-7">

                    <button
                        className="
                            flex
                            items-center
                            gap-0
                            bg-[#c5f23f]
                            text-[#1c1c1c]
                            rounded-xl
                            pl-6
                            pr-6
                            py-1
                            font-semibold
                            text-sm
                            cursor-pointer
                            hover:bg-[#b8e936]
                            transition
                        "
                    >

                        <span>
                            See More FAQ's
                        </span>
                    </button>
                    <span
                        className="
                                w-10
                                h-10
                                rounded-full
                                bg-[#202020]
                                text-[#c5f23f]
                                flex
                                items-center
                                justify-center
                            "
                    >
                        <FaArrowRight size={18} className="-rotate-45" />
                    </span>

                </div>

            </div>

        </section>
    );
};

export default FAQ;