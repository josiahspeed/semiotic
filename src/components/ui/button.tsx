import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[32px] text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-lg border border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:from-white/30 hover:to-white/20 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.4)] active:from-white/15 active:to-white/5",
        destructive: "bg-gradient-to-b from-red-500/20 to-red-600/10 backdrop-blur-lg border border-red-400/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:from-red-500/30 hover:to-red-600/20",
        outline: "bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/10 text-white/90 shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] hover:from-white/15 hover:to-white/10 hover:text-white",
        secondary: "bg-gradient-to-b from-gray-400/20 to-gray-500/10 backdrop-blur-lg border border-gray-300/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:from-gray-400/30 hover:to-gray-500/20",
        ghost: "backdrop-blur-sm hover:bg-white/10 hover:text-white text-white/80",
        link: "text-white/90 underline-offset-4 hover:underline hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
