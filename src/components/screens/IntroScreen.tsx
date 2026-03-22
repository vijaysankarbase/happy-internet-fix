import React from "react";
import { motion } from "framer-motion";
import ScreenShell from "@/components/ScreenShell";
import ActionButton from "@/components/ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Sparkles, Heart, Search, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

const IntroScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();
  const { t } = useTranslation();

  const handleStartDiagnosis = () => {
    setCurrentState("pre_scan");
  };

  if (isPositive) {
    return (
      <ScreenShell hideClose>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10 text-success" />
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="text-2xl font-bold tracking-tight text-foreground mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
          {t("intro.positiveTitle")}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="text-muted-foreground mb-8 leading-relaxed" style={{ textWrap: "pretty" } as React.CSSProperties}>
          {t("intro.positiveSubtitle")}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="w-full flex flex-col gap-3">
          <ActionButton onClick={handleStartDiagnosis} icon={<Search className="w-5 h-5" />}>{t("intro.startDiagnosis")}</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("entry")} icon={<LogOut className="w-5 h-5" />}>{t("intro.exit")}</ActionButton>
        </motion.div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell hideClose>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10 text-primary" />
        </div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="text-2xl font-bold tracking-tight text-foreground mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
        {t("intro.negativeTitle")}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="text-muted-foreground mb-8 leading-relaxed" style={{ textWrap: "pretty" } as React.CSSProperties}>
        {t("intro.negativeSubtitle")}
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="w-full flex flex-col gap-3">
        <ActionButton onClick={handleStartDiagnosis} icon={<Search className="w-5 h-5" />}>{t("intro.startDiagnosis")}</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("entry")} icon={<LogOut className="w-5 h-5" />}>{t("intro.exit")}</ActionButton>
      </motion.div>
    </ScreenShell>
  );
};

export default IntroScreen;
