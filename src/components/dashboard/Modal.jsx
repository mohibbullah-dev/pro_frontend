import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddTableApi } from "../../https";
import { useNavigate } from "react-router-dom";
import Emoji from "../../utils/Emoji";

const Modal = ({ modal, setModal, action }) => {
  const [tableData, setTableData] = useState({
    tableNo: null,
    seatNo: null,
  });

  const [menu, setMenu] = useState({
    name: "",
    color: "" || "#e30d0d",
    dishes: {
      name: "",
      price: 0,
      category: "",
    },
  });

  console.log("menu :", menu);

  const [icon, setIcon] = useState("");
  console.log("icon :", icon);

  const navigate = useNavigate();

  const tableInputHandler = (e) => {
    setTableData({ ...tableData, [e.target.name]: e.target.value });
  };

  //   const menuInputHandler = (e) => {
  //  setMenu({
  //   ...menu, [e.target.name]
  //  })
  //   };

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
      <div className="fixed inset-0 h-full flex items-center justify-center w-full bg-black/70 backdrop-blur-sm">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#262626] shadow-lg w-full  ${
            action.action === "table"
              ? "max-w-[400px]"
              : action.action === "menu"
              ? "max-w-[600px]"
              : ""
          } mx-4 rounded-lg p-4 shadow-[#262626] z-50`}
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
          ) : action.action === "menu" ? (
            <div>
              <div>
                <label className="block text-md  text-[#ababab] mb-2 mt-3  font-medium">
                  Menu Name <span className="text-yellow-400">*</span>
                </label>
                <div className="flex text-lg  items-center rounded-lg p-3 py-5 font-medium bg-[#1b1b1b]">
                  <input
                    onChange={(e) => {
                      setMenu({ ...menu, name: e.target?.value });
                    }}
                    type="text"
                    name="name"
                    value={menu.name}
                    required="true"
                    placeholder="Enter menu-name"
                    id="name"
                    className="bg-transparent flex-1 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className=" text-md text-[#ababab] mb-2 mt-3 font-medium">
                <label className="block text-md  mb-2 mt-3 font-medium">
                  choose a BG-Color
                </label>
                <div className=" flex gap-3 bg-[#1b1b1b] items-center rounded-lg px-3 py-5  text-sm font-medium ">
                  <div className="flex-1">
                    <Emoji icon={icon} setIcon={setIcon} />
                  </div>
                  <div className="flex-1 w-full rounded-lg bg-[#1b1b1b]">
                    <input
                      // onChange={(e) => menuInputHandler(e)}
                      name="color"
                      value={menu.color}
                      type="text"
                      id="color"
                      className=" h-10 text-center text-white cursor-pointer rounded-lg border border-gray-700 bg-transparent p-1"
                    />
                  </div>

                  <div className="flex-1 w-full rounded-lg bg-[#1b1b1b]">
                    <input
                      onChange={(e) => {
                        setMenu({ ...menu, color: e.target?.value });
                      }}
                      name="color"
                      value={menu.color}
                      type="color"
                      placeholder=""
                      id="color"
                      className="h-10 w-full cursor-pointer rounded-lg text-[#f5f5f5] border border-gray-700 bg-transparent p-1"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-[#2a2a2a] border-t-2 mt-4" />
              <div className="mt-2">
                <h2 className="text-xl text-start  text-yellow-500 font-semibold">
                  {"Add Dishe"}
                </h2>
                <label className="block text-md  text-[#ababab] mb-2 mt-3  font-medium">
                  Dishe Name <span className="text-yellow-400">*</span>
                </label>
                <div className="flex flex-col gap-3 mt-1">
                  <div className="flex text-lg  items-center rounded-lg p-3 py-5 font-medium bg-[#1b1b1b]">
                    <input
                      onChange={(e) => {
                        setMenu({
                          ...menu,
                          dishes: { ...menu.dishes, name: e.target?.value },
                        });
                      }}
                      type="text"
                      name="name"
                      value={menu.dishes.name}
                      required="true"
                      placeholder="Enter dish-name"
                      id="name"
                      className="bg-transparent flex-1 text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="w-full">
                      <label className="block text-md  text-[#ababab] mb-2 mt-3  font-medium">
                        Dishe Price <span className="text-yellow-400">*</span>
                      </label>
                      <div className="flex-1 text-lg  items-center rounded-lg p-3 py-5 font-medium bg-[#1b1b1b]">
                        <input
                          onChange={(e) => {
                            setMenu({
                              ...menu,
                              dishes: {
                                ...menu.dishes,
                                price: Number(e.target?.value),
                              },
                            });
                          }}
                          type="number"
                          name="price"
                          value={menu.dishes.price}
                          required="true"
                          placeholder="Enter dish-price"
                          id="price"
                          className="bg-transparent flex-1 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-md  text-[#ababab] mb-2 mt-3  font-medium">
                        Dishe Cetegory{" "}
                        <span className="text-yellow-400">*</span>
                      </label>
                      <div className="flex-1 text-lg  items-center rounded-lg p-3 py-5 font-medium bg-[#1b1b1b]">
                        <input
                          onChange={(e) => {
                            setMenu({
                              ...menu,
                              dishes: {
                                ...menu.dishes,
                                category: e.target?.value,
                              },
                            });
                          }}
                          type="text"
                          name="category"
                          value={menu.dishes.category}
                          required="true"
                          placeholder="Enter dish-category"
                          id="category"
                          className="bg-transparent flex-1 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
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
            {action.action === "menu" && "Create Menu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
