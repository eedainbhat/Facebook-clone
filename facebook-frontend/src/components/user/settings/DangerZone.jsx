import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { UseUserContext } from '../../../context/UserContext';
import ErrorBanner from '../../global/ErrorPartial';
import { deleteProfile } from '../../../services/auth.services';
import SuccessBanner from '../../global/SuccessPartial';
import { useNavigate } from 'react-router-dom';

const DangerZone = () => {
  const { user, setUser } = UseUserContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const deleteSubmitHandler = async (e, userId) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      
      const user = await deleteProfile(userId); 
      setSuccessMessage(user.message);
      setUser(null);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <form onSubmit={(e)=>{
      deleteSubmitHandler(e, user._id);
    }}>
      <ErrorBanner errorMessages={errorMessage} />
      <SuccessBanner successMessage={successMessage}/>
      <div className="animate-fade-in">
        <h3 className="text-2xl font-bold mb-2 text-red-600">Danger Zone</h3>
        <p className="text-gray-600 mb-6 pb-6 border-b border-gray-200">Once you delete your account, there is no going back. Please be certain.</p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl">
          <h4 className="font-bold text-red-800 text-lg mb-2">Delete Account</h4>
          <p className="text-sm text-red-600 mb-6">
            Deleting your account will permanently remove your profile, photos, posts, and all associated data. This action cannot be undone.
          </p>

          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition cursor-pointer flex items-center gap-2">
            <FaTrashAlt />
            Permanently Delete Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default DangerZone;