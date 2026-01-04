// ₹
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Star, ChevronLeft, ChevronRight, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Starter",
    price: "₹499",
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
    color: "from-blue-500/20 to-blue-600/20",
    icon: Sparkles,
  },
  {
    name: "Professional",
    price: "₹1,499",
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
    color: "from-purple-500/20 to-purple-600/20",
    icon: Zap,
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
    color: "from-amber-500/20 to-amber-600/20",
    icon: Crown,
  },
];

// Mobile Pricing Carousel
function MobilePricingCarousel({ packages, isInView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!autoScroll || !isInView) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % packages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScroll, isInView, packages.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev === 0 ? packages.length - 1 : prev - 1));
    setTimeout(() => setAutoScroll(true), 7000);
  };

  const handleNext = () => {
    setDirection(1);
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev + 1) % packages.length);
    setTimeout(() => setAutoScroll(true), 7000);
  };

  const handleSelect = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setAutoScroll(false);
    setCurrentIndex(index);
    setTimeout(() => setAutoScroll(true), 7000);
  };

  const currentPackage = packages[currentIndex];

  return (
    <div className="relative md:hidden">
      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {packages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            className="relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex ? (
              <motion.div
                layoutId="activePricingDot"
                className="w-3 h-3 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 300 }}
              />
            ) : (
              <div className="w-2 h-2 rounded-full bg-border" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Carousel Container */}
      <div className="relative h-[600px]">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pricing Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.5 
          }}
          className={`absolute inset-0 bg-gradient-to-br from-card to-card/50 border-2 ${
            currentPackage.popular 
              ? 'border-primary/50' 
              : 'border-border'
          } rounded-3xl p-8 flex flex-col`}
        >
          {/* Popular Badge */}
          {currentPackage.popular && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-medium flex items-center gap-1.5 shadow-lg"
            >
              <Star size={12} fill="currentColor" />
              Most Popular
            </motion.div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.3,
                type: "spring", 
                stiffness: 200 
              }}
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentPackage.color} flex items-center justify-center mb-4 mx-auto`}
            >
              <currentPackage.icon className="w-6 h-6 text-primary" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-2xl mb-2"
            >
              {currentPackage.name}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-sm mb-4"
            >
              {currentPackage.description}
            </motion.p>
            
            {/* Price */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-baseline justify-center gap-1 mb-1"
            >
              <span className="font-display text-5xl text-gradient">
                {currentPackage.price}
              </span>
            </motion.div>
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground text-sm"
            >
              {currentPackage.period}
            </motion.span>
          </div>

          {/* Features List */}
          <div className="flex-grow overflow-y-auto pr-2 mb-6">
            <ul className="space-y-3">
              {currentPackage.features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              variant={currentPackage.popular ? "hero" : "outline"}
              size="lg"
              className="w-full"
              asChild
            >
              <a href="#contact">
                {currentPackage.price === "Custom" ? "Get Quote" : "Get Started"}
              </a>
            </Button>
          </motion.div>

          {/* Package Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center text-xs text-muted-foreground mt-4"
          >
            Package {currentIndex + 1} of {packages.length}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal to-background" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { 
              opacity: [0, 0.4, 0],
              y: [0, -200],
              x: Math.sin(i) * 100
            } : {}}
            transition={{
              duration: 5 + i * 0.5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 4
            }}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/30 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6"
          >
            <Star size={14} fill="currentColor" className="fill-primary/30" />
            Simple Pricing
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            VALUE-DRIVEN{" "}
            <motion.span 
              className="text-gradient inline-block"
              animate={isInView ? { 
                backgroundPosition: ["0%", "100%"],
              } : {}}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ 
                backgroundSize: "200% 100%",
                backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)"
              }}
            >
              PACKAGES
            </motion.span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Transparent pricing for every scale of project. Get the quality you
            deserve at a price that works for you.
          </p>
        </motion.div>

        {/* Mobile Pricing Carousel */}
        <div className="md:hidden mb-12">
          <MobilePricingCarousel packages={packages} isInView={isInView} />
        </div>

        {/* Desktop Pricing Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }
              } : {}}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`relative rounded-2xl p-8 border transition-all duration-500 ${
                pkg.popular
                  ? "bg-gradient-to-b from-primary/10 to-card border-primary/50 scale-105 shadow-2xl shadow-primary/10"
                  : "bg-card border-border hover:border-primary/30 hover:shadow-xl"
              }`}
            >
              {/* Animated background glow for popular */}
              {pkg.popular && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent"
                  animate={isInView ? {
                    opacity: [0.3, 0.6, 0.3],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              {/* Popular Badge */}
              {pkg.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-medium flex items-center gap-1.5 shadow-lg z-10"
                >
                  <Star size={14} fill="currentColor" />
                  Most Popular
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="ml-1"
                  >
                    ✨
                  </motion.div>
                </motion.div>
              )}

              {/* Package Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center`}>
                  <pkg.icon className="w-7 h-7 text-primary" />
                </div>
              </motion.div>

              {/* Package Header */}
              <div className="text-center mb-8 relative z-10">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="font-display text-2xl mb-2"
                >
                  {pkg.name}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-sm mb-4"
                >
                  {pkg.description}
                </motion.p>
                
                {/* Price with animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="flex items-baseline justify-center gap-1 mb-1"
                >
                  <span className="font-display text-5xl text-gradient">
                    {pkg.price}
                  </span>
                </motion.div>
                
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="text-muted-foreground text-sm"
                >
                  {pkg.period}
                </motion.span>
              </div>

              {/* Features List */}
              <div className="relative z-10">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + (featureIndex * 0.1) }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                <Button
                  variant={pkg.popular ? "hero" : "outline"}
                  size="lg"
                  className="w-full relative z-10"
                  asChild
                >
                  <a href="#contact">
                    {pkg.price === "Custom" ? "Get Custom Quote" : "Choose This Plan"}
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Custom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            All packages include free consultation and project scoping. 
            Need something specific? We'll create a custom solution just for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
          >
            <Sparkles size={16} />
            Request Custom Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}














// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { Check, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const packages = [
//   {
//     name: "Starter",
//     price: "$499",
//     period: "per project",
//     description: "Perfect for small projects and content creators",
//     features: [
//       "Up to 5 min video editing",
//       "Basic color correction",
//       "2 revision rounds",
//       "Social media formats",
//       "5-day delivery",
//     ],
//     popular: false,
//   },
//   {
//     name: "Professional",
//     price: "$1,499",
//     period: "per project",
//     description: "Ideal for businesses and serious creators",
//     features: [
//       "Up to 15 min video editing",
//       "Advanced color grading",
//       "Motion graphics included",
//       "Unlimited revisions",
//       "Priority support",
//       "3-day delivery",
//       "Sound design & mixing",
//     ],
//     popular: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     period: "tailored pricing",
//     description: "For large-scale productions and agencies",
//     features: [
//       "Unlimited video length",
//       "Full VFX integration",
//       "Dedicated project manager",
//       "Custom animations",
//       "24/7 priority support",
//       "Same-day revisions",
//       "Complete marketing suite",
//       "White-label options",
//     ],
//     popular: false,
//   },
// ];

// export function PricingSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section id="pricing" className="py-24 lg:py-32 relative">
//       <div className="container mx-auto px-4 lg:px-8" ref={ref}>
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6">
//             Investment
//           </span>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
//             PRICING <span className="text-gradient">PACKAGES</span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
//             Transparent pricing for every scale of project. Get the quality you
//             deserve at a price that works for you.
//           </p>
//         </motion.div>

//         {/* Pricing Cards */}
//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {packages.map((pkg, index) => (
//             <motion.div
//               key={pkg.name}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className={`relative rounded-2xl p-8 border transition-all duration-500 ${
//                 pkg.popular
//                   ? "bg-gradient-to-b from-primary/10 to-card border-primary/50 scale-105"
//                   : "bg-card border-border hover:border-primary/30"
//               }`}
//             >
//               {/* Popular Badge */}
//               {pkg.popular && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1">
//                   <Star size={14} fill="currentColor" />
//                   Most Popular
//                 </div>
//               )}

//               <div className="text-center mb-8">
//                 <h3 className="font-display text-2xl mb-2">{pkg.name}</h3>
//                 <p className="text-muted-foreground text-sm mb-4">
//                   {pkg.description}
//                 </p>
//                 <div className="flex items-baseline justify-center gap-1">
//                   <span className="font-display text-5xl text-gradient">
//                     {pkg.price}
//                   </span>
//                 </div>
//                 <span className="text-muted-foreground text-sm">{pkg.period}</span>
//               </div>

//               <ul className="space-y-4 mb-8">
//                 {pkg.features.map((feature) => (
//                   <li key={feature} className="flex items-start gap-3">
//                     <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
//                     <span className="text-muted-foreground">{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <Button
//                 variant={pkg.popular ? "hero" : "outline"}
//                 size="lg"
//                 className="w-full"
//                 asChild
//               >
//                 <a href="#contact">Get Started</a>
//               </Button>
//             </motion.div>
//           ))}
//         </div>

//         {/* Custom Note */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="text-center text-muted-foreground mt-12"
//         >
//           Need something specific?{" "}
//           <a href="#contact" className="text-primary hover:underline">
//             Contact us
//           </a>{" "}
//           for a custom quote tailored to your project.
//         </motion.p>
//       </div>
//     </section>
//   );
// }
