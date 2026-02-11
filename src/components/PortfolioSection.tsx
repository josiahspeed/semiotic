import cambrianLogo from "@/assets/cambrian-logo.svg";
import odosLogo from "@/assets/odos-logo.png";

const PortfolioSection = () => {
  const projects = [
    {
      name: "Odos",
      url: "https://app.odos.xyz/",
      badge: "Successful Spin-out",
      description:
        "The intelligent pathfinding engine for decentralized markets, Routed $100B+ trading volume since 2022 and trusted by 3M+ users.",
    },
    {
      name: "Cambrian",
      url: "https://www.cambrian.org/",
      badge: "Successful Spin-out",
      description:
        "Cambrian is pioneering hyperaware intelligence for agentic finance. Backed by a16z, it provides foundational infrastructure for automated, data-driven decision-making.",
    },
  ];

  return (
    <section id="portfolio" className="relative py-24 md:py-32 border-t border-border overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/portfolio-bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-12 font-medium">
          Portfolio Successes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-border rounded-lg p-8 hover:border-muted-foreground/40 transition-colors"
            >
              {project.name === "Cambrian" ? (
                <img src={cambrianLogo} alt="Cambrian" className="h-9 mb-2" />
              ) : project.name === "Odos" ? (
                <img src={odosLogo} alt="Odos" className="h-9 mb-2" />
              ) : (
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
              )}
              <span className="inline-block text-xs text-muted-foreground border border-border rounded px-2 py-1 mb-4">
                {project.badge}
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
