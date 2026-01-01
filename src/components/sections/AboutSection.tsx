import { Award, Users, Clock, Zap } from "lucide-react";

const stats = [
  { icon: Award, value: "50+", label: "Projects Completed" },
  { icon: Users, value: "30+", label: "Happy Clients" },
  { icon: Clock, value: "5+", label: "Years Experience" },
  { icon: Zap, value: "100%", label: "Client Satisfaction" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
              About Me
            </p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-8">
              CREATIVE<br />
              <span className="text-gradient">VISIONARY</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I'm DoEditz, a passionate creative professional dedicated to transforming 
                ideas into stunning visual experiences. With expertise spanning photography, 
                video editing, and digital marketing, I bring a unique perspective to every project.
              </p>
              <p>
                My approach combines technical excellence with artistic vision, ensuring that 
                every piece of content not only looks amazing but also achieves its strategic goals. 
                From intimate portraits to large-scale brand campaigns, I treat each project with 
                the same level of dedication and creativity.
              </p>
              <p>
                When you work with me, you're not just getting a service provider – you're 
                gaining a creative partner committed to bringing your vision to life.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-lg p-6 md:p-8 text-center group hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-4xl md:text-5xl tracking-wide mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
