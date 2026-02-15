import React from "react";
import NavBarEle from "./NavBarEle";
import NavBarProfile from "./NavBarProfile";
import NavbarPages from "./NavbarPages";

const NavBar = () => {
  return (
    <div className="flex justify-between py-2 px-8 bg-white text-black items-center shadow-lg">
      <NavBarProfile />
      <NavbarPages />
      <NavBarEle />
    </div>
  );
};

export default NavBar;
