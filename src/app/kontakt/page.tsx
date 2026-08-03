import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionDivider from "@/components/SectionDivider";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import {
  IconArrowUpRight,
  IconClock,
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
} from "@/components/Icons";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt na hobby hokejový tým Raccoons Hlinsko: e-mail, Instagram a kde hrajeme.",
};

export default function KontaktPage() {
  const channels = [
    {
      Icon: IconMail,
      label: "E-mail",
      value: team.contact.email,
      href: `mailto:${team.contact.email}`,
    },
    team.contact.phone
      ? {
          Icon: IconPhone,
          label: "Telefon",
          value: team.contact.phone,
          href: `tel:${team.contact.phone.replace(/\s/g, "")}`,
        }
      : null,
    team.social.instagram
      ? {
          Icon: IconInstagram,
          label: "Instagram",
          value: team.social.instagramHandle,
          href: team.social.instagram,
          external: true,
        }
      : null,
    team.social.facebook
      ? {
          Icon: IconFacebook,
          label: "Facebook",
          value: "Naše stránka",
          href: team.social.facebook,
          external: true,
        }
      : null,
  ].filter(Boolean) as {
    Icon: typeof IconMail;
    label: string;
    value: string;
    href: string;
    external?: boolean;
  }[];

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Ozvi se <span className="text-pink">nám</span>
          </>
        }
        lead="Domluva zápasu, merch nebo cokoliv jiného, napiš na e-mail nebo na Instagram."
      />

      <SectionDivider from="dark" to="light" />

      <section className="section-light">
        <div className="wrap py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-12">
          <Reveal>
            <ContactForm email={team.contact.email} />
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={60}>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {channels.map(({ Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="card card-hover group flex items-center gap-4 p-5"
                    >
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-pink transition-colors group-hover:border-pink">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0">
                        <span className="cond block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                          {label}
                        </span>
                        <span className="block truncate text-[0.95rem] text-chalk">
                          {value}
                        </span>
                      </span>
                      <IconArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pink" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="card relative overflow-hidden p-7">
                <p className="eyebrow relative text-pink">Kde hrajeme</p>

                <dl className="relative mt-6 space-y-5">
                  <div className="flex gap-3">
                    <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-pink" />
                    <div>
                      <dt className="cond text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Stadion
                      </dt>
                      <dd className="mt-1 text-[0.95rem] text-chalk">
                        {team.rink}
                        <span className="block text-muted">{team.city}</span>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-pink" />
                    <div>
                      <dt className="cond text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Trénink
                      </dt>
                      <dd className="mt-1 text-[0.95rem] text-chalk">
                        {team.trainingSlot}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
