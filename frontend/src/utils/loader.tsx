import { Loader2 } from "lucide-react";

type LoaderProps = {
  text?: string;
  className?: string;
};

export const Loader = ({
  text = "Loading...",
  className = "",
}: LoaderProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 text-muted-foreground ${className}`}
    >
      <Loader2 className="h-6 w-6 animate-spin mb-2" />
      <span className="text-sm">{text}</span>
    </div>
  );
};
