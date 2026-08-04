import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import MerchGrid from "@/components/MerchGrid";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";
import {
  IconArrowUpRight,
  IconInstagram,
  IconMail,
} from "@/components/Icons";
import { merchItems, plannedCategories } from "@/data/merch";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Obchod",
  description:
    "Klubový merch týmu Raccoons Hlinsko: mikiny, trika, čepice a samolepky s myvalem.",
};

export default function ObchodPage() {
  const hasItems = merchItems.length > 0;

  return (
    <>
      <PageHero
        eyebrow="Obchod"
        title={
          <>
            Klubový <span className="text-pink">merch</span>
          </>
        }
      />

      <SectionDivider from="dark" to="light" />

      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
        {hasItems ? (
          <MerchGrid items={merchItems} />
        ) : (
          <>
            <h2 className="display text-3xl text-chalk sm:text-4xl">
              Co se <span className="text-pink">chystá</span>
            </h2>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {plannedCategories.map((c, i) => (
                <Reveal as="li" key={c.name} delay={i * 60}>
                  <div className="card card-dashed relative flex h-full flex-col justify-between gap-8 p-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-6 -right-8 w-32 opacity-[0.05]"
                    >
                      <Logo className="w-full" />
                    </div>
                    <span className="cond relative inline-flex w-fit rounded-full border border-line px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                      Připravujeme
                    </span>
                    <div className="relative">
                      <h3 className="display text-2xl text-chalk">{c.name}</h3>
                      <p className="mt-1.5 text-sm text-muted">{c.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-14">
              <div className="card relative overflow-hidden p-8 sm:p-10">
                <div className="relative max-w-xl">
                  <h2 className="display text-2xl text-chalk sm:text-3xl">
                    Chceš vědět, až to bude?
                  </h2>
                  <p className="mt-3 text-muted">
                    Nejdřív to hodíme na Instagram, případně napiš na e-mail
                    a ozveme se.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {team.social.instagram && (
                      <a
                        href={team.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cond group inline-flex h-12 items-center gap-2.5 rounded-full bg-pink px-6 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-pink-soft"
                      >
                        <IconInstagram className="h-4 w-4" />
                        {team.social.instagramHandle}
                        <IconArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                    <a
                      href={`mailto:${team.contact.email}`}
                      className="cond inline-flex h-12 items-center gap-2.5 rounded-full border border-[var(--outline,rgb(255_255_255/0.25))] px-6 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-chalk transition-colors hover:border-pink hover:text-pink"
                    >
                      <IconMail className="h-4 w-4" />
                      Napsat e-mail
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </>
        )}
        </div>
      </section>
    </>
  );
}
