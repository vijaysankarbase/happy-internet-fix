import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { CheckCircle2, HelpCircle, Zap, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

const AllClearScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();
  const [celebrating, setCelebrating] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleCelebrate = () => {
    setCelebrating(true);
    fireConfetti();
  };

  useEffect(() => {
    if (!celebrating) return;
    const timer = setTimeout(() => setCurrentState("entry"), 5000);
    return () => clearTimeout(timer);
  }, [celebrating, setCurrentState]);

  // Positive sentiment + all clear = celebration screen
  if (isPositive) {
    return (
      <ScreenShell hideClose={celebrating}>
        {celebrating ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <PartyPopper className="w-16 h-16 text-success mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground" style={{ textWrap: "balance" } as React.CSSProperties}>
              🎉 Woohoo!
            </h1>
            <p className="text-muted-foreground text-lg">Enjoy your supercharged connection.</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold tracking-tight text-foreground mb-3"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Your WiFi works as expected
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <Zap className="w-5 h-5 text-warning fill-warning" />
              <span className="text-lg font-semibold text-foreground">Supercharged WiFi</span>
              <Zap className="w-5 h-5 text-warning fill-warning" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full"
            >
              <ActionButton onClick={handleCelebrate} icon={<PartyPopper className="w-5 h-5" />}>
                Let's celebrate
              </ActionButton>
            </motion.div>
          </>
        )}
      </ScreenShell>
    );
  }

  // Non-positive sentiment: standard all-clear with follow-up question
  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-success" /></div>}
      title="No issues detected"
      subtitle="Your connection looks healthy from our end."
    >
      <p className="text-foreground font-medium mb-6">Are you still experiencing problems?</p>
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>
          No, everything's fine
        </ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("clarification")} icon={<HelpCircle className="w-5 h-5" />}>
          Yes, I still have issues
        </ActionButton>
      </div>
    </ScreenShell>
  );
};

export default AllClearScreen;
