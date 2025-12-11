import React from "react";
import logo from "../../assets/images/logo.png";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between py-4 px-8 bg-[#1a1a1a]">
      {/* logo */}
      <div className="flex items-center gap-2">
        <img className="h-12 w-12" src={logo} alt="restro logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5]">Restro</h1>
      </div>

      {/* search  */}

      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-[#1f1f1f] text-[#f5f5f5] px-2 py-1 outline-none"
        />
      </div>

      {/* logged user's details  */}

      <div className="flex items-center gap-4">
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-2xl" />
        </div>

        <div className="flex items-center cursor-pointer gap-3">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold">Amrit Raj</h1>
            <p className="text-xs text-[#ababab] font-medium ">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
