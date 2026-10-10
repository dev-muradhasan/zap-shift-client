import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ reviewInfo }) => {
    const {
        name,
        designation,
        review,
        image,
    } = reviewInfo;

    return (
        <div className="testimonial-card">
            {/* Quote */}
            <FaQuoteLeft className="text-3xl text-accent-content mb-4" />

            {/* Review */}
            <p className="text-sm leading-5 text-secondary">
                {review}
            </p>

            {/* Divider */}
            <div className="border-t-[1.5px] border-dashed border-primary my-4"></div>

            {/* User */}
            <div className="flex items-center gap-3">
                <img
                    src={image}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                    <h4 className="font-bold text-primary text-sm">
                        {name}
                    </h4>

                    <p className="text-xs text-secondary mt-1">
                        {designation}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;