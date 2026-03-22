import React, { useEffect, useCallback } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";

const SuccessScreen: React.FC = () => {
  const { reset } = useDiagnostic();
  const { t } = useTranslation();

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"],
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(fireConfetti, 600);
    return () => clearTimeout(timer);
  }, [fireConfetti]);

  return (
    <ScreenShell
      icon={
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <PartyPopper className="w-10 h-10 text-success" />
          </motion.div>
        </motion.div>
      }
      title={t("success.title")}
      subtitle={t("success.subtitle")}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <ActionButton onClick={reset}>{t("success.done")}</ActionButton>
      </motion.div>
    </ScreenShell>
  );
};

export default SuccessScreen;