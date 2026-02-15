import { Camera, Clapperboard, Search, Smile } from 'lucide-react'
import React from 'react'

const MainfeedHead = () => {
  return (
    <div className='flex items-center gap-6 h-fit w-[50%] bg-white p-2 rounded-md shadow-lg overflow-hidden shrink-0'>
        <div className='flex items-center gap-3'>
        <Search size={28} className='cursor-pointer'/>
        <input type="text" placeholder="What's on your mind?" className="bg-gray-200 p-2 pl-4 rounded-full w-[24vw] mr-2" />
        </div>
        <Clapperboard size={28} className='text-red-600 shrink-0 cursor-pointer' />
        <Camera size={28} className='text-blue-600 shrink-0 cursor-pointer' />
        <Smile size={28} className='text-yellow-500 shrink-0 cursor-pointer' />
    </div>
  )
}

export default MainfeedHead