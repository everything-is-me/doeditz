import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles, Star, TrendingUp, Users, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useState, useEffect, useRef } from "react";

// Reusable Counting Component
function AnimatedCounter({ value, duration = 2000, className = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value.replace('+', ''));
    const incrementTime = Math.max(duration / end, 30); // Min 30ms per increment
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{value.includes('+') ? '+' : ''}
    </span>
  );
}

// Hook to check if element is in viewport
function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Professional video editing studio"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      </div>

      {/* Enhanced Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] rounded-full bg-primary/5 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with attention effect */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-primary text-sm font-medium uppercase tracking-wider mb-8 cursor-default"
          >
            <Sparkles size={14} />
            Premium Creative Studio
            <Star size={14} className="fill-primary/20" />
          </motion.div>

          {/* Main Headline */}
          <div className="mb-8 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-4"
            >
              <span className="block">CRAFTING</span>
              <span className="text-gradient block">VISUAL</span>
              <span className="block">MASTERPIECES</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground/90 max-w-3xl mx-auto mb-12 font-body leading-relaxed"
          >
            From stunning video edits to jaw-dropping VFX, we transform your
            vision into cinematic reality. Elevate your brand with our expert
            editing, design, and digital marketing services.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button 
                variant="hero" 
                size="xl" 
                className="group w-full sm:w-auto px-8"
                asChild
              >
                <a href="#contact">
                  Start Your Project
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button 
                variant="heroOutline" 
                size="xl" 
                className="group w-full sm:w-auto px-8"
                asChild
              >
                <a href="#portfolio">
                  <Play className="mr-3 group-hover:scale-110 transition-transform" size={18} />
                  View Our Work
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Section with Simultaneous Counting */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4"
          >
            {[
              { 
                value: "100+", 
                label: "Projects", 
                sublabel: "Completed",
                icon: <TrendingUp size={18} />,
                color: "from-blue-500 to-cyan-400",
                duration: 2000
              },
              { 
                value: "50+", 
                label: "Happy", 
                sublabel: "Clients",
                icon: <Users size={18} />,
                color: "from-purple-500 to-pink-500",
                duration: 1500
              },
              { 
                value: "2+", 
                label: "Years", 
                sublabel: "Experience",
                icon: <Clock size={18} />,
                color: "from-amber-500 to-orange-400",
                duration: 1000
              },
              { 
                value: "24/7", 
                label: "Always", 
                sublabel: "Available",
                icon: <Shield size={18} />,
                color: "from-emerald-500 to-green-400",
                duration: 2500
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="text-center p-5 md:p-7 rounded-2xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all group cursor-default"
              >
                {/* Icon with animation */}
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary mb-4 group-hover:from-primary/30 group-hover:to-primary/10"
                >
                  {stat.icon}
                </motion.div>
                
                {/* Animated Counter */}
                <div className="relative h-16 md:h-20 mb-2 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`font-display text-3xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value.includes('/') ? (
                      // For 24/7, show without counting
                      stat.value
                    ) : (
                      // For other numbers, show counting animation
                      <AnimatedCounter 
                        value={stat.value} 
                        duration={stat.duration}
                      />
                    )}
                  </motion.div>
                  
                  {/* Progress bar for counting effect */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      duration: stat.duration / 1000,
                      delay: 0.3,
                      ease: "linear"
                    }}
                    className={`
                      absolute 
                      -bottom-2 
                      ${/* 'left-1/2' */ ' '} 
                      -translate-x-1/2 
                      w-16 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30`}
                  />
                </div>
                
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-1"
                >
                  <div className="text-lg font-semibold text-foreground/90">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground/70">
                    {stat.sublabel}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Trust Signal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-muted-foreground/70">
              Trusted by creative agencies, startups, and global brands worldwide
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/60 tracking-wider">
            Discover more
          </span>
          <div className="w-5 h-9 rounded-full border border-primary/30 flex justify-center items-start pt-2">
            <motion.div
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-3 rounded-full bg-gradient-to-b from-primary to-primary/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}



// import { motion } from "framer-motion";
// import { Play, ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import heroBg from "@/assets/hero-bg.jpg";

// import { useEffect, useState } from 'react';

// const AnimatedNumbers = ({ value, suffix = '' }) => {
//   const [currentValue, setCurrentValue] = useState(0);

//   useEffect(() => {
//     const duration = 2000; // 2 seconds
//     const increment = value / (duration / 16); // 60fps

