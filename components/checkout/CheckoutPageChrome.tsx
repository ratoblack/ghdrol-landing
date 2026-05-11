import Image from "next/image";
import Link from "next/link";
import type { Offer } from "@/lib/offers";

type Props = {
  offer: Offer;
  children: React.ReactNode;
};

/**
 * Layout tipo página de checkout da referência ghmuscle.com.br/ghdrol —
 * destaque da arte do pote + coluna de resumo + formulário Pagou.
 */
export function CheckoutPageChrome({ offer, children }: Props) {
  return (
    <main className="min-h-screen bg-gh-bg pb-16 text-gh-text">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-md">
        <div className="container-page flex max-w-6xl flex-wrap items-center justify-between gap-3 py-3 sm:py-4">
          <Link
            href="/"
            className="font-display text-xl tracking-wide text-gh-gold-bright sm:text-2xl"
          >
            GHDROL
          </Link>
          <Link
            href="/#oferta"
            className="text-xs uppercase tracking-wide text-gh-muted transition hover:text-white sm:text-sm"
          >
            ← Escolher outra oferta
          </Link>
        </div>
      </header>

      <div className="container-page max-w-6xl py-8 sm:py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] xl:grid-cols-[1.15fr_minmax(0,24rem)] xl:gap-14">
          <section className="space-y-6">
            <div
              className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b from-gh-surface via-black/50 to-black p-6 sm:p-8 lg:p-10 ${
                offer.badge === "mais vendido!"
                  ? "border-gh-gold/50 shadow-[0_0_48px_rgba(201,162,39,0.18)]"
                  : "border-white/10"
              }`}
            >
              {offer.badge ? (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-gh-red px-3 py-1 text-xs font-bold uppercase text-white shadow-lg">
                  {offer.badge}
                </span>
              ) : null}

              <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
                <div className="relative mx-auto aspect-square w-full max-w-[260px] shrink-0 sm:max-w-[300px] lg:mx-0 lg:max-w-[320px]">
                  <Image
                    src={offer.image}
                    alt={offer.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 320px"
                    className="object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
                  />
                </div>

                <div className="min-w-0 flex-1 space-y-4 text-center lg:text-left">
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-gh-gold">
                    Checkout seguro · Pix
                  </p>
                  <h1 className="font-display text-4xl uppercase leading-none text-white sm:text-5xl">
                    {offer.label}
                  </h1>
                  <p className="text-sm leading-relaxed text-gh-muted">
                    Mesmo kit da promoção na página oficial. Frete grátis para
                    todo o Brasil e processamento seguro via{" "}
                    <strong className="text-white/90">Pagou</strong>.
                  </p>
                  <ul className="mx-auto inline-block space-y-2 text-left text-sm text-gh-muted lg:mx-0">
                    <li className="flex gap-2">
                      <span className="text-gh-gold">✓</span>
                      À vista no Pix no valor indicado ao lado
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gh-gold">✓</span>
                      Garantia de satisfação conforme comunicado na oferta
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gh-gold">✓</span>
                      Rastreio e confirmação no e-mail após o pagamento
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gh-muted/90 lg:text-left">
              Laboratório Ghmuscle · CNPJ 43.874.370/0001-60 · Produto original
              vendido apenas por canais autorizados.
            </p>
          </section>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-gh-gold/35 bg-gradient-to-b from-gh-surface/95 to-black/90 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.45)] sm:p-7">
              <h2 className="border-b border-white/10 pb-4 text-center font-display text-xl uppercase tracking-wide text-white">
                Resumo do pedido
              </h2>

              <div className="mt-5 space-y-1 text-center">
                <p className="text-[11px] uppercase tracking-wider text-gh-muted">
                  Promoção por tempo limitado
                </p>
                <p className="text-sm text-gh-muted">
                  De{" "}
                  <span className="line-through opacity-80">
                    {offer.crossedPrice}
                  </span>
                </p>
                <p className="mt-3 text-xs uppercase tracking-wide text-gh-muted">
                  Parcelamento referência 12x
                </p>
                <p className="font-display text-4xl text-gh-gold-bright sm:text-5xl">
                  {offer.installments}
                </p>
                <p className="mt-2 text-sm text-white">
                  ou{" "}
                  <strong className="text-gh-gold-bright">{offer.cashPrice}</strong>{" "}
                  à vista no Pix
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gh-gold">
                  Frete grátis · Todo o Brasil
                </p>
              </div>

              <div className="mt-6">{children}</div>
            </div>
          </aside>
        </div>

        <Link
          href="/#oferta"
          className="mt-10 block text-center text-sm text-gh-gold underline underline-offset-4 hover:text-gh-gold-bright"
        >
          ← Voltar para kits na página inicial
        </Link>
      </div>
    </main>
  );
}
