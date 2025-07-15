import { useEffect } from "react";

const Dashboard = () => {
  const fetchAllUsers = async () => {
    try {
    } catch (error) {}
  };
  useEffect(() => {}, []);
  return <>Dashboard Page</>;
};

export { Dashboard };

// useEffect(() => {
//     const controller = new AbortController();

//     const fetchAllProducts = async () => {
//       try {
//         if (isOwner) {
//           // to prevent unnecessary fetching, jsut get from token/UserContext
//           setUserBasicProfile(user);
//           // console.log(user._id);
//         } else {
//           const fetchedUser = await showUserBasicProfile(userUsername);
//           // TODO refactor backend to get user data when obtaining oneProduct - avoid double fetching
//           setUserBasicProfile(fetchedUser.user);
//         }
//         const { product } = await getProducts(userUsername, null);
//         setAllProducts(product);
//         // console.log(product);
//         setPageStatus(PageStatusTypes.OK);
//       } catch (err) {
//         setPageStatus(PageStatusTypes.ERROR);
//         errorUtil(err);
//       }

//       return () => {
//         // Cleanup on unmount
//         controller.abort();
//       };
//     };
//     fetchAllProducts();
//   }, [userUsername, user, isOwner]);
