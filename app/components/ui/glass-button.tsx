"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type GlassButtonProps = {
  children: ReactNode;
  variant?: "default" | "icon" | "dark";
  href?: string;
  className?: string;
} & (
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
);

export default function GlassButton({
  children,
  variant = "default",
  className = "",
  href,
  ...props
}: GlassButtonProps) {
  const baseStyles = `
    relative transition-transform duration-300 overflow-hidden inline-flex items-center justify-center
    will-change-transform transform-gpu backface-hidden rounded-full backdrop-blur-md
    scale-100 hover:scale-[1.03] active:scale-[0.96]
  `;

  const variantStyles = {
    default: `px-6 py-3 font-medium
      bg-[rgba(246,246,246,0.70)] dark:bg-[rgba(40,40,45,0.70)]
      border border-white/50 dark:border-white/20
      shadow-[inset_0_0_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.06)]
      dark:shadow-[inset_0_0_2px_rgba(255,255,255,0.04),0_2px_8px_rgba(0,0,0,0.2)]
      text-neutral-700 dark:text-neutral-300`,
    icon: `p-3
      bg-[rgba(246,246,246,0.70)] dark:bg-[rgba(40,40,45,0.70)]
      border border-white/50 dark:border-white/20
      shadow-[inset_0_0_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.06)]
      dark:shadow-[inset_0_0_2px_rgba(255,255,255,0.04),0_2px_8px_rgba(0,0,0,0.2)]`,
    dark: `px-6 py-3 font-medium
      bg-[#222] dark:bg-[#f5f5f5]
      border border-[#444] dark:border-[#e5e5e5]
      shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.04)]
      dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.08)]
      text-white dark:text-neutral-900`,
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const gradientStyles = variant === "dark"
    ? "bg-gradient-to-b from-white/10 dark:from-black/[0.06] to-transparent"
    : "bg-gradient-to-b from-white/30 dark:from-white/10 to-transparent";

  const content = (
    <>
      <span className={`absolute inset-0 pointer-events-none ${gradientStyles}`} />
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );
 
  if (href) {
    return (
      <a href={href} className={combinedClassName}  {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClassName}  {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
