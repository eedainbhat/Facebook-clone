import {
  AudioLines,
  Bookmark,
  CalendarCheck2,
  Camera,
  CircleUser,
  FileClock,
  House,
  Instagram,
  UserPen,
  Users,
  Video,
} from "lucide-react";
import FollowSuggEle from "./FollowSuggEle";

const Sidebar = () => {
  return (
    <div className="p-4 w-[20rem] text-[1.1rem] flex-col hidden lg:flex">
      <div className="p-2">
        <h6 className="text-gray-600 font-medium">Follow Suggestions</h6>
      </div>
      <ul>
        <FollowSuggEle />
        <FollowSuggEle />
        <FollowSuggEle />
        <FollowSuggEle />
        <FollowSuggEle />
        <FollowSuggEle />
        <FollowSuggEle />
        <FollowSuggEle />
        <FollowSuggEle />
        <FollowSuggEle />
      </ul>
    </div>
  );
};

export default Sidebar;
