import React from "react";
import { itemsData, metricsData } from "../../constant";

const Metrics = () => {
  return (
    <div className="container  mx-auto">
      {/* Overall Performance  */}
      <div>
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="font-semibold text-[#f5f5f5] text-xl">
              Overall Performance
            </h2>
            <p className="text-sm text-[#ababab]">
              It is a long established fact that a reader will be distracted by
              the readable content
            </p>
          </div>
          <button className="flex items-center gap-1 py-2 px-4 cursor-pointer rounded-md text-[#f5f5f5] bg-[#1a1a1a]">
            Last 1 Month
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {metricsData.map((metric, index) => {
            return (
              <div
                key={index}
                className="flex flex-col  justify-between h-25 rounded-md p-3"
                style={{ backgroundColor: metric.color }}
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-[#f5f5f5] text-md">{metric.title}</h1>
                  <p
                    className="text-sm text-md flex items-center"
                    style={{ color: metric.isIncrease ? "green" : "red" }}
                  >
                    {metric.isIncrease ? (
                      <svg
                        className="w-3 h-3 "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    ) : (
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                    {metric.percentage}
                  </p>
                </div>
                <p className="font-semibold text-2xl text-[#f5f5f5]">
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* item details  */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="font-semibold text-[#f5f5f5] text-xl">
              Item Details
            </h2>
            <p className="text-sm text-[#ababab]">
              It is a long established fact that a reader will be distracted by
              the readable content
            </p>
          </div>
          <button className="flex items-center gap-1 py-2 px-4 cursor-pointer rounded-md text-[#f5f5f5] bg-[#1a1a1a]">
            Last 1 Month
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {itemsData.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col  justify-between h-25 rounded-md p-3"
                style={{ backgroundColor: item.color }}
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-[#f5f5f5] text-md">{item.title}</h1>
                  <p
                    className="text-sm text-md flex items-center"
                    style={{ color: item.isIncrease ? "green" : "red" }}
                  >
                    {item.isIncrease ? (
                      <svg
                        className="w-3 h-3 "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    ) : (
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                    {item.percentage}
                  </p>
                </div>
                <p className="font-semibold text-2xl text-[#f5f5f5]">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
