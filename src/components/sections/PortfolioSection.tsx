import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

const categories = ["All", "Photography", "Video", "Marketing"];

const portfolioItems = [
  {
    id: 1,
    title: "Urban Lifestyle",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    type: "photo",
  },
  {
    id: 2,
    title: "Brand Campaign",
    category: "Video",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    type: "video",
  },
  {
    id: 3,
    title: "Product Launch",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    type: "photo",
  },
  {
    id: 4,
    title: "Portrait Series",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    type: "photo",
  },
  {
    id: 5,
    title: "Commercial Spot",
    category: "Video",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop",
    type: "video",
  },
  {
    id: 6,
    title: "Social Campaign",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    type: "photo",
  },
];

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
            Selected Works
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide">
            PORTFOLIO
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-primary text-sm font-medium tracking-wider uppercase mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl tracking-wide text-foreground">
                  {item.title}
                </h3>
              </div>

              {/* Icon indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {item.type === "video" ? (
                  <Play className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <ExternalLink className="w-5 h-5 text-primary-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
