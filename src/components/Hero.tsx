import Button from "./Button";
import Logo from "./Logo";
import { BrandBars } from "./SectionDivider";
import { IconArrowRight, IconInstagram } from "./Icons";
import { team } from "@/data/team";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 rink-lines" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink"
      />

      <div className="wrap relative pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Logo staticky, bez poskakování */}
          <div className="relative order-1 mx-auto w-full max-w-[250px] sm:max-w-[310px] lg:order-2 lg:max-w-[430px]">
            <Logo variant="full" priority className="w-full" />
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1">
            <h1>
              <span className="display block text-[clamp(3.5rem,11vw,8.5rem)] text-chalk">
                Raccoons
              </span>
              <span className="display stroke-text mt-6 block text-[clamp(1.5rem,4.6vw,3.4rem)] tracking-[0.16em] sm:mt-8">
                Hlinsko
              </span>
            </h1>

            <BrandBars className="mt-10" />

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/tabulka"
                size="lg"
                icon={
                  <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                }
              >
                Tabulka
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
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--outline,rgb(255_255_255/0.25))] text-chalk transition-colors hover:border-pink hover:text-pink"
                >
                  <IconInstagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
