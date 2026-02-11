import { motion } from "framer-motion";
import { LucideIcon, ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuickStartCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  timeEstimate?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  onClick?: () => void;
  isActive?: boolean;
}

const difficultyConfig = {
  beginner: { label: "Beginner", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  intermediate: { label: "Intermediate", color: "text-accent-foreground", bg: "bg-accent", border: "border-accent" },
  advanced: { label: "Advanced", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
};

const QuickStartCard = ({
  icon: Icon,
  title,
  description,
  timeEstimate,
  difficulty = "beginner",
  onClick,
  isActive = false,
}: QuickStartCardProps) => {
  const config = difficultyConfig[difficulty];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`relative p-6 cursor-pointer group overflow-hidden transition-all duration-300 ${
          isActive
            ? "bg-primary/10 border-primary/40 shadow-xl shadow-primary/20"
            : "bg-card/60 border-border/50 hover:border-primary/30 hover:shadow-lg"
        }`}
        onClick={onClick}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isActive 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <Badge variant="outline" className={`${config.color} ${config.bg} ${config.border}`}>
              {config.label}
            </Badge>
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {timeEstimate && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeEstimate}</span>
              </div>
            )}
            <div className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 ${
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            }`}>
              <span>Start</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuickStartCard;
