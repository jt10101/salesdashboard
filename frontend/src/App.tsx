import { Routes, Route } from "react-router";
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "./pages/Dashboard";
import { RoleAssignment } from "./pages/RoleAssignment";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/role" element={<RoleAssignment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
