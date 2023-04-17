import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authentication/useAuthentication";
import { RouteBase } from "../constants/routeUrl";

const AdminRoutes = () => {
  const auth = useAuth();
  const { isLogged, userInfo } = auth;

  console.log("aaa")

  return isLogged && userInfo.role === 1 ? (
    <Outlet />
  ) : (
    <Navigate to={`${RouteBase.Login}`} replace={true} />
  );
};

export default AdminRoutes;
