import { Link, X } from "lucide-react";
import React, { useContext, useState } from "react";
import { MyContext } from "../store/Store";

const CreatePostModal = () => {
  const { setIsCreating, addPost } = useContext(MyContext);
  const [nameEditable, setNameEditable] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [postDes, setPostDes] = useState("");
  const [userImg, setUserImg] = useState(
    "https://randomuser.me/api/portraits/men/1.jpg",
  );
  const [isLinkOn, setisLinkOn] = useState(false);
  const [postContentLink, setPostContentLink] = useState("");
  const [postedTimeAgo, setPostedTimeAgo] = useState("Just now");

  return (
    <div className="w-full flex items-center justify-center p-4 font-sans">
      {/* --- Main Modal Container --- */}
      <div className="w-full max-w-125 bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden relative">
        {/* 1. Header Section */}
        <div className="relative flex items-center justify-center h-15 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#050505]">Create post</h2>

          {/* Close Button (Top Right) */}
          <div className="absolute right-4 top-3 w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer text-gray-600 transition-colors">
            <X size={18} onClick={() => setIsCreating(false)} />
          </div>
        </div>

        {/* 2. User Profile Section */}
        <div className="px-4 pt-4 flex items-center gap-3">
          {/* Avatar */}
          <img
            src={userImg}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />

          {/* Name & Privacy Selector */}
          <div className="flex flex-col">
            <span className="flex gap-2 items-center">
              <span
                className="font-semibold text-[15px] text-[#050505] leading-5 px-1 "
                contentEditable={nameEditable}
                onInput={(e) => setUserName(e.target.textContent)}
              >
                {userName}
              </span>
              <p
                className="text-[15px] text-blue-500 cursor-pointer"
                onClick={() => {
                  nameEditable ? setNameEditable(false) : setNameEditable(true);
                }}
              >
                edit
              </p>
            </span>
            {/* Privacy Badge */}
            <div className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md mt-1 w-fit cursor-pointer transition-colors">
              <svg
                fill="currentColor"
                viewBox="0 0 12 12"
                width="12"
                height="12"
                className="text-[#050505]"
              >
                <path d="M6 10a4 4 0 110-8 4 4 0 010 8zm0-1a3 3 0 100-6 3 3 0 000 6zm-1.5-3.5h3a.5.5 0 000-1h-3a.5.5 0 000 1z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 1.5c-1.25 0-2.35.56-3.08 1.44C3.47 2.37 4.66 2 6 2s2.53.37 3.08.94C8.35 2.06 7.25 1.5 6 1.5z"
                ></path>
                <g transform="translate(2, 3)">
                  <path d="M4 2.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm1.31 3.23a2.5 2.5 0 00-4.62 0 .25.25 0 00.23.35h4.16a.25.25 0 00.23-.35z"></path>
                </g>
              </svg>
              <select className="text-xs font-semibold text-[#050505]">
                <option value="public">Public</option>
                <option value="friends">Friends</option>
                <option value="onlyme">Only Me</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Input Area */}
        <div className="px-4 py-4">
          <textarea
            className="w-full min-h-38.5 text-2xl text-[#050505] placeholder-gray-500 outline-none resize-none"
            placeholder="What's on your mind?"
            value={postDes}
            onChange={(e) => setPostDes(e.target.value)}
          ></textarea>

          <div className="flex justify-between items-center mt-2">
            {/* Emoji Icon */}
            <div className="cursor-pointer hover:bg-gray-100 rounded-full p-2">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
                className="text-gray-400"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm3.5-9c.8 0 1.5-.7 1.5-1.5S16.3 8 15.5 8 14 8.7 14 9.5s.7 1.5 1.5 1.5zm-7 0c.8 0 1.5-.7 1.5-1.5S9.3 8 8.5 8 7 8.7 7 9.5 7.7 11 8.5 11zm3.5 6.5c2.3 0 4.2-1.6 5-3.8H7c.8 2.2 2.7 3.8 5 3.8z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* 4. Add to Post Widget */}
        <div className="px-4 pb-4">
          <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="font-semibold text-[15px] text-[#050505] cursor-pointer">
              Add to your post
            </span>

            <div className="flex gap-1">
              <div
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer"
                title="Add Link"
                onClick={() => {
                  setisLinkOn((prev) => !prev);
                }}
              >
                <Link size={22} />
              </div>
              {/* Green - Photo */}
              <div
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer"
                title="Photo/Video"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-[#45bd62]"
                  fill="currentColor"
                >
                  <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm0 14H5a1 1 0 01-1-1v-1.586l3.293-3.293a1 1 0 011.414 0l1.293 1.293 4.293-4.293a1 1 0 011.414 0L19 12.586V17a1 1 0 01-1 1z"></path>
                </svg>
              </div>
              {/* Blue - Tag */}
              <div
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer"
                title="Tag People"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-[#1877f2]"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
                </svg>
              </div>
              {/* Yellow - Feeling */}
              <div
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer"
                title="Feeling/Activity"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-[#f7b928]"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.93c-2.31-.22-4.44-1.83-4.9-4.13h9.81c-.47 2.3-2.6 3.91-4.91 4.13z"></path>
                </svg>
              </div>
              {/* Red - Checkin */}
              <div
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer"
                title="Check in"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-[#f02849]"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                </svg>
              </div>
              {/* Teal - GIF */}
              <div
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer"
                title="GIF"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-[#2abba7]"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2v2h2v2h-2v-6h4v2h-2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {isLinkOn && (
          <div className="w-[90%] h-fit flex items-center gap-4 mx-auto mb-4">
            <input
              type="text"
              placeholder="Add Link"
              className="border w-full border-gray-400 px-4 py-2 rounded-md"
              value={postContentLink}
              onChange={(e) => setPostContentLink(e.target.value)}
            />
          </div>
        )}

        <div className="px-4 pb-4">
          <button
            className="w-full bg-[#3b6ce9] text-white font-semibold py-2 rounded-md cursor-pointer text-[15px]"
            onClick={() => {
              if (postDes.trim() === "" && postContentLink.trim() === "") {
                alert("Post description and link cannot both be empty!");
              } else {
                addPost(
                  userName,
                  postDes,
                  userImg,
                  postContentLink,
                  postedTimeAgo
                );
                setIsCreating(false);
              }
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
