"use client";

import { useState } from "react";

type Item = { q: string; a: string };

const FAQ_ITEMS: Item[] = [
  {
    q: "Porque não consigo ter resultados e como o GHDROL vai me ajudar?",
    a: "Quase 90% das pessoas que tentam criar músculos enfrentam limitações relacionadas a genética, testosterona e GH. O GHDROL foi pensado para atuar nesses fatores e acelerar a evolução quando o organismo demora a responder.",
  },
  {
    q: "Como funciona a entrega e segurança da compra?",
    a: "Compra segura com processamento via Pagou. Após o pagamento, você recebe nota e rastreio no e-mail. Frete grátis para todo o Brasil. Prazo de entrega de até 8 dias úteis conforme logística.",
  },
  {
    q: "Em quanto tempo vejo um resultado visível?",
    a: "Muitas pessoas notam mais disposição, força e pump nas primeiras semanas; resultados visíveis variam de acordo com treino, dieta e organismo.",
  },
  {
    q: "Qualquer pessoa pode tomar? É seguro?",
    a: "Indicado para maiores de 18 anos. Em caso de doenças, gravidez ou uso de medicamentos, consulte um profissional de saúde antes de usar qualquer suplemento.",
  },
  {
    q: "Qual o modo correto de usar?",
    a: "Utilizar 3 cápsulas por dia, pela manhã ou tarde, todos os dias, mesmo nos dias sem treino, salvo orientação diferente do rótulo ou profissional.",
  },
  {
    q: "Como funciona a garantia?",
    a: "Garantia de satisfação de 60 dias conforme comunicado na oferta. Também se aplicam o direito de arrependimento (CDC) e políticas do canal de compra.",
  },
  {
    q: "Quais substâncias ele possui?",
    a: "Tetraborato de sódio decahidratado, arginina, valina, lisina, óxido de magnésio, taurina, zinco bisglicinato, niacinamida, colecalciferol, cianocobalamina — conforme informação do fabricante no rótulo.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-white/10 bg-gh-surface py-16">
      <div className="container-page">
        <h2 className="font-display text-center text-4xl uppercase text-gh-gold-bright sm:text-5xl">
          Perguntas frequentes
        </h2>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-lg border border-white/10 bg-black/40">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="px-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-gh-text sm:text-lg"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="shrink-0 text-gh-gold">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen ? (
                  <p className="pb-4 text-sm leading-relaxed text-gh-muted sm:text-base">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
