import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-[#D5C9BC] bg-[#F0EDE8] px-3 py-2 text-sm text-[#1A1209] ring-offset-background placeholder:text-[#A89585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C46B3F]/20 focus-visible:border-[#C46B3F] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
