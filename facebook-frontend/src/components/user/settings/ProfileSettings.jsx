import React, { useState } from "react";
import defaultPfp from "../../../assets/default-pfp.webp";
import { UseUserContext } from "../../../context/UserContext";
import ErrorBanner from "../../global/ErrorPartial";
import { editProfile } from "../../../services/user.services";
import SuccessBanner from "../../global/SuccessPartial";

const ProfileSettings = () => {
  const { user, setUser } = UseUserContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || defaultPfp,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editProfileHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const data = new FormData();

    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("bio", formData.bio);
    data.append("profilePicture", formData.profilePicture);

    try {
      const userData = await editProfile(data);
      setUser(userData.user);
      setSuccessMessage(userData.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Profile Settings
        </h3>
        <p className="text-gray-500 mt-1 text-[15px]">
          Manage your personal information and how you appear on the platform.
        </p>
      </div>

      <form onSubmit={editProfileHandler} className="space-y-6">
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col sm:flex-row items-center gap-6 mb-8 shadow-sm">
          <label
            htmlFor="profile-upload"
            className="relative group cursor-pointer shrink-0"
          >
            <img
              src={
                user?.profilePicture
                  ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
                  : defaultPfp
              }
              alt="Profile Picture"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md transition-all group-hover:opacity-90"
            />

            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-semibold">Edit</span>
            </div>
          </label>

          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-bold text-xl text-gray-900 mb-3">
              {user?.username}
            </h4>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <label
                htmlFor="profile-upload"
                className="px-5 py-2.5 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold rounded-lg text-sm transition-colors shadow-sm cursor-pointer inline-block"
              >
                Upload Photo
              </label>

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profilePicture: e.target.files[0],
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Your public profile URL will be facebook.com/
              {formData.username || "username"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little bit about yourself..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Add phone number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        <ErrorBanner errorMessages={errorMessage} />
        <SuccessBanner successMessage={successMessage} />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-3.5 px-8 rounded-xl shadow-sm transition-colors cursor-pointer text-[15px]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
