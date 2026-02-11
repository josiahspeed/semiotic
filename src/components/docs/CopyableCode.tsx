import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Terminal } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

interface CopyableCodeProps {
  code: string;
  language?: string;
  inline?: boolean;
}

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

const CopyableCode = ({ code, language = "bash", inline = false }: CopyableCodeProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <span className="relative inline-flex items-center group">
        <code className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-sm font-mono">
          {code}
        </code>
        <button
          onClick={handleCopy}
          className="ml-1 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        >
        {copied ? (
            <Check className="w-3 h-3 text-primary" />
          ) : (
            <Copy className="w-3 h-3 text-muted-foreground" />
          )}
        </button>
      </span>
    );
  }

  return (
    <div className="relative group w-full rounded-2xl overflow-hidden bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--code-header))] border-b border-[hsl(var(--code-border))]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[hsl(var(--code-comment))]" />
          <span className="text-xs text-[hsl(var(--code-comment))]">{language}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[hsl(var(--code-comment))] hover:text-[hsl(var(--code-text))]"
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5 text-primary"
              >
                <Check className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Copied!</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={getLanguage(language) as any}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 overflow-x-auto" style={{ ...style, background: "transparent" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} className="text-sm font-mono" />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CopyableCode;
