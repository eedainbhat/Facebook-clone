import { Headset, Home, UserPenIcon, Video } from "lucide-react";
import React from "react";

const NavbarPages = () => {
  return (
    <div>
      <ul className="flex gap-20">
        <li className="cursor-pointer h-10 w-10 p-1 flex items-center justify-center active" title="Home page">
          <Home size={28} strokeWidth={1.5} />
        </li>
        <li className="cursor-pointer h-10 w-10 p-1 flex items-center justify-center" title="Reels">
          <Video size={30} strokeWidth={1.5} />
        </li>
        <li className="cursor-pointer h-10 w-10 p-1 flex items-center justify-center" title="Friends">
          <UserPenIcon size={30} strokeWidth={1.5} />
        </li>
        <li className="cursor-pointer h-10 w-10 p-1 flex items-center justify-center" title="Gaming">
          <Headset size={30} strokeWidth={1.5} />
        </li>
      </ul>
    </div>
  );
};

export default NavbarPages;
