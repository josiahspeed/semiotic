import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface AskAIButtonProps {
  onClick: () => void;
}

const AskAIButton = ({ onClick }: AskAIButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        onClick={onClick}
        variant="outline"
        className="gap-2 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group"
      >
        <Sparkles className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Ask AI</span>
      </Button>
    </motion.div>
  );
};

export default AskAIButton;
