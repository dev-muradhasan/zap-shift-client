import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const SendParcel = () => {
    const {user} = useAuth();
    const { register, handleSubmit, control,
        // formState: {errors}
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const districtByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(r => r.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }


    const handleSendParcel = (data) => {
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.weight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        // console.log('cost:', cost);
        data.cost = cost;

        Swal.fire({
            title: "Agree with the Cost?",
            text: `You have to pay ${cost} tk`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post("/parcels", data)
                    .then((res) => {
                        if (res.data.insertedId){
                            navigate('/dashboard/my_parcel')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Parcel has created. Please pay",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error adding parcel:", error);

                        Swal.fire({
                            title: "Error!",
                            text: "Failed to add parcel.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    return (
        <div className="min-h-screen py-3">
            <form onSubmit={handleSubmit(handleSendParcel)} className="mx-auto max-w-6xl rounded-2xl bg-white">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">
                        Send A Parcel
                    </h1>
                </div>

                {/* Form Heading */}
                <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-primary">
                        Enter your parcel details
                    </h2>
                </div>

                {/* Parcel Type */}
                <div className="flex items-center gap-8 py-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            {...register('parcelType')}
                            type="radio"
                            value={'document'}
                            className="radio radio-success radio-sm"
                            defaultChecked
                        />
                        <span className="text-sm font-bold text-gray-700">
                            Document
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            {...register('parcelType')}
                            type="radio"
                            value={'non-document'}
                            className="radio radio-success radio-sm"
                        />
                        <span className="text-sm font-bold text-gray-700">
                            Not-Document
                        </span>
                    </label>
                </div>

                {/* Parcel Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 border-b border-gray-200 pb-7">

                    <div>
                        <label className="label py-1">
                            <span className="label-text text-sm font-bold text-primary">
                                Parcel Name
                            </span>
                        </label>

                        <input
                            {...register('parcelName')}
                            type="text"
                            placeholder="Parcel Name"
                            className="input input-bordered input-sm w-full text-sm"
                        />
                    </div>

                    <div>
                        <label className="label py-1">
                            <span className="label-text text-sm font-bold text-primary">
                                Parcel Weight (KG)
                            </span>
                        </label>

                        <input
                            {...register('weight')}
                            type="text"
                            placeholder="Parcel Weight (KG)"
                            className="input input-bordered input-sm w-full text-sm"
                        />
                    </div>

                </div>

                {/* Sender & Receiver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-5">

                    {/* Sender Details */}
                    <div>
                        <h3 className="font-bold text-lg text-primary mb-3">
                            Sender Details
                        </h3>

                        <div className="space-y-3">

                            {/* Sender Name */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm font-bold text-primary">
                                        Sender Name
                                    </span>
                                </label>

                                <input
                                    {...register('senderName')}
                                    type="text"
                                    placeholder="Sender Name"
                                    defaultValue={user.displayName}
                                    className="input input-bordered input-sm w-full text-sm"
                                />
                            </div>

                            {/* Sender email */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm font-bold text-primary">
                                        Sender Email
                                    </span>
                                </label>

                                <input
                                    {...register('senderEmail')}
                                    type="email"
                                    defaultValue={user.email}
                                    placeholder="Sender Email"
                                    className="input input-bordered input-sm w-full text-sm"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Address
                                    </span>
                                </label>

                                <input
                                    {...register('senderAddress')}
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered input-sm w-full text-sm"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Sender Phone No
                                    </span>
                                </label>

                                <input
                                    {...register('senderPhnNb')}
                                    type="text"
                                    placeholder="Sender Phone No"
                                    className="input input-bordered input-sm w-full text-sm"
                                />
                            </div>

                            {/* region */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Your Region
                                    </span>
                                </label>

                                <select
                                    {...register('senderRegion')}
                                    className="select select-bordered select-sm w-full text-sm"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select your Region
                                    </option>

                                    {regions.map((region, index) => (
                                        <option key={index} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* district */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Your District
                                    </span>
                                </label>

                                <select
                                    {...register('senderDistrict')}
                                    className="select select-bordered select-sm w-full text-sm"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select your District
                                    </option>

                                    {districtByRegion(senderRegion).map((district, index) => (
                                        <option key={index} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Pickup Instruction */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Pickup Instruction
                                    </span>
                                </label>

                                <textarea
                                    {...register('pickupInstruction')}
                                    placeholder="Pickup Instruction"
                                    className="textarea textarea-bordered w-full h-24 resize-none text-sm"
                                ></textarea>
                            </div>

                        </div>
                    </div>

                    {/* Receiver Details */}
                    <div>
                        <h3 className="font-bold text-lg text-primary mb-3">
                            Receiver Details
                        </h3>

                        <div className="space-y-3">

                            {/* Receiver Name */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Receiver Name
                                    </span>
                                </label>

                                <input
                                    {...register('receiverName')}
                                    type="text"
                                    placeholder="Receiver Name"
                                    className="input input-bordered input-sm w-full text-sm"
                                />
                            </div>

                            {/* Receiver email */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm font-bold text-primary">
                                        Receiver Email
                                    </span>
                                </label>

                                <input
                                    {...register('receiverEmail')}
                                    type="email"
                                    placeholder="Receiver Email"
                                    className="input input-bordered input-sm w-full text-sm"
                                />
                            </div>

                            {/* Receiver Address */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Receiver Address
                                    </span>
                                </label>

                                <input
                                    {...register('receiverAddress')}
                                    type="text"
                                    placeholder="Receiver Address"
                                    className="input input-bordered input-sm w-full text-sm"
                                />
                            </div>

                            {/* Receiver Contact */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Receiver Contact No
                                    </span>
                                </label>

                                <input
                                    {...register('receiverPhnNb')}
                                    type="text"
                                    placeholder="Receiver Contact No"
                                    className="input input-bordered input-sm w-full text-sm"
                                />
                            </div>

                            {/* Receiver District */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Receiver Region
                                    </span>
                                </label>

                                <select
                                    {...register('receiverRegion')}
                                    className="select select-bordered select-sm w-full text-sm"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select your Region
                                    </option>

                                    {regions.map((region, index) => (
                                        <option key={index} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* district */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Receiver District
                                    </span>
                                </label>

                                <select
                                    {...register('receiverDistrict')}
                                    className="select select-bordered select-sm w-full text-sm"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select your District
                                    </option>

                                    {districtByRegion(receiverRegion).map((district, index) => (
                                        <option key={index} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Delivery Instruction */}
                            <div>
                                <label className="label py-1">
                                    <span className="label-text text-sm text-primary font-bold">
                                        Delivery Instruction
                                    </span>
                                </label>

                                <textarea
                                    {...register('deliveryInstruction')}
                                    placeholder="Delivery Instruction"
                                    className="textarea textarea-bordered w-full h-24 resize-none text-sm"
                                ></textarea>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Note */}
                <div className="mt-7">
                    <p className="text-sm font-bold text-primary">
                        * PickUp Time 4pm-7pm Approx.
                    </p>
                </div>

                {/* Button */}
                <div className="mt-7">
                    <button type="submit" className="btn btn-sm bg-[#C8F24A] hover:bg-[#b8e63b] border-none text-primary text-sm font-bold px-10">
                        Proceed to Confirm Booking
                    </button>
                </div>

            </form>
        </div>
    );
};

export default SendParcel;