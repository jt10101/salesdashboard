import styles from "./NavBar.module.css";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/role">Role Assignment</Link>
      </li>
      <li>Sign Out</li>
    </ul>
  );
};

export { NavBar };
