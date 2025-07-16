import { Routes, Route } from "react-router";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "./pages/Dashboard";
import { RoleAssignment } from "./pages/RoleAssignment";
import { IndividualDashboard } from "./pages/IndividualDashboard";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/role" element={<RoleAssignment />} />
            <Route path="/:salesPersonId" element={<IndividualDashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
