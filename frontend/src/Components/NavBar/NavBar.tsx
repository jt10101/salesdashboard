import { Link, useNavigate } from "react-router";
import { logout } from "@/utils/LogOut";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const NavBar = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout({ setUser, navigate });
  };
  return (
    <ul className={styles.navbar}>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/role">Role Assignment</Link>
      </li>
      <li onClick={handleLogout} style={{ cursor: "pointer" }}>
        Sign Out
      </li>
    </ul>
  );
};

export { NavBar };
