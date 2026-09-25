import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function buttonStyles(variant: ButtonVariant = "primary") {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" && "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:bg-primary/90",
    variant === "secondary" && "border border-border bg-secondary text-secondary-foreground hover:border-primary/40 hover:bg-accent",
    variant === "ghost" && "text-muted-foreground hover:bg-accent hover:text-foreground",
  );
}

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button type={type} className={cn(buttonStyles(variant), className)} {...props} />;
}