import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScreenShell from "../ScreenShell";
import { Wifi, CheckCircle2 } from "lucide-react";
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
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <div className="relative w-24 h-24 flex items-center justify-center mx-auto">
          {/* Outer ripple rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{ scale: [0.9, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/15"
            animate={{ scale: [0.9, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            animate={{ scale: [0.9, 1.3], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.0 }}
          />
          {/* Inner icon with gentle rotation */}
          <motion.div
            className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Wifi className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold tracking-tight text-foreground mb-2"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {t("scanning.title")}
      </motion.h1>

      {/* Progress bar with glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full mb-4"
      >
        <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-primary rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.15, ease: "linear" }}
          >
            {/* Shimmer effect on progress bar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mt-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: step.done ? 1 : 0.5 }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {step.done ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="dot"
                    className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center"
                    animate={
                      // Pulse the "current" step
                      i === 0 && progress <= 33
                        ? { borderColor: ["hsl(var(--primary))", "hsl(var(--primary) / 0.3)"] }
                        : i === 1 && progress > 33 && progress <= 66
                        ? { borderColor: ["hsl(var(--primary))", "hsl(var(--primary) / 0.3)"] }
                        : i === 2 && progress > 66
                        ? { borderColor: ["hsl(var(--primary))", "hsl(var(--primary) / 0.3)"] }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"
                      animate={
                        (i === 0 && progress <= 33) ||
                        (i === 1 && progress > 33 && progress <= 66) ||
                        (i === 2 && progress > 66 && progress < 100)
                          ? { scale: [1, 1.4, 1] }
                          : {}
                      }
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  step.done ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Did-you-know card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-secondary/50 rounded-xl px-4 py-3 mt-4 min-h-[60px] flex items-center"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={factIndex}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs text-muted-foreground leading-relaxed"
          >
            💡 <span className="font-medium text-foreground/70">{t("scanning.didYouKnow")}</span>{" "}
            {facts[factIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </ScreenShell>
  );
};

export default ScanningScreen;