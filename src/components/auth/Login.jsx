import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { LoginApi } from "../../https";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { setUser } from "../../redux/slices/usreSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const errors = {};

  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) errors.email = "email is required";
    if (!formData.password.trim()) errors.password = "password is required";
    if (Object.keys(errors).length > 0) {
      alert("all fields are required");
      return;
    }

    LoginMutaion.mutate(formData);
  };

  const LoginMutaion = useMutation({
    mutationFn: (formData) => LoginApi(formData),
    onSuccess: (res) => {
      const token = res.data?.data?.accesstoken || res.data?.data?.accesstoken;
      console.log("res :", res);
      const { _id, name, email, phone, role, avatar } = res.data?.data?.userObj;
      dispath(setAccessToken(token));
      dispath(setUser({ id: _id, name, email, phone, role, avatar }));
      toast.success("Login succefully done");
      navigate("/");
    },
    onError: (err) => {
      console.log("err :", err);
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });

  return (
    <div className="">
      <form action="" onSubmit={submitHandler}>
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

        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg hover:bg-yellow-300 bg-amber-400 text-gray-900 font-bold cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
