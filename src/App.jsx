import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Header from "./components/shared/Header";
import Tables from "./pages/Tables";
import Menu from "./pages/Menu";
import { ToastContainer, toast } from "react-toastify";

function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/auth" && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/table" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
