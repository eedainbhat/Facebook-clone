import React, { useContext } from 'react'
import { MyContext } from '../store/Store';

const LikeCount = ({ postLikeCounts }) => {
  return (
    postLikeCounts > 0 && <p className="text-gray-600 text-sm font-medium">{postLikeCounts} {postLikeCounts === 1 ? 'Like' : 'Likes'}</p>
  )
}

export default LikeCount