import React from "react";
import { useState } from "react";
import { MdRadioButtonChecked } from "react-icons/md";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const errors = {};

  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    if (!formData.name.trim()) errors.name = "name is required";
    if (!formData.phone.trim()) errors.phone = "phone is required";
    if (!formData.email.trim()) errors.email = "email is required";
    if (!formData.password.trim()) errors.password = "password is required";
    if (!formData.role.trim()) errors.role = "role is required";
    if (Object.keys(errors).length > 0) alert("all fields are required");
    e.preventDefault();

    console.log("formData :", formData);
  };

  const [selectedRole, setSelectedRole] = useState(null);
  const roleHandler = (e) => {
    setSelectedRole(e.currentTarget.innerText);
    setFormData({ ...formData, role: e.currentTarget.innerText });
  };
  return (
    <div className="">
      <form action="" onSubmit={submitHandler}>
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Employee Name
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              value={formData.name}
              onChange={(e) => formHandler(e)}
              type="text"
              name="name"
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
              value={formData.phone}
              onChange={(e) => formHandler(e)}
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
              value={formData.email}
              onChange={(e) => formHandler(e)}
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
              value={formData.password}
              onChange={(e) => formHandler(e)}
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
