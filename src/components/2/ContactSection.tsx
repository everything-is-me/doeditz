import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! We'll get back to you soon.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-6">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            LET'S CREATE <span className="text-gradient">TOGETHER</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to bring your vision to life? Drop us a message and let's
            start crafting something extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium mb-2"
                >
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select a service</option>
                  <option value="video">Video Editing</option>
                  <option value="design">Graphic Design</option>
                  <option value="vfx">VFX & Animation</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="full">Full Package</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium mb-2"
                >
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select budget range</option>
                  <option value="starter">$500 - $1,000</option>
                  <option value="mid">$1,000 - $5,000</option>
                  <option value="pro">$5,000 - $15,000</option>
                  <option value="enterprise">$15,000+</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Project Details
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project, goals, and timeline..."
                  rows={5}
                  required
                  className="bg-secondary border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-3xl mb-4">
                  READY TO START YOUR PROJECT?
                </h3>
                <p className="text-muted-foreground text-lg">
                  Whether you're looking for a quick edit or a full-scale
                  production, we're here to help you achieve your creative goals.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Email Us</p>
                    <a
                      href="mailto:hello@doeditz.com"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      hello@doeditz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Call Us</p>
                    <a
                      href="tel:+1234567890"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Location</p>
                    <p className="text-foreground">
                      Los Angeles, California
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Banner */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30">
                <p className="text-foreground font-medium mb-2">
                  🎬 Free Consultation
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  Book a 30-minute call to discuss your project and get expert
                  advice at no cost.
                </p>
                <Button variant="gold" size="lg" className="group" asChild>
                  <a href="#contact">
                    Book Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
