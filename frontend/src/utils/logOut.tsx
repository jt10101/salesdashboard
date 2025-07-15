export const logout = ({
  setUser,
  setRole,
  navigate,
}: {
  setUser: Function;
  setRole: Function;
  navigate: Function;
}) => {
  localStorage.removeItem("token");
  setUser(null);
  setRole("");
  navigate("/");
};
