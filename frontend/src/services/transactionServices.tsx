import { Service_BASE_URL, Service_HEADER_isLoggedIn } from "./configServices";

const addTransaction = async (data: object) => {
  const url_modifiers = "/transaction/add";
  const url = Service_BASE_URL + url_modifiers;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: Service_HEADER_isLoggedIn,
      body: JSON.stringify(data),
    });
    const passData = await res.json();
    if (!res.ok) {
      throw new Error(passData?.error || "Failed to add transaction");
    }
    return passData;
  } catch (err: any) {
    throw new Error(err.message || "An unknown error occurred");
  }
};

const indexTransactions = async () => {
  const url_modifiers = "/transaction/index";
  const url = Service_BASE_URL + url_modifiers;
  try {
    const res = await fetch(url, {
      headers: Service_HEADER_isLoggedIn,
    });
    const passData = await res.json();
    if (!res.ok) {
      throw new Error(passData?.error || "Failed to fetch transactions");
    }
    return passData;
  } catch (err: any) {
    throw new Error(err.message || "An unknown error occurred");
  }
};

export { addTransaction, indexTransactions };
