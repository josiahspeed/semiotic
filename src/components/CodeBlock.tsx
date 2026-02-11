import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ code, language = "typescript", showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Code copied successfully",
    });
    setTimeout(() => setCopied(false), 2000);
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
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex items-start">
                  {/* Line number */}
                  {showLineNumbers && (
                    <span className="w-10 pr-4 text-right text-sm font-mono text-[hsl(var(--code-comment))] select-none flex-shrink-0">
                      {i + 1}
                    </span>
                  )}
                  
                  {/* Code line */}
                  <span className="flex-1">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} className="text-sm font-mono" />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeBlock;
