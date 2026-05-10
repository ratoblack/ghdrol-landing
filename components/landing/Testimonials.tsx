import Image from "next/image";
import { SectionTitle } from "./SectionTitle";

const PERFIS = [
  { src: "/testimonials/perfil-1.png", alt: "Depoimento — perfil de cliente" },
  { src: "/testimonials/perfil-2.png", alt: "Depoimento — perfil de cliente" },
  { src: "/testimonials/perfil-3.png", alt: "Depoimento — perfil de cliente" },
  { src: "/testimonials/perfil-4.png", alt: "Depoimento — perfil de cliente" },
  { src: "/testimonials/perfil-5.png", alt: "Depoimento — perfil de cliente" },
];

export function Testimonials() {
  return (
    <section className="border-t border-white/10 bg-black/40 py-12 sm:py-16">
      <div className="container-page">
        <SectionTitle as="h2" subtitle="Quem usa aprova">
          Depoimentos e resultados
        </SectionTitle>
        <p className="mx-auto mb-8 max-w-xl text-center text-sm text-gh-muted sm:mb-10 sm:max-w-2xl">
          Relatos de quem iniciou a transformação. Resultados variam conforme
          organismo, treino e dieta.
        </p>
        <div className="mx-auto grid max-w-4xl grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 sm:gap-10 lg:max-w-5xl lg:grid-cols-5">
          {PERFIS.map((p) => (
            <figure
              key={p.src}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gh-gold/50 shadow-[0_0_24px_rgba(201,162,39,0.2)] sm:h-28 sm:w-28 md:h-36 md:w-36">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 144px"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
