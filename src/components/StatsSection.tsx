import { useEffect, useRef, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: "$100B",
      label: "Digital Identity Market"
    },
    {
      value: "$50B",
      label: "Reputation Systems Market"
    },
    {
      value: "10B+",
      label: "Agents by 2035"
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center group cursor-default transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
                {stat.value}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg font-medium">
                {stat.label}
              </p>
              {/* Mobile divider */}
              {index < stats.length - 1 && (
                <div className="md:hidden w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto mt-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
