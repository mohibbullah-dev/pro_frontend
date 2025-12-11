import React from "react";
import { getRandomBg } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";

const TableCard = ({ name, status, initial, key, seats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuHandler = (name) => {
    // send data to store
    dispatch(updateTable({ tableNo: name }));
    navigate("/menu");
  };
  return (
    <div
      onClick={() => menuHandler(name)}
      key={key}
      className="w-[300px] bg-[#262626] p-4 rounded-lg cursor-pointer hover:bg-[#2e2d2d]"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">{name}</h1>
        <p
          className={` px-2 py-1 rounded-lg ${
            status === "Available"
              ? "bg-[#674B06] text-[#f5f5f5]"
              : "bg-[#2e4a40] text-green-600"
          }`}
        >
          {status}
        </p>
      </div>

      <div className="flex items-center justify-center my-5">
        <h1
          className={`flex items-center justify-center ${getRandomBg()} text-white rounded-full w-[50px] text-center h-[50px] p-5 text-xl`}
        >
          {initial}
        </h1>
      </div>
      <p className="text-sm text-[#ababab]">
        seats:{" "}
        <span className="text lg font-semibold text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
