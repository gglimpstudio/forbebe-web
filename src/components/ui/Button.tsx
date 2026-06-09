import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn, isExternalHref } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const variants: Record<Variant, string> = {
  primary: "border border-brand-primary bg-brand-primary text-text-inverse shadow-[0_10px_24px_rgba(30,88,74,0.18)] hover:border-green-dark hover:bg-green-dark hover:shadow-[0_14px_30px_rgba(18,58,50,0.22)]",
  secondary: "border border-brand-secondary bg-brand-secondary text-green-dark shadow-[0_10px_24px_rgba(200,191,163,0.18)] hover:border-beige-medium hover:bg-beige-medium",
  outline: "border border-brand-primary/35 bg-background-light/40 text-brand-primary shadow-[0_8px_20px_rgba(18,58,50,0.05)] hover:border-brand-primary hover:bg-background-main",
  ghost: "border border-transparent text-brand-primary hover:bg-background-soft",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-3.5 py-2 text-sm",
  md: "min-h-11 px-[1.125rem] py-2.5 text-sm sm:px-5",
  lg: "min-h-12 px-5 py-3 text-sm sm:min-h-[52px] sm:px-6 sm:text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full text-center font-semibold leading-tight transition duration-200 ease-out active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:active:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a className={classes} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
