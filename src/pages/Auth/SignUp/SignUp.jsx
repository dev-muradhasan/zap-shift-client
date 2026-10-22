import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import GoogleSignIn from "../SocialLogin/GoogleSignIn";
import axios from "axios";


const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append(
            "upload_preset",
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error?.message || "Image upload failed");
        };
        return data.secure_url;
    }


    const handleRegister = async (data) => {
        setLoading(true);
        try {
            const imageFile = data.photo[0];
            const photoURL = await uploadImage(imageFile);

            const profile = {
                displayName: data.name,
                photoURL: photoURL
            };

            // Firebase registration
            const result = await registerUser(
                data.email,
                data.password
            );

            const firebaseUser = result.user;

            // Get Firebase ID token
            const token = await firebaseUser.getIdToken();

            // Update Firebase profile
            await updateUserProfile(profile);

            // User information for MongoDB
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: photoURL
            };

            // Save user in database
            const res = await axios.post(
                "http://localhost:3000/users",
                userInfo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.insertedId) {
                console.log("User created in database");
            }

            navigate(location.state || "/");

        } catch (error) {
            console.error(
                "Registration error:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xs mx-auto">

            {/* Heading */}
            <div className="mb-5">
                <h1 className="text-4xl font-bold text-primary">
                    Create an Account
                </h1>

                <p className="text-sm font-medium text-primary mt-1">
                    Register with ZapShift
                </p>
            </div>


            {/* Form */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-1">

                {/* Photo */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm font-medium text-primary pb-1">
                        Photo
                    </legend>
                    <input
                        {...register("photo", { required: true })}
                        type="file"
                        placeholder="Choose photo"
                        className="file-input input-bordered w-full h-10 min-h-10 text-sm"
                    />
                    {errors.photo?.type === "required" && (
                        <p role="alert" className="text-red-500">Photo is required</p>
                    )}
                </fieldset>
                {/* Name */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm font-medium text-primary pb-1">
                        Name
                    </legend>

                    <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Name"
                        className="input input-bordered w-full h-10 min-h-10 text-sm"
                    />
                    {errors.name?.type === "required" && (
                        <p role="alert" className="text-red-500">Name is required</p>
                    )}
                </fieldset>

                {/* Email */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm font-medium text-primary pb-1">
                        Email
                    </legend>

                    <input
                        {...register('email', { required: true })}
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full h-10 min-h-10 text-sm"
                    />
                    {errors.email?.type === "required" && (
                        <p role="alert" className="text-red-500">Email is required</p>
                    )}
                </fieldset>

                {/* Password */}
                <fieldset className="fieldset relative">
                    <legend className="fieldset-legend text-sm font-medium text-primary pb-1">
                        Password
                    </legend>

                    <input
                        {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/ })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="input input-bordered w-full h-10 min-h-10 text-sm tracking-widest"
                    />
                    {errors.password?.type === "required" && (
                        <p role="alert" className="text-red-500">Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p role="alert" className="text-red-500">Password must be 6 characters or longer.</p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p role="alert" className="text-red-500">Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.</p>
                    )}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? (
                            <FaEyeSlash size={14} />
                        ) : (
                            <FaEye size={14} />
                        )}
                    </button>
                </fieldset>

                {/* Register Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        btn
                        w-full
                        h-12
                        min-h-12
                        mt-3
                        rounded-sm
                        border-none
                        bg-accent-content
                        text-primary
                        text-base
                        font-bold
                        shadow-md
                        transition-all
                        duration-300
                        hover:bg-[#b8e936]
                        hover:shadow-lg
                        active:scale-[0.98]
                        disabled:cursor-not-allowed
                        disabled:opacity-70
    "
                >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Creating Account...
                        </>
                    ) : (
                        "Register"
                    )}
                </button>
            </form>

            {/* Login */}
            <p className="text-xs font-semibold text-gray-400 text-center mt-3">
                Already have an account?{" "}
                <Link
                    state={location.state}
                    to="/signin"
                    className="text-[#849f35] hover:underline"
                >
                    Login
                </Link>
            </p>

            {/* Divider */}
            <div className="divider text-xs text-gray-400 my-3">
                Or
            </div>

            {/* Google Button */}
            <GoogleSignIn></GoogleSignIn>

        </div>
    );
};

export default SignUp;