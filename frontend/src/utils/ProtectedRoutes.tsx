import { Outlet, Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);
  //   const user = null;
  return user ? <Outlet /> : <Navigate to="/" />;
};

export { ProtectedRoutes };
