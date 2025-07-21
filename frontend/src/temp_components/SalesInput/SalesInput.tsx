import { useAtom } from "jotai";
import { refreshTriggerAtom } from "@/contexts/refreshAtom";

import { toast } from "sonner";
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
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { addTransaction } from "@/services/transactionServices";

const InputSalesSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [openCal, setOpenCal] = useState(false);
  const [, setRefreshTrigger] = useAtom(refreshTriggerAtom);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [salesAmount, setSalesAmount] = useState("");
  const [salesCharge, setSalesCharge] = useState("");
  const [productType, setProductType] = useState("");

  const handleSubmit = async () => {
    const data = {
      transactionDate: date,
      salesAmount,
      salesCharge,
      productType,
    };

    try {
      await addTransaction(data);
      toast.success("Sales Transaction successfully recorded");
      setRefreshTrigger((prev) => prev + 1);
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to record transaction");
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Sales</SheetTitle>
          <SheetDescription>Made a sale? Add it here!</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 max-w-sm">
          {" "}
          {/* added max-w-sm */}
          <div className="grid gap-3">
            <Label htmlFor="date" className="px-1">
              Transaction Date
            </Label>
            <Popover open={openCal} onOpenChange={setOpenCal}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpenCal(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="producttype" className="px-1">
              Product Type
            </Label>
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Stocks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Stocks">Stocks</SelectItem>
                <SelectItem value="Bonds">Bonds</SelectItem>
                <SelectItem value="Notes">Notes</SelectItem>
                <SelectItem value="Mutual Funds">Mutual Funds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="salesamount">Sales Amount</Label>
            <Input
              id="salesamount"
              placeholder="100000"
              className="w-full"
              value={salesAmount}
              onChange={(e) => setSalesAmount(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="salescharge">Sales Charge</Label>
            <Input
              id="salescharge"
              placeholder="between 0 - 100 in %"
              className="w-full"
              value={salesCharge}
              onChange={(e) => setSalesCharge(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            Input Sales Transaction
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { InputSalesSheet };
