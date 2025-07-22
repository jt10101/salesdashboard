import { useSetAtom } from "jotai";
import { refreshRoleAtom } from "@/contexts/refreshRoleAtom";
import { toast } from "sonner";
import { changeHierarchy } from "@/services/hierarchyServices";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

export type Hierarchy = {
  salesPersonId: string;
  salesPersonName: string;
  supervisorId: string;
  supervisorName: string;
};

export const getColumns = (
  supervisorOptions: { id: string; name: string }[],
  refetch: () => void
): ColumnDef<Hierarchy>[] => {
  const SupervisorCell: React.FC<{ row: Hierarchy }> = ({ row }) => {
    const setRefresh = useSetAtom(refreshRoleAtom);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSupervisorId = e.target.value;
      try {
        await changeHierarchy(newSupervisorId, row.salesPersonId);
        toast.success("Supervisor changed successfully");
        setRefresh((prev) => prev + 1);
        refetch();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to change supervisor"
        );
      }
    };

    return (
      <select
        value={row.supervisorId}
        onChange={handleChange}
        className="border border-gray-300 rounded px-2 py-1"
      >
        {supervisorOptions.map((sup) => (
          <option key={sup.id} value={sup.id}>
            {sup.name}
          </option>
        ))}
      </select>
    );
  };

  return [
    {
      accessorKey: "salesPersonName",
      header: "Salesperson",
    },
    {
      accessorKey: "supervisorName",
      header: "Supervisor",
      cell: ({ row }) => <SupervisorCell row={row.original} />,
    },
  ];
};
