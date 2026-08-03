import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { IconArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 rink-lines" />

      <div className="wrap relative flex min-h-[80svh] flex-col items-center justify-center py-32 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute w-[min(50vw,340px)] opacity-[0.09]"
        >
          <Logo className="w-full" />
        </div>

        <p className="display relative text-[clamp(5rem,20vw,13rem)] text-chalk">
          404
        </p>
        <p className="eyebrow relative mt-2 text-pink">Stránka nenalezena</p>
        <p className="relative mt-6 max-w-md text-muted">
          Tuhle adresu na webu nemáme. Zkus to přes menu nebo se vrať na
          úvodní stránku.
        </p>

        <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
          <Button
            href="/"
            size="lg"
            icon={
              <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            }
          >
            Zpátky domů
          </Button>
          <Button href="/tym" size="lg" variant="ghost">
            Soupiska
          </Button>
        </div>
      </div>
    </section>
  );
}
