export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-2xl tracking-wider text-gradient">
            DOEDITZ
          </div>
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} DoEditz. All rights reserved. Crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  );
};
