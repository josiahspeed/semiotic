const TheGraphSection = () => {
  return (
    <section id="history" className="py-24 md:py-32 border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-16 xl:px-24 2xl:px-32">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
          The Graph R&D Engagement
        </h2>
        <p className="text-foreground text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
          Architected the indexing and query layer of the decentralized web under a foundational $60M R&D grant. Developed a secure micropayment system for billions of sub-cent query payments at scale. Deployed AI tooling for dynamic pricing.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://thegraph.com/blog/semiotic/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            VIEW ANNOUNCEMENT
          </a>
          <a
            href="https://blog-semiotic.ghost.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-muted-foreground px-6 py-3 text-sm font-medium hover:border-foreground hover:text-foreground transition-colors"
          >
            READ BLOGS
          </a>
        </div>
      </div>
    </section>
  );
};

export default TheGraphSection;
