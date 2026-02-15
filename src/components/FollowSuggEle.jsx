import React from 'react'

const FollowSuggEle = () => {
  return (
    <li className="flex items-center mb-4 mt-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
      <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s"
          alt="image"
          className="w-8 h-8 rounded-full"
        />
        <p className="ml-2 font-medium text-[.9rem]">Elon Musk</p>
    </li>
  )
}

export default FollowSuggEle