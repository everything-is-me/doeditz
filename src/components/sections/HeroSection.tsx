import { Button } from "@/components/ui/button";
import { ArrowDown, Camera, Video, Megaphone } from "lucide-react";

export const HeroSection = () => {
  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] animate-pulse-glow animation-delay-400" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Camera className="absolute top-1/4 left-[15%] w-12 h-12 text-primary/30 animate-float" />
        <Video className="absolute top-1/3 right-[20%] w-10 h-10 text-primary/25 animate-float animation-delay-200" />
        <Megaphone className="absolute bottom-1/3 left-[20%] w-8 h-8 text-primary/20 animate-float animation-delay-400" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Tagline */}
          <div className="overflow-hidden mb-6">
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm md:text-base opacity-0 animate-text-reveal">
              Photographer • Video Editor • Digital Marketer
            </p>
          </div>

          {/* Main heading */}
          <div className="overflow-hidden mb-4">
            <h1 className="font-display text-7xl md:text-9xl lg:text-[12rem] leading-none tracking-wide opacity-0 animate-text-reveal animation-delay-200">
              DO<span className="text-gradient">EDITZ</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mb-12">
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto opacity-0 animate-text-reveal animation-delay-400">
              Crafting visual stories that captivate, engage, and convert. 
              Let's bring your vision to life.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-600">
            <Button variant="hero" size="xl" onClick={scrollToContact}>
              Start a Project
            </Button>
            <Button variant="heroOutline" size="xl" onClick={scrollToServices}>
              View Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up animation-delay-800">
        <button
          onClick={scrollToServices}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
