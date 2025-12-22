import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddTableApi } from "../../https";
import { useNavigate } from "react-router-dom";

const Modal = ({ modal, setModal, action }) => {
  const [tableData, setTableData] = useState({
    tableNo: 0,
    seatNo: 0,
  });
  const navigate = useNavigate();
  const tableInputHandler = (e) => {
    setTableData({ ...tableData, [e.target.name]: e.target.value });
  };

  const SubmitTableData = () => {
    if (!tableData.tableNo || !tableData.seatNo)
      console.error("all fields are required");
    console.log("tableData : ", tableData);

    TableMutation.mutate(tableData);
  };

  const TableMutation = useMutation({
    mutationFn: (tableData) => AddTableApi(tableData),
    onSuccess: (res) => {
      console.log("data", res);
      toast.success(res.data.data.message || "table created succefully");
      setTableData({
        tableNo: 0,
        seatNo: 0,
      });
      navigate("/table");
      navigate(0);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  const SubmitCatogoryData = () => {};
  const SubmitDishesData = () => {};

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
          {action.action === "table" ? (
            <div>
              <div>
                <label className="block text-md  text-[#ababab] mb-2 mt-3  font-medium">
                  Table Number
                </label>
                <div className="flex text-lg  items-center rounded-lg p-3 py-5 font-medium bg-[#1b1b1b]">
                  <input
                    onChange={(e) => tableInputHandler(e)}
                    type="number"
                    name="tableNo"
                    value={tableData.tableNo}
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
                    onChange={(e) => tableInputHandler(e)}
                    name="seatNo"
                    value={tableData.seatNo}
                    type="number"
                    placeholder=""
                    id="phone"
                    className="bg-transparent text-lg flex-1 text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <button
            onClick={
              action.action === "table"
                ? SubmitTableData
                : action.action === "category"
                ? SubmitCatogoryData
                : SubmitDishesData
            }
            className="cursor-pointer w-full bg-[#f6B100] text-[#f5f5f5]
            rounded-lg py-4 mt-5 hover:bg-yellow-700"
          >
            {action.action === "table" && "Create Table"}{" "}
            {action.action === "category" && "Create Category"}{" "}
            {action.action === "dishes" && "Create Dishes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
