import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/2/Navbar";
import { HeroSection } from "@/components/2/HeroSection";
import { ServicesSection } from "@/components/2/ServicesSection";
import { PortfolioSection } from "@/components/2/PortfolioSection";
import { ProcessSection } from "@/components/2/ProcessSection";
import { PricingSection } from "@/components/2/PricingSection";
import { TestimonialsSection } from "@/components/2/TestimonialsSection";
import { ContactSection } from "@/components/2/ContactSection";
import { Footer } from "@/components/2/Footer";

const Index2 = () => {
  return (
    <>
      <Helmet>
        <title>DoEditz - Premium Video Editing, VFX & Digital Marketing Studio</title>
        <meta
          name="description"
          content="DoEditz is a premium creative studio specializing in cinematic video editing, stunning VFX, graphic design, and digital marketing. Transform your vision into visual masterpieces."
        />
        <meta
          name="keywords"
          content="video editing, VFX, visual effects, graphic design, digital marketing, video production, motion graphics, brand video, content creation"
        />
      </Helmet>

      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index2;
