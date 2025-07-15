import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent } from "react";
import { toast } from "sonner";

export type Hierarchy = {
  salespersonid: string;
  firstname: string;
  lastname: string;
  email: string;
  supervisorid: string;
};

// Sample list of supervisor IDs for the dropdown options
const supervisorOptions = [
  { id: "sup1", name: "Alice Tan" },
  { id: "sup2", name: "Bob Lim" },
  { id: "sup3", name: "Cheryl Goh" },
];

export const columns: ColumnDef<Hierarchy>[] = [
  {
    accessorKey: "salespersonid",
    header: "Employee ID",
  },
  {
    header: "Name",
    accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    id: "name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "supervisorid",
    header: "Supervisor",
    cell: ({ row }) => {
      const currentValue = row.original.supervisorid;

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
