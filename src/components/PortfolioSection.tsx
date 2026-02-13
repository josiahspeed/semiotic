import cambrianLogo from "@/assets/cambrian-logo.svg";
import odosLogo from "@/assets/odos-logo.png";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
    <section id="portfolio" className="relative py-28 md:py-36 border-t border-border/50 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/portfolio-bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/75" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-widest text-muted-foreground mb-12 font-medium"
        >
          Portfolio Successes
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative block border border-border/60 rounded-lg p-8 bg-background hover:border-primary/40 transition-all duration-500 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.08)]"
            >
              <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {project.name === "Cambrian" ? (
                <img src={cambrianLogo} alt="Cambrian" className="h-9 mb-2" />
              ) : project.name === "Odos" ? (
                <img src={odosLogo} alt="Odos" className="h-14 mb-2" />
              ) : (
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
              )}
              <span className="inline-block text-xs text-primary/80 border border-primary/30 rounded-full px-3 py-1 mb-4">
                {project.badge}
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
