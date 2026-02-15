import React from 'react'
import PostCreator from './PostCreator';
import PostDescription from './PostDescription';
import PostContent from './PostContent';
import PostInteractions from './PostInteractions';
import LikeCount from './LikeCount';

const MainfeedContent = ( {userName, userImg, postTime, postDes, postImg, id, postLikeCounts, updateLikeCounts}) => {
  return (
    <div className='bg-white w-[50%] mt-5 mb-2 h-fit rounded-md shadow-lg p-2 shrink-0'>
        <PostCreator userName={userName} userImg={userImg} postTime={postTime} id={id} />
        <PostDescription postTime={postTime} postDes={postDes} />
        <PostContent postImg={postImg} />
        <LikeCount postLikeCounts={postLikeCounts} />
        <PostInteractions postLikeCounts={postLikeCounts} id={id} />
    </div>
  )
}

export default MainfeedContent;