import React, { useState } from "react";
import defaultPfp from "../../../assets/default-pfp.webp";
import { addCommentToPost } from "../../../services/posts.services";
import { UseUserContext } from "../../../context/UserContext";
import ErrorBanner from "../../global/ErrorPartial";
import { Link } from "react-router-dom";

const CommentSection = ({ comments, currentUser, postId }) => {
    const [commentText, setCommentText] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const submitComment = async (e, commentContent, postId, userId) => {
        e.preventDefault();
        try {
            const timeCommented = Date.now();
            const data = await addCommentToPost(commentContent, postId, userId, timeCommented);

        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleAddComment = async (e, postId, userId) => {
        e.preventDefault();
        setErrorMessage('')
        try {
            const data = await addCommentToPost(postId, userId);

        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="px-4 py-3 border-t border-gray-200 animate-fade-in">
            {comments && comments.length > 0 && (
                <div className="flex flex-col gap-3 mb-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                    {comments.map((comment, index) => (
                        <Link to={`/profile/${comment.user._id}`} key={index} >
                            <div className="flex gap-2 items-start">
                                <img
                                    src={
                                        comment.user?.profilePicture
                                            ? `${import.meta.env.VITE_BACKEND_URL}${comment.user.profilePicture}`
                                            : defaultPfp
                                    }
                                    alt="User"
                                    className="w-8 h-8 rounded-full object-cover mt-1 shrink-0 cursor-pointer"
                                />
                                <div className="bg-gray-100 rounded-2xl px-3 py-2 max-w-[85%]">
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-[13px] text-gray-900 leading-tight hover: cursor-pointer">
                                            {comment.user?.username || "User"}
                                        </p>
                                        <p className="text-xs text-gray-600 leading-tight">
                                            {comment.timeCommented || ""}
                                        </p>
                                    </div>
                                    <p className="text-[14px] text-gray-800 leading-snug mt-0.5">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <ErrorBanner errorMessages={errorMessage} />
            <div className="flex gap-2 items-center">
                <img
                    src={
                        currentUser?.profilePicture
                            ? `${import.meta.env.VITE_BACKEND_URL}${currentUser.profilePicture}`
                            : defaultPfp
                    }
                    alt="Current User"
                    className="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer"
                />
                <form
                    onSubmit={(e) => {
                        submitComment(e, commentText, postId, currentUser._id);
                    }}
                    className="flex-1 flex items-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-3 py-2"
                >
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-[14px] text-gray-900 placeholder-gray-500"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className={`ml-2 font-semibold text-[14px] transition-colors ${commentText.trim()
                            ? "text-[#1877f2] cursor-pointer"
                            : "text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentSection;