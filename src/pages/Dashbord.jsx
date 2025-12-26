import React, { useEffect, useRef } from "react";
import { MdCategory } from "react-icons/md";
import { MdTableBar } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { BiFoodMenu } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrder from "../components/dashboard/RecentOrder";
import { useState } from "react";
import Modal from "../components/dashboard/Modal";
import Restaurant from "../components/dashboard/Restaurant";

const Dashbord = () => {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState({});
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("dashbordTab") || "Metrics";
  });
  const [restaurant, setRestaurant] = useState(() => {
    return localStorage.getItem("open");
  });
  const buttons = [
    { label: "Add Category", icon: <MdCategory />, action: "category" },
    { label: "Add Table", icon: <MdTableBar />, action: "table" },
    { label: "Add Menu", icon: <BiFoodMenu />, action: "menu" },
  ];

  useEffect(() => {
    localStorage.setItem("dashbordTab", activeTab);
  }, [activeTab]);

  const Tabs = ["Metrics", "Order", "Payment"];

  const modalHander = (action) => {
    setModal(true);
    setAction(action);
  };

  return (
    <div className=" bg-[#1f1f1f] h-[calc(100vh-5rem)]">
      <div className="container mx-auto flex items-center justify-between py-14 px-6 md:px-4">
        <div className="relative flex items-center gap-3">
          {buttons.map(({ label, icon, action }) => {
            return (
              <button
                key={action}
                onClick={() => {
                  modalHander({ label, icon, action });
                }}
                className="bg-[#1f1f1f] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] cursor-pointer font-semibold text-md flex items-center gap-2"
              >
                {label} {icon}
              </button>
            );
          })}

          {modal && <Modal modal={modal} setModal={setModal} action={action} />}

          <div
            onClick={() => {
              // if()
              setRestaurant(!restaurant);
            }}
            className="bg-amber-400 rounded-md hover:transition-colors hover:bg-amber-500 cursor-pointer text-white text-md px-4 py-2  font-semibold"
          >
            <button className=" bg-transparent cursor-pointer">
              Create Restaurant
            </button>
          </div>
        </div>

        {restaurant && (
          <Restaurant setRestaurant={setRestaurant} restaurant={restaurant} />
        )}

        <div className="flex items-center gap-3">
          {Tabs.map((tab, index) => {
            return (
              <button
                key={index}
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
