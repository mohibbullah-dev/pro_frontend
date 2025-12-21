import React from "react";

const Modal = ({ modal, setModal, action }) => {
  return (
    <div onClick={() => setModal(false)} className="bg-amber-600 relative z-50">
      <div className="fixed inset-0 h-full flex items-center justify-center w-full bg-black/50 ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#262626] shadow-lg w-full  max-w-[400px] mx-4 rounded-lg p-4 shadow-[#262626] z-50"
        >
          <div className="flex justify-between items-center  py-4">
            <h2 className="text-xl text-start text-[#f5f5f5] font-semibold">
              {action.label || "No Tile"}
            </h2>
            <button
              onClick={() => setModal(false)}
              className=" cursor-pointer text-gray-400 text-3xl hover:text-gray-300"
            >
              &times;
            </button>
          </div>
          <div>
            <label className="block text-md  text-[#ababab] mb-2 mt-3  font-medium">
              Table Number
            </label>
            <div className="flex text-lg  items-center rounded-lg p-3 py-5 font-medium bg-[#1b1b1b]">
              <input
                type="number"
                placeholder=""
                id="phone"
                className="bg-transparent flex-1 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-md  text-[#ababab] mb-2 mt-3 font-medium">
              Table of Seats
            </label>
            <div className="flex items-center rounded-lg p-3 py-5 text-sm font-medium bg-[#1b1b1b]">
              <input
                type="number"
                placeholder=""
                id="phone"
                className="bg-transparent text-lg flex-1 text-white focus:outline-none"
              />
            </div>
          </div>

          <button className="cursor-pointer w-full bg-[#f6B100] text-[#f5f5f5] rounded-lg py-4 mt-5 hover:bg-yellow-700">
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
