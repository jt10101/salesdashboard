import { Service_BASE_URL, Service_HEADER } from "./configServices";

const signIn = async (data: object) => {
  const url_modifiers = "/public/sign-in"; // EDIT THIS PART
  const url = Service_BASE_URL + url_modifiers;

  try {
    const resData = await fetch(url, {
      method: "POST",
      headers: Service_HEADER,
      body: JSON.stringify(data),
    });
    const passData = await resData.json();
    return passData;
  } catch (err) {
    throw new Error(`Unable to log in: ${err}`);
  }
};

export { signIn };
