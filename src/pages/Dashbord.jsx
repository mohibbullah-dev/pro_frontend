import React, { useEffect, useRef } from "react";
import { MdCategory } from "react-icons/md";
import { MdTableBar } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrder from "../components/dashboard/RecentOrder";
import { useState } from "react";

const Dashbord = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("dashbordTab") || "Metrics";
  });
  const buttons = [
    { label: "Add Category", icon: <MdCategory />, action: "category" },
    { label: "Add Table", icon: <MdTableBar />, action: "table" },
    { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
  ];

  useEffect(() => {
    localStorage.setItem("dashbordTab", activeTab);
  }, [activeTab]);

  const Tabs = ["Metrics", "Order", "Payment"];
  return (
    <div className=" bg-[#1f1f1f] h-[calc(100vh-5rem)]">
      <div className="container mx-auto flex items-center justify-between py-14 px-6 md:px-4">
        <div className="flex items-center gap-3">
          {buttons.map(({ label, icon, action }) => {
            return (
              <button className="bg-[#1f1f1f] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] cursor-pointer font-semibold text-md flex items-center gap-2">
                {label} {icon}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {Tabs.map((tab) => {
            return (
              <button
                onClick={() => setActiveTab(tab)}
                className={`bg-[#1f1f1f] ${
                  activeTab === tab ? "bg-[#262626]" : "bg-[#1f1f1f]"
                } px-8 py-3 rounded-lg text-[#f5f5f5] cursor-pointer font-semibold text-md flex items-center gap-2`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
      {activeTab === "Metrics" && <Metrics />}{" "}
      {activeTab === "Order" && <RecentOrder />}/
    </div>
  );
};

export default Dashbord;
