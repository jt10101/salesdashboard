import { Service_BASE_URL, getAuthHeaders } from "./configServices";

const indexHierarchy = async () => {
  const url_modifiers = "/hierarchy/index"; // EDIT THIS PART
  const url = Service_BASE_URL + url_modifiers;

  try {
    const resData = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
    });
    const passData = await resData.json();
    return passData;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const indexEmployees = async () => {
  const url_modifiers = "/hierarchy/index/employees"; // EDIT THIS PART
  const url = Service_BASE_URL + url_modifiers;

  try {
    const resData = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const passData = await resData.json();
    return passData;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const changeHierarchy = async (newSupervisorId, salesPersonId) => {
  const url_modifiers = "/hierarchy/change"; // EDIT THIS PART
  const url = Service_BASE_URL + url_modifiers;

  try {
    const resData = await fetch(url, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        salesPersonId,
        newSupervisorId,
      }),
    });
    const passData = await resData.json();
    return passData;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};
export { indexHierarchy, indexSupervisors, indexEmployees, changeHierarchy };
