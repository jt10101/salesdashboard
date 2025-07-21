import { getColumns, Hierarchy } from "./columns";
import { DataTable } from "./data-table";
import { indexHierarchy, indexSupervisors } from "@/services/hierarchyServices";
import { useEffect, useState } from "react";

const RoleTable = () => {
  const [index, setIndex] = useState<Hierarchy[]>([]);
  const [supervisors, setSupervisors] = useState<string[]>([]);

  useEffect(() => {
    const getHierarchy = async () => {
      const response = await indexHierarchy();
      setIndex(response.data);
    };
    const getSupervisors = async () => {
      const response = await indexSupervisors();
      setSupervisors(response.data);
    };
    getHierarchy();
    getSupervisors();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={getColumns(supervisors)} data={index} />
    </div>
  );
};

export { RoleTable };
