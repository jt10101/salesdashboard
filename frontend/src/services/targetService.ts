import { Service_BASE_URL, getAuthHeaders } from "./configServices";

const indexTarget = async (salesPersonId) => {
  const url_modifiers = `/target/index/${salesPersonId}`;
  const url = Service_BASE_URL + url_modifiers;
  try {
    const res = await fetch(url, {
      headers: getAuthHeaders(),
    });
    const passData = await res.json();
    if (!res.ok) {
      throw new Error(passData?.error || "Failed to fetch targets");
    }
    return passData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "An unknown error occurred");
    }
  }
};

export { indexTarget };
