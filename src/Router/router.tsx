import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { Page404 } from "../pages/Page404";
import { Register } from "../pages/Register";
import { useAuth } from "../providers/Auth";

export default function Router() {
  const { signed } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
