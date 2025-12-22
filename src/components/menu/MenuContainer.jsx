import React, { useState } from "react";
import { menus } from "../../constant";
import { getBgColor } from "../../utils";
import { MdRadioButtonChecked } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCounts, setItemCounts] = useState({});
  const dispatch = useDispatch();

  const Decreament = (id) => {
    setItemCounts((prev) => {
      const current = prev[id] || 0;
      if (current <= 0) return prev;

      return {
        ...prev,
        [id]: (prev[id] || 0) - 1,
      };
    });
  };

  const Increament = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleAddItem = (item) => {
    if (!itemCounts || Object.keys(itemCounts).length === 0) return;
    const { name, price, category } = item;
    const obj = {
      id: Date.now(),
      name,
      pricePerQuantity: price,
      quantity: itemCounts[item.id],
      price: price * itemCounts[item.id],
      category,
    };
    console.log("obj :", obj);

    dispatch(addItem(obj));
    setItemCounts({});
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 p-y w-full">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className={`flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer`}
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelected(menu);
                setItemCounts({});
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selected.id === menu.id && (
                  <MdRadioButtonChecked className="text-white" size={20} />
                )}
              </div>
              <p className="text-[#ababab] text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      <div className="grid grid-cols-4 gap-4 px-10 p-y w-full">
        {selected.items.map((item) => {
          return (
            <div
              key={item.id}
              className={`flex mt-4 flex-col items-start hover:bg-[#2a2a2a] bg-[#1a1a1a] justify-between p-4 rounded-lg h-[150px] cursor-pointer`}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {item.name}
                </h1>
                <button
                  onClick={() => handleAddItem(item)}
                  className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg cursor-pointer hover:scale-105"
                  size={20}
                >
                  <FaShoppingCart />
                </button>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-[#f1f1f1] text-xl font-bold">
                  ${item.price}
                </p>
                <div>
                  <div className="flex items-center gap-4 justify-between rounded-lg p-3 text-sm font-medium bg-[#262626]">
                    <button
                      onClick={() => {
                        Decreament(item.id);
                      }}
                      className="cursor-pointer text-yellow-500 text-2xl"
                    >
                      &minus;
                    </button>
                    <span className="text-white text-lg font-semibold">
                      {itemCounts[item.id] || 0}
                    </span>
                    <button
                      onClick={() => {
                        Increament(item.id);
                      }}
                      className="cursor-pointer text-yellow-500 text-2xl"
                    >
                      &#43;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
