const saveTokenToLocalStorage = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return null;
  }
};

const getInfoFromToken = (token: string) => {
  if (token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      localStorage.removeItem("token");
      console.log(err);
    }
  } else {
    // throw new ApiError({
    //   status: 404,
    //   source: { pointer: "Token" },
    //   title: "Unauthorized",
    //   detail: "No user details obtained",
    // });
  }
};

export { saveTokenToLocalStorage, getTokenFromLocalStorage, getInfoFromToken };
