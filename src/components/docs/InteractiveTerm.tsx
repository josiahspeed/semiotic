import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Info, ExternalLink, Code, Zap } from "lucide-react";

interface InteractiveTermProps {
  term: string;
  definition: string;
  example?: string;
  learnMoreUrl?: string;
  type?: "concept" | "method" | "config" | "api";
  children: React.ReactNode;
}

const typeConfig = {
  concept: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  method: { icon: Code, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  config: { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  api: { icon: ExternalLink, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
};

const InteractiveTerm = ({ 
  term, 
  definition, 
  example, 
  learnMoreUrl, 
  type = "concept",
  children 
}: InteractiveTermProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <button 
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${config.bg} ${config.border} border text-sm font-medium transition-all duration-200 hover:scale-105 cursor-help group`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={config.color}>{children}</span>
          <Icon className={`w-3 h-3 ${config.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl" align="start">
        <div className={`px-4 py-3 ${config.bg} border-b ${config.border}`}>
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${config.color}`} />
            <span className="font-semibold text-foreground">{term}</span>
            <Badge variant="outline" className={`ml-auto text-xs ${config.color} ${config.border}`}>
              {type}
            </Badge>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{definition}</p>
          {example && (
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Example</p>
              <code className="text-xs font-mono text-foreground">{example}</code>
            </div>
          )}
          {learnMoreUrl && (
            <a 
              href={learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className={`inline-flex items-center gap-1.5 text-xs ${config.color} hover:underline`}
            >
              Learn more
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default InteractiveTerm;
