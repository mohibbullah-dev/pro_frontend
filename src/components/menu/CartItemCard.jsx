import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";
const CartItemCard = ({ cartData, dispatch }) => {
  const handleRemove = (itemId) => {
    if (!itemId) return;
    dispatch(removeItem(itemId));
  };

  return (
    <div className="mt-4">
      {cartData.length === 0 ? (
        <p className="text-[#a1a1a1] flex items-center justify-center text-sm font-semibold h-[380px] ">
          Your cart is empty. Start adding cart !
        </p>
      ) : (
        cartData.map((item) => (
          <div className="bg-[#262626] rounded-lg px-4 py-4 mb-2">
            <div className="flex items-center justify-between">
              <h1 className="text-[#ababab] font-semibold tracking-wide text-md">
                {item.name}
              </h1>{" "}
              <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <RiDeleteBin2Fill
                  onClick={() => handleRemove(item.id)}
                  className="text-[#ababab] cursor-pointer hover:text-[#be4f33]"
                  size={20}
                />
                <FaNotesMedical
                  className="text-[#ababab] cursor-pointer"
                  size={20}
                />
              </div>
              <p className="text-[#f5f5f5] text-md font-bold">${item.price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItemCard;
