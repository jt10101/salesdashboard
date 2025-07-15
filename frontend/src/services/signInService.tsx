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
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Message:", err.message);
    } else {
      console.error("Unknown error", err);
    }
  }
};

export { signIn };
