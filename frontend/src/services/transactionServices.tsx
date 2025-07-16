import { Service_BASE_URL, Service_HEADER_isLoggedIn } from "./configServices";

const addTransaction = async (data: object) => {
  const url_modifiers = "/transaction/add"; // EDIT THIS PART
  const url = Service_BASE_URL + url_modifiers;

  try {
    const resData = await fetch(url, {
      method: "POST",
      headers: Service_HEADER_isLoggedIn,
      body: JSON.stringify(data),
    });
    const passData = await resData.json();
    return passData;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

export { addTransaction };
