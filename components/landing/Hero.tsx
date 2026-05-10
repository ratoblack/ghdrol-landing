import Image from "next/image";
import { CtaButton } from "./CtaButton";
import { SectionTitle } from "./SectionTitle";

export function Hero() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden border-b border-gh-gold/30">
      {/* Foto do produto — full bleed, foco no frasco à direita em desktop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/ghdrol-produto.png"
          alt="GHDROL — frasco do suplemento"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%] sm:object-[58%_center] md:object-[62%_center] lg:object-[65%_center] md:scale-[1.02]"
        />
      </div>

      {/* Escurece o lado do texto + transparência para o produto respirar */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/65 to-black/85 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent"
        aria-hidden
      />

      {/* Halo amarelo (eco do glow da foto) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_70%_at_72%_55%,rgba(234,179,8,0.14),transparent_55%)] mix-blend-screen opacity-90 md:opacity-100"
        aria-hidden
      />

      {/* Vinheta nas bordas — aspecto “premium / hazard” contido */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_115%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="container-page relative z-10 flex min-h-[88svh] flex-col justify-center py-14 md:py-20">
        <div className="max-w-xl text-center md:max-w-2xl md:text-left">
          <p className="font-display text-3xl uppercase tracking-wide text-gh-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-4xl">
            | GHDROL | OFICIAL |
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.95)] sm:text-5xl lg:text-6xl">
            A fórmula mais avançada para transformar o corpo de forma rápida
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm uppercase leading-relaxed text-white/85 md:mx-0 md:text-base">
            GHDROL eleva o corpo à máxima performance física, íntima e hipertrofia muscular, com ganhos de massa e resultados visíveis em poucas semanas — conforme rotina e organismo.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-white drop-shadow-md md:mx-0">
            Redefina seus limites e descubra por que o GHDROL age no que atrasa a evolução e potencializa o que importa no treino.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <CtaButton href="#oferta">Quero GHDROL agora</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IntroBlocks() {
  return (
    <section className="py-14">
      <div className="container-page space-y-10">
        <SectionTitle as="h2" subtitle="Novidade no Brasil">
          Transformação em tempo recorde
        </SectionTitle>
        <div className="prose prose-invert mx-auto max-w-none text-center">
          <p className="text-gh-muted">
            Você está pronto para transformar seu corpo em tempo recorde? Conheça{" "}
            <strong className="text-white">GHDROL</strong>, a fórmula ultra
            concentrada que chegou para elevar performance, disposição e foco nos
            treinos. Prepare-se para redefinir seus limites.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-gh-surface/80 p-6">
            <h3 className="font-display text-2xl uppercase text-gh-gold">
              Resultado aparente em poucas semanas
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gh-muted">
              Nas primeiras semanas muitos usuários relatam mais força,
              disposição, pump e sensação de evolução nos treinos. Resultados
              dependem de organismo, sono, dieta e estímulo de treino.
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-gh-surface/80 p-6">
            <h3 className="font-display text-2xl uppercase text-gh-gold">
              Uso simples no dia a dia
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gh-muted">
              Tome 3 cápsulas por dia, pela manhã ou à tarde, todos os dias,
              salvo orientação profissional diferente. Leia sempre o rótulo.
            </p>
          </article>
        </div>
        <div className="flex justify-center">
          <CtaButton href="#oferta">Quero GHDROL agora</CtaButton>
        </div>
      </div>
    </section>
  );
}
