import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Info, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Highlight, themes } from "prism-react-renderer";

interface Annotation {
  line: number;
  text: string;
  type?: "info" | "warning" | "tip";
}

interface AnnotatedCodeBlockProps {
  code: string;
  language?: string;
  annotations?: Annotation[];
}

const typeConfig = {
  info: { icon: Info, bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
  warning: { icon: Info, bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
  tip: { icon: Info, bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
};

// Map common language aliases
const getLanguage = (lang: string) => {
  const langMap: Record<string, string> = {
    typescript: "tsx",
    javascript: "jsx",
    ts: "tsx",
    js: "jsx",
    bash: "bash",
    shell: "bash",
    python: "python",
    py: "python",
    json: "json",
  };
  return langMap[lang.toLowerCase()] || lang;
};

const AnnotatedCodeBlock = ({
  code,
  language = "typescript",
  annotations = [],
}: AnnotatedCodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Code copied successfully",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getAnnotation = (lineNumber: number) => {
    return annotations.find((a) => a.line === lineNumber);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[hsl(var(--code-header))] border-b border-[hsl(var(--code-border))]">
        <span className="text-xs text-[hsl(var(--code-comment))] font-medium">{language}</span>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors text-[hsl(var(--code-comment))] hover:text-[hsl(var(--code-text))]"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code with syntax highlighting */}
      <div className="relative overflow-x-auto">
        <Highlight
          theme={themes.nightOwl}
          code={code.trim()}
          language={getLanguage(language) as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className="p-4" style={{ ...style, background: "transparent" }}>
              {tokens.map((line, index) => {
                const lineNumber = index + 1;
                const annotation = getAnnotation(lineNumber);
                const isAnnotated = !!annotation;
                const isActive = activeAnnotation === lineNumber;

                return (
                  <div key={index} className="relative group">
                    <div
                      {...getLineProps({ line })}
                      className={`flex items-start transition-all duration-200 ${
                        isAnnotated ? "cursor-pointer hover:bg-white/5 rounded" : ""
                      } ${isActive ? "bg-white/10 rounded" : ""}`}
                      onClick={() => isAnnotated && setActiveAnnotation(isActive ? null : lineNumber)}
                    >
                      {/* Line number */}
                      <span className="w-10 pr-4 text-right text-sm font-mono text-[hsl(var(--code-comment))] select-none flex-shrink-0">
                        {lineNumber}
                      </span>
                      
                      {/* Code line with syntax highlighting */}
                      <span className="flex-1">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} className="text-sm font-mono" />
                        ))}
                      </span>
                      
                      {/* Annotation indicator */}
                      {isAnnotated && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`ml-2 p-1 rounded-full ${typeConfig[annotation.type || "info"].bg} flex-shrink-0`}
                        >
                          <Info className={`w-3 h-3 ${typeConfig[annotation.type || "info"].text}`} />
                        </motion.div>
                      )}
                    </div>

                    {/* Expanded annotation */}
                    <AnimatePresence>
                      {isActive && annotation && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`ml-10 my-2 p-3 rounded-xl ${typeConfig[annotation.type || "info"].bg} ${typeConfig[annotation.type || "info"].border} border`}>
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm ${typeConfig[annotation.type || "info"].text}`}>
                                {annotation.text}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveAnnotation(null);
                                }}
                                className="p-1 rounded hover:bg-white/10 transition-colors"
                              >
                                <X className="w-3 h-3 text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default AnnotatedCodeBlock;
