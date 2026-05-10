import { Suspense } from "react";
import {
  AudienceList,
  BenefitsGrid,
  FactorsSection,
  MidCtaBanner,
  ScienceSection,
} from "@/components/landing/ContentSections";
import { Hero, IntroBlocks } from "@/components/landing/Hero";
import { FloatingCta } from "@/components/landing/FloatingCta";
import {
  AboutSection,
  DecisionSection,
  GuaranteeSection,
  ProtocolSection,
  TrustSection,
  WarningSection,
  WhySection,
} from "@/components/landing/MoreSections";
import { Pricing } from "@/components/landing/Pricing";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Testimonials } from "@/components/landing/Testimonials";
import { Faq } from "@/components/landing/Faq";

export default function HomePage() {
  return (
    <>
      <main className="flex-1 pb-[calc(7rem+env(safe-area-inset-bottom,0px))]">
        <Hero />
        <IntroBlocks />
        <ScienceSection />
        <AudienceList />
        <FactorsSection />
        <BenefitsGrid />
        <MidCtaBanner />
        <Testimonials />
        <WhySection />
        <GuaranteeSection />
        <Suspense
          fallback={<div className="min-h-[36rem] w-full" aria-busy="true" />}
        >
          <Pricing />
        </Suspense>
        <ProtocolSection />
        <DecisionSection />
        <AboutSection />
        <WarningSection />
        <TrustSection />
        <Faq />
        <SiteFooter />
      </main>
      <FloatingCta />
    </>
  );
}
