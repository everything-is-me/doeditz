import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ExternalLink } from "lucide-react";

const categories = ["All", "Video", "Design", "VFX", "Marketing"];

const portfolioItems = [
  {
    id: 1,
    title: "Brand Film - TechCorp",
    category: "Video",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    description: "Cinematic brand film showcasing innovation",
  },
  {
    id: 2,
    title: "Product Launch Campaign",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "360° digital marketing campaign",
  },
  {
    id: 3,
    title: "Fantasy VFX Sequence",
    category: "VFX",
    image: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&q=80",
    description: "CGI creatures and environment",
  },
  {
    id: 4,
    title: "Luxury Brand Identity",
    category: "Design",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    description: "Complete visual identity system",
  },
  {
    id: 5,
    title: "Music Video Production",
    category: "Video",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    description: "High-energy music video editing",
  },
  {
    id: 6,
    title: "Sci-Fi Short Film VFX",
    category: "VFX",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    description: "Futuristic visual effects",
  },
];

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            FEATURED <span className="text-gradient">PORTFOLIO</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of our best work across video production, design, VFX, and
            digital marketing campaigns.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              layout
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-primary text-sm font-medium uppercase tracking-wide mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-2xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>

              {/* Play/View Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
                  {item.category === "Video" || item.category === "VFX" ? (
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  ) : (
                    <ExternalLink className="w-6 h-6 text-primary-foreground" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
