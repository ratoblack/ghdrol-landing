import Link from "next/link";

export function FloatingCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gh-gold/40 bg-black/95 px-4 py-3 shadow-[0_-8px_32px_rgba(0,0,0,0.6)] backdrop-blur md:py-4">
      <div className="container-page flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-center text-sm font-medium text-white sm:text-left">
          Adquira o seu agora!
        </p>
        <Link
          href="#oferta"
          className="inline-flex w-full items-center justify-center rounded-md bg-gradient-to-b from-gh-gold-bright to-gh-gold px-8 py-3 text-center text-sm font-bold uppercase tracking-wide text-black shadow-lg transition hover:brightness-110 sm:w-auto"
        >
          Comprar agora
        </Link>
      </div>
    </div>
  );
}
