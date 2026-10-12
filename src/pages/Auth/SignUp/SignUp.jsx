import { Link } from "react-router";
import userImg from '../../../assets/image-upload-icon.png'
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import GoogleSignIn from "../SocialLogin/GoogleSignIn";




const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser } = useAuth();

    const handleRegister = (data) => {
        console.log(data);
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message);
            })
    }

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

            {/* User Icon */}
            <div className="mb-4">
                <div className="w-10 h-10 rounded-full bg-[#f1f3f4] flex items-center justify-center">
                    <img src={userImg} alt="" />
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-1">

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
                    className="
                        btn
                        w-full
                        h-10
                        min-h-10
                        mt-2
                        bg-accent-content
                        hover:bg-[#b8e936]
                        border-none
                        text-primary
                        font-bold
                        text-sm
                    "
                >
                    Register
                </button>
            </form>

            {/* Login */}
            <p className="text-xs font-semibold text-gray-400 text-center mt-3">
                Already have an account?{" "}
                <Link
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