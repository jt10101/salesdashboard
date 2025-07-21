export const logout = ({
  setUser,
  setRole,
  navigate,
}: {
  setUser: (user: null) => void;
  setRole: (role: string) => void;
  navigate: (path: string) => void;
}) => {
  localStorage.removeItem("token");
  setUser(null);
  setRole("");
  navigate("/");
};
