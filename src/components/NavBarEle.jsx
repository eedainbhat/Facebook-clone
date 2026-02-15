import { BadgePlus } from "lucide-react";
import React, { useContext } from "react";
import { MyContext } from "../store/Store";

const NavBarEle = () => {
  const { setIsCreating } = useContext(MyContext);
  return (
    <div className="flex">
      <button 
        className="py-1 px-3 rounded cursor-pointer hover:bg-blue-600 hover:text-white transition"
        onClick={() => setIsCreating(true)}
      >
        <BadgePlus size={28}/>
      </button>
    </div>
  );
};

export default NavBarEle;
