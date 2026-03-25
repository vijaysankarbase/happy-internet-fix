import React from "react";
import { motion } from "framer-motion";
import ScreenShell from "@/components/ScreenShell";
import ActionButton from "@/components/ActionButton";
import { useDiagnostic, getHomeInputs } from "@/context/DiagnosticContext";
import { evaluateDiagnostic } from "@/lib/diagnosticEngine";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const PRIORITY_MAP: Record<string, number> = {
  filter_hp47: 0.0, filter_tof: 0.0, dropcable: 1.1, dice: 1.2,
  modem_deregs: 2.1, broken_hardware_modem: 2.2, coverage: 3.5,
};

const ScanDoneScreen: React.FC = () => {
  const { panelInputs, selectedProduct, setDiagnosticResult, setQoeSelected, setCurrentState, sentiment } = useDiagnostic();
  const { t } = useTranslation();

  const handleSeeResult = () => {
    const homeInputs = getHomeInputs(panelInputs, selectedProduct);
    const apiResponse = {
      modem: { inService: homeInputs.modemInService },
      network: {
        incident: { active: homeInputs.incidentActive },
        change: { active: homeInputs.changeActive },
        problem: { active: homeInputs.problemActive },
      },
      qoe: homeInputs.selectedQoe.map((type) => ({
        type, priority: PRIORITY_MAP[type] ?? 99,
      })),
    };
    setDiagnosticResult(apiResponse);
    const { state, qoeSelected } = evaluateDiagnostic(apiResponse, sentiment);
    setQoeSelected(qoeSelected);
    setCurrentState(state);
  };

  const steps = [t("scanning.modem"), t("scanning.network"), t("scanning.connection")];

  return (
    <ScreenShell>
      {/* Animated success icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <div className="relative w-20 h-20 mx-auto">
          {/* Celebration ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-success/40"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.3, opacity: [0, 0.6, 0] }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          />
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
            >
              <CheckCircle2 className="w-10 h-10 text-success" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl font-bold tracking-tight text-foreground mb-2"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {t("scanDone.title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-muted-foreground mb-6 text-sm"
      >
        {t("scanDone.subtitle")}
      </motion.p>

      {/* Step completion chain */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.6 + i * 0.15,
                    type: "spring",
                    stiffness: 250,
                    damping: 14,
                  }}
                  className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 0.3 }}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {step}
                </motion.span>
              </div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.65 + i * 0.15,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex-1 h-0.5 bg-success/30 mx-2 mb-5 origin-left"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* CTA with delayed entrance */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <ActionButton onClick={handleSeeResult} icon={<ChevronRight className="w-5 h-5" />}>
          {t("scanDone.seeResult")}
        </ActionButton>
      </motion.div>
    </ScreenShell>
  );
};

export default ScanDoneScreen;