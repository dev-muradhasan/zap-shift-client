import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import GoogleSignIn from "../SocialLogin/GoogleSignIn";




const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
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
          Welcome Back
        </h1>

        <p className="text-sm font-medium text-primary mt-1">
          Login to ZapShift
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-1">

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
            {...register('password', { required: true, minLength: 6 })}
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

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-[#849f35] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
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
          Login
        </button>
      </form>

      {/* Register */}
      <p className="text-xs font-semibold text-gray-400 text-center mt-3">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-[#849f35] hover:underline"
        >
          Register
        </Link>
      </p>

      {/* Divider */}
      <div className="divider text-xs text-gray-400 my-3">
        Or
      </div>

      {/* Google Button */}
      <GoogleSignIn></GoogleSignIn>

    </div>
  )
};

export default SignIn;