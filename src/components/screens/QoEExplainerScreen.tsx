import React from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertCircle, ChevronRight, WifiOff, Cable, Wrench, MapPin, RotateCcw, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ScreenState } from "@/types/diagnostic";

const QoEExplainerScreen: React.FC = () => {
  const { qoeSelected, setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const qoeType = qoeSelected?.type || "modem_deregs";

  const iconMap: Record<string, React.ReactNode> = {
    modem_deregs: <RotateCcw className="w-8 h-8 text-warning" />,
    dropcable: <Cable className="w-8 h-8 text-warning" />,
    coverage: <MapPin className="w-8 h-8 text-warning" />,
    filter: <Wrench className="w-8 h-8 text-warning" />,
    filter_hp47: <Wrench className="w-8 h-8 text-warning" />,
    filter_tof: <Wrench className="w-8 h-8 text-warning" />,
    dice: <Wrench className="w-8 h-8 text-warning" />,
    broken_hardware_modem: <Cpu className="w-8 h-8 text-destructive" />,
  };

  const resolutionMap: Record<string, ScreenState> = {
    modem_deregs: "qoe_modem_deregs",
    dropcable: "qoe_dropcable",
    coverage: "qoe_coverage",
    filter: "qoe_filter",
    filter_hp47: "qoe_filter_hp47",
    filter_tof: "qoe_filter_tof",
    dice: "qoe_dice",
    broken_hardware_modem: "qoe_broken_hardware_modem",
  };

  const label = t(`qoe.explainer.${qoeType}.label`, { defaultValue: t("qoe.explainer.modem_deregs.label") });
  const description = t(`qoe.explainer.${qoeType}.description`, { defaultValue: t("qoe.explainer.modem_deregs.description") });
  const icon = iconMap[qoeType] || iconMap.modem_deregs;
  const resolution = resolutionMap[qoeType] || "qoe_modem_deregs";

  return (
    <ScreenShell>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
        <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto">{icon}</div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-2xl font-bold tracking-tight text-foreground mb-2" style={{ textWrap: "balance" } as React.CSSProperties}>{label}</motion.h1>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-muted-foreground mb-8 leading-relaxed text-sm" style={{ textWrap: "pretty" } as React.CSSProperties}>{description}</motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="w-full">
        <ActionButton onClick={() => setCurrentState(resolution)} icon={<ChevronRight className="w-5 h-5" />}>{t("qoe.explainer.whatCanIDo")}</ActionButton>
      </motion.div>
    </ScreenShell>
  );
};

export default QoEExplainerScreen;
