import React from 'react'
import MainFeed from './MainFeed'
import Sidebar from './Sidebar'
import FollowSugg from './FollowSugg'

const Main = () => {
  return (
    <div className="flex justify-between items-start">
        <Sidebar />
        <MainFeed />
        <FollowSugg />
    </div>
  )
}

export default Main