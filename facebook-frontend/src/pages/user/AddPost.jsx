import React, { useState } from "react";
import Navbar from "../../components/global/Navbar";
import { UseUserContext } from "../../context/UserContext";
import defaultPfp from "../../assets/default-pfp.webp";
import {
    FaImages,
    FaUserTag,
    FaSmile,
    FaMapMarkerAlt,
    FaUserFriends,
    FaCaretDown,
    FaEllipsisH,
} from "react-icons/fa";
import { addPostUser } from "../../services/posts.services";
import ErrorBanner from "../../components/global/ErrorPartial";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../../context/PostContext";

const AddPost = () => {
    const navigate = useNavigate();
    const { user } = UseUserContext();
    const { posts, setPosts } = usePostContext();
    const [errorMessage, setErrorMessage] = useState(null);

    const [postData, setPostData] = useState({
        publisher: user?._id || "",
        postPhoto: null,
        description: "",
    });

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const newPost = await addPostUser(postData);
            setPosts((prevPosts) => [newPost, ...prevPosts]);
            
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
        }

    };

    const isPostEmpty = !postData.description || postData.description.trim().length === 0;

    return (
        <div className="bg-[#f0f2f5] min-h-screen font-sans text-gray-900 pt-14 flex justify-center pb-10">
            <Navbar />

            <div className="w-full max-w-[500px] bg-white rounded-xl shadow-sm border border-gray-200 mt-6 md:mt-10 mx-4 md:mx-0 flex flex-col h-fit">
                <div className="flex items-center justify-center p-4 border-b border-gray-200 relative">
                    <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
                </div>

                <div className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                user?.profilePicture
                                    ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
                                    : defaultPfp
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover shrink-0 cursor-pointer"
                        />
                        <div>
                            <h3 className="font-semibold text-[15px] cursor-pointer hover: text-gray-900 leading-tight">
                                {user?.username }
                            </h3>
                            <div className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-[13px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 mt-0.5 cursor-pointer transition-colors w-fit">
                                <FaUserFriends className="text-[10px]" />
                                <span>Friends</span>
                                <FaCaretDown className="text-[12px]" />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handlePostSubmit}>
                        <textarea
                            name="description" /* FIX 2: Added the missing name attribute */
                            placeholder={`What's on your mind, ${user?.username }?`}
                            value={postData.description}
                            onChange={handleChange}
                            className="w-full min-h-[150px] resize-none outline-none text-xl md:text-2xl placeholder-gray-500 bg-transparent"
                            autoFocus
                        />

                        {postData.postPhoto && (
                            <div className="text-sm text-green-600 font-semibold mb-2">
                                Image selected: {postData.postPhoto.name}
                            </div>
                        )}

                        <div className="border border-gray-300 rounded-xl p-3 flex items-center justify-between shadow-sm mt-2 mb-3">
                            <span className="font-semibold text-[15px] text-gray-900 cursor-pointer pl-1">
                                Add to your post
                            </span>
                            <div className="flex items-center gap-1">
                                <label htmlFor="post-upload">
                                    <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                                        <FaImages className="text-green-500 text-2xl" />
                                    </div>
                                </label>
                                <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                                    <FaUserTag className="text-blue-500 text-2xl" />
                                </div>
                                <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors hidden sm:block">
                                    <FaSmile className="text-yellow-500 text-2xl" />
                                </div>
                                <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors hidden sm:block">
                                    <FaMapMarkerAlt className="text-red-500 text-2xl" />
                                </div>
                                <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                                    <FaEllipsisH className="text-gray-500 text-xl" />
                                </div>
                            </div>
                        </div>

                        <input
                            type="file"
                            id="post-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    setPostData({ ...postData, postPhoto: e.target.files[0] });
                                }
                            }}
                        />
                        <ErrorBanner errorMessages={errorMessage} />

                        <button
                            type="submit"
                            disabled={isPostEmpty && !postData.postPhoto} // Now allows posting if there's an image OR text
                            className={`w-full font-bold py-2.5 rounded-lg transition-colors text-[15px] mt-1 ${isPostEmpty && !postData.postPhoto
                                ? "bg-[#e4e6eb] text-[#bcc0c4] cursor-not-allowed"
                                : "bg-[#1877f2] hover:bg-[#166fe5] text-white cursor-pointer shadow-sm"
                                }`}
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPost;