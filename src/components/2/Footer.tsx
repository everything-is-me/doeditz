import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Linkedin, ArrowUp } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Video Editing", href: "#services" },
    { label: "Graphic Design", href: "#services" },
    { label: "VFX & Animation", href: "#services" },
    { label: "Digital Marketing", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "Careers", href: "#" },
  ],
  support: [
    { label: "Contact", href: "#contact" },
    { label: "FAQs", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 border-t border-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <span className="font-display text-4xl tracking-wider text-gradient">
                DOEDITZ
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Crafting visual masterpieces that captivate, inspire, and drive
              results. Your vision, our expertise.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display text-lg mb-4">SERVICES</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg mb-4">COMPANY</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg mb-4">SUPPORT</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} DoEditz. All rights reserved.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
