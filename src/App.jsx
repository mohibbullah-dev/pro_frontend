import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
  replace,
} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Header from "./components/shared/Header";
import Tables from "./pages/Tables";
import Menu from "./pages/Menu";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import { removeUser } from "./redux/slices/usreSlice";
import { useEffect } from "react";
import Loader from "./components/shared/Loader";

function Layout() {
  useLoadData();
  const { pathname } = useLocation();
  const { isLogedIn, loading } = useSelector((state) => state.user);
  const accessToken = useSelector((state) => state.auth?.accessToken);

  if (loading) return <Loader />;

  return (
    <>
      {pathname !== "/auth" && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/auth"
          element={isLogedIn ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/table"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

const ProtectedRoutes = ({ children }) => {
  const { isLogedIn, loading } = useSelector((state) => state.user);

  if (loading) return <Loader />;
  if (!isLogedIn) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
