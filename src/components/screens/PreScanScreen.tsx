import React from "react";
import { motion } from "framer-motion";
import ScreenShell from "@/components/ScreenShell";
import ActionButton from "@/components/ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Scan, RotateCcw, Wifi, Globe, Router } from "lucide-react";
import { useTranslation } from "react-i18next";

const PreScanScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();

  const checks = [
    { icon: <Router className="w-5 h-5 text-primary" />, label: t("preScan.modemStatus") },
    { icon: <Globe className="w-5 h-5 text-primary" />, label: t("preScan.networkStatus") },
    { icon: <Wifi className="w-5 h-5 text-primary" />, label: t("preScan.connectionQuality") },
  ];

  return (
    <ScreenShell>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Scan className="w-10 h-10 text-primary" />
        </div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-2xl font-bold tracking-tight text-foreground mb-2" style={{ textWrap: "balance" } as React.CSSProperties}>
        {t("preScan.title")}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-muted-foreground mb-6 leading-relaxed text-sm" style={{ textWrap: "pretty" } as React.CSSProperties}>
        {t("preScan.subtitle")}
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }} className="w-full flex flex-col gap-3 mb-8">
        {checks.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">{item.icon}</div>
            <span className="text-sm font-medium text-foreground">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
      <div className="w-full flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("scanning")} icon={<Scan className="w-5 h-5" />}>{t("preScan.startNewScan")}</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("retest_warning")} icon={<RotateCcw className="w-5 h-5" />}>{t("preScan.retestAfterFix")}</ActionButton>
      </div>
    </ScreenShell>
  );
};

export default PreScanScreen;
