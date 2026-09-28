"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { IconArrowRight, IconClose, IconMenu } from "./Icons";

const links = [
  { href: "/", label: "Domů" },
  { href: "/tym", label: "Soupiska" },
  { href: "/zapasy", label: "Zápasy" },
  { href: "/tabulka", label: "Tabulka" },
  { href: "/bodovani", label: "Bodování" },
  { href: "/galerie", label: "Galerie" },
  { href: "/obchod", label: "Obchod" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zamknout scroll a umožnit zavření Escapem
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#obsah"
        className="cond sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-pink focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:uppercase focus:tracking-widest focus:text-ink"
      >
        Přeskočit na obsah
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "border-b border-line bg-ink/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`wrap flex items-center justify-between transition-[height] duration-300 ${
            scrolled ? "h-16" : "h-20 sm:h-24"
          }`}
        >
          <Link
            href="/"
            onClick={(e) => {
              setOpen(false);
              // Na domovské stránce Next.js nikam nenaviguje, tak vyjedeme nahoru sami
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-3"
            aria-label="Raccoons, domovská stránka"
          >
            <Logo
              priority
              className={`w-auto transition-[height] duration-300 ${
                scrolled ? "h-8" : "h-9 sm:h-11"
              }`}
            />
            <span className="display text-2xl leading-none text-chalk transition-colors group-hover:text-pink sm:text-[1.75rem]">
              Raccoons
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Hlavní navigace"
          >
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`cond relative rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors xl:px-4 xl:tracking-[0.16em] ${
                    active ? "text-pink" : "text-muted hover:text-chalk"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-pink transition-transform duration-300 xl:inset-x-4 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/kontakt"
              className="cond group hidden h-10 items-center gap-2 rounded-full bg-pink px-5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-pink-soft lg:inline-flex"
            >
              Kontakt
              <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobilni-menu"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-chalk transition-colors hover:border-pink hover:text-pink lg:hidden"
            >
              {open ? (
                <IconClose className="h-5 w-5" />
              ) : (
                <IconMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobilní menu */}
      <div
        id="mobilni-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink/[0.97] backdrop-blur-2xl lg:hidden"
      >
        <div className="wrap flex h-full flex-col justify-between pb-10 pt-28">
          <nav className="flex flex-col" aria-label="Mobilní navigace">
            {links.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`display flex items-baseline gap-4 border-b border-line py-4 text-4xl transition-colors sm:text-5xl ${
                    active ? "text-pink" : "text-chalk hover:text-pink"
                  }`}
                >
                  <span className="cond text-xs font-semibold tracking-[0.2em] text-muted">
                    0{i + 1}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3">
            <Link
              href="/kontakt"
              onClick={() => setOpen(false)}
              className="cond inline-flex h-14 items-center justify-center gap-2 rounded-full bg-pink text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            >
              Kontakt
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <p className="cond text-center text-xs uppercase tracking-[0.24em] text-muted">
              Raccoons Hlinsko
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
