import brand1 from "../../../assets/brands/amazon_vector.png";
import brand2 from "../../../assets/brands/casio.png";
import brand3 from "../../../assets/brands/moonstar.png";
import brand4 from "../../../assets/brands/randstad.png";
import brand5 from "../../../assets/brands/star.png";
import brand6 from "../../../assets/brands/start_people.png";

const Brands = () => {
    const brands = [
        brand2,
        brand1,
        brand3,
        brand5,
        brand6,
        brand4,
    ];

    return (
        <section className="bg-[#EEF0F0]">
            <div className="mx-auto max-w-5xl px-5">
                <h2 className="mb-6 text-center text-2xl font-bold text-primary">
                    We've helped thousands of sales teams
                </h2>

                <div className="overflow-hidden">
                    <div className="brand-marquee flex w-max">
                        {[...brands, ...brands].map((brand, index) => (
                            <div
                                key={index}
                                className="mx-8 flex h-20 w-32 shrink-0 items-center justify-center"
                            >
                                <img
                                    src={brand}
                                    alt={`Brand ${index + 1}`}
                                    className="max-h-14 max-w-28 object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Brands;