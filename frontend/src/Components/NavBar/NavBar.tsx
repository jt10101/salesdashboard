// import * as React from "react";
// import Link from "next/link";
// import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import { logout } from "@/utils/LogOut";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

import { Link, useNavigate } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavBar = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout({ setUser, navigate });
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Break for each option */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/">Dashboard</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/">Sales Person 1</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/">Sales Person 2</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Break for each option */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/role">Role Assignment</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* Break for each option */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <button onClick={handleLogout} className="w-full text-left">
              Logout
            </button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { NavBar };

// import { Link, useNavigate } from "react-router";
// import { logout } from "@/utils/LogOut";
// import styles from "./NavBar.module.css";
// import { useContext } from "react";
// import { UserContext } from "@/contexts/UserContext";

// const NavBar = () => {
//   const { setUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     logout({ setUser, navigate });
//   };
//   return (
//     <ul className={styles.navbar}>
//       <li>
//         <Link to="/dashboard">Dashboard</Link>
//       </li>
//       <li>
//         <Link to="/role">Role Assignment</Link>
//       </li>
//       <li onClick={handleLogout} style={{ cursor: "pointer" }}>
//         Sign Out
//       </li>
//     </ul>
//   );
// };

// export { NavBar };
