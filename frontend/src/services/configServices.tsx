const Service_BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;
const Service_HEADER = {
  "Content-Type": "application/json",
};

const token = localStorage.getItem("token");
const Service_HEADER_isLoggedIn = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export { Service_BASE_URL, Service_HEADER, Service_HEADER_isLoggedIn };
