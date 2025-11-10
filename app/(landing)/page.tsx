import HeroSection from "./hero-section";
import FeaturesOne from "./features-one";
import Testimonials from "./testimonials";
import CallToAction from "./call-to-action";
import FAQs from "./faqs";
import Footer from "./footer";
import CustomClerkPricing from "@/components/custom-clerk-pricing";
import { FadeUp } from "./fade-up";

import LogoCloud from "./logo-cloud";
import Features from "./features-4";
import Content from "./content-1";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LogoCloud />
      <Features/>
      <CallToAction/>

      {/* <FeaturesOne /> */}
      <FadeUp>
      <section className="bg-muted/50 py-16 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 mx-auto max-w-2xl space-y-6 text-center">
              <h1 className="text-center text-4xl font-semibold lg:text-5xl">Designed for everyone who grows through feedback.</h1>
              <p>At GetFeeds, we make it easy to collect, understand, and act on feedback — whether you’re a creator, a professional, or an enterprise team.</p>
          </div>
          <CustomClerkPricing />
        </div>
      </section>
      </FadeUp>
      {/* <Testimonials /> */}
      {/* <CallToAction /> */}
      {/* <FAQs /> */}
      <Content/>
      <Footer />
    </div>
  );
}
