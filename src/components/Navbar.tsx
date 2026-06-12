"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Domů" },
  { href: "/tym", label: "Tým" },
  { href: "/zapasy", label: "Zápasy & Statistiky" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur border-b-4 border-pink">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-display text-3xl tracking-wide text-white"
          onClick={() => setOpen(false)}
        >
          🦝 <span className="text-pink">RACCOONS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-display text-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-pink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
          aria-label="Otevřít menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-2 px-4 pb-4 font-display text-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-pink transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
