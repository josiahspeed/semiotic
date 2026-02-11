import { useEffect, useCallback } from "react";

interface KeyboardShortcutProps {
  keys: string[];
  onTrigger: () => void;
  children?: React.ReactNode;
  className?: string;
}

const KeyboardShortcut = ({ keys, onTrigger, children, className }: KeyboardShortcutProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const pressedKeys = [];
      if (e.metaKey || e.ctrlKey) pressedKeys.push("⌘");
      if (e.shiftKey) pressedKeys.push("Shift");
      if (e.altKey) pressedKeys.push("Alt");
      if (e.key && e.key !== "Meta" && e.key !== "Control" && e.key !== "Shift" && e.key !== "Alt") {
        pressedKeys.push(e.key.toUpperCase());
      }

      const matchesKeys = keys.every((key) => {
        if (key === "⌘" || key === "Cmd" || key === "Ctrl") {
          return e.metaKey || e.ctrlKey;
        }
        if (key === "Shift") return e.shiftKey;
        if (key === "Alt") return e.altKey;
        return e.key.toUpperCase() === key.toUpperCase();
      });

      if (matchesKeys) {
        e.preventDefault();
        onTrigger();
      }
    },
    [keys, onTrigger]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!children) return null;

  return (
    <span className={className}>
      {children}
      <kbd className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted border border-border text-xs font-mono text-muted-foreground">
        {keys.map((key, i) => (
          <span key={i}>
            {key}
            {i < keys.length - 1 && <span className="mx-0.5">+</span>}
          </span>
        ))}
      </kbd>
    </span>
  );
};

export default KeyboardShortcut;
