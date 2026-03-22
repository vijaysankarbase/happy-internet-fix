import React, { useState } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { WifiOff, Plug, RotateCcw, XCircle, AlertTriangle, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const ModemOfflineScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const [step, setStep] = useState<"cause" | "solutions">("cause");

  if (step === "solutions") {
    return (
      <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><WifiOff className="w-8 h-8 text-destructive" /></div>} title={t("modemOffline.solutionsTitle")}>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3 mb-4">
          <motion.div variants={fadeUp} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><Plug className="w-5 h-5" /></div>
            <div><p className="font-semibold text-foreground">{t("modemOffline.turnOn")}</p><p className="text-sm text-muted-foreground mt-1">{t("modemOffline.turnOnDesc")}</p></div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><RotateCcw className="w-5 h-5" /></div>
            <div><p className="font-semibold text-foreground">{t("modemOffline.restart")}</p><p className="text-sm text-muted-foreground mt-1">{t("modemOffline.restartDesc")}</p></div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
            <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground">{t("modemOffline.waitInfo")}</p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3"
        >
          <ActionButton onClick={() => setCurrentState("retest_warning")} icon={<RotateCcw className="w-5 h-5" />}>{t("modemOffline.redoTest")}</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>{t("modemOffline.notHelpful")}</ActionButton>
        </motion.div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><WifiOff className="w-8 h-8 text-destructive" /></div>} title={t("modemOffline.title")} subtitle={t("modemOffline.subtitle")}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20 mb-6"
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
        </motion.div>
        <p className="text-sm font-medium text-foreground">{t("modemOffline.cause")} <span className="text-destructive">{t("modemOffline.causeValue")}</span></p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <ActionButton onClick={() => setStep("solutions")}>{t("modemOffline.whatCanIDo")}</ActionButton>
      </motion.div>
    </ScreenShell>
  );
};

export default ModemOfflineScreen;