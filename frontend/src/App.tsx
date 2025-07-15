import { Routes, Route } from "react-router";
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "./pages/Dashboard";
import { RoleAssignment } from "./pages/RoleAssignment";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/role" element={<RoleAssignment />} />
      </Routes>
    </>
  );
}

export default App;
