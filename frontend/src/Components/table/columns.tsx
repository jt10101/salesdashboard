import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { changeHierarchy } from "@/services/hierarchyServices";

export type Hierarchy = {
  salesPersonId: string;
  salesPersonName: string;
  supervisorId: string;
  supervisorName: string;
};

export const getColumns = (
  supervisorOptions: { id: string; name: string }[]
): ColumnDef<Hierarchy>[] => [
  {
    accessorKey: "salesPersonName",
    header: "Salesperson",
  },
  {
    accessorKey: "supervisorName",
    header: "Supervisor",
    cell: ({ row }) => {
      const currentSupervisorId = row.original.supervisorId;
      const salesPersonId = row.original.salesPersonId;

      const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSupervisorId = e.target.value;
        try {
          await changeHierarchy(newSupervisorId, salesPersonId);
          toast.success("Supervisor changed successfully");
        } catch (err) {
          toast.error(
            err instanceof Error ? err.message : "Failed to change supervisor"
          );
        }
      };

      return (
        <select
          value={currentSupervisorId}
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
    },
  },
];
