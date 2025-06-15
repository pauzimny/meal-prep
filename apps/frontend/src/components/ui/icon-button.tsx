import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface IconButtonProps extends Omit<ButtonProps, "size"> {
  size?: "icon" | "sm" | "md" | "lg";
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "icon", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "rounded-full",
          size === "icon" && "h-10 w-10 p-0",
          size === "sm" && "h-8 w-8 p-0",
          size === "md" && "h-10 w-10 p-0",
          size === "lg" && "h-12 w-12 p-0",
          className
        )}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };
