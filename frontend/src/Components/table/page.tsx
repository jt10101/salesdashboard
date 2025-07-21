import { getColumns } from "./columns";
import type { Hierarchy } from "./columns";
import { DataTable } from "./data-table";
import { indexHierarchy } from "@/services/hierarchyServices";
import { useEffect, useState } from "react";

const RoleTable = () => {
  const [index, setIndex] = useState<Hierarchy[]>([]);
  const [supervisors, setSupervisors] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const getHierarchy = async () => {
      const response = await indexHierarchy();
      const hierarchyData = response.data;

      setIndex(hierarchyData);

      const uniqueSupervisorsMap = new Map();
      for (const entry of hierarchyData) {
        uniqueSupervisorsMap.set(entry.supervisorId, {
          id: entry.supervisorId,
          name: entry.supervisorName,
        });
      }

      const uniqueSupervisors = Array.from(uniqueSupervisorsMap.values());
      setSupervisors(uniqueSupervisors);
    };

    getHierarchy();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={getColumns(supervisors)} data={index} />
    </div>
  );
};

export { RoleTable };
