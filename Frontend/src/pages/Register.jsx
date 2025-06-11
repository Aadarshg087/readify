import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
// The user's original code used `useNavigate`, which is appropriate for a multi-page app.
// Since this is a single component, we'll keep the logic but it won't navigate in this isolated preview.
// import { useNavigate } from "react-router-dom";

// --- Mock Components and Hooks for Standalone Demo ---
// In a real app, you would import these from your project files.
// const useNavigate = () => (path) => console.log(`Navigating to ${path}`);

// --- End Mock Components ---

const Login = () => {
  const navigate = useNavigate();
  async function responseGoogle(authResult) {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        console.log(result.data);
        const details = {
          name: result.data.user.fullName,
          email: result.data.user.email,
          token: result.data.token,
        };

        localStorage.setItem("userInfo", JSON.stringify(details));

        navigate("/dashboard");
      }
      console.log(authResult);
    } catch (error) {
      console.log(`Error whilte requesting google code ${error}`);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  // A mock GoogleLogin component to simulate the original structure.
  const GoogleLoginButton = () => (
    <button
      type="button"
      onClick={googleLogin}
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <span className="text-white">Sign in with Google</span>
    </button>
  );

  const BASE_URL = "http://localhost:3000/users";

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function handleFormData(formData) {
    setServerError(""); // Clear previous errors
    try {
      // The endpoint is /createUser, so this is a sign-up form.
      const entry = await axios.post(`${BASE_URL}/createUser`, formData);

      if (entry.status >= 200 && entry.status < 300) {
        const data = {
          name: entry.data.createdUser.fullName,
          email: entry.data.createdUser.email,
          token: entry.data.token,
        };
        console.log(entry);
        // In a real app, you might use context or state management instead of localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display error from the server, e.g., "Email already in use"
        setServerError(error.response.data.message);
      } else {
        // Generic error message
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    // Main container to center the form on the page
    <div className="flex items-center justify-center py-5 bg-gray-200 rounded-2xl font-sans text-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        {/* Form Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Get started with your new account today.
          </p>
        </div>

        {/* Google Login Button */}
        <GoogleLoginButton />

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 text-gray-500 bg-white rounded-full">OR</span>
          </div>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit(handleFormData)}
          className="space-y-4"
          noValidate
        >
          {/* Server Error Message */}
          {serverError && (
            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
              {serverError}
            </div>
          )}

          {/* Full Name Input */}
          <div>
            <label
              htmlFor="fullName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              {...register("fullName", { required: "Full Name is required" })}
              type="text"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              type="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 mt-2 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
