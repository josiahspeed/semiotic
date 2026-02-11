const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg-video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
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
