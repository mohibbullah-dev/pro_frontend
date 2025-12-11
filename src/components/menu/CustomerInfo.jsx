import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime, getAvaterName } from "../../utils";

const CustomerInfo = () => {
  const [date, setDate] = useState(new Date());
  const cutomerData = useSelector((state) => state.customer);
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-col items-start">
        <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
          {cutomerData.customerName || "N/M"}
        </h1>
        <p className="text-xs text-[#ababab] font-medium mt-1">
          {cutomerData.orderId || "ID"}/Dine in
        </p>
        <p className="text-xs text-[#ababab] font-medium mt-2">
          {formateDate(date)} {formatTime(date)}
        </p>
      </div>
      <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
        {getAvaterName(cutomerData.customerName) || "CN"}
      </button>
    </div>
  );
};

export default CustomerInfo;
