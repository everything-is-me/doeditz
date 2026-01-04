import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Lightbulb, Clapperboard, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Discovery",
    description:
      "We start with a deep dive into your vision, goals, and brand identity. Understanding your story is the first step to telling it right.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategy",
    description:
      "Our team crafts a tailored creative strategy, combining industry insights with innovative ideas to achieve maximum impact.",
  },
  {
    icon: Clapperboard,
    number: "03",
    title: "Production",
    description:
      "From filming to editing, design to VFX, we bring your project to life with meticulous attention to detail and cutting-edge techniques.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    description:
      "We deliver polished, ready-to-deploy content and support your launch with strategic marketing to ensure maximum reach.",
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
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
            How We Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            OUR CREATIVE <span className="text-gradient">PROCESS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A proven methodology that transforms ideas into impactful visual
            experiences.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 h-full">
                  {/* Step Number */}
                  <div className="font-display text-6xl text-primary/20 mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="font-display text-2xl mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector dot for desktop */}
                <div className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary animate-glow" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
