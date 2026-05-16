import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import InteractionButton from "./InteractionButton";
import CommentSection from "../main/commentSection";
import defaultPfp from "../../../assets/default-pfp.webp";
import { UseUserContext } from "../../../context/UserContext";
import { usePostContext } from "../../../context/PostContext";
import { deletePostUser, likePost } from "../../../services/posts.services";
import { Link } from "react-router-dom";

const Post = ({
  postId,
  publisher,
  postPhoto,
  description,
  likes,
  timePosted,
  comments,
}) => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const { setPosts } = usePostContext();
  const { user } = UseUserContext();
  const isOwnPost = user?._id === publisher?._id;
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  let likeCounts = likes?.length ?? 0;


  const toggleBoxState = () => {
    setIsBoxVisible((prev) => !prev);
  };

  const deletePost = async (e, postId) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const data = await deletePostUser(postId);
      setIsBoxVisible(false);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLikePost = async (e, postId, userId) => {
    e.preventDefault();
    setErrorMessage('')
    try {
      const data = await likePost(postId, userId);
      setIsLiked((prev) => !prev);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (likes.includes(user._id)) {
      setIsLiked(true);
    }
  }, [likes]);


  return (
    <div className="bg-white w-full sm:rounded-xl shadow-sm mb-4">
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${publisher?._id}`}>
          <div className="flex items-center gap-2">
            <img
              src={
                publisher?.profilePicture
                  ? `${import.meta.env.VITE_BACKEND_URL}${publisher.profilePicture}`
                  : defaultPfp
              }
              className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-90"
              alt="Author"
            />
            <div>
              <h3 className="font-semibold text-[15px] cursor-pointer hover:">
                {publisher?.username}
              </h3>
              <p className="text-xs text-gray-500">{timePosted}</p>
            </div>
          </div>
        </Link>
        <div
          className="relative w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer transition"
          onClick={toggleBoxState}
        >
          <FaEllipsisH className="text-gray-500" />

          {isBoxVisible && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              <ul className="flex flex-col py-1 text-sm text-gray-700 m-0 p-0 list-none">
                <li className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
                  Interested
                </li>
                <li className="px-4 py-2.5 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
                  Hide
                </li>
                {isOwnPost && (
                  <li
                    className="px-4 py-2.5 hover:bg-gray-100 text-red-600 cursor-pointer transition-colors duration-150"
                    onClick={(e) => {
                      deletePost(e, postId);
                    }}
                  >
                    Delete
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-3 text-[15px]">{description}</div>

      {postPhoto && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${postPhoto}`}
          className="w-full max-h-125 object-cover"
          alt="Post"
        />
      )}

      <div className="px-4 py-2 flex items-center justify-between text-gray-500 text-sm border-b border-gray-200">
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="bg-[#1877f2] text-white p-1 rounded-full">
            <FaThumbsUp size={10} />
          </div>
          <span>{likeCounts} likes</span>
        </div>
        <div className="flex gap-3">
          <span
            className="cursor-pointer hover:"
            onClick={() => setIsCommentVisible(true)}
          >
            {comments?.length ?? 0} comments
          </span>
        </div>
      </div>

      <div className="flex px-2 py-1 gap-1 w-full">
        <form onSubmit={(e) => {
          handleLikePost(e, postId, user._id)
        }} className="flex-1 flex">
          <InteractionButton
            icon={<FaThumbsUp size={20} />}
            label="Like"
            isLiked={isLiked}
          />
        </form>

        <div className="flex-1 flex" onClick={() => setIsCommentVisible((prev) => !prev)}>
          <InteractionButton
            icon={<FaRegComment size={20} />}
            label="Comment"
          />
        </div>

        <div className="flex-1 flex">
          <InteractionButton icon={<FaShare size={20} />} label="Share" />
        </div>
      </div>

      {isCommentVisible && (
        <CommentSection
          comments={comments}
          currentUser={user}
          postId={postId}
        />
      )}
    </div>
  );
};

export default Post;