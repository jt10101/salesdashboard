import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent } from "react";
import { toast } from "sonner";

export type Hierarchy = {
  salesPersonId: string;
  salesPersonName: string;
  supervisorId: string;
  supervisorName: string;
};

// Sample list of supervisor IDs for the dropdown options
const supervisorOptions = [
  { id: "sup1", name: "Alice Tan" },
  { id: "sup2", name: "Bob Lim" },
  { id: "sup3", name: "Cheryl Goh" },
];

export const columns: ColumnDef<Hierarchy>[] = [
  {
    accessorKey: "salesPersonId",
    header: "Employee ID",
  },
  {
    accessorKey: "salesPersonName",
    header: "Employee Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "supervisorName",
    header: "Supervisor",
    cell: ({ row }) => {
      const currentValue = row.original.supervisorName;

      const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        const selectedSupervisor = supervisorOptions.find(
          (option) => option.id === newValue
        );

        const name = selectedSupervisor?.name || "Unknown";

        toast.success(`Supervisor changed to ${name}`);
      };

      return (
        <select
          value={currentValue}
          onChange={handleChange}
          className="border border-gray-300 rounded p-1"
        >
          {supervisorOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      );
    },
  },
];
