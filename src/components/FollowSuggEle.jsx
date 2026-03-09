import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../store/Store';

const FollowSuggEle = ({ contactName }) => {
  const {setFollowSuggName} = useContext(MyContext)
  let navigate = useNavigate();
  return (
    <li className="flex items-center mb-4 mt-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer" onClick={()=>{
      navigate("/follow-suggestions")
      setFollowSuggName(contactName);
    }}>
      <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contactName)}&background=random&size=128`}
          alt="image"
          className="w-8 h-8 rounded-full"
        />
        <p className="ml-2 font-medium text-[.9rem]">{contactName}</p>
    </li>
  )
}

export default FollowSuggEle