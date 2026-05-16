import React from 'react';

const SecuritySettings = () => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold mb-6">Security and Login</h3>
      
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h4 className="font-bold text-lg mb-2">Change Password</h4>
        <p className="text-sm text-gray-500 mb-4">It's a good idea to use a strong password that you're not using elsewhere.</p>
        
        <form className="space-y-4 max-w-xl">
          <div>
            <input type="password" placeholder="Current password" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition" />
          </div>
          <div>
            <input type="password" placeholder="New password" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition" />
          </div>
          <div>
            <input type="password" placeholder="Re-type new password" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:bg-white transition" />
          </div>
          <div className="pt-2">
            <button type="button" className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition cursor-pointer">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecuritySettings;