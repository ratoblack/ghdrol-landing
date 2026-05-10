import Image from "next/image";

export function ProtocolSection() {
  return (
    <section className="border-t border-white/10 bg-gh-surface py-16">
      <div className="container-page md:flex md:items-center md:gap-10">
        <div className="flex-1">
          <h2 className="font-display text-3xl uppercase text-gh-gold-bright sm:text-4xl">
            Protocolo de treinos exclusivo
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gh-muted sm:text-base">
            Planilha focada em hipertrofia, referências old school e adaptação ao
            Brasil — macetes para levar o treino ao próximo nível.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-gh-muted">
            <li>• Treino voltado a ganho de massa magra com controle de gordura</li>
            <li>• Técnicas usadas em preparação de atletas</li>
            <li>• Traduzida e adaptada ao seu dia a dia na academia</li>
          </ul>
          <p className="mt-4 text-xs text-gh-gold">
            * Enviado ao e-mail cadastrado após a compra confirmada.
          </p>
        </div>
        <div className="relative mx-auto mt-8 w-full max-w-md shrink-0 md:mt-0">
          <Image
            src="https://ghmuscle.com.br/wp-content/uploads/2023/08/planilha-treino.png"
            alt="Prévia do protocolo de treino Ghmuscle"
            width={600}
            height={600}
            className="rounded-lg border border-white/10 object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export function GuaranteeSection() {
  return (
    <section className="py-14">
      <div className="container-page rounded-2xl border border-gh-gold/40 bg-gradient-to-br from-gh-surface via-black to-gh-surface p-8 text-center">
        <h2 className="font-display text-3xl uppercase text-gh-gold-bright sm:text-4xl">
          Satisfação garantida
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gh-muted sm:text-base">
          Confiamos no protocolo: você tem garantia de satisfação conforme as
          condições divulgadas na oferta (60 dias). Consulte regras no checkout e
          no pós-venda.
        </p>
        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-white">
          Veja as condições no momento da compra — transparência total.
        </p>
      </div>
    </section>
  );
}

export function WhySection() {
  const bullets = [
    "Completo: foco em resultado sem depender de dezenas de frascos",
    "Uso orientado por rótulo e profissional de saúde quando necessário",
    "Compatível com rotina exigente de treino e recuperação",
    "Pensado para quem quer evolução consistente, não atalho milagroso",
  ];
  return (
    <section className="border-t border-white/10 py-14">
      <div className="container-page">
        <h2 className="text-center font-display text-3xl uppercase text-gh-gold sm:text-4xl">
          Por que escolher GHDROL?
        </h2>
        <p className="mt-2 text-center text-sm text-gh-muted">
          (se ainda precisa de motivos)
        </p>
        <ul className="mx-auto mt-8 max-w-2xl space-y-3">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-gh-muted"
            >
              <span className="text-gh-gold">★</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function DecisionSection() {
  return (
    <section className="border-t border-red-900/40 bg-gradient-to-b from-black to-red-950/30 py-14">
      <div className="container-page text-center">
        <h2 className="font-display text-3xl uppercase text-white sm:text-4xl">
          Agora você tem uma decisão
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gh-muted sm:text-base">
          Continuar na mesma ou aderir ao GHDROL com treino, nutrição e método —
          evoluindo com consistência em vez de desculpas.
        </p>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="py-14">
      <div className="container-page">
        <h2 className="font-display text-center text-3xl uppercase text-gh-gold sm:text-4xl">
          Conheça a Ghmuscle
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-gh-muted sm:text-base">
          Laboratório Ghmuscle trabalha com fórmulas diferenciadas e foco em
          performance humana — referência em produtos que conversam com quem
          treina forte e busca excelência sem gambiarra.
        </p>
      </div>
    </section>
  );
}

export function WarningSection() {
  return (
    <section className="border-y border-red-700/50 bg-red-950/20 py-12">
      <div className="container-page text-center">
        <h2 className="font-display text-3xl uppercase text-red-400">
          Atenção — proteja sua saúde
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gh-muted">
          GHDROL é fabricado pela GHMUSCLE e vendido no site oficial. Desconfie
          de anúncios e marketplaces não autorizados: garanta o original com
          nota e suporte.
        </p>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="py-14">
      <div className="container-page grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-gh-surface/60 p-6">
          <h3 className="font-display text-2xl uppercase text-gh-gold">
            Entrega
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gh-muted">
            Frete grátis para todo o Brasil. Após confirmação do pagamento, o
            rastreio é enviado ao e-mail cadastrado. Prazo médio de entrega conforme
            transportadora e região (até ~8 dias úteis em muitos casos).
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-gh-surface/60 p-6">
          <h3 className="font-display text-2xl uppercase text-gh-gold">
            Segurança na compra
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gh-muted">
            Pagamento processado com segurança pela{" "}
            <strong className="text-white">Pagou</strong>, com criptografia e
            fluxo moderno de checkout. Direitos do consumidor (CDC) preservados.
            Resultados variam de pessoa para pessoa.
          </p>
        </div>
      </div>
    </section>
  );
}
