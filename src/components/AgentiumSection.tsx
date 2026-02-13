import { motion } from "framer-motion";

const AgentiumSection = () => {
  return (
    <section id="agentium" className="py-28 md:py-36 bg-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-primary font-medium">Active Incubation</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Agentium</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              The Secure Operating System for Autonomous Agents. Solving the systemic security vulnerabilities and cost inefficiencies of unmanaged agentic loops. Built on a Rust-hardened host with BAML-contract reasoning.
            </p>
            <a
              href="https://agentium.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
            >
              LEARN MORE
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card border border-border/60 rounded-lg overflow-hidden hover:border-border transition-colors duration-500 shadow-lg shadow-black/5"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
            </div>
            <pre className="p-6 text-sm leading-relaxed overflow-x-auto">
              <code>
                <span className="text-muted-foreground">{"// Agentium Control Manifest"}</span>{"\n"}
                <span className="text-primary">allow_capabilities</span>: [{"\n"}
                {"  "}<span className="text-code-string">"network_egress"</span>,{"\n"}
                {"  "}<span className="text-code-string">"file_system_read"</span>,{"\n"}
                {"  "}<span className="text-code-string">"secrets_access"</span>{"\n"}
                ],{"\n"}
                <span className="text-primary">default_policy</span>: <span className="text-code-string">"DENY"</span>
              </code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgentiumSection;
