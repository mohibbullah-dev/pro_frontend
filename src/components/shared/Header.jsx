import React from "react";
import logo from "../../assets/images/logo.png";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { LogOutApi } from "../../https";
import { toast } from "react-toastify";
import { removeUser } from "../../redux/slices/usreSlice";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../../redux/slices/authSlice";
import { LuLayoutDashboard } from "react-icons/lu";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    logedOutMutation.mutate();
  };

  const logedOutMutation = useMutation({
    mutationFn: () => LogOutApi(),
    onSuccess: (data) => {
      console.log(data);
      toast.success("logedOut succefully done");
      dispath(removeUser());
      dispath(removeAccessToken());
      navigate("/auth");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
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
        {userData.role === "admin" && (
          <div
            onClick={() => navigate("/dashboard")}
            className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer"
          >
            <LuLayoutDashboard className="text-[#f5f5f5] text-2xl" />
          </div>
        )}
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-2xl" />
        </div>

        <div className="flex items-center cursor-pointer gap-3">
          {/* <FaUserCircle className="text-[#f5f5f5] text-4xl" /> */}
          {userData?.avatar?.url ? (
            <img
              src={userData?.avatar?.url}
              className="text-[#f5f5f5] w-6 h-6 text-4xl"
              alt=""
            />
          ) : (
            <FaUserCircle className="text-[#f5f5f5] text-4xl" />
          )}
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold">
              {userData?.name || "Test user"}
            </h1>
            <p className="text-xs text-[#ababab] font-medium ">
              {userData?.role || "N/A"}
            </p>
          </div>
        </div>
        <div>
          <IoIosLogOut
            onClick={logOutHandler}
            className="text-[#f5f5f5] text-[32px] cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
