import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, ExternalLink, Pause, ChevronLeft, ChevronRight, Zap, Sparkles } from "lucide-react";

const categories = ["All", "Video", "Design", "VFX", "Marketing", "Animation", "Motion", "Branding", "3D"];

const portfolioItems = [
  {
    id: 1,
    title: "Brand Film - TechCorp",
    category: "Video",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    description: "Cinematic brand film showcasing innovation",
    color: "from-blue-500/20 to-blue-600/20",
    icon: Play
  },
  {
    id: 2,
    title: "Product Launch Campaign",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "360° digital marketing campaign",
    color: "from-emerald-500/20 to-emerald-600/20",
    icon: ExternalLink
  },
  {
    id: 3,
    title: "Fantasy VFX Sequence",
    category: "VFX",
    image: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&q=80",
    description: "CGI creatures and environment",
    color: "from-purple-500/20 to-purple-600/20",
    icon: Sparkles
  },
  {
    id: 4,
    title: "Luxury Brand Identity",
    category: "Design",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    description: "Complete visual identity system",
    color: "from-rose-500/20 to-rose-600/20",
    icon: ExternalLink
  },
  {
    id: 5,
    title: "Music Video Production",
    category: "Video",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    description: "High-energy music video editing",
    color: "from-pink-500/20 to-pink-600/20",
    icon: Play
  },
  {
    id: 6,
    title: "Sci-Fi Short Film VFX",
    category: "VFX",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    description: "Futuristic visual effects",
    color: "from-indigo-500/20 to-indigo-600/20",
    icon: Sparkles
  },
  {
    id: 7,
    title: "Motion Graphics Reel",
    category: "Animation",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    description: "Animated explainer videos",
    color: "from-amber-500/20 to-amber-600/20",
    icon: Zap
  },
  {
    id: 8,
    title: "Corporate Identity Package",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    description: "Complete branding suite",
    color: "from-teal-500/20 to-teal-600/20",
    icon: ExternalLink
  },
  {
    id: 9,
    title: "Product 3D Visualization",
    category: "3D",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80",
    description: "3D modeling and rendering",
    color: "from-violet-500/20 to-violet-600/20",
    icon: Sparkles
  },
];

