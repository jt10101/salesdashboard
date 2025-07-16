import { Routes, Route } from "react-router";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "./pages/Dashboard";
import { RoleAssignment } from "./pages/RoleAssignment";
import { IndividualDashboard } from "./pages/IndividualDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/role" element={<RoleAssignment />} />
          <Route path="/:salesPersonId" element={<IndividualDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
