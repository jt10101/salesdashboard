import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function SheetDemo({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Sales</SheetTitle>
          <SheetDescription>Made a sale? Add it here!</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="transactionDate">Sales Date</Label>
            <Input id="transactiondate" defaultValue="Today" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="salesamount">Sales Amount</Label>
            <Input id="salesamount" defaultValue="250000" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="salescharge">Sales Charge</Label>
            <Input id="salescharge" defaultValue="2%" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Input Sales Transaction</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
