const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-background pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
            Hardening the Future of{" "}
            <span className="text-primary">Autonomous Systems.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed italic">
            An AI Venture Studio incubating secure-by-default agentic infrastructure. Born from five years of R&D in high-stakes decentralized markets.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
