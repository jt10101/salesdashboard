import { Service_BASE_URL, getAuthHeaders } from "./configServices";

const addTransaction = async (data: object) => {
  const url_modifiers = "/transaction/add";
  const url = Service_BASE_URL + url_modifiers;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const passData = await res.json();
    if (!res.ok) {
      throw new Error(passData?.error || "Failed to add transaction");
    }
    return passData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const indexTransactions = async (salesPersonId) => {
  const url_modifiers = `/transaction/index/salesperson/${salesPersonId}`;
  const url = Service_BASE_URL + url_modifiers;
  try {
    const res = await fetch(url, {
      headers: getAuthHeaders(),
    });
    const passData = await res.json();
    if (!res.ok) {
      throw new Error(passData?.error || "Failed to fetch transactions");
    }
    return passData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const indexTeamTransactions = async () => {
  const url_modifiers = `/transaction/index/team`;
  const url = Service_BASE_URL + url_modifiers;
  try {
    const res = await fetch(url, {
      headers: getAuthHeaders(),
    });
    const passData = await res.json();
    if (!res.ok) {
      throw new Error(passData?.error || "Failed to fetch transactions");
    }
    return passData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const deleteTransaction = async (transactionId) => {
  const url_modifiers = `/transaction/${transactionId}`;
  const url = Service_BASE_URL + url_modifiers;
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const passData = await res.json();
    if (!res.ok) {
      throw new Error(passData?.error || "Failed to fetch transactions");
    }
    return passData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
// const indexTransactions = async () => {
//   const url_modifiers = `/transaction/index/`;
//   const url = Service_BASE_URL + url_modifiers;
//   try {
//     const res = await fetch(url, {
//       headers: getAuthHeaders(),
//     });
//     const passData = await res.json();
//     if (!res.ok) {
//       throw new Error(passData?.error || "Failed to fetch transactions");
//     }
//     return passData;
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw new Error(err.message);
//     } else {
//       throw new Error("An unknown error occurred");
//     }
//   }
// };

export {
  addTransaction,
  indexTransactions,
  deleteTransaction,
  indexTeamTransactions,
};
