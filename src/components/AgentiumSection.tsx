const AgentiumSection = () => {
  return (
    <section id="agentium" className="py-24 md:py-32 bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs uppercase tracking-widest text-primary font-medium">Active Incubation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Agentium</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              The Secure Operating System for Autonomous Agents. Solving the systemic security vulnerabilities and cost inefficiencies of unmanaged agentic loops. Built on a Rust-hardened host with BAML-contract reasoning.
            </p>
            <a
              href="https://agentium.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              LEARN MORE
            </a>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <div className="w-3 h-3 rounded-full bg-primary" />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentiumSection;
