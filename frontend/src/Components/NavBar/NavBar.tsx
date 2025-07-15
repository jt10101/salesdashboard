import { useState } from "react";
import { logout } from "@/utils/LogOut";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

import { InputSalesSheet } from "../SalesInput/SalesInput";
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
  const [showSheet, setShowSheet] = useState(false);
  const { user, setRole, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout({ setUser, setRole, navigate });
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
        {user?.role === "Supervisor" && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/role">Role Assignment</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        {/* Break for each option */}
        {user?.role === "IC" && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <button
                onClick={() => setShowSheet(true)}
                className="w-full text-left"
              >
                Add Sales
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        {/* Break for each option */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <button onClick={handleLogout} className="w-full text-left">
              Logout
            </button>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <InputSalesSheet open={showSheet} onOpenChange={setShowSheet} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { NavBar };
