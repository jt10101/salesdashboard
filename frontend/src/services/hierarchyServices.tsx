import { Service_BASE_URL, Service_HEADER_isLoggedIn } from "./configServices";

const indexHierarchy = async () => {
  const url_modifiers = "/hierarchy/index"; // EDIT THIS PART
  const url = Service_BASE_URL + url_modifiers;

  try {
    const resData = await fetch(url, {
      method: "GET",
      headers: Service_HEADER_isLoggedIn,
    });
    const passData = await resData.json();
    return passData;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const indexSupervisors = async () => {
  const url_modifiers = "/hierarchy/index/supervisors"; // EDIT THIS PART
  const url = Service_BASE_URL + url_modifiers;

  try {
    const resData = await fetch(url, {
      method: "GET",
      headers: Service_HEADER_isLoggedIn,
    });
    const passData = await resData.json();
    return passData;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

export { indexHierarchy, indexSupervisors };
