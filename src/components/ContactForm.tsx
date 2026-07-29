"use client";

import { useState, type FormEvent } from "react";
import { IconArrowRight, IconChevronDown, IconMail } from "./Icons";

const topics = [
  { value: "zapas", label: "Domluvit zápas" },
  { value: "merch", label: "Merch a obchod" },
  { value: "jine", label: "Něco jiného" },
];

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-white/[0.03] px-4 text-[0.95rem] text-chalk placeholder:text-muted transition-colors focus:border-pink focus:outline-none";

/**
 * Formulář bez backendu – poskládá zprávu a otevře ji v poštovním klientovi.
 * Až budete chtít odesílání na server, stačí vyměnit tělo handleSubmit.
 */
export default function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("jmeno") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const topic = String(data.get("tema") ?? "");
    const message = String(data.get("zprava") ?? "").trim();

    if (!name || !message) {
      setError("Vyplň prosím jméno a zprávu.");
      return;
    }

    const topicLabel =
      topics.find((t) => t.value === topic)?.label ?? "Zpráva z webu";

    const body = [
      message,
      "",
      "—",
      `Jméno: ${name}`,
      from ? `E-mail: ${from}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    setError("");
    setSent(true);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      `Raccoons – ${topicLabel}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  if (sent) {
    return (
      <div className="card flex flex-col items-start gap-4 p-8">
        <IconMail className="h-7 w-7 text-pink" />
        <p className="display text-2xl text-chalk">Otevřeli jsme ti poštu</p>
        <p className="text-sm leading-relaxed text-muted">
          Zpráva je předvyplněná – stačí ji odeslat. Kdyby se nic neotevřelo,
          napiš nám rovnou na{" "}
          <a
            href={`mailto:${email}`}
            className="link-underline text-chalk"
          >
            {email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="cond mt-2 cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-pink"
        >
          Napsat znovu
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="jmeno"
            className="cond mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted"
          >
            Jméno <span className="text-pink">*</span>
          </label>
          <input
            id="jmeno"
            name="jmeno"
            type="text"
            required
            autoComplete="name"
            placeholder="Jméno nebo název týmu"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="email"
            className="cond mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="abychom se ozvali"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="tema"
            className="cond mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted"
          >
            O co jde
          </label>
          <div className="relative">
            <select
              id="tema"
              name="tema"
              defaultValue="zapas"
              className={`${inputClass} cursor-pointer appearance-none pr-11`}
            >
              {topics.map((t) => (
                <option key={t.value} value={t.value} className="bg-surface">
                  {t.label}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="zprava"
            className="cond mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted"
          >
            Zpráva <span className="text-pink">*</span>
          </label>
          <textarea
            id="zprava"
            name="zprava"
            rows={5}
            required
            placeholder="Napiš, o co jde…"
            className="w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[0.95rem] leading-relaxed text-chalk placeholder:text-muted transition-colors focus:border-pink focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-5 text-sm text-pink">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="cond group mt-7 inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-pink text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-pink-soft sm:w-auto sm:px-9"
      >
        Odeslat zprávu
        <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Formulář nikam nic neukládá – jen otevře tvého poštovního klienta
        s předvyplněnou zprávou.
      </p>
    </form>
  );
}
