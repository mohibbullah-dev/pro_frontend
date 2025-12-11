import React from "react";

import CartItemCard from "./CartItemCard";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CartItem = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#f1f1f1] font-semibold tracking-wide]">
        Order Details
      </h1>
      <div
        className="overflow-y-scroll scrollbar-hide h-[380px]"
        ref={scrollRef}
      >
        <CartItemCard cartData={cartData} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default CartItem;
