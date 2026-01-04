import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Film,
  Palette,
  Sparkles,
  TrendingUp,
  Camera,
  Scissors,
  Wand2,
  PenTool,
  Monitor,
  Video,
  Share2,
  BarChart3,
} from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Video Editing",
    description:
      "Professional editing for films, commercials, YouTube content, and social media. Color grading, sound design, and seamless transitions.",
    features: ["Color Grading", "Sound Design", "Motion Graphics", "4K/8K Support"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Stunning visuals that capture attention. Logos, branding, social media graphics, print materials, and digital assets.",
    features: ["Brand Identity", "Social Graphics", "Print Design", "UI/UX Design"],
  },
  {
    icon: Sparkles,
    title: "VFX & Animation",
    description:
      "Bring imagination to life with cutting-edge visual effects, 3D animation, compositing, and motion tracking.",
    features: ["3D Animation", "Compositing", "Motion Tracking", "CGI Integration"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven strategies to grow your brand. SEO, social media management, paid advertising, and content marketing.",
    features: ["SEO Optimization", "Social Media", "PPC Campaigns", "Analytics"],
  },
];

const allServices = [
  { icon: Camera, name: "Cinematography" },
  { icon: Scissors, name: "Post Production" },
  { icon: Wand2, name: "Special Effects" },
  { icon: PenTool, name: "Illustration" },
  { icon: Monitor, name: "Web Design" },
  { icon: Video, name: "Motion Design" },
  { icon: Share2, name: "Social Strategy" },
  { icon: BarChart3, name: "Brand Growth" },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6">
            Our Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            SERVICES THAT <span className="text-gradient">ELEVATE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From concept to completion, we offer comprehensive creative solutions
            tailored to your unique vision and goals.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(43_74%_49%/0.1)]"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-display text-2xl mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Services Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {allServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-secondary/50 border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-300 cursor-default"
            >
              <service.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{service.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
