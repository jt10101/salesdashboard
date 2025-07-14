const publicService_BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;
const publicService_HEADER = {
  "Content-Type": "application/json",
};

// const fetchJson = async (url, methodStr = "GET", bodyData = null) => {
//   const options = {
//     method: methodStr,
//     headers: publicService_HEADER,
//   };

//   if (methodStr === "POST" || methodStr === "PUT") {
//     if (bodyData) {
//       options.body = JSON.stringify(bodyData);
//     } else {
//       throw new ApiError({
//         status: 405,
//         source: { pointer: "publicServices.js" },
//         title: "Method Not Allowed",
//         detail: "Need Body Data for this method.",
//       });
//     }
//   }
//   const res = await fetch(url, options);
//   const data = await res.json();

//   if (!res.ok) {
//     //   if (!res.ok && data.errors) {

//     throw ApiError.fromFetchResponses(data);
//   }
//   return data;
// };

// ----------- actual Services

const signIn = async (data: object) => {
  const url = `${publicService_BASE_URL}/public/sign-in`;

  try {
    const resData = await fetch(url, {
      method: "POST",
      headers: publicService_HEADER,
      body: JSON.stringify(data),
    });
    const passData = await resData.json();
    return passData;
  } catch (err) {
    // throw new ApiError(err);
    console.log(err);
  }
};

export { signIn };
