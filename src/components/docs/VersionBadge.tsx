import { motion } from "framer-motion";
import { Tag, ExternalLink, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = "typescript" | "python";

interface VersionBadgeProps {
  version: string;
  changelogUrl?: string;
  availableVersions?: { version: string; releaseDate: string }[];
  onVersionChange?: (version: string) => void;
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const VersionBadge = ({ 
  version, 
  changelogUrl, 
  availableVersions = [],
  onVersionChange,
  selectedLanguage,
  onLanguageChange
}: VersionBadgeProps) => {
  const hasMultipleVersions = availableVersions.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20"
    >
      {hasMultipleVersions ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button" className="flex items-center gap-2 focus:outline-none group cursor-pointer">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">v{version}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-popover border-border z-50">
            {availableVersions.map((v) => (
              <DropdownMenuItem
                key={v.version}
                onClick={() => onVersionChange?.(v.version)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-medium">v{v.version}</span>
                  <span className="text-xs text-muted-foreground">{v.releaseDate}</span>
                </div>
                {v.version === version && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">v{version}</span>
        </div>
      )}
      
      {/* Language Toggle */}
      <div className="w-px h-4 bg-border" />
      <div className="flex items-center gap-1 bg-muted/50 rounded-full p-0.5">
        <button
          onClick={() => onLanguageChange("typescript")}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
            selectedLanguage === "typescript"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          TypeScript
        </button>
        <button
          onClick={() => onLanguageChange("python")}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
            selectedLanguage === "python"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Python
        </button>
      </div>
      
      {changelogUrl && (
        <>
          <div className="w-px h-4 bg-border" />
          <a
            href={changelogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Changelog
            <ExternalLink className="w-3 h-3" />
          </a>
        </>
      )}
    </motion.div>
  );
};

export default VersionBadge;
