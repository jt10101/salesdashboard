export const logout = ({
  setUser,
  navigate,
}: {
  setUser: Function;
  navigate: Function;
}) => {
  localStorage.removeItem("token");
  setUser(null);
  navigate("/");
};
