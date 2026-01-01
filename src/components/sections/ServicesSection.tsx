import { Camera, Video, Megaphone, Palette } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Photography",
    description: "Professional photography that captures the essence of your brand, products, and moments with stunning clarity.",
    features: ["Product Photography", "Portrait Sessions", "Event Coverage", "Brand Imagery"],
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Cinematic video editing that transforms raw footage into compelling visual narratives that resonate.",
    features: ["Commercial Edits", "Social Media Content", "Music Videos", "Documentary Style"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Strategic digital campaigns that amplify your reach and drive meaningful engagement with your audience.",
    features: ["Social Media Strategy", "Content Marketing", "Paid Advertising", "Analytics & Growth"],
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description: "End-to-end creative vision that ensures your brand stands out in a crowded digital landscape.",
    features: ["Brand Identity", "Visual Strategy", "Campaign Concepts", "Art Direction"],
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
            What I Do
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide">
            SERVICES
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-card border border-border rounded-lg p-8 md:p-10 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_60px_hsl(var(--primary)/0.1)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl md:text-4xl tracking-wide mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
