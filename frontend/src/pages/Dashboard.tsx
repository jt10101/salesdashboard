import { indexTeamTransactions } from "@/services/transactionServices";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    const getTransactions = async () => {
      try {
        // setLoading(true);

        const response = await indexTeamTransactions();
        // const rawData = response.data.map((tx) => ({
        //   ...tx,
        //   transactionDate: new Date(tx.transactionDate),
        // }));
        // const formattedData = transactionDataHandler(rawData);

        // setAllFormattedData(formattedData);
        // salesFigure(formattedData);
        // setAvailableYears(Object.keys(formattedData).sort().reverse());
        // setChartData(formattedData[currentYearStr] || []);
        console.log(response);
      } catch (error) {
        console.error("Error loading transactions", error);
        // } finally {
        //   setLoading(false);
      }
    };
    getTransactions();
  }, []);
  return <>Dashboard</>;
};

export { Dashboard };
