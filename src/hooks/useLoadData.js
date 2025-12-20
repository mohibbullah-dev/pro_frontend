import { useEffect } from "react";
import { MeAPi, RefreshTokenApi } from "../https";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../redux/slices/usreSlice";
import { useRef } from "react";
import { removeAccessToken, setAccessToken } from "../redux/slices/authSlice";
import { useState } from "react";
import Loader from "../components/shared/Loader";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state?.auth?.accessToken);
  console.log("redux accessToken has or not :", accessToken);

  const bootstarapedRef = useRef(false);

  useEffect(() => {
    if (bootstarapedRef.current) return;
    bootstarapedRef.current = true;

    async function bootstrap() {
      try {
        if (!accessToken) {
          const { data } = await RefreshTokenApi();
          const token = data?.data?.newAccessToken;
          if (!token) throw new Error("No accessToken from refreshToken");
          console.log("accessToken from refreshToken :", token);
          dispatch(setAccessToken(token));
        }

        const { data } = await MeAPi();
        const { _id, name, email, phone, role, avatar } = data?.data;
        dispatch(setUser({ id: _id, name, email, phone, role, avatar }));
      } catch (error) {
        dispatch(removeAccessToken());
        dispatch(removeUser());
        navigate("/auth", { replace: true });
      }
    }
    bootstrap();
  }, [accessToken, dispatch, navigate]);
};

export default useLoadData;
