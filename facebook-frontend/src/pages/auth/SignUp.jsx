import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorBanner from "../../components/global/ErrorPartial";
import { signUpUser } from "../../services/auth.services";
import { UserContext, UseUserContext } from "../../context/UserContext";

const SignUp = () => {
  const { setUser } = UseUserContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    const { username, email, password, phoneNumber, confirmPassword, terms } = formData;

    try {
      const newUser = await signUpUser(
        username,
        email,
        password,
        confirmPassword,
        phoneNumber,
        terms,
      );

      setUser(newUser.user);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4 font-sans">
      {/* Brand Logo */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1877f2] tracking-tighter">
          facebook
        </h1>
      </div>

      {/* Sign Up Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md border border-gray-200">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Create a new account
          </h2>
          <p className="text-gray-600 text-sm">It's quick and easy.</p>
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors duration-200"
            />
          </div>

          {/* Email & Phone Number (Grid for larger screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors duration-200"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors duration-200"
            />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 gap-4">
            <input
              type="password"
              name="password"
              placeholder="New password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors duration-200"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors duration-200"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start mt-4">
            <div className="relative flex items-center pt-0.5">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                onChange={handleChange}
                className="peer sr-only cursor-pointer"
              />

              <label
                for="terms"
                className="w-5 h-5 rounded-md border-2 border-slate-300 bg-slate-50 cursor-pointer transition-all duration-300 ease-out 
                    peer-checked:bg-[#3867ff] peer-checked:border-[#1a57fe] 
                    hover:border-[#1a57fe]/60 peer-focus-visible:ring-4 peer-focus-visible:ring-[#1a57fe]/20 shadow-sm flex items-center justify-center"
              ></label>

              <svg
                className="absolute inset-0 w-5 h-5 mt-0.5 text-white pointer-events-none scale-50 opacity-0 transition-all duration-300 ease-out 
                    peer-checked:scale-100 peer-checked:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3.5"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div className="ml-3 text-xs text-gray-500 leading-tight">
              <label htmlFor="terms" className="cursor-pointer">
                By clicking Sign Up, you agree to our Terms, Privacy Policy and
                Cookies Policy. You may receive SMS notifications from us and
                can opt out at any time.
              </label>
            </div>
          </div>

          <ErrorBanner errorMessages={errorMessage} />

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer text-lg"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-[#1877f2]  hover:text-[#166fe5] text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
