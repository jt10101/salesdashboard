import { Service_BASE_URL, Service_HEADER_isLoggedIn } from "./configServices";

const indexTarget = async () => {
  const url_modifiers = "/target/index";
  const url = Service_BASE_URL + url_modifiers;
  try {
    const res = await fetch(url, {
      headers: Service_HEADER_isLoggedIn,
    });
    const passData = await res.json();
    if (!res.ok) {
      throw new Error(passData?.error || "Failed to fetch targets");
    }
    return passData;
  } catch (err: any) {
    throw new Error(err.message || "An unknown error occurred");
  }
};

export { indexTarget };
