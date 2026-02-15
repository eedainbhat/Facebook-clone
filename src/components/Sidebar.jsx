import { AudioLines, Bookmark, CalendarCheck2, Camera, CircleUser, FileClock, House, Instagram, UserPen, Users, Video } from "lucide-react";
import SidebarEle from "./SidebarEle";

const Sidebar = () => {
  return (
    <div className="p-4 w-[20rem] text-[1.1rem] font-medium flex-col">
      <ul>
        <SidebarEle>
          <AudioLines size={30} className="mr-3" /> <p>Meta AI</p>
        </SidebarEle>
        <SidebarEle>
          <UserPen size={30} className="mr-3" /> <p>Friends</p>
        </SidebarEle>

        <SidebarEle>
          <Video size={30} className="mr-3" /> <p>Reels</p>
        </SidebarEle>
        <SidebarEle>
          <FileClock size={30} className="mr-3" /> <p>Memories</p>
        </SidebarEle>
        <SidebarEle>
          <Bookmark size={30} className="mr-3" /> <p>Saved</p>
        </SidebarEle>
        <SidebarEle>
          <House size={30} className="mr-3" /> <p>Marketplace</p>
        </SidebarEle>
        <SidebarEle>
          <CalendarCheck2 size={30} className="mr-3" /> <p>Events</p>
        </SidebarEle>
        <SidebarEle>
          <Users size={30} className="mr-3" /> <p>Groups</p>
        </SidebarEle>
        <hr />
        <h5 className="mt-3 opacity-60">Your Shortcuts</h5>
        <SidebarEle>
          <CircleUser size={30} className="mr-3" /> <p>Accounts</p>
        </SidebarEle>
        <SidebarEle>
          <Instagram size={30} className="mr-3" /> <p>Instagram</p>
        </SidebarEle>
      </ul>
    </div>
  );
};

export default Sidebar;
