const Footer = () => {
  return (
    <footer id="contact" className="py-16 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground tracking-tight">SEMIOTIC.AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Semiotic Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:contact@semiotic.ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              contact@semiotic.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
