import React from "react";
import Navbar from "../../components/global/Navbar";
import SidebarItem from "../../components/user/main/SidebarItem";
import CreateStoryCard from "../../components/user/main/CreateStoryCard";
import StoryCard from "../../components/user/main/StoryCard";
import PostAction from "../../components/user/main/PostAction";
import ContactItem from "../../components/user/main/ContactItem";
import Post from "../../components/user/main/Post";
import {
  FaUserFriends,
  FaImages,
  FaSmile,
  FaEllipsisH,
  FaSearch,
} from "react-icons/fa";
import { MdGroups, MdOndemandVideo } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";
import { UseUserContext } from "../../context/UserContext";
import defaultPfp from "../../assets/default-pfp.webp";
import { useState } from "react";
import ErrorBanner from "../../components/global/ErrorPartial";
import { fetchPostsFromServer } from "../../services/posts.services";
import { usePostContext } from "../../context/PostContext";
import { useEffect } from "react";

const Home = () => {
  const { user } = UseUserContext();
  const { posts, setPosts } = usePostContext();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setErrorMessage('')
      try {
        const Posts = await fetchPostsFromServer();
        setPosts(Posts.posts);

      } catch (error) {
        console.log(error);
        
        setErrorMessage("Error while fetching posts");
      }
    }

    fetchPosts();

  }, []);

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans text-gray-900 pt-14">
      <ErrorBanner errorMessages={errorMessage} />
      <Navbar />

      <div className="flex justify-between w-full mx-auto max-w-[1600px]">
        <aside className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4 hover:scrollbar-thin scrollbar-thumb-gray-300">
          <SidebarItem
            img={
              user?.profilePicture
                ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
                : defaultPfp
            }
            label={user.username}
            url={`/profile/${user?._id}`} 
          />
          <SidebarItem
            icon={<FaUserFriends className="text-[#1877f2] text-2xl" />}
            label="Friends"
            url="/friends"
          />
          <SidebarItem
            icon={
              <MdGroups className="text-[#1877f2] text-2xl bg-gray-200 rounded-full p-1" />
            }
            label="Groups"
            url="/chats"
          />
          <SidebarItem
            icon={<MdOndemandVideo className="text-[#1877f2] text-2xl" />}
            label="Video"
            url="/reels"
          />
        </aside>

        <main className="w-full sm:max-w-147.5 md:max-w-170 flex-1 flex flex-col items-center py-4 px-0 sm:px-4 lg:px-8">
          <div className="w-full flex gap-2 overflow-x-auto snap-x pb-4 scrollbar-hide px-2 sm:px-0">
            <CreateStoryCard user={user} defaultPfp={defaultPfp} />
            <StoryCard
              img="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&q=80"
              profile="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=60"
              name="Sarah Connor"
            />
            <StoryCard
              img="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&q=80"
              profile="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=60"
              name="John Doe"
            />
            <StoryCard
              img="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80"
              profile="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=60"
              name="Emma Wilson"
            />
          </div>

          <div className="bg-white w-full sm:rounded-xl shadow-sm mb-4 p-3 md:p-4">
            <div className="flex gap-2 mb-3">
              <img
                src={
                  user?.profilePicture
                    ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
                    : defaultPfp
                }
                className="w-10 h-10 rounded-full object-cover shrink-0"
                alt="User"
              />
              <div className="bg-[#f0f2f5] hover:bg-[#e4e6eb] cursor-pointer w-full rounded-full flex items-center px-4 transition duration-200">
                <span className="text-gray-500 text-[15px]">
                  What's on your mind, {user.username}?
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between md:justify-around px-2">
              <PostAction
                icon={<RiLiveFill className="text-red-500 text-2xl" />}
                label="Live video"
                hiddenOnMobile
              />
              <PostAction
                icon={<FaImages className="text-green-500 text-2xl" />}
                label="Photo/video"
              />
              <PostAction
                icon={<FaSmile className="text-yellow-500 text-2xl" />}
                label="Feeling/activity"
              />
            </div>
          </div>
          {posts.length > 0 ? posts.map((post) => {
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
          }) : <p className="text-gray-500">No posts available.</p>}


        </main>

        <aside className="hidden xl:block w-70 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-500 font-semibold text-[17px]">
              Contacts
            </h2>
            <div className="flex gap-2 text-gray-500">
              <FaSearch className="cursor-pointer hover:bg-gray-200 p-2 rounded-full w-8 h-8 transition" />
              <FaEllipsisH className="cursor-pointer hover:bg-gray-200 p-2 rounded-full w-8 h-8 transition" />
            </div>
          </div>

          <ContactItem
            img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=60"
            name="Sarah Connor"
          />
          <ContactItem
            img="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=60"
            name="John Doe"
          />
        </aside>
      </div>
    </div>
  );
};

export default Home;
