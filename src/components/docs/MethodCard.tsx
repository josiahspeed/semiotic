import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Parameter {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

interface MethodCardProps {
  name: string;
  description: string;
  signature: string;
  parameters?: Parameter[];
  returns?: { type: string; description: string };
  example?: string;
  isAsync?: boolean;
  deprecated?: boolean;
}

const MethodCard = ({
  name,
  description,
  signature,
  parameters = [],
  returns,
  example,
  isAsync = true,
  deprecated = false,
}: MethodCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(signature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        deprecated
          ? "bg-destructive/5 border-destructive/20"
          : "bg-card/50 border-border/50 hover:border-primary/30"
      }`}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left"
        aria-expanded={isExpanded}
        aria-controls={`method-${name}-content`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {isAsync && (
                <Badge className="bg-secondary text-secondary-foreground border-border text-xs">
                  async
                </Badge>
              )}
              {deprecated && (
                <Badge variant="destructive" className="text-xs">
                  deprecated
                </Badge>
              )}
              <code className="font-mono font-semibold text-foreground text-lg">
                {name}
              </code>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={copied ? "Copied to clipboard" : "Copy signature to clipboard"}
            >
            {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.button>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Signature preview */}
        <div className="mt-3 p-3 rounded-xl bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] overflow-x-auto">
          <code className="text-sm font-mono text-[hsl(var(--code-text))]">
            {signature}
          </code>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-border/50 pt-4">
              {/* Parameters */}
              {parameters.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Parameters
                  </h4>
                  <div className="space-y-2">
                    {parameters.map((param) => (
                      <div
                        key={param.name}
                        className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-primary">
                            {param.name}
                          </code>
                          {param.required && (
                            <span className="text-xs text-destructive">*</span>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs font-mono text-muted-foreground"
                        >
                          {param.type}
                        </Badge>
                        <p className="text-sm text-muted-foreground flex-1">
                          {param.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Returns */}
              {returns && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Returns
                  </h4>
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-mono">
                        {returns.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {returns.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Example */}
              {example && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Example
                  </h4>
                  <div className="rounded-xl overflow-hidden bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))]">
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-[hsl(var(--code-text))]">
                        {example}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default MethodCard;
