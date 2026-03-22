import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScreenShell from "../ScreenShell";
import { Wifi } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { useTranslation } from "react-i18next";

const ScanningScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const facts = t("scanning.facts", { returnObjects: true }) as string[];
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * facts.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(p + 2.5, 100)));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const factTimer = setInterval(() => {
      setFactIndex((i) => (i + 1) % facts.length);
    }, 2000);
    return () => clearInterval(factTimer);
  }, [facts.length]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setCurrentState("scan_done"), 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, setCurrentState]);

  const steps = [
    { label: t("scanning.modem"), done: progress > 33 },
    { label: t("scanning.network"), done: progress > 66 },
    { label: t("scanning.connection"), done: progress >= 100 },
  ];

  return (
    <ScreenShell hideClose hideBack>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
        <div className="relative w-24 h-24 flex items-center justify-center mx-auto">
          <motion.div className="absolute inset-0 rounded-full bg-primary/20" animate={{ scale: [0.9, 1.4], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }} />
          <motion.div className="absolute inset-2 rounded-full bg-primary/15" animate={{ scale: [0.9, 1.3], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }} />
          <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Wifi className="w-8 h-8 text-primary" />
          </div>
        </div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-2xl font-bold tracking-tight text-foreground mb-2" style={{ textWrap: "balance" } as React.CSSProperties}>
        {t("scanning.title")}
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="w-full mb-4">
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span key={step.label} className={`text-xs font-medium transition-colors duration-300 ${step.done ? "text-primary" : "text-muted-foreground"}`}>
              {step.done ? "✓ " : ""}{step.label}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="w-full bg-secondary/50 rounded-xl px-4 py-3 mt-4 min-h-[60px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p key={factIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="text-xs text-muted-foreground leading-relaxed">
            💡 <span className="font-medium text-foreground/70">{t("scanning.didYouKnow")}</span>{" "}
            {facts[factIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </ScreenShell>
  );
};

export default ScanningScreen;
