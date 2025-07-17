import { Loader2 } from "lucide-react";

export const Loader = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin mb-2" />
      <span className="text-sm">{text}</span>
    </div>
  );
};
