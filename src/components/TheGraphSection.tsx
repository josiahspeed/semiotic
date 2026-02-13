import { motion } from "framer-motion";

const TheGraphSection = () => {
  return (
    <section id="history" className="py-28 md:py-36 border-t border-border/50 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium"
        >
          The Graph R&D Engagement
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-foreground text-lg md:text-xl leading-relaxed max-w-3xl mb-10"
        >
          Architected the indexing and query layer of the decentralized web under a foundational $60M R&D grant. Developed a secure micropayment system for billions of sub-cent query payments at scale. Deployed AI tooling for dynamic pricing.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="https://thegraph.com/blog/semiotic/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
          >
            VIEW ANNOUNCEMENT
          </a>
          <a
            href="https://blog-semiotic.ghost.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-muted-foreground px-6 py-3 text-sm font-medium hover:border-foreground hover:text-foreground transition-all duration-300"
          >
            READ BLOGS
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TheGraphSection;
