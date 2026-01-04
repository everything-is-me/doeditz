import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Check,
  Circle,
} from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Video Editing",
    description:
      "Professional editing for films, commercials, YouTube content, and social media. Color grading, sound design, and seamless transitions.",
    features: ["Color Grading", "Sound Design", "Motion Graphics", "4K/8K Support"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Stunning visuals that capture attention. Logos, branding, social media graphics, print materials, and digital assets.",
    features: ["Brand Identity", "Social Graphics", "Print Design", "UI/UX Design"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "VFX & Animation",
    description:
      "Bring imagination to life with cutting-edge visual effects, 3D animation, compositing, and motion tracking.",
    features: ["3D Animation", "Compositing", "Motion Tracking", "CGI Integration"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven strategies to grow your brand. SEO, social media management, paid advertising, and content marketing.",
    features: ["SEO Optimization", "Social Media", "PPC Campaigns", "Analytics"],
    color: "from-emerald-500 to-green-500",
  },
];

const allServices = [
  { 
    icon: Camera, 
    name: "Cinematography", 
    color: "bg-gradient-to-r from-blue-500/20 to-blue-600/10 border-blue-500/30",
    textColor: "text-blue-600 dark:text-blue-400",
    completed: false,
    description: "Professional video shooting and camera work for films, commercials, and digital content.",
    features: ["4K/8K Shooting", "Lighting Setup", "Camera Operation", "Scene Composition"]
  },
  { 
    icon: Scissors, 
    name: "Post Production", 
    color: "bg-gradient-to-r from-purple-500/20 to-purple-600/10 border-purple-500/30",
    textColor: "text-purple-600 dark:text-purple-400",
    completed: true,
    description: "Complete editing suite including color grading, sound design, and final mastering.",
    features: ["Video Editing", "Color Grading", "Sound Design", "Final Export"]
  },
  { 
    icon: Wand2, 
    name: "Special Effects", 
    color: "bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-amber-500/30",
    textColor: "text-amber-600 dark:text-amber-400",
    completed: true,
    description: "Advanced VFX and visual enhancements for films, commercials, and digital media.",
    features: ["Visual Effects", "Motion Graphics", "Compositing", "3D Integration"]
  },
  { 
    icon: PenTool, 
    name: "Illustration", 
    color: "bg-gradient-to-r from-rose-500/20 to-rose-600/10 border-rose-500/30",
    textColor: "text-rose-600 dark:text-rose-400",
    completed: false,
    description: "Custom illustrations and digital artwork for branding and marketing materials.",
    features: ["Digital Art", "Vector Graphics", "Character Design", "Concept Art"]
  },
  { 
    icon: Monitor, 
    name: "Web Design", 
    color: "bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    completed: false,
    description: "Modern responsive website design with user experience optimization.",
    features: ["UI/UX Design", "Responsive Layout", "Wireframing", "Prototyping"]
  },
  { 
    icon: Video, 
    name: "Motion Design", 
    color: "bg-gradient-to-r from-violet-500/20 to-violet-600/10 border-violet-500/30",
    textColor: "text-violet-600 dark:text-violet-400",
    completed: false,
    description: "Dynamic animations and motion graphics for explainer videos and presentations.",
    features: ["2D Animation", "Motion Graphics", "Title Sequences", "Logo Animation"]
  },
  { 
    icon: Share2, 
    name: "Social Strategy", 
    color: "bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    completed: true,
    description: "Comprehensive social media marketing strategies and content planning.",
    features: ["Content Strategy", "Audience Analysis", "Campaign Planning", "Performance Tracking"]
  },
  { 
    icon: BarChart3, 
    name: "Brand Growth", 
    color: "bg-gradient-to-r from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
    completed: false,
    description: "Data-driven brand development and market expansion strategies.",
    features: ["Market Research", "Brand Positioning", "Growth Hacking", "ROI Analysis"]
  },
  { 
    icon: Film, 
    name: "Video Production", 
    color: "bg-gradient-to-r from-sky-500/20 to-sky-600/10 border-sky-500/30",
    textColor: "text-sky-600 dark:text-sky-400",
    completed: false,
    description: "End-to-end video production services from concept to final delivery.",
    features: ["Pre-production", "Filming", "Post-production", "Distribution"]
  },
  { 
    icon: Palette, 
    name: "Visual Identity", 
    color: "bg-gradient-to-r from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-500/30",
    textColor: "text-fuchsia-600 dark:text-fuchsia-400",
    completed: true,
    description: "Complete brand identity design including logos, typography, and style guides.",
    features: ["Logo Design", "Brand Guidelines", "Typography", "Color Palette"]
  },
  { 
    icon: Sparkles, 
    name: "3D Modeling", 
    color: "bg-gradient-to-r from-orange-500/20 to-orange-600/10 border-orange-500/30",
    textColor: "text-orange-600 dark:text-orange-400",
    completed: true,
    description: "High-quality 3D modeling and rendering for products, architecture, and characters.",
    features: ["3D Modeling", "Texturing", "Rendering", "Animation"]
  },
  { 
    icon: TrendingUp, 
    name: "SEO Analytics", 
    color: "bg-gradient-to-r from-teal-500/20 to-teal-600/10 border-teal-500/30",
    textColor: "text-teal-600 dark:text-teal-400",
    completed: true,
    description: "In-depth SEO analysis and optimization strategies for better search rankings.",
    features: ["Keyword Research", "Technical SEO", "Performance Tracking", "Optimization"]
  },
];

// Horizontal Scroll Container (Desktop - UNCHANGED)
function AutoScrollPills({ services, isInView, selectedService, onSelect }) {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Auto-scroll animation
  useEffect(() => {
    if (!containerRef.current || isPaused || !isInView) return;

    const container = containerRef.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    let animationId;
    let startTime;
    const duration = 30000; // 30 seconds for full scroll
    const scrollStep = scrollWidth / (duration / 16); // 60fps

    const scroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (scrollPosition >= scrollWidth) {
        // Reset to start smoothly
        container.scrollTo({ left: 0, behavior: 'smooth' });
        setScrollPosition(0);
        startTime = timestamp;
      } else {
        const newPosition = scrollPosition + scrollStep;
        container.scrollLeft = newPosition;
        setScrollPosition(newPosition);
      }

      if (!isPaused) {
        animationId = requestAnimationFrame(scroll);
      }
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPaused, isInView, scrollPosition]);

  // Check scroll position for arrow visibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateArrows = () => {
      setShowLeftArrow(container.scrollLeft > 10);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    };

    container.addEventListener('scroll', updateArrows);
    updateArrows();

    return () => container.removeEventListener('scroll', updateArrows);
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Controls */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPaused(!isPaused)}
        className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80"
      >
        {isPaused ? (
          <Play className="w-4 h-4" />
        ) : (
          <Pause className="w-4 h-4" />
        )}
      </motion.button>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-1"
        style={{ scrollBehavior: 'smooth' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {services.map((service, index) => (
          <motion.button
            key={service.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.05
              }
            } : {}}
            whileHover={{ 
              scale: 1.05,
              rotate: selectedService?.name === service.name ? 0 : [0, -1, 1, -1, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(service)}
            className={`relative flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl ${service.color} border backdrop-blur-sm transition-all duration-300 cursor-pointer group min-w-[200px]`}
          >
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "linear"
              }}
            />
            
            {/* Icon */}
            <motion.div
              animate={{ 
                rotate: selectedService?.name === service.name ? 360 : 0,
                scale: selectedService?.name === service.name ? 1.2 : 1
              }}
              transition={{ duration: 0.4 }}
              className={`relative z-10 p-2 rounded-full ${service.color.replace('bg-gradient-to-r', 'bg-gradient-to-br')} bg-opacity-30`}
            >
              <service.icon className={`w-5 h-5 ${service.textColor}`} />
            </motion.div>
            
            {/* Text */}
            <span className={`relative z-10 font-medium text-sm whitespace-nowrap ${service.textColor}`}>
              {service.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="relative h-1 bg-secondary rounded-full overflow-hidden mt-4">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/60"
          animate={isPaused ? {} : {
            width: ["0%", "100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
}

// Mobile Carousel Component (NEW - REPLACES THE LIST)
function MobileServiceCarousel({ services, isInView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (!autoRotate || !isInView) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoRotate, isInView, services.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setAutoRotate(false);
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    
    // Resume auto-rotate after 5 seconds of inactivity
    setTimeout(() => setAutoRotate(true), 5000);
  };

  const handleNext = () => {
    setDirection(1);
    setAutoRotate(false);
    setCurrentIndex((prev) => (prev + 1) % services.length);
    
    // Resume auto-rotate after 5 seconds of inactivity
    setTimeout(() => setAutoRotate(true), 5000);
  };

  const handleSelect = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setAutoRotate(false);
    setCurrentIndex(index);
    
    // Resume auto-rotate after 5 seconds of inactivity
    setTimeout(() => setAutoRotate(true), 5000);
  };

  const currentService = services[currentIndex];

  return (
    <div className="relative h-[420px]">
      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {services.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            className="relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex ? (
              <motion.div
                layoutId="activeDot"
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
      <div className="relative h-full">
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

        {/* Service Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.5 
            }}
            className="absolute inset-0 bg-gradient-to-br from-card to-card/50 border-2 border-border rounded-3xl p-6 flex flex-col items-center justify-center text-center"
          >
            {/* Icon with Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.1,
                type: "spring", 
                stiffness: 200 
              }}
              className={`w-16 h-16 rounded-2xl ${currentService.color} flex items-center justify-center mb-6`}
            >
              <currentService.icon className={`w-8 h-8 ${currentService.textColor}`} />
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-xl font-bold mb-3"
            >
              {currentService.name}
            </motion.h3>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                currentService.completed 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}
            >
              {currentService.completed ? (
                <>
                  <Check size={14} />
                  <span className="text-xs font-medium">Available</span>
                </>
              ) : (
                <>
                  <Circle size={14} />
                  <span className="text-xs font-medium">Coming Soon</span>
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-sm leading-relaxed mb-6"
            >
              {currentService.description}
            </motion.p>

            {/* Feature Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-1.5"
            >
              {currentService.features.map((feature, i) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border"
                >
                  {feature}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
        {currentIndex + 1} / {services.length}
      </div>
    </div>
  );
}

// Mobile Detail Modal (Keep existing but update styling)
function MobileServiceDetail({ service, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${service?.color}`}>
                  <service.icon className={`w-6 h-6 ${service?.textColor}`} />
                </div>
                <h3 className="font-display text-xl font-bold">{service?.name}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Comprehensive {service?.name.toLowerCase()} services with professional quality and fast turnaround.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold"
              >
                Get {service?.name} Quote
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal to-background" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { 
              opacity: [0, 0.3, 0],
              y: [0, -100],
              x: Math.sin(i) * 100
            } : {}}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.2,
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
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6"
          >
            Our Expertise
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            SERVICES THAT{" "}
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
              ELEVATE
            </motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From concept to completion, we offer comprehensive creative solutions
            tailored to your unique vision and goals.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredService(service.title)}
              onHoverEnd={() => setHoveredService(null)}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.1)] overflow-hidden"
            >
              <div className="relative z-10">
                <motion.div
                  animate={hoveredService === service.title ? { 
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <service.icon className="w-7 h-7 text-primary" />
                </motion.div>

                <h3 className="font-display text-2xl mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + (index * 0.2) + (i * 0.1) }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground border border-transparent hover:border-primary/30 hover:text-foreground cursor-default"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Services - Auto-scroll Horizontal on Desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-2xl md:text-3xl">
              <span className="text-gradient">Complete</span> Service Suite
            </h3>
            <span className="text-sm text-muted-foreground hidden md:block">
              Scroll or hover to pause
            </span>
          </div>
          
          {/* Desktop: Auto-scroll Horizontal */}
          <div className="hidden md:block">
            <AutoScrollPills
              services={allServices}
              isInView={isInView}
              selectedService={selectedService}
              onSelect={setSelectedService}
            />
          </div>
          
          {/* Mobile: Carousel (One at a time) */}
          <div className="md:hidden">
            <MobileServiceCarousel
              services={allServices}
              isInView={isInView}
            />
          </div>
        </motion.div>
        
        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8">
            <div className="text-center">
              <div className="font-display text-3xl text-emerald-500 mb-1">
                {allServices.filter(s => s.completed).length}
              </div>
              <div className="text-sm text-muted-foreground">Services Available</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="font-display text-3xl text-amber-500 mb-1">
                {allServices.filter(s => !s.completed).length}
              </div>
              <div className="text-sm text-muted-foreground">Coming Soon</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Don't see what you need? We provide custom solutions for unique projects.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Request Custom Service
          </motion.button>
        </motion.div>
      </div>
      
      {/* Mobile Service Detail Modal */}
      <MobileServiceDetail
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}

// Custom CSS for scrollbar hiding
const styles = `
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}



// import { motion, AnimatePresence } from "framer-motion";
// import { useInView } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import {
//   Film,
//   Palette,
//   Sparkles,
//   TrendingUp,
//   Camera,
//   Scissors,
//   Wand2,
//   PenTool,
//   Monitor,
//   Video,
//   Share2,
//   BarChart3,
//   ChevronDown,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Pause,
//   Play,
// } from "lucide-react";

// const services = [
//   {
//     icon: Film,
//     title: "Video Editing",
//     description:
//       "Professional editing for films, commercials, YouTube content, and social media. Color grading, sound design, and seamless transitions.",
//     features: ["Color Grading", "Sound Design", "Motion Graphics", "4K/8K Support"],
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     icon: Palette,
//     title: "Graphic Design",
//     description:
//       "Stunning visuals that capture attention. Logos, branding, social media graphics, print materials, and digital assets.",
//     features: ["Brand Identity", "Social Graphics", "Print Design", "UI/UX Design"],
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     icon: Sparkles,
//     title: "VFX & Animation",
//     description:
//       "Bring imagination to life with cutting-edge visual effects, 3D animation, compositing, and motion tracking.",
//     features: ["3D Animation", "Compositing", "Motion Tracking", "CGI Integration"],
//     color: "from-amber-500 to-orange-500",
//   },
//   {
//     icon: TrendingUp,
//     title: "Digital Marketing",
//     description:
//       "Data-driven strategies to grow your brand. SEO, social media management, paid advertising, and content marketing.",
//     features: ["SEO Optimization", "Social Media", "PPC Campaigns", "Analytics"],
//     color: "from-emerald-500 to-green-500",
//   },
// ];

// const allServices = [
//   { 
//     icon: Camera, 
//     name: "Cinematography", 
//     color: "bg-gradient-to-r from-blue-500/20 to-blue-600/10 border-blue-500/30",
//     textColor: "text-blue-600 dark:text-blue-400"
//   },
//   { 
//     icon: Scissors, 
//     name: "Post Production", 
//     color: "bg-gradient-to-r from-purple-500/20 to-purple-600/10 border-purple-500/30",
//     textColor: "text-purple-600 dark:text-purple-400"
//   },
//   { 
//     icon: Wand2, 
//     name: "Special Effects", 
//     color: "bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-amber-500/30",
//     textColor: "text-amber-600 dark:text-amber-400"
//   },
//   { 
//     icon: PenTool, 
//     name: "Illustration", 
//     color: "bg-gradient-to-r from-rose-500/20 to-rose-600/10 border-rose-500/30",
//     textColor: "text-rose-600 dark:text-rose-400"
//   },
//   { 
//     icon: Monitor, 
//     name: "Web Design", 
//     color: "bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
//     textColor: "text-emerald-600 dark:text-emerald-400"
//   },
//   { 
//     icon: Video, 
//     name: "Motion Design", 
//     color: "bg-gradient-to-r from-violet-500/20 to-violet-600/10 border-violet-500/30",
//     textColor: "text-violet-600 dark:text-violet-400"
//   },
//   { 
//     icon: Share2, 
//     name: "Social Strategy", 
//     color: "bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
//     textColor: "text-cyan-600 dark:text-cyan-400"
//   },
//   { 
//     icon: BarChart3, 
//     name: "Brand Growth", 
//     color: "bg-gradient-to-r from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
//     textColor: "text-indigo-600 dark:text-indigo-400"
//   },
//   { 
//     icon: Film, 
//     name: "Video Production", 
//     color: "bg-gradient-to-r from-sky-500/20 to-sky-600/10 border-sky-500/30",
//     textColor: "text-sky-600 dark:text-sky-400"
//   },
//   { 
//     icon: Palette, 
//     name: "Visual Identity", 
//     color: "bg-gradient-to-r from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-500/30",
//     textColor: "text-fuchsia-600 dark:text-fuchsia-400"
//   },
//   { 
//     icon: Sparkles, 
//     name: "3D Modeling", 
//     color: "bg-gradient-to-r from-orange-500/20 to-orange-600/10 border-orange-500/30",
//     textColor: "text-orange-600 dark:text-orange-400"
//   },
//   { 
//     icon: TrendingUp, 
//     name: "SEO Analytics", 
//     color: "bg-gradient-to-r from-teal-500/20 to-teal-600/10 border-teal-500/30",
//     textColor: "text-teal-600 dark:text-teal-400"
//   },
// ];

// // Horizontal Scroll Container
// function AutoScrollPills({ services, isInView, selectedService, onSelect }) {
//   const containerRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);

//   // Auto-scroll animation
//   useEffect(() => {
//     if (!containerRef.current || isPaused || !isInView) return;

//     const container = containerRef.current;
//     const scrollWidth = container.scrollWidth - container.clientWidth;
//     let animationId;
//     let startTime;
//     const duration = 30000; // 30 seconds for full scroll
//     const scrollStep = scrollWidth / (duration / 16); // 60fps

//     const scroll = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const elapsed = timestamp - startTime;
      
//       if (scrollPosition >= scrollWidth) {
//         // Reset to start smoothly
//         container.scrollTo({ left: 0, behavior: 'smooth' });
//         setScrollPosition(0);
//         startTime = timestamp;
//       } else {
//         const newPosition = scrollPosition + scrollStep;
//         container.scrollLeft = newPosition;
//         setScrollPosition(newPosition);
//       }

//       if (!isPaused) {
//         animationId = requestAnimationFrame(scroll);
//       }
//     };

//     animationId = requestAnimationFrame(scroll);

//     return () => {
//       if (animationId) cancelAnimationFrame(animationId);
//     };
//   }, [isPaused, isInView, scrollPosition]);

//   // Check scroll position for arrow visibility
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const updateArrows = () => {
//       setShowLeftArrow(container.scrollLeft > 10);
//       setShowRightArrow(
//         container.scrollLeft < container.scrollWidth - container.clientWidth - 10
//       );
//     };

//     container.addEventListener('scroll', updateArrows);
//     updateArrows();

//     return () => container.removeEventListener('scroll', updateArrows);
//   }, []);

//   const scrollLeft = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Left Arrow */}
//       {/* {showLeftArrow && (
//         <motion.button
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </motion.button>
//       )} */}

//       {/* Right Arrow */}
//       {/* {showRightArrow && (
//         <motion.button
//           initial={{ opacity: 0, x: 10 }}
//           animate={{ opacity: 1, x: 0 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </motion.button>
//       )} */}

//       {/* Scroll Controls */}
//       <motion.button
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsPaused(!isPaused)}
//         className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80"
//       >
//         {isPaused ? (
//           <Play className="w-4 h-4" />
//         ) : (
//           <Pause className="w-4 h-4" />
//         )}
//       </motion.button>

//       {/* Horizontal Scroll Container */}
//       <div
//         ref={containerRef}
//         className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-1"
//         style={{ scrollBehavior: 'smooth' }}
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={() => setIsPaused(true)}
//         onTouchEnd={() => setIsPaused(false)}
//       >
//         {services.map((service, index) => (
//           <motion.button
//             key={service.name}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={isInView ? { 
//               opacity: 1, 
//               scale: 1,
//               transition: {
//                 type: "spring",
//                 stiffness: 200,
//                 damping: 15,
//                 delay: index * 0.05
//               }
//             } : {}}
//             whileHover={{ 
//               scale: 1.05,
//               rotate: selectedService?.name === service.name ? 0 : [0, -1, 1, -1, 0],
//               transition: { duration: 0.3 }
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => onSelect(service)}
//             className={`relative flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl ${service.color} border backdrop-blur-sm transition-all duration-300 cursor-pointer group min-w-[200px]`}
//           >
//             {/* Hover effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
//               initial={{ x: "-100%" }}
//               animate={{ x: "200%" }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 delay: index * 0.2,
//                 ease: "linear"
//               }}
//             />
            
//             {/* Icon */}
//             <motion.div
//               animate={{ 
//                 rotate: selectedService?.name === service.name ? 360 : 0,
//                 scale: selectedService?.name === service.name ? 1.2 : 1
//               }}
//               transition={{ duration: 0.4 }}
//               className={`relative z-10 p-2 rounded-full ${service.color.replace('bg-gradient-to-r', 'bg-gradient-to-br')} bg-opacity-30`}
//             >
//               <service.icon className={`w-5 h-5 ${service.textColor}`} />
//             </motion.div>
            
//             {/* Text */}
//             <span className={`relative z-10 font-medium text-sm whitespace-nowrap ${service.textColor}`}>
//               {service.name}
//             </span>
//           </motion.button>
//         ))}
//       </div>

//       {/* Scroll progress indicator */}
//       <div className="relative h-1 bg-secondary rounded-full overflow-hidden mt-4">
//         <motion.div
//           className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/60"
//           animate={isPaused ? {} : {
//             width: ["0%", "100%"],
//           }}
//           transition={{
//             duration: 30,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// // Mobile List View
// function MobileServiceList({ services, isInView, selectedService, onSelect }) {
//   return (
//     <div className="space-y-3">
//       {services.map((service, index) => (
//         <motion.button
//           key={service.name}
//           initial={{ opacity: 0, x: -20 }}
//           animate={isInView ? { 
//             opacity: 1, 
//             x: 0,
//             transition: {
//               delay: index * 0.05,
//               type: "spring",
//               stiffness: 150
//             }
//           } : {}}
//           whileHover={{ x: 5 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => onSelect(service)}
//           className={`w-full flex items-center justify-between p-4 rounded-2xl ${service.color} border backdrop-blur-sm transition-all duration-300 cursor-pointer`}
//         >
//           <div className="flex items-center gap-3">
//             <div className={`p-2 rounded-lg ${service.color.replace('bg-gradient-to-r', 'bg-gradient-to-br')} bg-opacity-30`}>
//               <service.icon className={`w-5 h-5 ${service.textColor}`} />
//             </div>
//             <span className={`font-medium ${service.textColor}`}>
//               {service.name}
//             </span>
//           </div>
//           <motion.div
//             animate={{ rotate: selectedService?.name === service.name ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <ChevronDown className="w-4 h-4 opacity-60" />
//           </motion.div>
//         </motion.button>
//       ))}
//     </div>
//   );
// }

// // Mobile Detail Modal
// function MobileServiceDetail({ service, isOpen, onClose }) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 md:hidden"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-background/80 backdrop-blur-sm"
//             onClick={onClose}
//           />
          
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", damping: 25 }}
//             className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <div className={`p-3 rounded-xl ${service?.color}`}>
//                   <service.icon className={`w-6 h-6 ${service?.textColor}`} />
//                 </div>
//                 <h3 className="font-display text-xl font-bold">{service?.name}</h3>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-full hover:bg-secondary"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <p className="text-muted-foreground">
//                 Comprehensive {service?.name.toLowerCase()} services with professional quality and fast turnaround.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold"
//               >
//                 Get {service?.name} Quote
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// export function ServicesSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const [selectedService, setSelectedService] = useState(null);
//   const [hoveredService, setHoveredService] = useState(null);

//   return (
//     <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal to-background" />
      
//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 100 }}
//             animate={isInView ? { 
//               opacity: [0, 0.3, 0],
//               y: [0, -100],
//               x: Math.sin(i) * 100
//             } : {}}
//             transition={{
//               duration: 4 + i * 0.5,
//               delay: i * 0.2,
//               repeat: Infinity,
//               repeatDelay: 3
//             }}
//             className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/20 rounded-full"
//           />
//         ))}
//       </div>

//       <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <motion.span
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={isInView ? { scale: 1, opacity: 1 } : {}}
//             transition={{ duration: 0.5 }}
//             className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6"
//           >
//             Our Expertise
//           </motion.span>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
//             SERVICES THAT{" "}
//             <motion.span 
//               className="text-gradient inline-block"
//               animate={isInView ? { 
//                 backgroundPosition: ["0%", "100%"],
//               } : {}}
//               transition={{ 
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }}
//               style={{ 
//                 backgroundSize: "200% 100%",
//                 backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)"
//               }}
//             >
//               ELEVATE
//             </motion.span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
//             From concept to completion, we offer comprehensive creative solutions
//             tailored to your unique vision and goals.
//           </p>
//         </motion.div>

//         {/* Main Services Grid */}
//         <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ 
//                 duration: 0.6, 
//                 delay: index * 0.1,
//                 type: "spring",
//                 stiffness: 100
//               }}
//               whileHover={{ y: -8 }}
//               onHoverStart={() => setHoveredService(service.title)}
//               onHoverEnd={() => setHoveredService(null)}
//               className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.1)] overflow-hidden"
//             >
//               <div className="relative z-10">
//                 <motion.div
//                   animate={hoveredService === service.title ? { 
//                     rotate: [0, 10, -10, 0],
//                   } : {}}
//                   transition={{ duration: 0.5 }}
//                   className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
//                 >
//                   <service.icon className="w-7 h-7 text-primary" />
//                 </motion.div>

//                 <h3 className="font-display text-2xl mb-4">{service.title}</h3>
//                 <p className="text-muted-foreground mb-6">{service.description}</p>

//                 <div className="flex flex-wrap gap-2">
//                   {service.features.map((feature, i) => (
//                     <motion.span
//                       key={feature}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={isInView ? { opacity: 1, scale: 1 } : {}}
//                       transition={{ delay: 0.8 + (index * 0.2) + (i * 0.1) }}
//                       whileHover={{ scale: 1.05 }}
//                       className="px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground border border-transparent hover:border-primary/30 hover:text-foreground cursor-default"
//                     >
//                       {feature}
//                     </motion.span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* All Services - Auto-scroll Horizontal on Desktop */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mb-6"
//         >
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="font-display text-2xl md:text-3xl">
//               <span className="text-gradient">Complete</span> Service Suite
//             </h3>
//             <span className="text-sm text-muted-foreground hidden md:block">
//               Scroll or hover to pause
//             </span>
//           </div>
          
//           {/* Desktop: Auto-scroll Horizontal */}
//           <div className="hidden md:block">
//             <AutoScrollPills
//               services={allServices}
//               isInView={isInView}
//               selectedService={selectedService}
//               onSelect={setSelectedService}
//             />
//           </div>
          
//           {/* Mobile: Vertical List */}
//           <div className="md:hidden">
//             <MobileServiceList
//               services={allServices}
//               isInView={isInView}
//               selectedService={selectedService}
//               onSelect={setSelectedService}
//             />
//           </div>
//         </motion.div>
        
//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 1 }}
//           className="text-center"
//         >
//           <p className="text-muted-foreground mb-6 max-w-md mx-auto">
//             Don't see what you need? We provide custom solutions for unique projects.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
//           >
//             Request Custom Service
//           </motion.button>
//         </motion.div>
//       </div>
      
//       {/* Mobile Service Detail Modal */}
//       <MobileServiceDetail
//         service={selectedService}
//         isOpen={!!selectedService}
//         onClose={() => setSelectedService(null)}
//       />
//     </section>
//   );
// }

// // Custom CSS for scrollbar hiding
// const styles = `
// .scrollbar-hide {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;
// }
// `;

// // Add styles to document
// if (typeof document !== 'undefined') {
//   const styleSheet = document.createElement("style");
//   styleSheet.textContent = styles;
//   document.head.appendChild(styleSheet);
// }


// import { motion, AnimatePresence } from "framer-motion";
// import { useInView } from "framer-motion";
// import { useRef, useState } from "react";
// import {
//   Film,
//   Palette,
//   Sparkles,
//   TrendingUp,
//   Camera,
//   Scissors,
//   Wand2,
//   PenTool,
//   Monitor,
//   Video,
//   Share2,
//   BarChart3,
//   ChevronDown,
//   X,
// } from "lucide-react";

// const services = [
//   {
//     icon: Film,
//     title: "Video Editing",
//     description:
//       "Professional editing for films, commercials, YouTube content, and social media. Color grading, sound design, and seamless transitions.",
//     features: ["Color Grading", "Sound Design", "Motion Graphics", "4K/8K Support"],
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     icon: Palette,
//     title: "Graphic Design",
//     description:
//       "Stunning visuals that capture attention. Logos, branding, social media graphics, print materials, and digital assets.",
//     features: ["Brand Identity", "Social Graphics", "Print Design", "UI/UX Design"],
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     icon: Sparkles,
//     title: "VFX & Animation",
//     description:
//       "Bring imagination to life with cutting-edge visual effects, 3D animation, compositing, and motion tracking.",
//     features: ["3D Animation", "Compositing", "Motion Tracking", "CGI Integration"],
//     color: "from-amber-500 to-orange-500",
//   },
//   {
//     icon: TrendingUp,
//     title: "Digital Marketing",
//     description:
//       "Data-driven strategies to grow your brand. SEO, social media management, paid advertising, and content marketing.",
//     features: ["SEO Optimization", "Social Media", "PPC Campaigns", "Analytics"],
//     color: "from-emerald-500 to-green-500",
//   },
// ];

// const allServices = [
//   { icon: Camera, name: "Cinematography", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
//   { icon: Scissors, name: "Post Production", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
//   { icon: Wand2, name: "Special Effects", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" },
//   { icon: PenTool, name: "Illustration", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" },
//   { icon: Monitor, name: "Web Design", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
//   { icon: Video, name: "Motion Design", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" },
//   { icon: Share2, name: "Social Strategy", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" },
//   { icon: BarChart3, name: "Brand Growth", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" },
// ];

// // Animated Pill Component
// function AnimatedPill({ service, index, isInView, isSelected, onClick }) {
//   return (
//     <motion.button
//       initial={{ opacity: 0, scale: 0.9, y: 20 }}
//       animate={isInView ? { 
//         opacity: 1, 
//         scale: 1, 
//         y: 0,
//         transition: {
//           type: "spring",
//           stiffness: 200,
//           damping: 15,
//           delay: 0.6 + index * 0.05
//         }
//       } : {}}
//       whileHover={{ 
//         scale: 1.08,
//         rotate: isSelected ? 0 : [0, -2, 2, -2, 0],
//         transition: { duration: 0.3 }
//       }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//       className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl ${service.color} border border-transparent hover:border-current/30 transition-all duration-300 cursor-pointer group overflow-hidden`}
//     >
//       {/* Background shimmer effect */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
//         initial={{ x: "-100%" }}
//         animate={{ x: "200%" }}
//         transition={{
//           duration: 1.5,
//           repeat: Infinity,
//           delay: index * 0.2,
//           ease: "linear"
//         }}
//       />
      
//       {/* Icon with animation */}
//       <motion.div
//         animate={{ 
//           rotate: isSelected ? 360 : 0,
//           scale: isSelected ? 1.2 : 1
//         }}
//         transition={{ duration: 0.4 }}
//         className={`relative z-10 p-2 rounded-full ${service.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-').replace(/\/30/, '/10')}`}
//       >
//         <service.icon className="w-5 h-5" />
//       </motion.div>
      
//       {/* Text */}
//       <span className="relative z-10 font-medium text-sm md:text-base whitespace-nowrap">
//         {service.name}
//       </span>
      
//       {/* Mobile expand indicator */}
//       <motion.div
//         animate={{ rotate: isSelected ? 180 : 0 }}
//         transition={{ duration: 0.3 }}
//         className="relative z-10 md:hidden ml-auto"
//       >
//         <ChevronDown className="w-4 h-4 opacity-60" />
//       </motion.div>
//     </motion.button>
//   );
// }

// // Mobile List View Component
// function MobileServiceDetail({ service, isOpen, onClose }) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-x-0 bottom-0 z-50 md:hidden"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-background/80 backdrop-blur-sm"
//             onClick={onClose}
//           />
          
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", damping: 25 }}
//             className="relative bg-card border-t border-border rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <div className={`p-3 rounded-xl ${service.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}`}>
//                   <service.icon className="w-6 h-6" />
//                 </div>
//                 <h3 className="font-display text-xl font-bold">{service.name}</h3>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-full hover:bg-secondary"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             {/* Content */}
//             <div className="space-y-4">
//               <p className="text-muted-foreground">
//                 Comprehensive {service.name.toLowerCase()} services tailored to your needs.
//               </p>
//               <div className="pt-4 border-t border-border">
//                 <h4 className="font-semibold mb-3">Key Features:</h4>
//                 <ul className="space-y-2">
//                   {[
//                     "Professional quality work",
//                     "Fast turnaround time",
//                     "Dedicated support",
//                     "Custom solutions"
//                   ].map((feature, i) => (
//                     <motion.li
//                       key={i}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 * i }}
//                       className="flex items-center gap-2 text-sm"
//                     >
//                       <div className="w-1.5 h-1.5 rounded-full bg-primary" />
//                       {feature}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
            
//             {/* CTA Button */}
//             <motion.button
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold"
//             >
//               Learn More About {service.name}
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// export function ServicesSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const [selectedService, setSelectedService] = useState(null);
//   const [hoveredService, setHoveredService] = useState(null);

//   return (
//     <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal to-background" />
      
//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 100 }}
//             animate={isInView ? { 
//               opacity: [0, 0.3, 0],
//               y: [0, -100],
//               x: Math.sin(i) * 50
//             } : {}}
//             transition={{
//               duration: 4 + i * 0.5,
//               delay: i * 0.3,
//               repeat: Infinity,
//               repeatDelay: 3
//             }}
//             className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/20 rounded-full"
//           />
//         ))}
//       </div>

//       <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <motion.span
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={isInView ? { scale: 1, opacity: 1 } : {}}
//             transition={{ duration: 0.5 }}
//             className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6"
//           >
//             Our Expertise
//           </motion.span>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
//             SERVICES THAT{" "}
//             <motion.span 
//               className="text-gradient inline-block"
//               animate={isInView ? { 
//                 backgroundPosition: ["0%", "100%"],
//               } : {}}
//               transition={{ 
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }}
//               style={{ 
//                 backgroundSize: "200% 100%",
//                 backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)"
//               }}
//             >
//               ELEVATE
//             </motion.span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
//             From concept to completion, we offer comprehensive creative solutions
//             tailored to your unique vision and goals.
//           </p>
//         </motion.div>

//         {/* Main Services Grid */}
//         <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ 
//                 duration: 0.6, 
//                 delay: index * 0.1,
//                 type: "spring",
//                 stiffness: 100
//               }}
//               whileHover={{ y: -8 }}
//               onHoverStart={() => setHoveredService(service.title)}
//               onHoverEnd={() => setHoveredService(null)}
//               className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.1)] overflow-hidden"
//             >
//               {/* Animated gradient border */}
//               <motion.div
//                 className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100"
//                 animate={hoveredService === service.title ? {
//                   backgroundPosition: ["0% 0%", "100% 100%"],
//                 } : {}}
//                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                 style={{ backgroundSize: "200% 200%" }}
//               />
              
//               <div className="absolute inset-[1px] rounded-2xl bg-card" />
              
//               <div className="relative z-10">
//                 <motion.div
//                   animate={hoveredService === service.title ? { 
//                     rotate: [0, 10, -10, 0],
//                   } : {}}
//                   transition={{ duration: 0.5 }}
//                   className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
//                 >
//                   <service.icon className="w-7 h-7 text-primary" />
//                 </motion.div>

//                 <h3 className="font-display text-2xl mb-4">{service.title}</h3>
//                 <p className="text-muted-foreground mb-6">{service.description}</p>

//                 <div className="flex flex-wrap gap-2">
//                   {service.features.map((feature, i) => (
//                     <motion.span
//                       key={feature}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={isInView ? { opacity: 1, scale: 1 } : {}}
//                       transition={{ delay: 0.8 + (index * 0.2) + (i * 0.1) }}
//                       whileHover={{ scale: 1.05 }}
//                       className="px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground border border-transparent hover:border-primary/30 hover:text-foreground cursor-default"
//                     >
//                       {feature}
//                     </motion.span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* All Services Pills - Desktop & Mobile */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mb-6"
//         >
//           <h3 className="text-center font-display text-2xl md:text-3xl mb-8">
//             <span className="text-gradient">Complete</span> Service Suite
//           </h3>
          
//           {/* Desktop Grid */}
//           <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {allServices.map((service, index) => (
//               <AnimatedPill
//                 key={service.name}
//                 service={service}
//                 index={index}
//                 isInView={isInView}
//                 isSelected={selectedService?.name === service.name}
//                 onClick={() => setSelectedService(service)}
//               />
//             ))}
//           </div>
          
//           {/* Mobile List */}
//           <div className="md:hidden space-y-3">
//             {allServices.map((service, index) => (
//               <AnimatedPill
//                 key={service.name}
//                 service={service}
//                 index={index}
//                 isInView={isInView}
//                 isSelected={selectedService?.name === service.name}
//                 onClick={() => setSelectedService(service)}
//               />
//             ))}
//           </div>
//         </motion.div>
        
//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 1 }}
//           className="text-center"
//         >
//           <p className="text-muted-foreground mb-6 max-w-md mx-auto">
//             Don't see what you need? We provide custom solutions for unique projects.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
//           >
//             Request Custom Service
//           </motion.button>
//         </motion.div>
//       </div>
      
//       {/* Mobile Service Detail Modal */}
//       <MobileServiceDetail
//         service={selectedService}
//         isOpen={!!selectedService}
//         onClose={() => setSelectedService(null)}
//       />
//     </section>
//   );
// }



// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import { useRef } from "react";
// import {
//   Film,
//   Palette,
//   Sparkles,
//   TrendingUp,
//   Camera,
//   Scissors,
//   Wand2,
//   PenTool,
//   Monitor,
//   Video,
//   Share2,
//   BarChart3,
// } from "lucide-react";

// const services = [
//   {
//     icon: Film,
//     title: "Video Editing",
//     description:
//       "Professional editing for films, commercials, YouTube content, and social media. Color grading, sound design, and seamless transitions.",
//     features: ["Color Grading", "Sound Design", "Motion Graphics", "4K/8K Support"],
//   },
//   {
//     icon: Palette,
//     title: "Graphic Design",
//     description:
//       "Stunning visuals that capture attention. Logos, branding, social media graphics, print materials, and digital assets.",
//     features: ["Brand Identity", "Social Graphics", "Print Design", "UI/UX Design"],
//   },
//   {
//     icon: Sparkles,
//     title: "VFX & Animation",
//     description:
//       "Bring imagination to life with cutting-edge visual effects, 3D animation, compositing, and motion tracking.",
//     features: ["3D Animation", "Compositing", "Motion Tracking", "CGI Integration"],
//   },
//   {
//     icon: TrendingUp,
//     title: "Digital Marketing",
//     description:
//       "Data-driven strategies to grow your brand. SEO, social media management, paid advertising, and content marketing.",
//     features: ["SEO Optimization", "Social Media", "PPC Campaigns", "Analytics"],
//   },
// ];

// const allServices = [
//   { icon: Camera, name: "Cinematography" },
//   { icon: Scissors, name: "Post Production" },
//   { icon: Wand2, name: "Special Effects" },
//   { icon: PenTool, name: "Illustration" },
//   { icon: Monitor, name: "Web Design" },
//   { icon: Video, name: "Motion Design" },
//   { icon: Share2, name: "Social Strategy" },
//   { icon: BarChart3, name: "Brand Growth" },
// ];

// export function ServicesSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
//       {/* Background gradient */}
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
//             Our Expertise
//           </span>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
//             SERVICES THAT <span className="text-gradient">ELEVATE</span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
//             From concept to completion, we offer comprehensive creative solutions
//             tailored to your unique vision and goals.
//           </p>
//         </motion.div>

//         {/* Main Services Grid */}
//         <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(43_74%_49%/0.1)]"
//             >
//               {/* Glow effect on hover */}
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//               <div className="relative z-10">
//                 <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
//                   <service.icon className="w-7 h-7 text-primary" />
//                 </div>

//                 <h3 className="font-display text-2xl mb-4">{service.title}</h3>
//                 <p className="text-muted-foreground mb-6">{service.description}</p>

//                 <div className="flex flex-wrap gap-2">
//                   {service.features.map((feature) => (
//                     <span
//                       key={feature}
//                       className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
//                     >
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* All Services Pills */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="flex flex-wrap justify-center gap-4"
//         >
//           {allServices.map((service, index) => (
//             <motion.div
//               key={service.name}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={isInView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
//               className="flex items-center gap-2 px-5 py-3 rounded-full bg-secondary/50 border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-300 cursor-default"
//             >
//               <service.icon className="w-4 h-4 text-primary" />
//               <span className="text-sm font-medium">{service.name}</span>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
