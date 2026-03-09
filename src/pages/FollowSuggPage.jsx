import React, { useContext } from 'react'
import { MyContext } from '../store/Store'
import { Link } from 'react-router-dom'

const FollowSuggPage = () => {
    const {followSuggName} = useContext(MyContext)
  return (
    <div className='bg-gray-800 h-screen w-screen text-white flex justify-center items-center flex-col gap-10'>
        <h1 className='text-2xl'>Follow {followSuggName}</h1>
        <Link to={"/"} className='px-4 py-2 bg-white text-black rounded-full'>Return</Link>
    </div>
  )
}

export default FollowSuggPage