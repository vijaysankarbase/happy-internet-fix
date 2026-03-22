import React, { useState } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertTriangle, Clock, Wrench, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const NetworkIncidentScreen: React.FC = () => {
  const { diagnosticResult, setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const incident = diagnosticResult?.network.incident;
  const [step, setStep] = useState<"cause" | "solutions">("cause");
  const eta = incident?.eta ? new Date(incident.eta).toLocaleString() : null;

  if (step === "solutions") {
    return (
      <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-warning" /></div>} title={t("networkIncident.solutionsTitle")}>
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3 mb-4">
          <motion.div variants={fadeUp} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><Clock className="w-5 h-5" /></div>
            <div><p className="font-semibold text-foreground">{t("networkIncident.waitForTech")}</p><p className="text-sm text-muted-foreground mt-1">{t("networkIncident.waitForTechDesc")}</p></div>
          </motion.div>
          {eta && (
            <motion.div variants={fadeUp} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground">{t("networkIncident.estimatedFix")} <span className="font-medium text-foreground">{eta}</span></p>
            </motion.div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ActionButton onClick={() => setCurrentState("entry")}>{t("networkIncident.gotIt")}</ActionButton>
        </motion.div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><AlertTriangle className="w-8 h-8 text-warning" /></div>} title={t("networkIncident.title")} subtitle={t("networkIncident.subtitle")}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <ActionButton onClick={() => setStep("solutions")}>{t("common.whatCanIDo")}</ActionButton>
      </motion.div>
    </ScreenShell>
  );
};

export default NetworkIncidentScreen;