import HeroSection from "@/components/hero-section";
import Features from "@/components/features-4";
import LogoCloud from "@/components/logo-cloud";
import CallToAction from "@/components/call-to-action";
import Pricing from "@/components/pricing";
import FooterSection from "@/components/footer";
import ContentSection from "@/components/content-1";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LogoCloud />
      <Features />
      <CallToAction />
      <Pricing />
      <ContentSection />
      <FooterSection />
    </div>
  );
}
