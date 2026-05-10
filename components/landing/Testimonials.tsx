import Image from "next/image";
import { SectionTitle } from "./SectionTitle";

const IMAGES = [
  {
    src: "https://ghmuscle.com.br/wp-content/uploads/2023/03/PROVA-1-1-e1679007196210.jpg",
    alt: "Depoimento 1",
  },
  {
    src: "https://ghmuscle.com.br/wp-content/uploads/2023/03/PROVA-3-e1679001899204.jpg",
    alt: "Depoimento 2",
  },
  {
    src: "https://ghmuscle.com.br/wp-content/uploads/2023/03/PROVA-4-e1679002083694.jpg",
    alt: "Depoimento 3",
  },
  {
    src: "https://ghmuscle.com.br/wp-content/uploads/2023/03/PROVA-5-e1679002115291.jpg",
    alt: "Depoimento 4",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-white/10 bg-black/40 py-16">
      <div className="container-page">
        <SectionTitle as="h2" subtitle="Quem usa aprova">
          Depoimentos e resultados
        </SectionTitle>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-gh-muted">
          Relatos de quem iniciou a transformação. Resultados variam conforme
          organismo, treino e dieta.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IMAGES.map((img) => (
            <div
              key={img.src}
              className="relative overflow-hidden rounded-lg border border-white/10"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={500}
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
