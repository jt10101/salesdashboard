import { Outlet, Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { NavBar } from "@/components/NavBar/NavBar";

const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export { ProtectedRoutes };
