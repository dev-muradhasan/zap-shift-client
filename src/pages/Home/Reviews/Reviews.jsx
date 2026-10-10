import { use, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import imgTop from '../../../assets/customer-top.png'

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Autoplay,
    EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ReviewCard from './ReviewCard'


const Reviews = ({ reviewPromise }) => {
    const swiperRef = useRef(null);
    const reviews = use(reviewPromise)

    return (
        <section className="bg-[#eef0f1] overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* Top Illustration */}
                <div className="flex justify-center mb-5">
                    <div className="text-primary text-5xl">
                        <img src={imgTop} alt="" />
                    </div>
                </div>


                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        What our customers are sayings
                    </h2>

                    <p className="text-sm md:text-base text-gray-500 mt-4 leading-6">
                        Enhance posture, mobility, and well-being effortlessly
                        with Posture Pro. Achieve proper alignment, reduce
                        pain, and strengthen your body with ease!
                    </p>

                </div>


                {/* Slider */}
                <div className="mt-7 md:mt-9">

                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        effect={'coverflow'}
                        modules={[
                            Navigation,
                            Pagination,
                            Autoplay,
                            EffectCoverflow,
                        ]}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 70,
                            depth: 200,
                            modifier: 1,
                            slideShadows: true,
                            loop: true,
                            speed: 600,
                            slidesPerView: 1,
                            centeredSlides: true,
                            scale: 0.80,
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}

                        pagination={{
                            el: ".testimonial-pagination",
                            clickable: true,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                            },
                        }}
                        className="testimonial-swiper"
                    >

                        {reviews.map((reviewInfo) => (
                            <SwiperSlide key={reviewInfo.id}>
                                <ReviewCard
                                    reviewInfo={reviewInfo}
                                />
                            </SwiperSlide>
                        ))}

                    </Swiper>

                </div>


                {/* Controls */}
                <div className="flex justify-center items-center gap-5 mt-5">

                    {/* Previous */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="
                            w-10 h-10
                            rounded-full
                            bg-white
                            flex items-center justify-center
                            text-primary
                            shadow-sm
                            hover:bg-[#004c52]
                            hover:text-white
                            transition
                            cursor-pointer
                        "
                    >
                        <FaArrowLeft size={14} />
                    </button>


                    {/* Pagination */}
                    <div className="testimonial-pagination flex items-center justify-center gap-1.5"></div>


                    {/* Next */}
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="
                            w-10 h-10
                            rounded-full
                            bg-accent-content
                            flex items-center justify-center
                            text-primary
                            shadow-sm
                            hover:bg-[#b3df32]
                            transition
                            cursor-pointer
                        "
                    >
                        <FaArrowRight size={14} />
                    </button>

                </div>

            </div>

        </section>
    );
};

export default Reviews;