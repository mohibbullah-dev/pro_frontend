import { useEffect } from "react";
import { MeAPi } from "../https";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../redux/slices/usreSlice";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) return;
    async function fetchUser() {
      try {
        const { data } = await MeAPi();
        console.log("me :", data);
        const { _id, name, email, phone, role, avatar } = data.data;
        dispatch(setUser({ id: _id, name, email, phone, role, avatar }));
      } catch (error) {
        navigate("/auth");
        dispatch(removeUser());
      }
    }
    fetchUser();
  }, [dispatch, navigate]);
};

export default useLoadData;