// Mobile Portfolio Carousel
// Mobile Portfolio Carousel - UPDATED WITH FIX
function MobilePortfolioCarousel({ items, activeCategory, isInView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  // FIX 1: Reset currentIndex to 0 when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!autoRotate || !isInView || filteredItems.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate, isInView, filteredItems.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setAutoRotate(false);
    setCurrentIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
    setTimeout(() => setAutoRotate(true), 7000);
  };

  const handleNext = () => {
    setDirection(1);
    setAutoRotate(false);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    setTimeout(() => setAutoRotate(true), 7000);
  };

  const handleSelect = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setAutoRotate(false);
    setCurrentIndex(index);
    setTimeout(() => setAutoRotate(true), 7000);
  };

  // FIX 2: Safety check - ensure currentIndex is within bounds
  const safeCurrentIndex = Math.min(currentIndex, filteredItems.length - 1);
  const currentItem = filteredItems[safeCurrentIndex];

  // FIX 3: Return early if no items
  if (filteredItems.length === 0) {
    return (
      <div className="relative h-[400px] md:hidden flex items-center justify-center">
        <div className="text-center p-8">
          <Sparkles className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">No projects found in this category</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] md:hidden">
      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {filteredItems.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            className="relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === safeCurrentIndex ? (
              <motion.div
                layoutId="activePortfolioDot"
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
        {/* Navigation Arrows - FIX 4: Disable for single items */}
        <button
          onClick={handlePrevious}
          disabled={filteredItems.length <= 1}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          disabled={filteredItems.length <= 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Portfolio Card - FIX 5: Unique key with category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${safeCurrentIndex}`}
            initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.5 
            }}
            className="absolute inset-0 bg-gradient-to-br from-card to-card/50 border-2 border-border rounded-3xl overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-2/3 overflow-hidden">
              <motion.img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
                animate={autoRotate ? { 
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${currentItem.color}`} />
              
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <currentItem.icon size={12} className="text-primary" />
                <span className="text-xs font-medium text-primary">{currentItem.category}</span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 h-1/3 flex flex-col justify-center">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-xl font-bold mb-2"
              >
                {currentItem.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-sm mb-4"
              >
                {currentItem.description}
              </motion.p>
              
              {/* Action Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold"
              >
                {currentItem.category === "Video" || currentItem.category === "Animation" || currentItem.category === "Motion" ? (
                  <>
                    <Play size={16} />
                    View Project
                  </>
                ) : currentItem.category === "VFX" || currentItem.category === "3D" ? (
                  <>
                    <Sparkles size={16} />
                    View Details
                  </>
                ) : (
                  <>
                    <ExternalLink size={16} />
                    Explore Project
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Counter - FIX 6: Only show if there are items */}
      {filteredItems.length > 0 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
          {safeCurrentIndex + 1} / {filteredItems.length}
        </div>
      )}
    </div>
  );
}

// Auto-scroll Categories Component
function AutoScrollCategories({ activeCategory, setActiveCategory, isInView }) {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Auto-scroll animation
  useEffect(() => {
    if (!containerRef.current || isPaused || !isInView) return;

    const container = containerRef.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    let animationId;
    let direction = 1; // 1 for right, -1 for left
    let scrollPosition = container.scrollLeft;

    const scroll = () => {
      if (direction === 1) {
        // Scroll right
        if (scrollPosition >= scrollWidth - 5) {
          direction = -1; // Change direction
        } else {
          scrollPosition += 1;
        }
      } else {
        // Scroll left
        if (scrollPosition <= 5) {
          direction = 1; // Change direction
        } else {
          scrollPosition -= 1;
        }
      }

      container.scrollLeft = scrollPosition;

      if (!isPaused) {
        animationId = requestAnimationFrame(scroll);
      }
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPaused, isInView]);

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
      containerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Navigation Arrows */}
      {showLeftArrow && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
      )}

      {showRightArrow && (
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      )}

      {/* Scroll Controls */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPaused(!isPaused)}
        className="absolute -top-12 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 hidden md:flex"
      >
        {isPaused ? (
          <Play className="w-3 h-3" />
        ) : (
          <Pause className="w-3 h-3" />
        )}
      </motion.button>

      {/* Categories Container */}
      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-2 py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3 + index * 0.05
              }
            } : {}}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category)}
            className={`relative flex-shrink-0 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
              activeCategory === category
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/20"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-transparent hover:border-border"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/80 -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            {category}
            
            {/* Active indicator dot */}
            {activeCategory === category && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white"
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full h-full rounded-full bg-primary/40"
                />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="relative h-1 bg-secondary/50 rounded-full overflow-hidden mt-2 hidden md:block">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"
          animate={isPaused ? {} : {
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ width: "30%" }}
        />
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState(null);

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { 
              opacity: [0, 0.4, 0],
              y: [0, -150],
              x: Math.sin(i) * 100
            } : {}}
            transition={{
              duration: 5 + i * 0.5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 4
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6"
          >
            <Sparkles size={14} />
            Our Portfolio
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            CREATIVE{" "}
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
                backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)"
              }}
            >
              MASTERPIECES
            </motion.span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of our best work across video production, design, VFX, and
            digital marketing campaigns that drive results.
          </p>
        </motion.div>

        {/* Auto-scroll Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <AutoScrollCategories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isInView={isInView}
          />
        </motion.div>

        {/* Mobile Portfolio Carousel */}
        <div className="md:hidden mb-12">
          <MobilePortfolioCarousel
            items={portfolioItems}
            activeCategory={activeCategory}
            isInView={isInView}
          />
        </div>

        {/* Desktop Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                layout
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-card to-card/50 border border-border"
              >
                {/* Image Container */}
                <div className="relative w-full h-full overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={hoveredItem === item.id ? { 
                      scale: 1.1,
                      filter: "brightness(0.7)"
                    } : { 
                      scale: 1,
                      filter: "brightness(1)"
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Animated Gradient Overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-100`}
                    animate={hoveredItem === item.id ? { 
                      opacity: 1,
                      y: 0
                    } : { 
                      opacity: 0,
                      y: 20
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Content Overlay */}
                <motion.div
                  className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/40 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoveredItem === item.id ? { 
                    opacity: 1,
                    y: 0
                  } : { 
                    opacity: 0,
                    y: 20
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Category Badge */}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={hoveredItem === item.id ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-medium uppercase tracking-wide mb-3"
                  >
                    <item.icon size={12} />
                    {item.category}
                  </motion.span>
                  
                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={hoveredItem === item.id ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="font-display text-xl md:text-2xl mb-2"
                  >
                    {item.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={hoveredItem === item.id ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground text-sm"
                  >
                    {item.description}
                  </motion.p>
                </motion.div>

                {/* Play/View Button */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={hoveredItem === item.id ? { 
                    scale: 1, 
                    rotate: 0 
                  } : { 
                    scale: 0, 
                    rotate: 180 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200,
                    damping: 15 
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-white/80 flex items-center justify-center shadow-2xl">
                    {item.category === "Video" || item.category === "Animation" || item.category === "Motion" ? (
                      <Play className="w-6 h-6 text-black ml-1" />
                    ) : item.category === "VFX" || item.category === "3D" ? (
                      <Sparkles className="w-6 h-6 text-black" />
                    ) : (
                      <ExternalLink className="w-6 h-6 text-black" />
                    )}
                  </div>
                </motion.div>

                {/* Corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-12 h-12 overflow-hidden"
                  animate={hoveredItem === item.id ? { 
                    opacity: 1,
                    scale: 1
                  } : { 
                    opacity: 0.5,
                    scale: 0.8
                  }}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Want to see more? Explore our complete portfolio of creative projects.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
          >
            View Full Portfolio
            <ExternalLink size={18} />
          </motion.button>
        </motion.div>
      </div>
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













// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import { Play, ExternalLink, Pause, ChevronLeft, ChevronRight, Zap, Sparkles } from "lucide-react";

// const categories = ["All", "Video", "Design", "VFX", "Marketing", "Animation", "Motion", "Branding", "3D"];

// const portfolioItems = [
//   {
//     id: 1,
//     title: "Brand Film - TechCorp",
//     category: "Video",
//     image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
//     description: "Cinematic brand film showcasing innovation",
//     color: "from-blue-500/20 to-blue-600/20",
//     icon: Play
//   },
//   {
//     id: 2,
//     title: "Product Launch Campaign",
//     category: "Marketing",
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
//     description: "360° digital marketing campaign",
//     color: "from-emerald-500/20 to-emerald-600/20",
//     icon: ExternalLink
//   },
//   {
//     id: 3,
//     title: "Fantasy VFX Sequence",
//     category: "VFX",
//     image: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&q=80",
//     description: "CGI creatures and environment",
//     color: "from-purple-500/20 to-purple-600/20",
//     icon: Sparkles
//   },
//   {
//     id: 4,
//     title: "Luxury Brand Identity",
//     category: "Design",
//     image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
//     description: "Complete visual identity system",
//     color: "from-rose-500/20 to-rose-600/20",
//     icon: ExternalLink
//   },
//   {
//     id: 5,
//     title: "Music Video Production",
//     category: "Video",
//     image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
//     description: "High-energy music video editing",
//     color: "from-pink-500/20 to-pink-600/20",
//     icon: Play
//   },
//   {
//     id: 6,
//     title: "Sci-Fi Short Film VFX",
//     category: "VFX",
//     image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
//     description: "Futuristic visual effects",
//     color: "from-indigo-500/20 to-indigo-600/20",
//     icon: Sparkles
//   },
//   {
//     id: 7,
//     title: "Motion Graphics Reel",
//     category: "Animation",
//     image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
//     description: "Animated explainer videos",
//     color: "from-amber-500/20 to-amber-600/20",
//     icon: Zap
//   },
//   {
//     id: 8,
//     title: "Corporate Identity Package",
//     category: "Branding",
//     image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
//     description: "Complete branding suite",
//     color: "from-teal-500/20 to-teal-600/20",
//     icon: ExternalLink
//   },
//   {
//     id: 9,
//     title: "Product 3D Visualization",
//     category: "3D",
//     image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80",
//     description: "3D modeling and rendering",
//     color: "from-violet-500/20 to-violet-600/20",
//     icon: Sparkles
//   },
// ];

// // Auto-scroll Categories Component
// function AutoScrollCategories({ activeCategory, setActiveCategory, isInView }) {
//   const containerRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);

//   // Auto-scroll animation
//   useEffect(() => {
//     if (!containerRef.current || isPaused || !isInView) return;

//     const container = containerRef.current;
//     const scrollWidth = container.scrollWidth - container.clientWidth;
//     let animationId;
//     let direction = 1; // 1 for right, -1 for left
//     let scrollPosition = container.scrollLeft;

//     const scroll = () => {
//       if (direction === 1) {
//         // Scroll right
//         if (scrollPosition >= scrollWidth - 5) {
//           direction = -1; // Change direction
//         } else {
//           scrollPosition += 1;
//         }
//       } else {
//         // Scroll left
//         if (scrollPosition <= 5) {
//           direction = 1; // Change direction
//         } else {
//           scrollPosition -= 1;
//         }
//       }

//       container.scrollLeft = scrollPosition;

//       if (!isPaused) {
//         animationId = requestAnimationFrame(scroll);
//       }
//     };

//     animationId = requestAnimationFrame(scroll);

//     return () => {
//       if (animationId) cancelAnimationFrame(animationId);
//     };
//   }, [isPaused, isInView]);

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
//       containerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="relative max-w-4xl mx-auto">
//       {/* Navigation Arrows */}
//       {showLeftArrow && (
//         <motion.button
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary hidden md:flex"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </motion.button>
//       )}

//       {showRightArrow && (
//         <motion.button
//           initial={{ opacity: 0, x: 10 }}
//           animate={{ opacity: 1, x: 0 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondary hidden md:flex"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </motion.button>
//       )}

//       {/* Scroll Controls */}
//       <motion.button
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsPaused(!isPaused)}
//         className="absolute -top-12 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 hidden md:flex"
//       >
//         {isPaused ? (
//           <Play className="w-3 h-3" />
//         ) : (
//           <Pause className="w-3 h-3" />
//         )}
//       </motion.button>

//       {/* Categories Container */}
//       <div
//         ref={containerRef}
//         className="flex gap-3 overflow-x-auto scrollbar-hide px-2 py-4"
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={() => setIsPaused(true)}
//         onTouchEnd={() => setIsPaused(false)}
//       >
//         {categories.map((category, index) => (
//           <motion.button
//             key={category}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={isInView ? { 
//               opacity: 1, 
//               scale: 1,
//               transition: {
//                 type: "spring",
//                 stiffness: 200,
//                 damping: 15,
//                 delay: 0.3 + index * 0.05
//               }
//             } : {}}
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setActiveCategory(category)}
//             className={`relative flex-shrink-0 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
//               activeCategory === category
//                 ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/20"
//                 : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-transparent hover:border-border"
//             }`}
//           >
//             {activeCategory === category && (
//               <motion.div
//                 layoutId="activeCategory"
//                 className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/80 -z-10"
//                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               />
//             )}
//             {category}
            
//             {/* Active indicator dot */}
//             {activeCategory === category && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white"
//               >
//                 <motion.div
//                   animate={{ scale: [1, 1.5, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="w-full h-full rounded-full bg-primary/40"
//                 />
//               </motion.div>
//             )}
//           </motion.button>
//         ))}
//       </div>

//       {/* Scroll progress indicator */}
//       <div className="relative h-1 bg-secondary/50 rounded-full overflow-hidden mt-2 hidden md:block">
//         <motion.div
//           className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"
//           animate={isPaused ? {} : {
//             x: ["-100%", "200%"],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           style={{ width: "30%" }}
//         />
//       </div>
//     </div>
//   );
// }

// export function PortfolioSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [hoveredItem, setHoveredItem] = useState(null);

//   const filteredItems = activeCategory === "All"
//     ? portfolioItems
//     : portfolioItems.filter((item) => item.category === activeCategory);

//   return (
//     <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 100 }}
//             animate={isInView ? { 
//               opacity: [0, 0.4, 0],
//               y: [0, -150],
//               x: Math.sin(i) * 100
//             } : {}}
//             transition={{
//               duration: 5 + i * 0.5,
//               delay: i * 0.2,
//               repeat: Infinity,
//               repeatDelay: 4
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
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={isInView ? { scale: 1, opacity: 1 } : {}}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6"
//           >
//             <Sparkles size={14} />
//             Our Portfolio
//           </motion.div>
          
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
//             CREATIVE{" "}
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
//                 backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)"
//               }}
//             >
//               MASTERPIECES
//             </motion.span>
//           </h2>
          
//           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
//             A showcase of our best work across video production, design, VFX, and
//             digital marketing campaigns that drive results.
//           </p>
//         </motion.div>

//         {/* Auto-scroll Categories */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mb-16"
//         >
//           <AutoScrollCategories
//             activeCategory={activeCategory}
//             setActiveCategory={setActiveCategory}
//             isInView={isInView}
//           />
//         </motion.div>

//         {/* Portfolio Grid */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeCategory}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {filteredItems.map((item, index) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 30, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{ 
//                   duration: 0.6, 
//                   delay: 0.1 * index,
//                   type: "spring",
//                   stiffness: 100
//                 }}
//                 whileHover={{ y: -8 }}
//                 onHoverStart={() => setHoveredItem(item.id)}
//                 onHoverEnd={() => setHoveredItem(null)}
//                 layout
//                 className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-card to-card/50 border border-border"
//               >
//                 {/* Image Container */}
//                 <div className="relative w-full h-full overflow-hidden">
//                   <motion.img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover"
//                     animate={hoveredItem === item.id ? { 
//                       scale: 1.1,
//                       filter: "brightness(0.7)"
//                     } : { 
//                       scale: 1,
//                       filter: "brightness(1)"
//                     }}
//                     transition={{ duration: 0.6, ease: "easeOut" }}
//                   />
                  
//                   {/* Animated Gradient Overlay */}
//                   <motion.div
//                     className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-100`}
//                     animate={hoveredItem === item.id ? { 
//                       opacity: 1,
//                       y: 0
//                     } : { 
//                       opacity: 0,
//                       y: 20
//                     }}
//                     transition={{ duration: 0.4 }}
//                   />
//                 </div>

//                 {/* Content Overlay */}
//                 <motion.div
//                   className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/40 to-transparent"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={hoveredItem === item.id ? { 
//                     opacity: 1,
//                     y: 0
//                   } : { 
//                     opacity: 0,
//                     y: 20
//                   }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   {/* Category Badge */}
//                   <motion.span
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={hoveredItem === item.id ? { opacity: 1, x: 0 } : {}}
//                     transition={{ delay: 0.1 }}
//                     className="inline-flex items-center gap-1.5 text-primary text-sm font-medium uppercase tracking-wide mb-3"
//                   >
//                     <item.icon size={12} />
//                     {item.category}
//                   </motion.span>
                  
//                   {/* Title */}
//                   <motion.h3
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={hoveredItem === item.id ? { opacity: 1, y: 0 } : {}}
//                     transition={{ delay: 0.2 }}
//                     className="font-display text-xl md:text-2xl mb-2"
//                   >
//                     {item.title}
//                   </motion.h3>
                  
//                   {/* Description */}
//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={hoveredItem === item.id ? { opacity: 1, y: 0 } : {}}
//                     transition={{ delay: 0.3 }}
//                     className="text-muted-foreground text-sm"
//                   >
//                     {item.description}
//                   </motion.p>
//                 </motion.div>

//                 {/* Play/View Button */}
//                 <motion.div
//                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//                   initial={{ scale: 0, rotate: -180 }}
//                   animate={hoveredItem === item.id ? { 
//                     scale: 1, 
//                     rotate: 0 
//                   } : { 
//                     scale: 0, 
//                     rotate: 180 
//                   }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 200,
//                     damping: 15 
//                   }}
//                 >
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-white/80 flex items-center justify-center shadow-2xl">
//                     {item.category === "Video" || item.category === "Animation" || item.category === "Motion" ? (
//                       <Play className="w-6 h-6 text-black ml-1" />
//                     ) : item.category === "VFX" || item.category === "3D" ? (
//                       <Sparkles className="w-6 h-6 text-black" />
//                     ) : (
//                       <ExternalLink className="w-6 h-6 text-black" />
//                     )}
//                   </div>
//                 </motion.div>

//                 {/* Corner accent */}
//                 <motion.div
//                   className="absolute top-0 right-0 w-12 h-12 overflow-hidden"
//                   animate={hoveredItem === item.id ? { 
//                     opacity: 1,
//                     scale: 1
//                   } : { 
//                     opacity: 0.5,
//                     scale: 0.8
//                   }}
//                 >
//                   <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8" />
//                 </motion.div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </AnimatePresence>

//         {/* View More CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 1 }}
//           className="text-center mt-16"
//         >
//           <p className="text-muted-foreground mb-6 max-w-md mx-auto">
//             Want to see more? Explore our complete portfolio of creative projects.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
//           >
//             View Full Portfolio
//             <ExternalLink size={18} />
//           </motion.button>
//         </motion.div>
//       </div>
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









// import { motion, useInView } from "framer-motion";
// import { useRef, useState } from "react";
// import { Play, ExternalLink } from "lucide-react";

// const categories = ["All", "Video", "Design", "VFX", "Marketing"];

// const portfolioItems = [
//   {
//     id: 1,
//     title: "Brand Film - TechCorp",
//     category: "Video",
//     image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
//     description: "Cinematic brand film showcasing innovation",
//   },
//   {
//     id: 2,
//     title: "Product Launch Campaign",
//     category: "Marketing",
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
//     description: "360° digital marketing campaign",
//   },
//   {
//     id: 3,
//     title: "Fantasy VFX Sequence",
//     category: "VFX",
//     image: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&q=80",
//     description: "CGI creatures and environment",
//   },
//   {
//     id: 4,
//     title: "Luxury Brand Identity",
//     category: "Design",
//     image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
//     description: "Complete visual identity system",
//   },
//   {
//     id: 5,
//     title: "Music Video Production",
//     category: "Video",
//     image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
//     description: "High-energy music video editing",
//   },
//   {
//     id: 6,
//     title: "Sci-Fi Short Film VFX",
//     category: "VFX",
//     image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
//     description: "Futuristic visual effects",
//   },
// ];

// export function PortfolioSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredItems =
//     activeCategory === "All"
//       ? portfolioItems
//       : portfolioItems.filter((item) => item.category === activeCategory);

//   return (
//     <section id="portfolio" className="py-24 lg:py-32 relative">
//       <div className="container mx-auto px-4 lg:px-8" ref={ref}>
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6">
//             Our Work
//           </span>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
//             FEATURED <span className="text-gradient">PORTFOLIO</span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
//             A showcase of our best work across video production, design, VFX, and
//             digital marketing campaigns.
//           </p>
//         </motion.div>

//         {/* Category Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="flex flex-wrap justify-center gap-3 mb-12"
//         >
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
//                 activeCategory === category
//                   ? "bg-primary text-primary-foreground"
//                   : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </motion.div>

//         {/* Portfolio Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredItems.map((item, index) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.1 * index }}
//               layout
//               className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

//               {/* Content */}
//               <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//                 <span className="text-primary text-sm font-medium uppercase tracking-wide mb-2">
//                   {item.category}
//                 </span>
//                 <h3 className="font-display text-2xl mb-2">{item.title}</h3>
//                 <p className="text-muted-foreground text-sm">
//                   {item.description}
//                 </p>
//               </div>

//               {/* Play/View Button */}
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500">
//                 <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
//                   {item.category === "Video" || item.category === "VFX" ? (
//                     <Play className="w-6 h-6 text-primary-foreground ml-1" />
//                   ) : (
//                     <ExternalLink className="w-6 h-6 text-primary-foreground" />
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
