
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import image from '../../../assets/location-merchant.png'
import bgImage from '../../../assets/be-a-merchant-bg.png'


const BeAMerchant = () => {
    return (
        <section className="">
            <div
                className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#003b3e] bg-no-repeat"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundPosition: "top center",
                    backgroundSize: "100% auto",
                }}
            >
                <div className="grid min-h-67 grid-cols-1 items-center px-6 py-10 sm:px-10 md:grid-cols-2 md:px-12 md:py-12">
                    {/* Left content */}
                    <div className="relative z-10">
                        <h2 className="relative w-max max-w-none text-2xl font-bold leading-tight text-white sm:text-3xl">
                            Merchant and Customer Satisfaction
                            <br className="hidden lg:block" /> is Our First Priority
                        </h2>

                        <p className="mt-3 max-w-md text-xs leading-[1.8] text-accent">
                            We offer the lowest delivery charge with the highest value along
                            with 100% safety of your product. Pathao courier delivers your
                            parcels in every corner of Bangladesh right on time.
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <Link
                                to="/be-a-merchant"
                                className="btn min-h-0 h-auto rounded-full border-none bg-accent-content px-5 py-2.5 text-xs font-semibold text-primary shadow-none transition hover:bg-[#a3ce17]"
                            >
                                Become a Merchant
                                <FaArrowRight className="ml-1 text-[10px]" />
                            </Link>

                            <Link
                                to="/earn-with-zapshift"
                                className="btn min-h-0 h-auto rounded-full border border-accent-content bg-transparent px-5 py-2.5 text-xs font-semibold text-[#d4f36b] shadow-none transition hover:bg-accent-content hover:text-primary"
                            >
                                Earn with ZapShift Courier
                            </Link>
                        </div>
                    </div>

                    {/* Right illustration */}
                    <div className="relative flex items-center justify-center md:justify-end">
                        <img
                            src={image}
                            alt="Delivery package illustration"
                            className="w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeAMerchant;
