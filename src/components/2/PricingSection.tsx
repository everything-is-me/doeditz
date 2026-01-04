import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Starter",
    price: "$499",
    period: "per project",
    description: "Perfect for small projects and content creators",
    features: [
      "Up to 5 min video editing",
      "Basic color correction",
      "2 revision rounds",
      "Social media formats",
      "5-day delivery",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$1,499",
    period: "per project",
    description: "Ideal for businesses and serious creators",
    features: [
      "Up to 15 min video editing",
      "Advanced color grading",
      "Motion graphics included",
      "Unlimited revisions",
      "Priority support",
      "3-day delivery",
      "Sound design & mixing",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "For large-scale productions and agencies",
    features: [
      "Unlimited video length",
      "Full VFX integration",
      "Dedicated project manager",
      "Custom animations",
      "24/7 priority support",
      "Same-day revisions",
      "Complete marketing suite",
      "White-label options",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6">
            Investment
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            PRICING <span className="text-gradient">PACKAGES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Transparent pricing for every scale of project. Get the quality you
            deserve at a price that works for you.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border transition-all duration-500 ${
                pkg.popular
                  ? "bg-gradient-to-b from-primary/10 to-card border-primary/50 scale-105"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1">
                  <Star size={14} fill="currentColor" />
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-2xl mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {pkg.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl text-gradient">
                    {pkg.price}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">{pkg.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? "hero" : "outline"}
                size="lg"
                className="w-full"
                asChild
              >
                <a href="#contact">Get Started</a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-muted-foreground mt-12"
        >
          Need something specific?{" "}
          <a href="#contact" className="text-primary hover:underline">
            Contact us
          </a>{" "}
          for a custom quote tailored to your project.
        </motion.p>
      </div>
    </section>
  );
}
