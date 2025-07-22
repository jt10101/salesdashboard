import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { indexTransactions } from "@/services/transactionServices";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Transaction[] = [
  {
    id: "m5gr84i9",
    salesPersonName: "success",
    transactionDate: new Date(2024, 11, 25),
    salesCharge: 0.6,
    salesAmount: 100000,
    productType: "Bonds",
  },
  {
    id: "m5gr84i9",
    salesPersonName: "success",
    transactionDate: new Date(2024, 11, 25),
    salesCharge: 0.6,
    salesAmount: 100000,
    productType: "Bonds",
  },
  {
    id: "m5gr84i9",
    salesPersonName: "success",
    transactionDate: new Date(2024, 11, 25),
    salesCharge: 0.6,
    salesAmount: 100000,
    productType: "Bonds",
  },
  {
    id: "m5gr84i9",
    salesPersonName: "success",
    transactionDate: new Date(2024, 11, 25),
    salesCharge: 0.6,
    salesAmount: 100000,
    productType: "Bonds",
  },
  {
    id: "3u1reuv4",
    salesPersonName: "success",
    transactionDate: new Date(2024, 12, 25),
    salesCharge: 0.6,
    salesAmount: 100000,
    productType: "Bonds",
  },
  {
    id: "derv1ws0",
    salesPersonName: "processing",
    transactionDate: new Date(2024, 11, 27),
    salesCharge: 0.6,
    salesAmount: 100000,
    productType: "Bonds",
  },
  {
    id: "5kma53ae",
    salesPersonName: "success",
    transactionDate: new Date(2024, 11, 30),
    salesCharge: 0.6,
    salesAmount: 100000,
    productType: "Bonds",
  },
  {
    id: "bhqecj4p",
    salesPersonName: "failed",
    transactionDate: new Date(2024, 12, 30),
    salesCharge: 0.6,
    salesAmount: 100000,
    productType: "Bonds",
  },
];

export type Transaction = {
  id: string;
  salesPersonName: string;
  transactionDate: Date;
  salesCharge: number;
  salesAmount: number;
  productType: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "salesPersonName",
    header: "Salesperson Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("salesPersonName")}</div>
    ),
  },

  {
    accessorKey: "transactionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("transactionDate");
      const formatted = date.toLocaleDateString("en-SG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <div className="lowercase">{formatted}</div>;
    },
  },
  {
    accessorKey: "productType",
    header: "Product Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productType")}</div>
    ),
  },
  //   {
  //     accessorKey: "email",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Email
  //           <ArrowUpDown />
  //         </Button>
  //       );
  //     },
  //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  //   },
  {
    accessorKey: "salesAmount",
    header: () => <div className="text-right">Sales Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("salesAmount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "SGD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "salesCharge",
    header: () => <div className="text-right">Sales Charge</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("salesCharge"));

      // Format number to show percentage
      const formatted = new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TransactionTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { salesPersonId } = useParams();
  //   useEffect(() => {
  //     const getTransactions = async () => {
  //       try {
  //         // setLoading(true);
  //         const response = await indexTransactions(salesPersonId);
  //         const rawData = response.data;
  //         // const formattedData = transactionDataHandler(rawData);

  //         // setAllFormattedData(formattedData);
  //         // salesFigure(formattedData);
  //         // setAvailableYears(Object.keys(formattedData).sort().reverse());
  //         // setChartData(formattedData[currentYearStr] || []);
  //         // console.log(formattedData);
  //       } catch (error) {
  //         console.error("Error loading transactions", error);
  //       } finally {
  //         // setLoading(false);
  //       }
  //     };
  //     getTransactions();
  //   }, [refreshTrigger, salesPersonId, salesFigure]);
  // )

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
