import { useState } from "react";
import { logout } from "@/utils/logOut";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import { indexEmployees } from "@/services/hierarchyServices";

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
  const [employees, setEmployees] = useState([]);
  // const [test, setTest] = useState([]);

  const { user, setRole, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout({ setUser, setRole, navigate });
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await indexEmployees();
        setEmployees(employees.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <NavigationMenu className="mt-4 ml-4 mr-4">
      <NavigationMenuList>
        {/* Break for each option */}
        {user?.role === "Supervisor" && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/">Dashboard</Link>
                    </NavigationMenuLink>

                    {Array.isArray(employees) &&
                      employees.map(
                        (item, index) =>
                          item?.salesPersonId && (
                            <NavigationMenuLink key={index} asChild>
                              <Link to={`/${item.salesPersonId}`}>
                                {item.salesPersonName || "Unnamed"}
                              </Link>
                            </NavigationMenuLink>
                          )
                      )}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/role">Role Assignment</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}

        {/* Break for each option */}
        {user?.role === "IC" && (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={`/${user._id}`}>My Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

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
          </>
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
