import React, { useState } from "react";
import ErrorBanner from "../../components/global/ErrorPartial";
import { loginUser } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../../context/UserContext";

const Login = () => {
  const { setUser } = UseUserContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { email, password } = formData;
    
    try {

      const user = await loginUser(email, password);

      setUser(user.user);
      navigate('/');


    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center items-center p-4 font-sans">
      {/* Container for Desktop Split Layout */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl items-center md:items-start justify-between gap-10 md:gap-20 mt-[-10vh]">
        {/* Left Side: Brand & Copy */}
        <div className="text-center md:text-left md:mt-16 md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1877f2] tracking-tighter mb-4">
            facebook
          </h1>
          <p className="text-2xl text-gray-800 leading-tight md:pr-10">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md md:w-1/2">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email or Phone Input */}
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors duration-200 text-lg"
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors duration-200 text-lg"
                />
              </div>

              <ErrorBanner errorMessages={errorMessage} />

              {/* Login Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer text-xl"
                >
                  Log In
                </button>
              </div>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-4 mb-5">
              <a
                href="/forgot-password"
                className="text-[#1877f2]  text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Forgot password?
              </a>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200 mb-6"></div>

            {/* Create Account Button */}
            <div className="text-center">
              <a
                href="/sign-up"
                className="inline-block bg-[#42b72a] hover:bg-[#36a420] text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer text-lg"
              >
                Create new account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
