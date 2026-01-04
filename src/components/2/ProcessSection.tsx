import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageSquare, Lightbulb, Clapperboard, Rocket, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Discovery",
    description:
      "We start with a deep dive into your vision, goals, and brand identity. Understanding your story is the first step to telling it right.",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategy",
    description:
      "Our team crafts a tailored creative strategy, combining industry insights with innovative ideas to achieve maximum impact.",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    icon: Clapperboard,
    number: "03",
    title: "Production",
    description:
      "From filming to editing, design to VFX, we bring your project to life with meticulous attention to detail and cutting-edge techniques.",
    color: "from-amber-500/20 to-amber-600/20",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    description:
      "We deliver polished, ready-to-deploy content and support your launch with strategic marketing to ensure maximum reach.",
    color: "from-emerald-500/20 to-emerald-600/20",
  },
];

// Mobile Carousel Component
function MobileProcessCarousel({ steps, isInView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (!autoScroll || !isInView) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoScroll, isInView, steps.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    setTimeout(() => setAutoScroll(true), 5000);
  };

  const handleNext = () => {
    setDirection(1);
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev + 1) % steps.length);
    setTimeout(() => setAutoScroll(true), 5000);
  };

  const handleSelect = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setAutoScroll(false);
    setCurrentIndex(index);
    setTimeout(() => setAutoScroll(true), 5000);
  };

  const currentStep = steps[currentIndex];

  return (
    <div className="relative md:hidden">
      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            className="relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex ? (
              <motion.div
                layoutId="activeStepDot"
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
      <div className="relative h-[420px]">
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

        {/* Step Card */}
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
          className="absolute inset-0 bg-gradient-to-br from-card to-card/50 border-2 border-border rounded-3xl p-8 flex flex-col items-center text-center"
        >
          {/* Animated Number Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-0 right-0 w-24 h-24 overflow-hidden opacity-20"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${currentStep.color}`} />
          </motion.div>

          {/* Step Number */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-7xl md:text-8xl text-primary/10 mb-2"
          >
            {currentStep.number}
          </motion.div>

          {/* Icon with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.3,
              type: "spring", 
              stiffness: 200 
            }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center mb-6`}
          >
            <currentStep.icon className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-2xl mb-4"
          >
            {currentStep.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground leading-relaxed"
          >
            {currentStep.description}
          </motion.p>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Step {currentIndex + 1} of {steps.length}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { 
              opacity: [0, 0.3, 0],
              y: [0, -150],
              x: Math.sin(i) * 100
            } : {}}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/20 rounded-full"
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
            className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6"
          >
            How We Work
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            OUR CREATIVE{" "}
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
              PROCESS
            </motion.span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A proven methodology that transforms ideas into impactful visual experiences.
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-12">
          <MobileProcessCarousel steps={steps} isInView={isInView} />
        </div>

        {/* Desktop Process Steps */}
        <div className="hidden md:block relative">
          {/* Animated Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              animate={isInView ? {
                backgroundPosition: ["0% 0%", "100% 0%"],
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 100%" }}
            />
          </div>

          {/* Floating orb indicators */}
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 hidden lg:block"
              style={{ 
                left: `${(index * 33.33) + 8.33}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { 
                scale: [0, 1.2, 1],
                opacity: 1
              } : {}}
              transition={{ 
                duration: 0.6,
                delay: 0.5 + (index * 0.2)
              }}
            >
              <div className="w-4 h-4 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/50" />
            </motion.div>
          ))}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }
                } : {}}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 h-full relative overflow-hidden">
                  {/* Hover gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10`}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Step Number - Large background */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + (index * 0.1) }}
                    className="font-display text-7xl md:text-8xl text-primary/10 absolute top-4 right-4 leading-none"
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon with pulse animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + (index * 0.1) }}
                    className="relative z-10"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    
                    {/* Animated ring on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-primary opacity-0"
                      animate={isInView ? {
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.3, 0]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.9 + (index * 0.1) }}
                      className="font-display text-2xl mb-4"
                    >
                      {step.title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1 + (index * 0.1) }}
                      className="text-muted-foreground"
                    >
                      {step.description}
                    </motion.p>
                  </div>

                  {/* Animated dot connector for desktop */}
                  <motion.div
                    className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
                    animate={isInView ? {
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                        "0 0 0 10px rgba(59, 130, 246, 0.1)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Ready to start your creative journey with us?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { MessageSquare, Lightbulb, Clapperboard, Rocket } from "lucide-react";

// const steps = [
//   {
//     icon: MessageSquare,
//     number: "01",
//     title: "Discovery",
//     description:
//       "We start with a deep dive into your vision, goals, and brand identity. Understanding your story is the first step to telling it right.",
//   },
//   {
//     icon: Lightbulb,
//     number: "02",
//     title: "Strategy",
//     description:
//       "Our team crafts a tailored creative strategy, combining industry insights with innovative ideas to achieve maximum impact.",
//   },
//   {
//     icon: Clapperboard,
//     number: "03",
//     title: "Production",
//     description:
//       "From filming to editing, design to VFX, we bring your project to life with meticulous attention to detail and cutting-edge techniques.",
//   },
//   {
//     icon: Rocket,
//     number: "04",
//     title: "Launch",
//     description:
//       "We deliver polished, ready-to-deploy content and support your launch with strategic marketing to ensure maximum reach.",
//   },
// ];

// export function ProcessSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal to-background" />

//       <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6">
//             How We Work
//           </span>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
//             OUR CREATIVE <span className="text-gradient">PROCESS</span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
//             A proven methodology that transforms ideas into impactful visual
//             experiences.
//           </p>
//         </motion.div>

//         {/* Process Steps */}
//         <div className="relative">
//           {/* Connection Line */}
//           <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={step.number}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: index * 0.15 }}
//                 className="relative group"
//               >
//                 <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 h-full">
//                   {/* Step Number */}
//                   <div className="font-display text-6xl text-primary/20 mb-4">
//                     {step.number}
//                   </div>

//                   {/* Icon */}
//                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
//                     <step.icon className="w-6 h-6 text-primary" />
//                   </div>

//                   <h3 className="font-display text-2xl mb-4">{step.title}</h3>
//                   <p className="text-muted-foreground">{step.description}</p>
//                 </div>

//                 {/* Connector dot for desktop */}
//                 <div className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary animate-glow" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
