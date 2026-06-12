export default function Footer() {
  return (
    <footer className="border-t-4 border-pink bg-graphite mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="font-display text-2xl text-pink">🦝 RACCOONS</p>
        <p className="text-sm text-white/70">
          Hobby hokejový tým z lásky ke hře, pivu a pádům na led.
        </p>
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} Raccoons. Made for fun, not for money.
        </p>
      </div>
    </footer>
  );
}
