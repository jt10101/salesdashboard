import { SalesChart } from "@/components/Charts/SalesChart/SalesChart";
// import { ChartLineInteractive } from "@/components/Charts/SalesChart/SalesChart2";
// import { ChartAreaInteractive } from "@/components/Charts/SalesChart/SalesChart3";
import { ChartArea } from "lucide-react";

const IndividualDashboard = () => {
  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      {/* <ChartLineInteractive /> */}
      {/* <ChartAreaInteractive /> */}
      <SalesChart />
    </div>
  );
};

export { IndividualDashboard };
