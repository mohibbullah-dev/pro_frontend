import React, { useState } from "react";
import { orders } from "../../constant";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const RecentOrder = () => {
  const [update, setUpdate] = useState(null);

  const navigate = useNavigate();
  const handleStatusChange = () => {};
  const updateHandler = (id) => {
    if (id === update) {
      navigate(0);
    }
    // setTimeout(() => {
    //   setUpdate(id);
    // }, 1000);
  };
  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        Recent Order
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-600 hover:bg-[#333]"
              >
                <td className="p-4">#{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">
                  <select
                    className={`bg-[#1a1a1a] rounded-md text-[#f5f5f5] border border-gray-500 ${
                      order.status === "Ready"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option className="text-yellow-500" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-green-500" value="Ready">
                      Ready
                    </option>
                  </select>
                </td>
                <td className="p-4">{order.dateTime}</td>
                <td className="p-4">{order.items} Items</td>
                <td className="p-4">Table - {order.items}</td>
                <td className="p-4">${order.total.toFixed(2)}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => {
                      setUpdate(order.id);
                      setTimeout(() => {
                        navigate(0);
                      }, 100);
                    }}
                    className={`text-blue-400 cursor-pointer hover:text-blue-500  ${
                      update === order.id
                        ? "transition-transform duration-200 -rotate-720"
                        : "rotate-0"
                    }`}
                  >
                    <GrUpdate size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;
