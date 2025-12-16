import React from "react";
import { useState } from "react";
import { MdRadioButtonChecked } from "react-icons/md";
const Register = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const roleHandler = (e) => {
    setSelectedRole(e.currentTarget.innerText);
    console.log("e :", e.currentTarget.innerText);
  };
  return (
    <div className="">
      <form action="">
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Employee Name
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="nmae"
              placeholder="Enter employee name"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Employee Phone
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="number"
              name="phone"
              placeholder="+01999999999"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Employee Email
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              placeholder="Enter employee email"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Employee Password
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              placeholder="Enter employee password"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 text-[#ababab] mt-4">
            Choose your role
          </label>
          <div className="flex items-center gap-3 mt-4">
            {["Waiter", "Cashier", "Admin"].map((role) => {
              return (
                <button
                  onClick={(e) => roleHandler(e)}
                  key={role}
                  type="button"
                  className="flex items-center justify-around cursor-pointer bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab]"
                >
                  {selectedRole === role && (
                    <MdRadioButtonChecked className="text-white" size={20} />
                  )}
                  {role}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg hover:bg-yellow-300 bg-amber-400 text-gray-900 font-bold cursor-pointer"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
