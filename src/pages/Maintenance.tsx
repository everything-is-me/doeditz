import { Settings, Wrench, RefreshCw } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[200%] animate-scanline" />
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center px-4">
        {/* Animated icons */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="relative">
            <Settings className="w-16 h-16 text-primary animate-spin" style={{ animationDuration: "8s" }} />
          </div>
          <div className="relative">
            <Wrench className="w-14 h-14 text-primary/70 animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
          <div className="relative">
            <RefreshCw className="w-12 h-12 text-primary/50 animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
          </div>
        </div>

        {/* Glitch text effect */}
        <div className="relative mb-6">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-foreground animate-flicker">
            UNDER
          </h1>
          
          {/* Glitch layers */}
          <h1 
            className="absolute inset-0 font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-primary animate-glitch"
            aria-hidden="true"
          >
            UNDER
          </h1>
          <h1 
            className="absolute inset-0 font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-cyan-500 animate-glitch-2"
            aria-hidden="true"
          >
            UNDER
          </h1>
        </div>

        <div className="relative mb-12">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-gradient animate-flicker" style={{ animationDelay: "0.1s" }}>
            MAINTENANCE
          </h2>
          
          {/* Glitch layers */}
          <h2 
            className="absolute inset-0 font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-primary opacity-50 animate-glitch"
            aria-hidden="true"
          >
            MAINTENANCE
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto mb-8 leading-relaxed">
          We're making things even better. 
          <br />
          Check back soon for something amazing.
        </p>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full"
              style={{
                width: "65%",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 tracking-widest uppercase">
            Progress: 65%
          </p>
        </div>

        {/* Contact hint */}
        <div className="mt-12">
          <p className="text-sm text-muted-foreground">
            Need to reach us? Email{" "}
            <a href="mailto:hello@doeditz.com" className="text-primary hover:underline">
              hello@doeditz.com
            </a>
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 font-display text-xl tracking-wider text-muted-foreground/30">
        DOEDITZ
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/30 tracking-widest">
        COMING SOON
      </div>
    </div>
  );
};

export default Maintenance;
