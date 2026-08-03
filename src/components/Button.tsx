import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "quiet";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 cond font-semibold uppercase tracking-[0.14em] " +
  "rounded-full transition-colors duration-200 cursor-pointer select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-pink text-ink hover:bg-pink-soft",
  ghost:
    "border border-[var(--outline,rgb(255_255_255/0.25))] text-chalk hover:border-pink hover:text-pink",
  quiet: "text-muted hover:text-pink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[0.8125rem]",
  lg: "h-14 px-8 text-sm",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  external,
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
