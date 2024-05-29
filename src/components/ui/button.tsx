import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-noir text-primary-foreground shadow hover:bg-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-secondary hover:text-white",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-tertiary hover:text-white text-noir border border-primary",
        link: "text-primary underline-offset-4 hover:underline",
        cornerTr:
          "bg-white border-2 border-noir text-noir font-semibold shadow hover:border-secondary hover:text-secondary rounded-l-[17px] rounded-tr-[27px]",
        cornerTl:
          "bg-primary border-2 border-secondary text-primary-foreground font-semibold shadow hover:bg-noir hover:border-tertiary hover:text-primary-foreground rounded-r-[17px] rounded-tl-[27px]",
        btnPrimary:
          "bg-tertiary  border-t-4 border-primary text-primary-foreground font-semibold shadow hover:bg-noir hover:border-tertiary hover:border hover:text-primary-foreground",
        btnSecondary:
          "bg-white  border-t-4 border-primary text-primary font-semibold shadow hover:bg-noir hover:border-tertiary rounded-full hover:border-2 !p-5 !px-10  hover:text-primary-foreground",
        btnTertiary:
          "bg-noir  border-t-4 border-primary text-white font-semibold shadow hover:bg-secondary hover:border-noir rounded-full hover:border-2 !p-5 !px-10  hover:text-primary-foreground",
        SimplebtnPrimary:
          "bg-tertiary border-0 text-white hover:bg-primary !text-xs",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
