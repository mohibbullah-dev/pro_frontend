import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder } from "react-icons/md";
import { MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  let [gusetCount, setGusetCount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const Increament = () => {
    if (gusetCount >= 7) return;
    setGusetCount((prev) => prev + 1);
  };

  const Decreament = () => {
    if (gusetCount <= 0) return;
    setGusetCount((prev) => prev - 1);
  };

  const OroderCreateHandler = () => {
    // send data to store
    dispatch(setCustomer({ name, phone, guset: gusetCount }));
    navigate("/table");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center ${
          pathname === "/" ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
        } w-[200px] rounded-[20px] cursor-pointer`}
      >
        <FaHome className="inline mr-2" size={20} /> <p>Home</p>
      </button>

      <button
        onClick={() => navigate("/orders")}
        className={`flex items-center justify-center ${
          pathname === "/orders"
            ? "text-[#f5f5f5] bg-[#343434]"
            : "text-[#ababab]"
        } w-[200px]  rounded-[20px] cursor-pointer`}
      >
        <MdOutlineReorder className="inline mr-2" size={20} /> <p>Order</p>
      </button>

      <button
        onClick={() => navigate("/table")}
        className={`flex items-center justify-center ${
          pathname === "/table"
            ? "text-[#f5f5f5] bg-[#343434]"
            : "text-[#ababab]"
        } w-[200px]  rounded-[20px] cursor-pointer`}
      >
        <MdTableBar className="inline mr-2" size={20} /> <p>Tables</p>
      </button>

      <button className="flex items-center justify-center text-[#ababab] w-[200px] cursor-pointer">
        <CiCircleMore className="inline mr-2" size={20} /> <p>More</p>
      </button>

      <button
        disabled={pathname === "/table" || pathname === "/menu" ? true : false}
        onClick={openModal}
        className={`absolute bottom-6 ${
          pathname === "/table" || pathname === "/menu"
            ? "bg-[#c58d00] opacity-50"
            : "bg-[#f6b100] cursor-pointer"
        } text-[#f5f5f5] rounded-full p-3 items-center `}
      >
        <BiSolidDish size={30} />
      </button>
      <Modal
        title={"Create Order"}
        onClose={closeModal}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 text-sm font-medium bg-[#262626]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name={phone}
              placeholder="Enter customer name"
              id="phone"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg p-3 text-sm font-medium bg-[#262626]">
            <input
              type="number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              name={phone}
              placeholder="+8801999999999"
              id="phone"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Guest
          </label>
          <div className="flex items-center justify-between rounded-lg p-3 text-sm font-medium bg-[#262626]">
            <button
              onClick={Decreament}
              className="cursor-pointer text-yellow-500 text-2xl"
            >
              &minus;
            </button>
            <span className="text-white">{gusetCount} Person</span>
            <button
              onClick={Increament}
              className="cursor-pointer text-yellow-500 text-2xl"
            >
              &#43;
            </button>
          </div>
        </div>
        <button
          onClick={() => OroderCreateHandler()}
          className="cursor-pointer w-full bg-[#f6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700"
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
