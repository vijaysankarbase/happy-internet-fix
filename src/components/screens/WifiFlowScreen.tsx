import React, { useState } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Wifi, Router, MapPin, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const WifiFlowScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const [step, setStep] = useState<"tips" | "verify">("tips");

  if (step === "verify") {
    return (
      <ScreenShell title={t("wifiFlow.isBetter")}>
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>{t("wifiFlow.yes")}</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>{t("wifiFlow.noNeedHelp")}</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  const tips = [
    { icon: <Router className="w-5 h-5" />, text: t("wifiFlow.tip1") },
    { icon: <MapPin className="w-5 h-5" />, text: t("wifiFlow.tip2") },
    { icon: <Wifi className="w-5 h-5" />, text: t("wifiFlow.tip3") },
  ];

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><Wifi className="w-8 h-8 text-primary" /></div>} title={t("wifiFlow.title")} subtitle={isPositive ? t("wifiFlow.subtitlePositive") : t("wifiFlow.subtitleNegative")}>
      <div className="flex flex-col gap-3 mb-6">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">{tip.icon}</div>
            <p className="text-foreground font-medium text-sm">{tip.text}</p>
          </div>
        ))}
      </div>
      <ActionButton onClick={() => setStep("verify")}>{t("wifiFlow.triedThese")}</ActionButton>
    </ScreenShell>
  );
};

export default WifiFlowScreen;
