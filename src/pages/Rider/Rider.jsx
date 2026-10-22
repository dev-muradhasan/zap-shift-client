import { useForm, useWatch } from "react-hook-form";
import { FaArrowRight, FaMotorcycle } from "react-icons/fa";
import riderImage from "../../assets/agent-pending.png";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
    const { register, handleSubmit, control } = useForm();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const region = useWatch({ control, name: 'region' })
    const axiosSecure = useAxiosSecure()

    const districtByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(r => r.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }


    const handleRiderSubmit = (data) => {
        console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. We will reach to you in 3 days.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    };

    const inputClass =
        "input input-bordered input-sm w-full text-sm my-1";

    const labelClass =
        "label-text text-sm font-bold text-primary";

    return (
        <section className="min-h-screen bg-white rounded-2xl py-8 md:py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-8">

                {/* Header */}
                <div className="sm:mb-3 mb-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FaMotorcycle className="text-2xl" />
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-primary md:text-5xl">
                            Be a Rider
                        </h1>
                    </div>

                    <p className="max-w-xl text-sm leading-6 text-secondary">
                        Enjoy fast, reliable parcel delivery with real-time
                        tracking and zero hassle. From personal packages to
                        business shipments — we deliver on time, every time.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-10 border-t border-base-200 pt-4 lg:grid-cols-2 lg:gap-14">

                    {/* Rider Form */}
                    <div>
                        <div className="mb-4 border-b border-base-200 pb-4">
                            <h2 className="text-xl font-bold text-primary md:text-2xl">
                                Tell us about yourself
                            </h2>
                            <p className="mt-1 text-sm text-secondary">
                                Fill in your details to apply as a rider.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(handleRiderSubmit)}
                            className="space-y-3"
                        >
                            {/* Name */}
                            <div>
                                <label className={labelClass}>
                                    Your Name
                                </label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                />
                            </div>

                            {/* Driving License */}
                            <div>
                                <label className={labelClass}>
                                    Driving License Number
                                </label>
                                <input
                                    {...register("drivingLicense")}
                                    type="text"
                                    placeholder="Driving License Number"
                                    className={inputClass}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className={labelClass}>
                                    Your Email
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Enter your email"
                                    className={inputClass}
                                />
                            </div>

                            {/* Region */}
                            <div>
                                <label className={labelClass}>
                                    Your Region
                                </label>
                                <select
                                    {...register("region")}
                                    defaultValue=""
                                    className="select select-bordered select-sm w-full text-sm my-1"
                                >
                                    <option value="" disabled>
                                        Select your region
                                    </option>

                                    {regions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* District */}
                            <div>
                                <label className={labelClass}>
                                    Your District
                                </label>
                                <select
                                    {...register("district")}
                                    defaultValue=""
                                    className="select select-bordered select-sm w-full text-sm my-1"
                                >
                                    <option value="" disabled>
                                        Select your district
                                    </option>

                                    {districtByRegion(region).map((district, index) => (
                                        <option key={index} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* NID */}
                            <div>
                                <label className={labelClass}>
                                    NID Number
                                </label>
                                <input
                                    {...register("nid")}
                                    type="text"
                                    placeholder="Enter your NID number"
                                    className={inputClass}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className={labelClass}>
                                    Phone Number
                                </label>
                                <input
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className={inputClass}
                                />
                            </div>

                            {/* Bike Model */}
                            <div>
                                <label className={labelClass}>
                                    Bike Brand, Model and Year
                                </label>
                                <input
                                    {...register("bikeModel")}
                                    type="text"
                                    placeholder="e.g. Honda XBlade 2024"
                                    className={inputClass}
                                />
                            </div>

                            {/* Registration */}
                            <div>
                                <label className={labelClass}>
                                    Bike Registration Number
                                </label>
                                <input
                                    {...register("bikeRegistration")}
                                    type="text"
                                    placeholder="Bike Registration Number"
                                    className={inputClass}
                                />
                            </div>

                            {/* About */}
                            <div>
                                <label className={labelClass}>
                                    Tell Us About Yourself
                                </label>
                                <textarea
                                    {...register("about")}
                                    placeholder="Tell us about your experience..."
                                    className="textarea textarea-bordered w-full h-24 resize-none text-sm my-1"
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-3">
                                <button
                                    type="submit"
                                    className="btn min-h-12 h-12 w-full rounded-lg border-none bg-accent-content text-primary shadow-sm transition-all duration-300 hover:bg-[#b8e936] hover:shadow-md active:scale-[0.99]"
                                >
                                    <span>Submit Application</span>
                                    <FaArrowRight className="-rotate-45" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Illustration */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24 flex flex-col items-center pt-4">
                            <div className="max-w-sm text-center">
                                <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                                    Join Our Team
                                </span>

                                <h3 className="text-2xl font-bold text-primary">
                                    Deliver more than parcels.
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-secondary">
                                    Become a part of our delivery network and
                                    help customers receive their parcels safely
                                    and on time.
                                </p>
                            </div>

                            <img
                                src={riderImage}
                                alt="Delivery rider carrying a parcel"
                                className="w-full max-w-md object-contain"
                            />

                            <div className="mt-3 grid w-full max-w-md grid-cols-2 gap-4">
                                <div className="rounded-xl border border-base-200 bg-white p-4">
                                    <h4 className="font-bold text-primary">
                                        Flexible Work
                                    </h4>
                                    <p className="mt-1 text-xs leading-5 text-secondary">
                                        Work with a delivery team built around
                                        reliable service.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-base-200 bg-white p-4">
                                    <h4 className="font-bold text-primary">
                                        Reliable Service
                                    </h4>
                                    <p className="mt-1 text-xs leading-5 text-secondary">
                                        Help every parcel reach its destination
                                        safely.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Rider;