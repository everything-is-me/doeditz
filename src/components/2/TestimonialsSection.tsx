import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechVenture Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    content:
      "DoEditz transformed our brand video into something truly cinematic. The attention to detail and creative vision exceeded all our expectations. Highly recommend!",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Director, Indie Films",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content:
      "The VFX work on our short film was absolutely stunning. They brought our fantasy world to life with incredible precision and artistry. True professionals.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Head, FashionFlow",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content:
      "Our social media engagement tripled after DoEditz revamped our content strategy. Their design work is fresh, modern, and perfectly on-brand.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "YouTuber, 2M+ Subscribers",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    content:
      "Best editing team I've ever worked with. They understand pacing, storytelling, and what makes content engaging. My audience loves the new format!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
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
            Client Love
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            WHAT THEY <span className="text-gradient">SAY</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our clients have to say
            about working with DoEditz.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-500"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-primary fill-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 text-lg mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
