import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Hash } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
}

const TableOfContents = ({ items, activeId }: TableOfContentsProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-2xl bg-muted/30 border border-border/50 p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3"
      >
        <span className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-primary" />
          On this page
        </span>
        <ChevronRight
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            expanded ? "rotate-90" : ""
          }`}
        />
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-1.5 text-sm transition-all duration-200 ${
                      item.level === 2 ? "pl-0" : item.level === 3 ? "pl-4" : "pl-8"
                    } ${
                      activeId === item.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {activeId === item.id && (
                        <motion.span
                          layoutId="toc-indicator"
                          className="w-1 h-4 rounded-full bg-primary"
                        />
                      )}
                      {item.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableOfContents;
