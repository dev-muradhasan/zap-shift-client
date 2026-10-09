import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/big-deliveryman.png';
import bannerTop1 from '../../../assets/tiny-deliveryman.png';
import bannerImg2 from '../../../assets/26489167_delivery_man 1.png';
import bannerImg3 from '../../../assets/10256550_18149902 1.png';
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
    return (
        <div className="max-w-300 mx-auto ">
            <Carousel autoPlay={true}
                infiniteLoop={true}
                interval={2500}
                transitionTime={800}
                showArrows={true}
                showThumbs={false} >
                {/* 1 */}
                <section className="">
                    <div className="mx-auto flex min-h-110 md:min-h-130 items-center overflow-hidden rounded-3xl py-10 bg-white px-8 shadow-sm md:px-12 lg:px-16">

                        {/* Left Content */}
                        <div className="w-full lg:w-1/2">

                            {/* Small Icon */}
                            <div className="mb-5">
                                <div className="flex w-25 md:w-35 items-center justify-center">
                                    {/* <FaTruck className="text-3xl text-primary" /> */}
                                    <img src={bannerTop1} alt="" />
                                </div>
                            </div>

                            {/* Heading */}
                            <h1 className="max-w-xl text-left text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-4xl">
                                We Make Sure Your{" "} <br />
                                <span className="text-[#ACC857]">
                                    Parcel Arrives
                                </span>{" "}
                                On Time{" "}
                                <br />
                                – No Fuss.
                            </h1>

                            {/* Description */}
                            <p className="mt-5 max-w-lg text-sm leading-6 text-secondary text-left md:text-[15px]">
                                Enjoy fast, reliable parcel delivery with real-time
                                tracking and zero hassle. From personal packages to
                                business shipments — we deliver on time, every time.
                            </p>

                            {/* Buttons */}
                            <div className="mt-6 flex flex-wrap items-center">
                                <button className="btn h-11 min-h-0 rounded-full border-0 bg-accent-content px-5 text-sm font-bold text-[#183000] shadow-none hover:bg-[#b9e52d]">
                                    Track Your Parcel

                                </button>
                                <span className="flex items-center justify-center  rounded-full bg-[#26351A] text-[#ACC857] h-11 min-h-0 w-11 mr-3">
                                    <FaArrowRight className="-rotate-45" />
                                </span>

                                <button className="btn h-11 min-h-0 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 shadow-none hover:bg-gray-50">
                                    Be A Rider
                                </button>
                            </div>

                            {/* Slider Indicator */}
                            <div className="mt-7 flex items-center gap-2">
                                <span className="h-0.5 w-6 bg-primary"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="hidden w-1/2 items-center justify-end lg:flex">
                            <div className="relative w-[70%] max-w-100">
                                <img
                                    src={bannerImg1}
                                    alt="Parcel delivery rider"
                                    className="w-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* 2 */}
                <section className="">
                    <div className="mx-auto flex min-h-110 md:min-h-130 items-center overflow-hidden rounded-3xl py-10 bg-white px-8 shadow-sm md:px-12 lg:px-16">

                        {/* Left Content */}
                        <div className="w-full lg:w-1/2">

                            {/* Heading */}
                            <h1 className="max-w-xl text-left text-4xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                                Fastest {" "}
                                <span className="block">
                                    <span className="text-[#ACC857]">Delivery</span>{' '}
                                    <span>& Easy</span>{' '}
                                </span>
                                <span className="text-[#ACC857]">Pickup</span>
                            </h1>

                            {/* Description */}
                            <p className="mt-5 max-w-lg text-sm leading-6 text-secondary text-left md:text-[15px]">
                                Enjoy fast, reliable parcel delivery with real-time
                                tracking and zero hassle. From personal packages to
                                business shipments — we deliver on time, every time.
                            </p>

                            {/* Buttons */}
                            <div className="mt-6 flex flex-wrap items-center">
                                <button className="btn h-11 min-h-0 rounded-full border-0 bg-accent-content px-5 text-sm font-bold text-[#183000] shadow-none hover:bg-[#b9e52d]">
                                    Track Your Parcel

                                </button>
                                <span className="flex items-center justify-center  rounded-full bg-[#26351A] text-[#ACC857] h-11 min-h-0 w-11 mr-3">
                                    <FaArrowRight className="-rotate-45" />
                                </span>

                                <button className="btn h-11 min-h-0 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 shadow-none hover:bg-gray-50">
                                    Be A Rider
                                </button>
                            </div>

                            {/* Slider Indicator */}
                            <div className="mt-7 flex items-center gap-2">
                                <span className="h-0.5 w-6 bg-primary"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="hidden w-1/2 items-center justify-end lg:flex">
                            <div className="relative w-[90%] max-w-130">
                                <img
                                    src={bannerImg2}
                                    alt="Parcel delivery rider"
                                    className="w-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 */}
                <section className="">
                    <div className="mx-auto flex min-h-110 md:min-h-130 items-center overflow-hidden rounded-3xl py-10 bg-white px-8 shadow-sm md:px-12 lg:px-16">

                        {/* Left Content */}
                        <div className="w-full lg:w-1/2">

                            {/* Heading */}
                            <h1 className="max-w-xl text-left text-4xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                                Delivery in <span className="text-[#ACC857]">30</span> {" "}
                                <span className="block">
                                    <span className="text-[#ACC857]">Minutes</span>{' '}
                                    <span>at your </span>{' '}
                                </span>
                                <span>doorstep</span>
                            </h1>

                            {/* Description */}
                            <p className="mt-5 max-w-lg text-sm leading-6 text-secondary text-left md:text-[15px]">
                                Enjoy fast, reliable parcel delivery with real-time
                                tracking and zero hassle. From personal packages to
                                business shipments — we deliver on time, every time.
                            </p>

                            {/* Buttons */}
                            <div className="mt-6 flex flex-wrap items-center">
                                <button className="btn h-11 min-h-0 rounded-full border-0 bg-accent-content px-5 text-sm font-bold text-[#183000] shadow-none hover:bg-[#b9e52d]">
                                    Track Your Parcel

                                </button>
                                <span className="flex items-center justify-center  rounded-full bg-[#26351A] text-[#ACC857] h-11 min-h-0 w-11 mr-3">
                                    <FaArrowRight className="-rotate-45" />
                                </span>

                                <button className="btn h-11 min-h-0 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 shadow-none hover:bg-gray-50">
                                    Be A Rider
                                </button>
                            </div>

                            {/* Slider Indicator */}
                            <div className="mt-7 flex items-center gap-2">
                                <span className="h-0.5 w-6 bg-primary"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                                <span className="h-0.5 w-3 bg-gray-300"></span>
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="hidden w-1/2 items-center justify-end lg:flex">
                            <div className="relative w-[90%] max-w-130">
                                <img
                                    src={bannerImg3}
                                    alt="Parcel delivery rider"
                                    className="w-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </Carousel>
        </div>
    );
};

export default Banner;