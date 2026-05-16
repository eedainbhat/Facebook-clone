import React, { useState } from "react";
import {
  FaUserEdit,
  FaLock,
  FaBell,
  FaShieldAlt,
  FaTrashAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import ProfileSettings from "../../components/user/settings/ProfileSettings";
import SecuritySettings from "../../components/user/settings/SecuritySettings";
import DangerZone from "../../components/user/settings/DangerZone";
import SidebarButton from "../../components/user/settings/SidebarButton";
import Navbar from "../../components/global/Navbar";
import { logoutUser } from "../../services/auth.services";
import ErrorBanner from "../../components/global/ErrorPartial";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../../context/UserContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [errorMessage, setErrorMessage] = useState(null);
  const { setUser } = UseUserContext();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <SecuritySettings />;
      case "danger":
        return <DangerZone />;
      default:
        return <ProfileSettings />;
    }
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const data = await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans text-gray-900 pt-14">
      <Navbar />

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-4 p-4 md:py-8 md:px-8 items-start">
        <aside className="w-full md:w-[300px] shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          </div>
          <div className="p-2 flex flex-col gap-1">
            <SidebarButton
              icon={<FaUserEdit />}
              label="Edit Profile"
              isActive={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <SidebarButton
              icon={<FaLock />}
              label="Security & Login"
              isActive={activeTab === "security"}
              onClick={() => setActiveTab("security")}
            />
            <SidebarButton
              icon={<FaBell />}
              label="Notifications"
              isActive={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
            />
            <SidebarButton
              icon={<FaShieldAlt />}
              label="Privacy"
              isActive={activeTab === "privacy"}
              onClick={() => setActiveTab("privacy")}
            />

            <div className="my-2 border-t border-gray-200"></div>

            <SidebarButton
              icon={<FaTrashAlt />}
              label="Delete Account"
              isActive={activeTab === "danger"}
              onClick={() => setActiveTab("danger")}
              isDanger
            />

            <form onSubmit={logoutHandler} className="mb-2">
              <button
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-700 mt-1"
                type="submit"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl text-gray-500">
                    <FaSignOutAlt />
                  </div>
                  <span className="font-semibold text-[15px]">Log Out</span>
                </div>
              </button>
            </form>
            <ErrorBanner errorMessages={errorMessage} />
          </div>
        </aside>

        <main className="flex-1 w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 min-h-[500px]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;
