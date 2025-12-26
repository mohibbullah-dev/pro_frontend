import axios from "axios";
import { removeAccessToken, setAccessToken } from "../redux/slices/authSlice";
import { store } from "../redux/store";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // ✅ cookie-based refresh এর জন্য must
// });

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// 1) request এ token লাগানো
// api.interceptors.request.use((config) => {
//   const token = store.getState().auth.accessToken;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

api.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status !== 401 || original._retry) {
      return Promise.reject(err);
    }
    if (original.url.includes("/users/refreshTokn")) {
      store.dispatch(removeAccessToken());
      return Promise.reject(err);
    }

    original._retry = true;

    try {
      const refreshRes = await api.post(`/users/refreshTokn`);

      const newAccessToken = refreshRes.data?.data?.newAccessToken;
      store.dispatch(setAccessToken(newAccessToken));
      original.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(original);
    } catch (error) {
      store.dispatch(removeAccessToken());
      return Promise.reject(err);
    }
  }
);

// api end_point

const LoginApi = (data) => api.post("/users/login", data);
const RegisterAPi = (data) => api.post("users/signup", data);
const LogOutApi = () => api.post("/users/logOut");
const MeAPi = () => api.get("/users/me");
const RefreshTokenApi = () => api.post("users/refreshTokn");
const AddTableApi = (data) => api.post("tables/addTable", data);
const GetTableApi = () => api.get("tables/getTables");
const CreateRestaurantApi = (data) =>
  api.post("restaurants/restaurantCreate", data);
const CreateMenuApi = (data) => api.post("menus/createmenu", data);

export {
  LoginApi,
  RegisterAPi,
  LogOutApi,
  MeAPi,
  RefreshTokenApi,
  AddTableApi,
  GetTableApi,
  CreateRestaurantApi,
  CreateMenuApi,
};

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

// export { api };
