import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent } from "react";
import { toast } from "sonner";

export type Hierarchy = {
  salesPersonId: string;
  salesPersonName: string;
  supervisorId: string;
  supervisorName: string;
};

export const getColumns = (
  supervisorOptions: string[]
): ColumnDef<Hierarchy>[] => [
  {
    accessorKey: "salesPersonId",
    header: "Employee ID",
  },
  {
    accessorKey: "salesPersonName",
    header: "Employee Name",
  },
  {
    accessorKey: "supervisorName",
    header: "Supervisor",
    cell: ({ row }) => {
      const currentValue = row.original.supervisorName;

      const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;

        toast.success(`Supervisor changed to ${newValue}`);
      };

      return (
        <select
          value={currentValue}
          onChange={handleChange}
          className="border border-gray-300 rounded p-1"
        >
          {supervisorOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      );
    },
  },
];
