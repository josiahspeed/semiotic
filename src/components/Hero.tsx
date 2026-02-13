import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const videoSrc = mounted && resolvedTheme === "light"
    ? "/videos/light-mode-bg.mp4"
    : "/videos/hero-bg-video.mp4";

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/70 dark:bg-background/70 bg-white/40" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Hardening the Future of{" "}
            <span className="text-primary">Autonomous Systems.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed italic mb-10"
          >
            An AI Venture Studio incubating secure-by-default agentic infrastructure. Born from five years of R&D in high-stakes decentralized markets.
          </motion.p>
          <motion.a
            href="#agentium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            EXPLORE OUR WORK
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
