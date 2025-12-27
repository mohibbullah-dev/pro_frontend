import { useMutation } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AddTableApi, CreateMenuApi } from "../../https";
import { useNavigate } from "react-router-dom";
import Emoji from "../../utils/Emoji";
import { useDispatch } from "react-redux";
import { setMenu } from "../../redux/slices/menuSlice";
import { FaPen } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Modal = ({ modal, setModal, action }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState({
    tableNo: null,
    seatNo: null,
  });

  // dishes list
  const [dishList, setDishList] = useState([]);

  // dish form object (with editingId for update)
  const [dishObj, setDishObj] = useState({
    name: "",
    price: 0,
    category: "",
    editingId: null,
  });

  const [icon, setIcon] = useState("");

  // menu form
  const [menuData, setMenuData] = useState({
    name: "",
    color: "#e30d0d",
  });

  // ---------- handlers ----------
  const tableInputHandler = (e) => {
    setTableData({ ...tableData, [e.target.name]: e.target.value });
  };

  // Add/Update dish
  const handleAddOrUpdateDish = () => {
    if (!dishObj?.name || !dishObj?.price || !dishObj?.category) {
      toast.error("All-dish are required!");
      return;
    }

    // UPDATE mode
    if (dishObj.editingId) {
      setDishList((prev) =>
        prev.map((dish) =>
          dish.id === dishObj.editingId
            ? {
                ...dish,
                name: dishObj.name,
                price: dishObj.price,
                category: dishObj.category,
              }
            : dish
        )
      );
      toast.success("Dish updated!");
    } else {
      // ADD mode
      setDishList((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: dishObj.name,
          price: dishObj.price,
          category: dishObj.category,
        },
      ]);
      toast.success("Dish added!");
    }

    // reset form
    setDishObj({
      name: "",
      price: 0,
      category: "",
      editingId: null,
    });
  };

  const handleEditDish = (d) => {
    setDishObj({
      name: d.name,
      price: d.price,
      category: d.category,
      editingId: d.id,
    });
  };

  const handleDeleteDish = (id) => {
    setDishList((prev) => prev.filter((dish) => dish.id !== id));
    // যদি delete করা dish-টাই edit mode এ থাকে, form reset
    if (dishObj.editingId === id) {
      setDishObj({ name: "", price: 0, category: "", editingId: null });
    }
  };

  // ---------- table submit ----------
  const SubmitTableData = () => {
    if (!tableData.tableNo || !tableData.seatNo) {
      toast.error("All fields are required");
      return;
    }
    TableMutation.mutate(tableData);
  };

  const TableMutation = useMutation({
    mutationFn: (payload) => AddTableApi(payload),
    onSuccess: (res) => {
      toast.success(res.data.data.message || "table created successfully");
      setTableData({ tableNo: 0, seatNo: 0 });
      navigate("/table");
      setTimeout(() => navigate(0), 1500);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Table create failed");
    },
  });

  // ---------- menu submit ----------
  const SubmitMenuData = (e) => {
    e.preventDefault();

    if (!menuData.name) return toast.error("name is required");
    if (!menuData.color) return toast.error("color is required");
    if (dishList.length <= 0) return toast.error("dish is required");

    // IMPORTANT: dishes always from latest dishList (not menuData snapshot)
    const menuObj = { ...menuData, icon, dishes: dishList };

    menuDataMutation.mutate(menuObj);
  };

  const menuDataMutation = useMutation({
    mutationFn: (payload) => CreateMenuApi(payload),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "menu created successfully");
      const { name, color, icon, dishes } = res?.data?.data?.value || {};
      dispatch(setMenu({ name, color, icon, dishes }));
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "menu submission failed"),
  });

  return (
    <div onClick={() => setModal(false)} className="bg-amber-600 relative z-50">
      <div className="fixed inset-0 h-full flex items-center justify-center w-full bg-black/70 backdrop-blur-sm">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#262626] shadow-lg w-full ${
            action.action === "table"
              ? "max-w-[400px]"
              : action.action === "menu"
              ? "max-w-5xl"
              : ""
          } mx-4 rounded-lg p-4 shadow-[#262626] z-50`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl text-start text-[#f5f5f5] font-semibold">
              {action.label || "No Title"}
            </h2>
            <button
              onClick={() => setModal(false)}
              className="cursor-pointer text-gray-400 text-3xl hover:text-gray-300"
              type="button"
            >
              &times;
            </button>
          </div>

          {action.action === "table" ? (
            <div>
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Table Number <span className="text-amber-400">*</span>
                </label>

                <input
                  type="number"
                  name="tableNo"
                  value={tableData.tableNo}
                  onChange={tableInputHandler}
                  placeholder="Enter table number"
                  className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                />
              </div>

              <div>
                <label className="block mt-4 text-sm text-white/80 mb-2">
                  Table of Seats <span className="text-amber-400">*</span>
                </label>

                <input
                  onChange={tableInputHandler}
                  name="seatNo"
                  value={tableData.seatNo}
                  type="number"
                  placeholder="Enter seat no"
                  className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                />
              </div>

              <button
                onClick={SubmitTableData}
                className="w-full mt-5 rounded-xl cursor-pointer bg-amber-500 py-3 font-semibold text-black hover:bg-amber-400 active:bg-amber-500 transition shadow-[0_10px_30px_rgba(245,158,11,0.18)]"
                type="button"
              >
                Create Table
              </button>
            </div>
          ) : action.action === "menu" ? (
            <div className="grid grid-cols-2 gap-3">
              {/* LEFT */}
              <div className="rounded-md">
                {/* menu details */}
                <div className="p-4 border border-white/10 rounded-md bg-[#1b1b1b]">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">
                      Menu Details <span className="text-amber-400">*</span>
                    </label>

                    <input
                      onChange={(e) =>
                        setMenuData({ ...menuData, name: e.target.value })
                      }
                      type="text"
                      name="name"
                      value={menuData.name}
                      required
                      placeholder="Enter menu name"
                      className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm text-white/80 mb-2">
                      Choose a BG-Color{" "}
                      <span className="text-amber-400">*</span>
                    </label>

                    <div className="flex gap-3 bg-zinc-950/60 justify-center items-center rounded-lg p-1">
                      <div className="flex-1">
                        <Emoji icon={icon} setIcon={setIcon} />
                      </div>

                      <div className="flex-1">
                        <input
                          name="color"
                          value={menuData.color}
                          type="text"
                          readOnly
                          className="h-10 w-[120px] text-center text-white cursor-pointer rounded-lg border border-gray-700 bg-transparent p-1"
                        />
                      </div>

                      <div className="flex-1">
                        <input
                          onChange={(e) =>
                            setMenuData({ ...menuData, color: e.target.value })
                          }
                          name="color"
                          value={menuData.color}
                          type="color"
                          className="h-10 cursor-pointer w-[120px] rounded-lg text-[#f5f5f5] border border-gray-700 bg-transparent p-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-[#2a2a2a] border-t-2 mt-4" />

                {/* dish details */}
                <div className="p-4 rounded-md border border-white/10 bg-[#1b1b1b]">
                  <h2 className="text-xl text-start text-yellow-500 font-semibold">
                    Add Dish
                  </h2>

                  <label className="block text-md text-[#ababab] mb-2 mt-3 font-medium">
                    Dish Name <span className="text-yellow-400">*</span>
                  </label>

                  <div className="flex flex-col gap-3 mt-1">
                    <div className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15">
                      <input
                        onChange={(e) =>
                          setDishObj({ ...dishObj, name: e.target.value })
                        }
                        type="text"
                        name="dishName"
                        value={dishObj.name}
                        required
                        placeholder="Enter dish-name"
                        className="bg-transparent w-full text-white outline-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="w-full">
                        <label className="block text-sm text-white/80 mb-2">
                          Dish Price <span className="text-yellow-400">*</span>
                        </label>

                        <div className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15">
                          <input
                            onChange={(e) =>
                              setDishObj({
                                ...dishObj,
                                price: Number(e.target.value),
                              })
                            }
                            type="number"
                            name="dishPrice"
                            value={dishObj.price}
                            required
                            placeholder="Enter dish-price"
                            className="bg-transparent w-full text-white outline-none"
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <label className="block text-sm text-white/80 mb-2">
                          Dish Category{" "}
                          <span className="text-yellow-400">*</span>
                        </label>

                        <div className="w-full rounded-xl bg-zinc-950/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15">
                          <input
                            onChange={(e) =>
                              setDishObj({
                                ...dishObj,
                                category: e.target.value,
                              })
                            }
                            type="text"
                            name="dishCategory"
                            value={dishObj.category}
                            required
                            placeholder="Enter dish-category"
                            className="bg-transparent w-full text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAddOrUpdateDish}
                    className="mt-4 w-[140px] bg-amber-500 py-2 cursor-pointer text-lg rounded-sm hover:bg-amber-400 transition-colors"
                    type="button"
                  >
                    {dishObj.editingId ? "Update" : "Add to List"}
                  </button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="p-4 rounded-md border border-white/10 flex flex-col justify-between">
                <div className="flex flex-col">
                  <h2 className="text-xl text-start text-yellow-500 font-semibold">
                    Dishes List
                  </h2>

                  <div className="flex items-center justify-center">
                    <p className="flex-1 text-md text-[#ababab] mb-2 mt-3 font-medium">
                      Dish Name
                    </p>
                    <p className="flex-1 text-md text-[#ababab] mb-2 mt-3 font-medium">
                      Price
                    </p>
                    <p className="flex-1 text-center text-md text-[#ababab] mb-2 mt-3 font-medium">
                      Category
                    </p>
                    <p className="w-20 text-center text-md text-[#ababab] mb-2 mt-3 font-medium">
                      Action
                    </p>
                  </div>

                  <div className="flex flex-col max-h-[350px] overflow-y-scroll scrollbar-hide gap-0.5 rounded-md">
                    {dishList.length > 0 ? (
                      dishList.map((d) => (
                        <div
                          key={d.id}
                          className="grid gap-3 bg-[#1b1b1b] px-2 py-2 capitalize rounded-sm items-start"
                          style={{
                            gridTemplateColumns:
                              "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) auto",
                          }}
                        >
                          <p className="text-[#f1f1f1] text-sm min-w-0 break-all">
                            {d?.name}
                          </p>

                          <p className="text-[#f1f1f1] text-sm min-w-0 break-all">
                            ${d?.price}
                          </p>

                          <p className="text-[#f1f1f1] text-sm min-w-0 break-all">
                            {d?.category}
                          </p>

                          <div className="shrink-0 self-start flex justify-around w-20 text-yellow-400 py-2 bg-amber-400/10 items-center gap-2 px-1 rounded-md border border-amber-400/20">
                            <FaPen
                              onClick={() => handleEditDish(d)}
                              className="cursor-pointer"
                              size={13}
                              title="Edit"
                            />

                            <button
                              type="button"
                              onClick={() => handleDeleteDish(d.id)}
                            >
                              <MdOutlineDeleteOutline
                                className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                                size={17}
                                title="Delete"
                              />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full flex items-center justify-center mt-40 h-full text-white">
                        No list available !
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={SubmitMenuData}
                  className="bg-amber-500 py-2 w-full cursor-pointer text-lg rounded-sm hover:bg-amber-400 transition-colors"
                  type="button"
                >
                  Create Menu
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
