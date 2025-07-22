import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { indexTransactions } from "@/services/transactionServices";
import type { Transaction } from "@/utils/chartDataHandler";

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

import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ActionCell } from "../ActionCell";

export const createColumns = (
  onDeleted: () => void
): ColumnDef<Transaction>[] => [
  {
    accessorKey: "salesPersonName",
    header: "Salesperson Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("salesPersonName")}</div>
    ),
  },

  {
    accessorKey: "transactionDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Transaction Date
        <ArrowUpDown />
      </Button>
    ),
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
  {
    accessorKey: "salesAmount",
    header: () => <div className="text-right">Sales Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("salesAmount"));
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
      return <ActionCell row={row} onDeleted={onDeleted} />;
    },
  },
];

export function TransactionTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Transaction[]>([]);

  const { salesPersonId } = useParams();

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await indexTransactions(salesPersonId);
      const parsed: Transaction[] = response.data.map((t) => ({
        transactionId: t._id,
        salesPersonName: `${t.salesPersonId.firstName} ${t.salesPersonId.lastName}`,
        transactionDate: new Date(t.transactionDate),
        salesCharge: t.salesCharge,
        salesAmount: t.salesAmount,
        productType: t.productType,
      }));
      setData(parsed);
    } catch (error) {
      console.error("Error loading transactions", error);
    }
  }, [salesPersonId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const columns = useMemo(
    () => createColumns(fetchTransactions),
    [fetchTransactions]
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.transactionId,
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
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
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
  );
}
