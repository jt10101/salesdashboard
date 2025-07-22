import { useAtom } from "jotai";
import { refreshTriggerAtom } from "@/contexts/refreshAtom";
import { salesFigureAtom } from "@/contexts/salesFigureAtom";
import type { YearlyGroupedData } from "@/utils/chartDataHandler";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { indexTransactions } from "@/services/transactionServices";
import { transactionDataHandler } from "@/utils/chartDataHandler";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "@/utils/loader";

export const description = "A multiple line chart";
const currentYearStr = new Date().getFullYear().toString();

const SalesChart = () => {
  const [refreshTrigger] = useAtom(refreshTriggerAtom);
  const [, salesFigure] = useAtom(salesFigureAtom);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(currentYearStr);
  const [chartData, setChartData] = useState([]);
  const [allFormattedData, setAllFormattedData] = useState<YearlyGroupedData>(
    {}
  );

  const [loading, setLoading] = useState(true);

  const chartConfig = {
    salesAmount: {
      label: "Sales Amount",
      color: "var(--chart-1)",
    },
    revenue: {
      label: "Revenue",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const { salesPersonId } = useParams();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);

        const response = await indexTransactions(salesPersonId);
        const rawData = response.data.map((tx) => ({
          ...tx,
          transactionDate: new Date(tx.transactionDate),
        }));
        const formattedData = transactionDataHandler(rawData);

        setAllFormattedData(formattedData);
        salesFigure(formattedData);
        setAvailableYears(Object.keys(formattedData).sort().reverse());
        setChartData(formattedData[currentYearStr] || []);
        // console.log(formattedData);
      } catch (error) {
        console.error("Error loading transactions", error);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, [refreshTrigger, salesPersonId, salesFigure]);

  useEffect(() => {
    if (allFormattedData[selectedYear]) {
      setChartData(allFormattedData[selectedYear]);
    }
  }, [selectedYear, allFormattedData]);

  const showLoader = loading || chartData.length === 0;

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Showing sales and revenue by month</CardDescription>
        </div>

        <Select
          value={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
        >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select year"
          >
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {availableYears.map((year) => (
              <SelectItem key={year} value={year} className="rounded-lg">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      {showLoader ? (
        <CardContent className="flex h-[250px] items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      ) : (
        <>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="salesAmount"
                  type="monotone"
                  stroke="var(--color-salesAmount)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="revenue"
                  type="monotone"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>

          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  Showing sales and revenue for {selectedYear}
                </div>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export { SalesChart };
