import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

interface FlowStep {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  activeStep?: number;
  onStepClick?: (index: number) => void;
}

const FlowDiagram = ({ steps, activeStep = 0, onStepClick }: FlowDiagramProps) => {
  return (
    <div className="relative py-8">
      {/* Connection line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
      
      <div className="relative flex items-center justify-between gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isPast = index < activeStep;
          
          return (
            <div key={index} className="flex items-center gap-4 flex-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onStepClick?.(index)}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/30"
                    : isPast
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium text-center whitespace-nowrap">{step.label}</span>
                {step.sublabel && (
                  <span className={`text-[10px] text-center ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {step.sublabel}
                  </span>
                )}
                
                {/* Active indicator pulse */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-primary/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ArrowRight className={`w-5 h-5 ${isPast ? "text-emerald-400" : "text-muted-foreground/50"}`} />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowDiagram;
