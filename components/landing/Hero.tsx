import Image from "next/image";
import { CtaButton } from "./CtaButton";
import { SectionTitle } from "./SectionTitle";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-gh-gold/30">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #c9a227 0%, transparent 45%), radial-gradient(circle at 80% 60%, #8b0000 0%, transparent 40%)",
        }}
      />
      <div className="container-page relative py-12 md:flex md:items-center md:gap-10 md:py-16">
        <div className="flex-1 text-center md:text-left">
          <p className="font-display text-3xl uppercase tracking-wide text-gh-gold sm:text-4xl">
            | GHDROL | OFICIAL |
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            A fórmula mais avançada para transformar o corpo de forma rápida
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm uppercase leading-relaxed text-gh-muted md:mx-0 md:text-base">
            GHDROL eleva o corpo à máxima performance física, íntima e hipertrofia muscular, com ganhos de massa e resultados visíveis em poucas semanas — conforme rotina e organismo.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-white/90 md:mx-0">
            Redefina seus limites e descubra por que o GHDROL age no que atrasa a evolução e potencializa o que importa no treino.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <CtaButton href="#oferta">Quero GHDROL agora</CtaButton>
          </div>
        </div>
        <div className="relative mx-auto mt-10 w-full max-w-sm shrink-0 md:mt-0 md:max-w-md">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-gh-gold/40 to-transparent blur-xl" />
          <Image
            src="https://ghmuscle.com.br/wp-content/uploads/2026/03/Corpo-1.png"
            alt="Resultados e performance com GHDROL"
            width={520}
            height={780}
            className="relative z-10 mx-auto h-auto w-full max-w-[280px] object-contain drop-shadow-2xl sm:max-w-[320px]"
            priority
            sizes="(max-width: 768px) 280px, 360px"
          />
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
