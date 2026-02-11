import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Copy, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InteractiveStepProps {
  step: number;
  title: string;
  description: string;
  details?: string;
  codeSnippet?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  tip?: string;
  docsLink?: string;
}

const InteractiveStep = forwardRef<HTMLDivElement, InteractiveStepProps>(({
  step,
  title,
  description,
  details,
  codeSnippet,
  isCompleted = false,
  isActive = false,
  onClick,
  tip,
  docsLink,
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (codeSnippet) {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card
      ref={ref}
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer group ${
        isActive 
          ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/10" 
          : isCompleted
            ? "bg-emerald-500/5 border-emerald-500/20"
            : "bg-card/50 border-border/50 hover:border-primary/20 hover:bg-muted/30"
      }`}
      onClick={() => {
        setIsExpanded(!isExpanded);
        onClick?.();
      }}
    >
      {/* Animated progress indicator */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isCompleted ? 1 : 0 }}
        className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 origin-top"
      />
      
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Step indicator with animation */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isCompleted 
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-muted border border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground"
            }`}
          >
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.span
                  key="number"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="text-sm font-bold"
                >
                  {step}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                {title}
                {isCompleted && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                    Complete
                  </Badge>
                )}
              </h4>
              <ChevronDown 
                className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        
        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (details || codeSnippet) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 ml-14 space-y-4">
                {details && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{details}</p>
                )}
                
                {tip && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <span className="text-amber-400 text-sm">💡</span>
                    <p className="text-sm text-amber-200/80">{tip}</p>
                  </div>
                )}
                
                {codeSnippet && (
                  <div className="relative group/code">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary to-primary/30" />
                    <div className="rounded-xl bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--code-header))] border-b border-[hsl(var(--code-border))]">
                        <span className="text-xs text-[hsl(var(--code-comment))]">Terminal</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCopy}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-[hsl(var(--code-comment))] hover:text-[hsl(var(--code-text))]"
                        >
                          {copied ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
                        </motion.button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-[hsl(var(--code-text))]">{codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
                
                {docsLink && (
                  <a
                    href={docsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    Learn more
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
});

InteractiveStep.displayName = "InteractiveStep";

export default InteractiveStep;
