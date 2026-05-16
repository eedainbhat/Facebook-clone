import React from "react";
import Navbar from "../../components/global/Navbar";
import ProfileHeader from "../../components/user/profile/ProfileHeader";
import ProfileIntro from "../../components/user/profile/ProfileIntro";
import ProfilePhotos from "../../components/user/profile/ProfilePhotos";
import {
  FaImages,
  FaSmile,
  FaEllipsisH,
  FaThumbsUp,
  FaRegComment,
  FaShare,
} from "react-icons/fa";
import { RiLiveFill } from "react-icons/ri";
import { UseUserContext } from "../../context/UserContext";
import defaultPfp from "../../assets/default-pfp.webp";
import Post from "../../components/user/main/Post";
import { usePostContext } from "../../context/PostContext";
import { useParams } from "react-router-dom";
import { getProfile } from "../../services/user.services";
import { useState } from "react";
import { useEffect } from "react";
import { fetchPostsFromServer } from "../../services/posts.services";

const Profile = () => {
  const { userId } = useParams();
  const { user } = UseUserContext();
  const [profilePosts, setProfilePosts] = useState([]);
  const isOwnProfile = user?._id === userId;
  const [errorMessage, setErrorMessage] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  

  useEffect(() => {
    const getPostsIfEmpty = async () => {
      if (profilePosts.length > 0) return; 

      try {
        const fetchedData = await fetchPostsFromServer(userId);
        setProfilePosts(fetchedData.posts);
      } catch (error) {
        console.error("Failed to fetch posts on refresh", error);
      }
    };

    getPostsIfEmpty();  
  }, [profilePosts.length, setProfilePosts]);

  useEffect(() => {
    const getUser = async (userId) => {
      setErrorMessage('');
      try {
        const userRecieved = await getProfile(userId);
        setTargetUser(userRecieved.user);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    getUser(userId);
  }, [userId]);


  if (!targetUser && !profilePosts) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center pt-14">
        <div className="text-xl font-bold text-gray-500">Loading Profile...</div>
      </div>
    );
  }


  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans text-gray-900 pt-14">
      <Navbar />

      <ProfileHeader user={targetUser} isOwnProfile={isOwnProfile} />

      <div className="max-w-250 mx-auto flex flex-col md:flex-row gap-4 py-4 px-4 md:px-0">
        <div className="w-full md:w-[40%] flex flex-col">
          <ProfileIntro user={targetUser} />
          <ProfilePhotos user={targetUser} />
        </div>

        <div className="w-full md:w-[60%] flex flex-col">
          {isOwnProfile && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4 mb-4">
              <div className="flex gap-2 mb-3">
                <img
                  src={
                    targetUser?.profilePicture
                      ? `${import.meta.env.VITE_BACKEND_URL}${targetUser.profilePicture}`
                      : defaultPfp
                  }
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="bg-[#f0f2f5] hover:bg-[#e4e6eb] cursor-pointer w-full rounded-full flex items-center px-4 transition">
                  <span className="text-gray-500 text-[15px]">
                    What's on your mind?
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between px-2">
                <div className="flex items-center gap-2 flex-1 justify-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <RiLiveFill className="text-red-500 text-2xl" />
                  <span className="font-semibold text-gray-500 text-[15px]">
                    Live video
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-1 justify-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <FaImages className="text-green-500 text-2xl" />
                  <span className="font-semibold text-gray-500 text-[15px]">
                    Photo/video
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-1 justify-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer hidden sm:flex">
                  <FaSmile className="text-yellow-500 text-2xl" />
                  <span className="font-semibold text-gray-500 text-[15px]">
                    Life event
                  </span>
                </div>
              </div>
            </div>
          )}
          {profilePosts.length > 0 ? profilePosts.map((post) => {
            return <Post
              key={post._id}
              postId={post._id}
              publisher={post.publisher}
              postPhoto={post.postPhoto}
              description={post.description}
              likes={post.likes}
              timePosted={post.timePosted}
              comments={post.comments}
            />
          }) : <p className="text-gray-500 text-center">No posts available.</p>}

        </div>
      </div>
    </div>
  );
};

export default Profile;
