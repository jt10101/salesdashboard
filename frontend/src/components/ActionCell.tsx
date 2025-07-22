import { useAtom } from "jotai";
import { deleteTransaction } from "@/services/transactionServices";
import { deleteDialogAtom } from "@/contexts/dialogAtom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { Row } from "@tanstack/react-table";
import type { Transaction } from "@/utils/chartDataHandler";

type Props = {
  row: Row<Transaction>;
  onDeleted: () => void;
};

export function ActionCell({ row, onDeleted }: Props) {
  const { transactionId } = row.original;
  const [openDialogId, setOpenDialogId] = useAtom(deleteDialogAtom);

  const isOpen = openDialogId === transactionId;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log("Edit clicked")}>
            Edit Transaction
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDialogId(transactionId ?? null)}
          >
            Delete Transaction
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setOpenDialogId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialogId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await deleteTransaction(transactionId);
                  setOpenDialogId(null);
                  onDeleted();
                } catch (error) {
                  console.error("Failed to delete", error);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
