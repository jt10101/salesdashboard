import { useAtom } from "jotai";
import { salesFigureAtom } from "@/contexts/salesFigureAtom";
import { refreshTriggerAtom } from "@/contexts/refreshAtom";
import { targetDataHandler } from "@/utils/chartDataHandler";
import { useParams } from "react-router";

// import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
// import { Loader } from "@/utils/loader";

import { useEffect, useState } from "react";
import { indexTarget } from "@/services/targetService";

export const description = "A radial chart with text";

const chartConfig = {
  target: {
    label: "target",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function TargetChart() {
  const [salesData] = useAtom(salesFigureAtom);
  const [refreshTrigger] = useAtom(refreshTriggerAtom);
  const [targetAttainment, setTargetAttainment] = useState<number>();
  const [, setLoading] = useState(true);

  const chartData = [
    {
      browser: "safari",
      target: (Math.round(targetAttainment ?? 0) / 360) * 100,
      fill: "var(--color-safari)",
    },
  ];
  const { salesPersonId } = useParams();

  useEffect(() => {
    const getTargets = async () => {
      try {
        setLoading(true);
        const response = await indexTarget(salesPersonId);
        const targetData = response.data;
        const returnData = targetDataHandler(targetData, salesData);
        setTargetAttainment(returnData);
        // setTarget(data);
        console.log(targetData);
      } catch (error) {
        console.error("Error loading targets", error);
      } finally {
        setLoading(false);
      }
    };
    getTargets();
  }, [salesData, refreshTrigger]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Target Attainment</CardTitle>
        <CardDescription>
          {new Date().toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}{" "}
          Data
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={targetAttainment}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="target" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].target.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Target Attainment
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
