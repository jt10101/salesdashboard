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
  productType: string;
};

type MonthlyData = {
  month: string;
  salesAmount: number;
  revenue: number;
};

export type YearlyGroupedData = Record<string, MonthlyData[]>;

const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();

const transactionDataHandler = (
  transactions: Transaction[]
): YearlyGroupedData => {
  let earliestYear = new Date().getFullYear();
  const yearMonthMap: Record<string, Record<string, MonthlyData>> = {};

  if (transactions.length > 0) {
    earliestYear = Math.min(
      ...transactions.map((tx) => Number(tx.transactionDate.slice(0, 4)))
    );
  }
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
    const yearStr = year.toString();
    grouped[yearStr] = [];

    const orderedMonthEntries = Object.entries(monthMap).sort(
      ([a], [b]) => Number(a) - Number(b)
    );

    orderedMonthEntries.forEach(([monthKey, monthName]) => {
      const monthIndex = Number(monthKey) - 1;
      if (year === currentYear && monthIndex > currentMonthIndex) return;

      if (!yearMonthMap[yearStr]) {
        yearMonthMap[yearStr] = {};
      }

      const monthData = yearMonthMap[yearStr][monthName] ?? {
        month: monthName,
        salesAmount: 0,
        revenue: 0,
      };

      grouped[yearStr].push(monthData);
    });
  }

  // Reverse map from month name to month number for sorting
  const monthNameToKey = Object.entries(monthMap).reduce((acc, [key, name]) => {
    acc[name] = key;
    return acc;
  }, {} as Record<string, string>);

  // Sort each year's monthly data by month number
  for (const year in grouped) {
    grouped[year].sort((a, b) => {
      const monthA = monthNameToKey[a.month] ?? "00";
      const monthB = monthNameToKey[b.month] ?? "00";
      return Number(monthA) - Number(monthB);
    });
  }

  return grouped;
};

const targetDataHandler = (
  targetData: { targetAmount: number }[],
  salesData: YearlyGroupedData
): number => {
  if (!targetData || targetData.length === 0) {
    console.warn("No target data provided");
    return 0;
  }
  const currentMonthTarget = targetData[0].targetAmount;
  const currentYearStr = currentYear.toString();
  const salesDataForYear = salesData[currentYearStr];

  if (!salesDataForYear) {
    console.warn(`No sales data found for year ${currentYearStr}`);
    return 0;
  }

  const currentMonthData = salesDataForYear[currentMonthIndex];

  if (!currentMonthData) {
    console.warn(
      `No sales data found for current month index ${currentMonthIndex}`
    );
    return 0;
  }

  const currentMonthRevenue = currentMonthData.revenue;

  if (currentMonthTarget === 0) return 0;

  const targetAttainment = (currentMonthRevenue / currentMonthTarget) * 360;
  return targetAttainment;
};

// const transactionTableHandler = (
//   transactions: Transaction[]
// ): YearlyGroupedData => {
//   let earliestYear = new Date().getFullYear();
//   const yearMonthMap: Record<string, Record<string, MonthlyData>> = {};

//   if (transactions.length > 0) {
//     earliestYear = Math.min(
//       ...transactions.map((tx) => Number(tx.transactionDate.slice(0, 4)))
//     );
//   }
//   for (const {
//     transactionDate,
//     salesAmount,
//     salesCharge,
//     productType,
//   } of transactions) {
//     if (!transactionDate) continue;

//     const year = transactionDate.slice(0, 4);
//     const monthKey = transactionDate.slice(5, 7);
//     const month = monthMap[monthKey];
//     if (!month) continue;

//     if (!yearMonthMap[year]) {
//       yearMonthMap[year] = {};
//     }
//     if (!yearMonthMap[year][month]) {
//       yearMonthMap[year][month] = { month, salesAmount: 0, revenue: 0 };
//     }

//     yearMonthMap[year][month].salesAmount += salesAmount;
//     yearMonthMap[year][month].revenue += salesAmount * salesCharge;
//   }

//   const grouped: YearlyGroupedData = {};

//   for (let year = earliestYear; year <= currentYear; year++) {
//     const yearStr = year.toString();
//     grouped[yearStr] = [];

//     const orderedMonthEntries = Object.entries(monthMap).sort(
//       ([a], [b]) => Number(a) - Number(b)
//     );

//     orderedMonthEntries.forEach(([monthKey, monthName]) => {
//       const monthIndex = Number(monthKey) - 1;
//       if (year === currentYear && monthIndex > currentMonthIndex) return;

//       if (!yearMonthMap[yearStr]) {
//         yearMonthMap[yearStr] = {};
//       }

//       const monthData = yearMonthMap[yearStr][monthName] ?? {
//         month: monthName,
//         salesAmount: 0,
//         revenue: 0,
//       };

//       grouped[yearStr].push(monthData);
//     });
//   }

//   // Reverse map from month name to month number for sorting
//   const monthNameToKey = Object.entries(monthMap).reduce((acc, [key, name]) => {
//     acc[name] = key;
//     return acc;
//   }, {} as Record<string, string>);

//   // Sort each year's monthly data by month number
//   for (const year in grouped) {
//     grouped[year].sort((a, b) => {
//       const monthA = monthNameToKey[a.month] ?? "00";
//       const monthB = monthNameToKey[b.month] ?? "00";
//       return Number(monthA) - Number(monthB);
//     });
//   }

//   return grouped;
// };

export { transactionDataHandler, targetDataHandler };