//     let startValue = 0;
//     const timer = setInterval(() => {
//       startValue += increment;
//       if (startValue >= value) {
//         setCurrentValue(value);
//         clearInterval(timer);
//       } else {
//         setCurrentValue(Math.floor(startValue));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [value]);

//   return (
//     <motion.span
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {Math.floor(currentValue)}{suffix}
//     </motion.span>
//   );
// };

// export function HeroSection() {
//   return (
//     <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Optimized Background */}
//       <div className="absolute inset-0">
//         <img
//           src={heroBg}
//           alt="Professional video editing studio"
//           className="w-full h-full object-cover"
//           loading="eager"
//           fetchPriority="high"
//         />
//         <div className="absolute inset-0 cinematic-overlay" />
//         <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
//       </div>

//       {/* Enhanced Glow Effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 0.3 }}
//           transition={{ duration: 2 }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] rounded-full bg-primary/5 blur-3xl"
//         />

//         {/* Floating particles */}
//         {[...Array(6)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{
//               opacity: [0, 0.5, 0],
//               y: [0, -100],
//               x: Math.sin(i) * 50
//             }}
//             transition={{
//               duration: 3 + i * 0.5,
//               delay: i * 0.2,
//               repeat: Infinity,
//               repeatDelay: 2
//             }}
//             className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/30 rounded-full"
//           />
//         ))}
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 lg:px-8 relative z-10">
//         <div className="max-w-5xl mx-auto text-center">
//           {/* Badge with attention effect */}
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{
//               duration: 0.6,
//               type: "spring",
//               stiffness: 200
//             }}
//             whileHover={{ scale: 1.05 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-primary text-sm font-medium uppercase tracking-wider mb-8 cursor-default"
//           >
//             <Sparkles size={14} />
//             Premium Creative Studio
//             <Star size={14} className="fill-primary/20" />
//           </motion.div>

//           {/* Main Headline with staggered text */}
//           <div className="mb-8 overflow-hidden">
//             <motion.h1
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-4"
//             >
//               <motion.span
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="block"
//               >
//                 CRAFTING
//               </motion.span>
//               <motion.span
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-gradient block"
//               >
//                 VISUAL
//               </motion.span>
//               <motion.span
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="block"
//               >
//                 MASTERPIECES
//               </motion.span>
//             </motion.h1>
//           </div>

//           {/* Subtitle with progressive reveal */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="text-lg md:text-xl text-muted-foreground/90 max-w-3xl mx-auto mb-12 font-body leading-relaxed"
//           >
//             From stunning video edits to jaw-dropping VFX, we transform your
//             vision into cinematic reality. Elevate your brand with our expert
//             editing, design, and digital marketing services.
//           </motion.p>

//           {/* CTA Buttons with enhanced interactions */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full sm:w-auto"
//             >
//               <Button
//                 variant="hero"
//                 size="xl"
//                 className="group w-full sm:w-auto px-8"
//                 asChild
//               >
//                 <a href="#contact">
//                   Start Your Project
//                   <motion.div
//                     animate={{ x: [0, 5, 0] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                   >
//                     <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
//                   </motion.div>
//                 </a>
//               </Button>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full sm:w-auto"
//             >
//               <Button
//                 variant="heroOutline"
//                 size="xl"
//                 className="group w-full sm:w-auto px-8"
//                 asChild
//               >
//                 <a href="#portfolio">
//                   <Play className="mr-3 group-hover:scale-110 transition-transform" size={18} />
//                   View Our Work
//                 </a>
//               </Button>
//             </motion.div>
//           </motion.div>

//           {/* Stats Section - Funnel Optimized */}
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={{
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: { staggerChildren: 0.15 }
//               }
//             }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4"
//           >
//             {[
//               {
//                 value: 100,
//                 suffix: "+",
//                 label: "Projects",
//                 sublabel: "Completed",
//                 icon: <TrendingUp size={16} />,
//                 delay: 0.1
//               },
//               {
//                 value: 50,
//                 suffix: "+",
//                 label: "Happy",
//                 sublabel: "Clients",
//                 icon: <Star size={16} />,
//                 delay: 0.2
//               },
//               {
//                 value: 2,
//                 suffix: "+",
//                 label: "Years",
//                 sublabel: "Experience",
//                 icon: <Sparkles size={16} />,
//                 delay: 0.3
//               },
//               {
//                 value: 24,
//                 suffix: "/7",
//                 label: "Always",
//                 sublabel: "Available",
//                 icon: <Play size={16} />,
//                 delay: 0.4
//               },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: {
//                     opacity: 1,
//                     y: 0,
//                     transition: {
//                       duration: 0.6,
//                       delay: stat.delay,
//                       ease: "easeOut"
//                     }
//                   }
//                 }}
//                 whileHover={{
//                   y: -8,
//                   scale: 1.05,
//                   transition: { duration: 0.2 }
//                 }}
//                 className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all group cursor-default"
//               >
//                 {/* Icon with animation */}
//                 <motion.div
//                   initial={{ rotate: -180, scale: 0 }}
//                   animate={{ rotate: 0, scale: 1 }}
//                   transition={{
//                     delay: 1 + index * 0.1,
//                     type: "spring",
//                     stiffness: 200
//                   }}
//                   className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary mb-3 group-hover:from-primary/30 group-hover:to-primary/10"
//                 >
//                   {stat.icon}
//                 </motion.div>

//                 {/* Number with gradient */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 1.2 + index * 0.1 }}
//                   className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-1"
//                 >
//                   {/* {stat.value} */}
//                   <div className="font-display text-4xl md:text-5xl text-gradient mb-2">
//                     <AnimatedNumbers
//                       value={stat.value}
//                       suffix={stat.suffix}
//                     />
//                   </div>
//                 </motion.div>

//                 {/* Label with subtle animation */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.4 + index * 0.1 }}
//                   className="text-sm text-muted-foreground/80 uppercase tracking-wider font-medium"
//                 >
//                   <div className="text-foreground/90">{stat.label}</div>
//                   <div className="text-xs text-muted-foreground/60 mt-0.5">{stat.sublabel}</div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Enhanced Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="absolute bottom-6 left-1/2 -translate-x-1/2"
//       >
//         <motion.div
//           animate={{ y: [0, 12, 0] }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="flex flex-col items-center gap-2"
//         >
//           <span className="text-xs text-muted-foreground/60 tracking-wider">
//             Scroll to explore
//           </span>
//           <div className="w-5 h-9 rounded-full border border-primary/30 flex justify-center items-start pt-2">
//             <motion.div
//               animate={{
//                 opacity: [0.3, 1, 0.3],
//                 scale: [0.8, 1, 0.8]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               className="w-1.5 h-3 rounded-full bg-gradient-to-b from-primary to-primary/60"
//             />
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }



// import { motion } from "framer-motion";
// import { Play, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import heroBg from "@/assets/hero-bg.jpg";

// export function HeroSection() {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img
//           src={heroBg}
//           alt="Professional video editing studio"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 cinematic-overlay" />
//         <div className="absolute inset-0 bg-gradient-radial from-charcoal-light/20 via-transparent to-background/80" />
//       </div>

//       {/* Animated particles/glow effect */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl"
//         />
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 lg:px-8 relative z-10">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="mb-6"
//           >
//             <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider">
//               Premium Creative Studio
//             </span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
//           >
//             CRAFTING{" "}
//             <span className="text-gradient">VISUAL</span>
//             <br />
//             MASTERPIECES
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
//           >
//             From stunning video edits to jaw-dropping VFX, we transform your
//             vision into cinematic reality. Elevate your brand with our expert
//             editing, design, and digital marketing services.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//           >
//             <Button variant="hero" size="xl" className="group" asChild>
//               <a href="#contact">
//                 Start Your Project
//                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//               </a>
//             </Button>
//             <Button variant="heroOutline" size="xl" className="group" asChild>
//               <a href="#portfolio">
//                 <Play className="mr-2" size={18} />
//                 View Our Work
//               </a>
//             </Button>
//           </motion.div>

//           {/* Stats */}
//           {/* <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1 }}
//             className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
//           >
//             {[
//               { value: "100+", label: "Projects Completed" },
//               { value: "50+", label: "Happy Clients" },
//               { value: "2+", label: "Years Experience" },
//               { value: "24/7", label: "Support" },
//             ].map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="font-display text-4xl md:text-5xl text-gradient mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-muted-foreground text-sm uppercase tracking-wide">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </motion.div> */}
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2"
//       >
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
//         >
//           <motion.div
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="w-1.5 h-3 rounded-full bg-primary"
//           />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
