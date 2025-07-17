import { useEffect, useState } from "react";
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A multiple line chart";

const SalesChart = () => {
  const currentYearStr = new Date().getFullYear().toString();
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(currentYearStr);
  const [chartData, setChartData] = useState([]);
  const [allFormattedData, setAllFormattedData] = useState<
    Record<string, any[]>
  >({});

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

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await indexTransactions();
        const rawData = response.data;
        const formattedData = transactionDataHandler(rawData);

        setAllFormattedData(formattedData);
        setAvailableYears(Object.keys(formattedData).sort().reverse());
        setChartData(formattedData[currentYearStr] || []);
        console.log(formattedData);
      } catch (error) {
        console.error("Error loading transactions", error);
      }
    };
    getTransactions();
  }, []);

  useEffect(() => {
    if (allFormattedData[selectedYear]) {
      setChartData(allFormattedData[selectedYear]);
    }
  }, [selectedYear, allFormattedData]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Showing sales and revenue by month</CardDescription>
        </div>

        {/* Year selector */}
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

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing sales and revenue for {selectedYear}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export { SalesChart };
