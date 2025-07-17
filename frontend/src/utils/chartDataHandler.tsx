const monthMap: Record<string, string> = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

type Transaction = {
  transactionDate: string;
  salesAmount: number;
  salesCharge: number;
};

type MonthlyData = {
  month: string;
  salesAmount: number;
  revenue: number;
};

type YearlyGroupedData = Record<string, MonthlyData[]>;

const transactionDataHandler = (
  transactions: Transaction[]
): YearlyGroupedData => {
  const yearMonthMap: Record<string, Record<string, MonthlyData>> = {};

  let earliestYear = new Date().getFullYear();
  if (transactions.length > 0) {
    earliestYear = Math.min(
      ...transactions.map((tx) => Number(tx.transactionDate.slice(0, 4)))
    );
  }
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();

  for (const { transactionDate, salesAmount, salesCharge } of transactions) {
    if (!transactionDate) continue;

    const year = transactionDate.slice(0, 4);
    const monthKey = transactionDate.slice(5, 7);
    const month = monthMap[monthKey];
    if (!month) continue;

    if (!yearMonthMap[year]) {
      yearMonthMap[year] = {};
    }
    if (!yearMonthMap[year][month]) {
      yearMonthMap[year][month] = { month, salesAmount: 0, revenue: 0 };
    }

    yearMonthMap[year][month].salesAmount += salesAmount;
    yearMonthMap[year][month].revenue += salesAmount * salesCharge;
  }

  const grouped: YearlyGroupedData = {};

  for (let year = earliestYear; year <= currentYear; year++) {
    grouped[year] = [];

    Object.entries(monthMap).forEach(([monthKey, monthName], index) => {
      if (year === currentYear && index > currentMonthIndex) return;

      if (!yearMonthMap[year]) {
        yearMonthMap[year] = {};
      }

      const monthData = yearMonthMap[year][monthName] ?? {
        month: monthName,
        salesAmount: 0,
        revenue: 0,
      };

      grouped[year].push(monthData);
    });
  }

  return grouped;
};

export { transactionDataHandler };
