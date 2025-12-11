import React, { useState } from "react";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartItem from "../components/menu/CartItem";
import Bill from "../components/menu/Bill";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuCard from "../components/menu/MenuCard";
import { menus } from "../constant";
import MenuContainer from "../components/menu/MenuContainer";
import { useSelector } from "react-redux";
const Menu = () => {
  const customerData = useSelector((state) => state.customer);
  console.log("customerData.tableNo :", customerData.tableNo);
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      <div className="flex-3">
        <div className="flex items-center justify-between px-10 py-4 mt-2">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">
              Orders
            </h1>
          </div>

          <div className="flex items-center cursor-pointer gap-3">
            <MdRestaurantMenu className="text-[#f5f5f5] text-4xl" />
            <div className="flex flex-col items-start">
              <h1 className="text-md text-[#f5f5f5] font-semibold">
                {customerData.customerName || "N/M"}
              </h1>
              <p className="text-xs text-[#ababab] font-medium ">
                {customerData.tableNo || "Tabe: No/"}
              </p>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>
      {/* right Dev  */}
      <div className="flex-1 bg-[#1a1a1a] mt-3 mr-4 h-[780px] rounded-lg pt-2">
        {/* Customer Info  */}

        <CustomerInfo />
        <hr className="border-[#2a2a2a] mt-3 border-t-2" />
        {/* cart Item  */}
        <CartItem />
        {/* Bills  */}
        <hr className="border-[#2a2a2a] mt-4 border-t-2" />
        <Bill />
      </div>
      <BottomNav />
    </section>
  );
};

export default Menu;
