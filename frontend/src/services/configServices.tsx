const Service_BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;
const Service_HEADER = {
  "Content-Type": "application/json",
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export { Service_BASE_URL, Service_HEADER, getAuthHeaders };
