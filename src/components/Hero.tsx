import Button from "./Button";
import Logo from "./Logo";
import { FormStrip } from "./MatchRow";
import { IconArrowRight, IconInstagram } from "./Icons";
import { getForm, getSeasonStats } from "@/data/matches";
import { rosterSize } from "@/data/players";
import { ourPosition } from "@/data/standings";
import { team } from "@/data/team";

export default function Hero() {
  const stats = getSeasonStats();
  const form = getForm(5);
  const us = ourPosition();

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 rink-lines" />
      <div
        aria-hidden
        className="glow absolute -top-56 right-0 h-[620px] w-[820px] max-w-[130vw]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink"
      />

      <div className="wrap relative pb-8 pt-28 sm:pt-36 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Logo */}
          <div className="relative order-1 mx-auto w-full max-w-[250px] sm:max-w-[310px] lg:order-2 lg:max-w-[420px]">
            <div
              aria-hidden
              className="glow absolute inset-0 scale-[1.4] opacity-70"
            />
            <div
              aria-hidden
              className="ring absolute left-1/2 top-1/2 aspect-square w-[114%] -translate-x-1/2 -translate-y-1/2"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 aspect-square w-[136%] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="ring-dashed absolute inset-0" />
            </div>
            <div className="float-y relative">
              <Logo variant="full" priority className="w-full" />
            </div>
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow flex items-center gap-3 text-pink">
              <span aria-hidden className="h-px w-8 bg-pink/60" />
              {team.tagline} · {team.city}
            </p>

            <h1 className="mt-6">
              <span className="display block text-[clamp(3.5rem,11vw,8.5rem)] text-chalk">
                Raccoons
              </span>
              <span className="display stroke-text mt-1 block text-[clamp(1.5rem,4.6vw,3.4rem)] tracking-[0.16em]">
                Hlinsko
              </span>
            </h1>

            <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-muted">
              Soupiska, výsledky, tabulka a kanadské bodování na jednom místě.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/zapasy"
                size="lg"
                icon={
                  <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                }
              >
                Výsledky
              </Button>
              <Button href="/tym" size="lg" variant="ghost">
                Soupiska
              </Button>
              {team.social.instagram && (
                <a
                  href={team.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${team.social.instagramHandle}`}
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25 text-chalk transition-colors hover:border-pink hover:text-pink"
                >
                  <IconInstagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Přehledový pruh */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 lg:grid-cols-5">
          <Cell label="Zápasů" value={stats.played} />
          <Cell
            label="Bilance V–R–P"
            value={`${stats.wins}–${stats.draws}–${stats.losses}`}
          />
          <Cell
            label="Skóre"
            value={`${stats.goalsFor}:${stats.goalsAgainst}`}
            hint={stats.diff >= 0 ? `+${stats.diff}` : `${stats.diff}`}
          />
          {us ? (
            <Cell
              label="V tabulce"
              value={`${us.rank}.`}
              hint={`${us.points} bodů`}
            />
          ) : (
            <Cell label="Hráčů" value={rosterSize} />
          )}
          <Cell label="Forma">
            {form.length > 0 ? (
              <div className="mt-3">
                <FormStrip form={form} />
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">Zatím bez zápasu</p>
            )}
          </Cell>
        </div>
      </div>
    </section>
  );
}

function Cell({
  label,
  value,
  hint,
  children,
}: {
  label: string;
  value?: string | number;
  hint?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-ink px-5 py-6 sm:px-6">
      {value !== undefined && (
        <p className="display text-4xl text-chalk sm:text-[2.75rem]">{value}</p>
      )}
      <p
        className={`cond text-xs font-semibold uppercase tracking-[0.18em] text-muted ${
          value !== undefined ? "mt-2" : ""
        }`}
      >
        {label}
      </p>
      {hint && <p className="mt-1 text-xs text-pink">{hint}</p>}
      {children}
    </div>
  );
}
