import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ScreenShell from "@/components/ScreenShell";
import ActionButton from "@/components/ActionButton";
import { useDiagnostic, getHomeInputs, type BoosterAnswer } from "@/context/DiagnosticContext";
import { evaluateDiagnostic } from "@/lib/diagnosticEngine";
import { CheckCircle2, ChevronRight, Wifi, XCircle, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const PRIORITY_MAP: Record<string, number> = {
  filter_hp47: 0.0, filter_tof: 0.0, dropcable: 1.1, dice: 1.2,
  modem_deregs: 2.1, broken_hardware_modem: 2.2, coverage: 3.5,
};

const ScanDoneScreen: React.FC = () => {
  const { panelInputs, selectedProduct, setDiagnosticResult, setQoeSelected, setCurrentState, sentiment, setBoosterAnswer } = useDiagnostic();
  const { t } = useTranslation();
  const [showBoosterQuestion, setShowBoosterQuestion] = useState(false);

  // Pre-compute the diagnostic result to check if coverage is top QoE
  const preComputedResult = useMemo(() => {
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
    const { state, qoeSelected } = evaluateDiagnostic(apiResponse, sentiment);
    return { apiResponse, state, qoeSelected };
  }, [panelInputs, selectedProduct, sentiment]);

  const isCoverageQoE = preComputedResult.qoeSelected?.type === "coverage" ||
    (preComputedResult.state === "positive_mismatch" && preComputedResult.qoeSelected?.type === "coverage");

  const handleSeeResult = () => {
    if (isCoverageQoE && !showBoosterQuestion) {
      setShowBoosterQuestion(true);
      return;
    }
    setDiagnosticResult(preComputedResult.apiResponse);
    setQoeSelected(preComputedResult.qoeSelected);
    setCurrentState(preComputedResult.state);
  };

  const handleBoosterAnswer = (answer: BoosterAnswer) => {
    setBoosterAnswer(answer);
    setDiagnosticResult(preComputedResult.apiResponse);
    setQoeSelected(preComputedResult.qoeSelected);
    setCurrentState(preComputedResult.state);
  };

  const steps = [t("scanning.modem"), t("scanning.network"), t("scanning.connection")];

  if (showBoosterQuestion) {
    return (
      <ScreenShell
        icon={
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Wifi className="w-10 h-10 text-primary" />
          </div>
        }
        title={t("coverage.quickQuestion")}
        subtitle={t("coverage.boosterQuestion")}
      >
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => handleBoosterAnswer("yes")} icon={<CheckCircle2 className="w-5 h-5" />}>{t("coverage.yes")}</ActionButton>
          <ActionButton variant="outline" onClick={() => handleBoosterAnswer("no")} icon={<XCircle className="w-5 h-5" />}>{t("coverage.no")}</ActionButton>
          <ActionButton variant="outline" onClick={() => handleBoosterAnswer("unknown")} icon={<HelpCircle className="w-5 h-5" />}>{t("coverage.iDontKnow")}</ActionButton>
        </div>
      </ScreenShell>
    );
  }

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
                  transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 250, damping: 14 }}
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
                  transition={{ delay: 0.65 + i * 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 h-0.5 bg-success/30 mx-2 mb-5 origin-left"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

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
