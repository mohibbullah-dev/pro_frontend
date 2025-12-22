import React, { useState } from "react";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/table/TableCard";
import { tables } from "../constant";
import BottomNav from "../components/shared/BottomNav";
import { useQuery } from "@tanstack/react-query";
import { GetTableApi } from "../https";
import Loader from "../components/shared/Loader";
import { toast } from "react-toastify";
import EmptyState from "../utils/EmptyState";
import { useNavigate } from "react-router-dom";

const Tables = () => {
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();
  const {
    data: tableData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["tableData"],
    queryFn: async () => {
      return await GetTableApi();
    },
  });

  if (isPending) return <Loader />;
  if (isError) {
    toast.error(error.message);
    return null;
  }
  const tables = tableData?.data?.data || [];
  if (tables.length === 0) {
    return (
      <EmptyState
        title="Order Table not found"
        description="Before taking order, You have to have table"
        actionLabel="Add table"
        onAction={() => navigate("/orders")}
      />
    );
  }

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4 ">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">
            Orders
          </h1>
        </div>

        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" && "bg-[#383838] rounded-lg px-5 py-2"
            } rounded-lg px-5 py-2 font-semibold cursor-pointer`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] text-lg ${
              status === "booked" && "bg-[#383838] rounded-lg px-5 py-2"
            } rounded-lg px-5 py-2 font-semibold cursor-pointer`}
          >
            Booked
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-10 p-10 h-[calc(100vh-5rem-8rem)] overflow-y-scroll scrollbar-hide">
        {tableData?.data?.data?.map((item) => {
          return (
            <TableCard
              name={item.tableNo}
              status={item.tableStatus}
              initial={item.initial}
              key={item._id}
              seats={item.seatNo}
            />
          );
        })}
      </div>
      <BottomNav />
    </section>
  );
};

export default Tables;
