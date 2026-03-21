import React from "react";
import { motion } from "framer-motion";
import ScreenShell from "./ScreenShell";
import ActionButton from "./ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Smile, Meh, Frown } from "lucide-react";
import type { Sentiment } from "@/types/diagnostic";

const EntryScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { setSentiment, entryPoint } = useDiagnostic();

  if (entryPoint === "support") {
    // Auto-skip for support entry
    React.useEffect(() => {
      onComplete();
    }, []);
    return null;
  }

  const options: { sentiment: Sentiment; icon: React.ReactNode; label: string; color: string }[] = [
    { sentiment: "positive", icon: <Smile className="w-8 h-8" />, label: "Things are okay", color: "bg-success/10 text-success hover:bg-success/20 border-success/20" },
    { sentiment: "neutral", icon: <Meh className="w-8 h-8" />, label: "Could be better", color: "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20" },
    { sentiment: "negative", icon: <Frown className="w-8 h-8" />, label: "I'm frustrated", color: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20" },
  ];

  const handleSelect = (s: Sentiment) => {
    setSentiment(s);
    onComplete();
  };

  return (
    <ScreenShell
      title="How's your internet experience?"
      subtitle="This helps us tailor our support to you."
    >
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <motion.button
            key={opt.sentiment}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(opt.sentiment)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${opt.color}`}
          >
            {opt.icon}
            <span className="text-lg font-semibold">{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </ScreenShell>
  );
};

export default EntryScreen;
