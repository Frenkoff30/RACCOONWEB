import type { SVGProps } from "react";

/* Tahové ikony ve stylu Lucide – jednotný viewBox 24×24, stroke 1.75. */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Base>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </Base>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17 17 7M7 7h10v10" />
    </Base>
  );
}

export function IconArrowDown(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </Base>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m15 18-6-6 6-6" />
    </Base>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m9 18 6-6-6-6" />
    </Base>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" />
    </Base>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Base>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Base>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-9.1 5.8a2 2 0 0 1-1.8 0L2 7" />
    </Base>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6A2 2 0 0 1 22 16.9Z" />
    </Base>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Base>
  );
}

export function IconFacebook(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Base>
  );
}

export function IconTrophy(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16" />
      <path d="M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </Base>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </Base>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </Base>
  );
}

export function IconCamera(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14.5 4h-5L7.5 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5z" />
      <circle cx="12" cy="13" r="3.2" />
    </Base>
  );
}

export function IconHome(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m3 9.5 9-7 9 7V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9.5 22v-8h5v8" />
    </Base>
  );
}

export function IconAway(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" />
      <path d="M9.5 9h5" />
    </Base>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

/** Puk – vlastní tvar, v Lucide není. */
export function IconPuck(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 5c4.4 0 8 1.5 8 3.4v7.2c0 1.9-3.6 3.4-8 3.4s-8-1.5-8-3.4V8.4C4 6.5 7.6 5 12 5Zm0 1.8c-3.5 0-6.2 1-6.2 1.6S8.5 10 12 10s6.2-1 6.2-1.6-2.7-1.6-6.2-1.6Z" />
    </svg>
  );
}

/** Zkřížené hokejky */
export function IconSticks(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 3.5 15.5 15a3 3 0 0 0 2.2.9H21" />
      <path d="M20 3.5 8.5 15a3 3 0 0 1-2.2.9H3" />
    </Base>
  );
}

