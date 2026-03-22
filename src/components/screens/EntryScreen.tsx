import React from "react";
import { motion } from "framer-motion";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Wifi, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Sentiment } from "@/types/diagnostic";

const EntryScreen: React.FC = () => {
  const { setSentiment, setCurrentState } = useDiagnostic();
  const { t } = useTranslation();

  const options: { sentiment: Sentiment; emoji: string }[] = [
    { sentiment: "negative", emoji: "😡" },
    { sentiment: "neutral", emoji: "😐" },
    { sentiment: "positive", emoji: "😊" },
  ];

  const handleSelect = (s: Sentiment) => { setSentiment(s); setCurrentState("intro"); };

  return (
    <motion.div initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, filter: "blur(4px)" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="px-6 py-10 max-w-md mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="w-full bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-5 pt-5 pb-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"><Wifi className="w-5 h-5 text-primary" /></div>
          <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-muted-foreground tracking-wide">{t("serviceMoment.title")}</p></div>
          <button onClick={() => setCurrentState("entry")} className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors active:scale-95" aria-label={t("common.close")}><X className="w-4 h-4" /></button>
        </div>
        <div className="px-5 pb-2">
          <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="text-lg font-bold text-foreground tracking-tight leading-snug">{t("serviceMoment.subtitle")}</motion.h1>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }} className="flex items-center justify-center gap-4 px-5 py-5">
          {options.map((opt, i) => (
            <motion.button key={opt.sentiment} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }} whileTap={{ scale: 0.93 }} onClick={() => handleSelect(opt.sentiment)} className="w-14 h-14 rounded-full border-2 border-border bg-background flex items-center justify-center text-3xl hover:bg-secondary hover:border-primary/30 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label={opt.sentiment}>{opt.emoji}</motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EntryScreen;
