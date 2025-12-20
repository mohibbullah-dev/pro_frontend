import { useEffect } from "react";
import { MeAPi, RefreshTokenApi } from "../https";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../redux/slices/usreSlice";
import { useRef } from "react";
import { removeAccessToken, setAccessToken } from "../redux/slices/authSlice";

const useBootstarap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state?.auth);
  const useBootstarapedRef = useRef(false);

  useEffect(() => {
    if (useBootstarapedRef.current) return;
    useBootstarapedRef = true;
    async function bootstrap() {
      try {
        if (!accessToken) {
          const { data } = await RefreshTokenApi();
          const token = data?.data?.newAccessToken;
          if (!token) throw new Error("No accessToken from refreshToken");
          dispatch(setAccessToken(token));
        }

        const { data } = await MeAPi();
        const { _id, name, email, phone, role, avatar } = data?.data;
        dispatch(setUser({ id: id, name, email, phone, role, avatar }));
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
