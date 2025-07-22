import { SalesChart } from "@/components/Charts/SalesChart/SalesChart";
import { TargetChart } from "@/components/Charts/TargetChart/TargetChart";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { TransactionTable } from "@/components/TransactionTable/TransactionTable";

import SplitText from "@/components/SplitText/SplitText";

const IndividualDashboard = () => {
  const { user } = useContext(UserContext);
  const salesPersonName = user.firstName.toUpperCase();

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      <SplitText
        text={`${salesPersonName}'S DASHBOARD`}
        className="text-2xl font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        // onLetterAnimationComplete={handleAnimationComplete}
      />
      <div className="space-y-8 mt-6">
        <SalesChart />
        <TargetChart />
        <TransactionTable />
      </div>
    </div>
  );
};

export { IndividualDashboard };
