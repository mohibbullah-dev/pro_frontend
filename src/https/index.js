import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken } from "../redux/slices/authSlice";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // ✅ cookie-based refresh এর জন্য must
// });

const dispatch = useDispatch();

console.log("accessToken form redux toolkit :", accessToken);
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 1) request এ token লাগানো
// api.interceptors.request.use((config) => {
//   const token = store.getState().auth.accessToken;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

api.interceptors.request.use((config) => {
  const accessToken = useSelector((state) => state.auth);
  console.log("accessToken :", accessToken);
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshRes = await api.post(
          `${BASE_URL}/users/refreshTokn`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data?.data?.accessToken;
        dispatch(setAccessToken(newAccessToken));
        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(original);
      } catch (error) {
        dispatch(clearAuth());
      }
    }

    return Promise.reject(err);
  }
);

// 2) 401 হলে refresh করে retry
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const original = err.config;

//     if (err.response?.status === 401 && !original._retry) {
//       original._retry = true;

//       try {
//         const refreshRes = await axios.post(
//           `${BASE_URL}/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const newToken = refreshRes.data?.data?.accesstoken; // তোমার backend অনুযায়ী
//         store.dispatch(setAccessToken(newToken));

//         original.headers.Authorization = `Bearer ${newToken}`;
//         return api(original); // ✅ retry
//       } catch {
//         store.dispatch(clearAuth());
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export { api };
