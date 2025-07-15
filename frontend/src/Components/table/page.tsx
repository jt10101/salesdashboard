import { columns, Hierarchy } from "./columns";
import { DataTable } from "./data-table";
import { indexHierarchy } from "@/services/hierarchyServices";
import { useEffect, useState } from "react";

const DemoPage = () => {
  const [index, setIndex] = useState<Hierarchy[]>([]);

  useEffect(() => {
    const getHierarchy = async () => {
      try {
        const response = await indexHierarchy();
        setIndex(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    getHierarchy();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={index} />
    </div>
  );
};

export { DemoPage };
