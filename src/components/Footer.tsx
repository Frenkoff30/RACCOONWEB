import Link from "next/link";
import Logo from "./Logo";
import { team } from "@/data/team";
import { rosterSize } from "@/data/players";
import { IconFacebook, IconInstagram, IconMail } from "./Icons";

const navLinks = [
  { href: "/tym", label: "Soupiska" },
  { href: "/zapasy", label: "Zápasy" },
  { href: "/tabulka", label: "Tabulka a bodování" },
  { href: "/galerie", label: "Galerie" },
  { href: "/obchod", label: "Obchod" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    team.social.instagram && {
      href: team.social.instagram,
      label: "Instagram",
      Icon: IconInstagram,
    },
    team.social.facebook && {
      href: team.social.facebook,
      label: "Facebook",
      Icon: IconFacebook,
    },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof IconMail }[];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-ink-2">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-24 w-[420px] opacity-[0.035] sm:-right-8"
      >
        <Logo className="w-full" />
      </div>

      <div className="wrap relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <Logo className="h-11 w-auto" />
              <span className="display text-3xl leading-none text-chalk transition-colors group-hover:text-pink">
                Raccoons
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted">
              {team.claim}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-pink hover:text-pink"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
              <a
                href={`mailto:${team.contact.email}`}
                className="cond inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-pink hover:text-pink"
              >
                <IconMail className="h-4 w-4" />
                Napiš nám
              </a>
            </div>
          </div>

          <nav aria-label="Web">
            <p className="eyebrow text-muted">Web</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="cond text-lg text-chalk transition-colors hover:text-pink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-muted">Tým</p>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="cond text-xs uppercase tracking-[0.2em] text-muted">
                  Hráčů na soupisce
                </dt>
                <dd className="display mt-1 text-2xl text-chalk">
                  {rosterSize}
                </dd>
              </div>
              <div>
                <dt className="cond text-xs uppercase tracking-[0.2em] text-muted">
                  Trénink
                </dt>
                <dd className="mt-1 text-[0.95rem] text-chalk">
                  {team.trainingSlot}
                </dd>
              </div>
              <div>
                <dt className="cond text-xs uppercase tracking-[0.2em] text-muted">
                  Kde hrajeme
                </dt>
                <dd className="mt-1 text-[0.95rem] text-chalk">
                  {team.rink}
                  <span className="block text-muted">{team.city}</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-7">
          <p className="text-sm text-muted">
            © {year} {team.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
