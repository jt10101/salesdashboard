import { SalesChart } from "@/components/Charts/SalesChart/SalesChart";
import { TargetChart } from "@/components/Charts/TargetChart/TargetChart";
const IndividualDashboard = () => {
  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      <SalesChart />
      <TargetChart />
    </div>
  );
};

export { IndividualDashboard };
