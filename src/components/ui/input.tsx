import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-transparent focus-visible:outline-none transition-all duration-200",
        className
      )}
      {...props}
    />
  );
}

export { Input };
