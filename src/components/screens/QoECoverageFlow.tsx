import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic, getHomeInputs } from "@/context/DiagnosticContext";
import { Wifi, WifiOff, MapPin, ShoppingCart, ExternalLink, XCircle, CheckCircle2, Loader2, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const BoosterQuestion: React.FC<{ onAnswer: (answer: "yes" | "no" | "unknown") => void }> = ({ onAnswer }) => {
  const { t } = useTranslation();
  return (
    <ScreenShell icon={<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"><Wifi className="w-10 h-10 text-primary" /></div>} title={t("coverage.quickQuestion")} subtitle={t("coverage.boosterQuestion")}>
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => onAnswer("yes")} icon={<CheckCircle2 className="w-5 h-5" />}>{t("coverage.yes")}</ActionButton>
        <ActionButton variant="outline" onClick={() => onAnswer("no")} icon={<XCircle className="w-5 h-5" />}>{t("coverage.no")}</ActionButton>
        <ActionButton variant="outline" onClick={() => onAnswer("unknown")} icon={<HelpCircle className="w-5 h-5" />}>{t("coverage.iDontKnow")}</ActionButton>
      </div>
    </ScreenShell>
  );
};

const CoverageInterference: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const [step, setStep] = useState<"cause" | "solutions" | "turning_off" | "verify">("cause");

  useEffect(() => { if (step !== "turning_off") return; const timer = setTimeout(() => setStep("verify"), 5000); return () => clearTimeout(timer); }, [step]);

  if (step === "verify") return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-primary" /></div>} title={t("coverage.interference.verifyTitle")} subtitle={t("coverage.interference.verifySubtitle")}>
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>{t("common.yesBetter")}</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("wifi_help")} icon={<XCircle className="w-5 h-5" />}>{t("common.noStillNeed")}</ActionButton>
      </div>
    </ScreenShell>
  );

  if (step === "turning_off") return (
    <ScreenShell title={t("coverage.interference.turningOff")}>
      <div className="flex flex-col items-center gap-6 py-8"><Loader2 className="w-14 h-14 text-primary animate-spin" /><p className="text-sm text-muted-foreground text-center">{t("coverage.interference.turningOffWait")}</p></div>
    </ScreenShell>
  );

  if (step === "solutions") return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><WifiOff className="w-8 h-8 text-warning" /></div>} title={t("coverage.interference.solutionsTitle")} subtitle={t("coverage.interference.solutionsSubtitle")}>
      <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><WifiOff className="w-5 h-5" /></div>
        <div><p className="font-semibold text-foreground text-sm">{t("coverage.interference.turnOff")}</p><p className="text-xs text-muted-foreground mt-1">{t("coverage.interference.turnOffDesc")}</p></div>
      </div>
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setStep("turning_off")} icon={<WifiOff className="w-5 h-5" />}>{t("coverage.interference.turnOffRemotely")}</ActionButton>
        <ActionButton variant="outline" onClick={() => window.open("https://www.base.be/en/support/internet/your-base-modem-and-wifi-booster/how-to-install-wifi-boosters.html", "_blank")} icon={<ExternalLink className="w-5 h-5" />}>{t("coverage.checkInstallation")}</ActionButton>
        <ActionButton variant="ghost" onClick={() => setCurrentState("wifi_help")} icon={<XCircle className="w-5 h-5" />}>{t("coverage.interference.notHelpful")}</ActionButton>
      </div>
    </ScreenShell>
  );

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wifi className="w-8 h-8 text-warning" /></div>} title={t("coverage.wobblyDetected")} subtitle={t("coverage.interference.subtitle")}>
      <ActionButton onClick={() => setStep("solutions")}>{t("common.whatCanIDo")}</ActionButton>
    </ScreenShell>
  );
};

const CoveragePoorBooster: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const [step, setStep] = useState<"cause" | "solutions">("cause");

  if (step === "solutions") return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><MapPin className="w-8 h-8 text-warning" /></div>} title={t("coverage.poorBooster.solutionsTitle")} subtitle={t("coverage.poorBooster.solutionsSubtitle")}>
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><MapPin className="w-5 h-5" /></div>
          <div><p className="font-semibold text-foreground text-sm">{t("coverage.poorBooster.reposition")}</p><p className="text-xs text-muted-foreground mt-1">{t("coverage.poorBooster.repositionDesc")}</p></div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => window.open("https://www.base.be/en/internet/wifi-booster.html", "_blank")} icon={<ShoppingCart className="w-5 h-5" />}>{t("coverage.poorBooster.buyBooster")}</ActionButton>
        <ActionButton variant="outline" onClick={() => window.open("https://www.base.be/en/support/internet/your-base-modem-and-wifi-booster/how-to-install-wifi-boosters.html", "_blank")} icon={<ExternalLink className="w-5 h-5" />}>{t("coverage.checkInstallation")}</ActionButton>
        <ActionButton variant="outline" onClick={() => window.open("https://www.base.be/en/support/internet/problem-with-internet-or-wifi/my-deco-wifi-booster-is-not-working-well.html", "_blank")} icon={<ExternalLink className="w-5 h-5" />}>{t("coverage.poorBooster.tipsAndTricks")}</ActionButton>
        <ActionButton variant="ghost" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>{t("coverage.poorBooster.notHelpful")}</ActionButton>
      </div>
    </ScreenShell>
  );

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><MapPin className="w-8 h-8 text-warning" /></div>} title={t("coverage.wobblyDetected")} subtitle={t("coverage.poorBooster.subtitle")}>
      <ActionButton onClick={() => setStep("solutions")}>{t("common.whatCanIDo")}</ActionButton>
    </ScreenShell>
  );
};

const CoverageGeneral: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const [step, setStep] = useState<"cause" | "solutions">("cause");

  if (step === "solutions") return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wifi className="w-8 h-8 text-warning" /></div>} title={t("coverage.general.solutionsTitle")} subtitle={t("coverage.general.solutionsSubtitle")}>
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><MapPin className="w-5 h-5" /></div>
          <div><p className="font-semibold text-foreground text-sm">{t("coverage.general.reposition")}</p><p className="text-xs text-muted-foreground mt-1">{t("coverage.general.repositionDesc")}</p></div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => window.open("https://www.base.be/en/internet/wifi-booster.html", "_blank")} icon={<ShoppingCart className="w-5 h-5" />}>{t("coverage.general.orderBooster")}</ActionButton>
        <ActionButton variant="outline" onClick={() => window.open("https://www.base.be/en/support/internet/problem-with-internet-or-wifi/problem-with-wi-fi-at-home.html", "_blank")} icon={<ExternalLink className="w-5 h-5" />}>{t("coverage.general.diyTips")}</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>{t("coverage.general.notHelpful")}</ActionButton>
      </div>
    </ScreenShell>
  );

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wifi className="w-8 h-8 text-warning" /></div>} title={t("coverage.wobblyDetected")} subtitle={t("coverage.general.subtitle")}>
      <ActionButton onClick={() => setStep("solutions")}>{t("common.whatCanIDo")}</ActionButton>
    </ScreenShell>
  );
};

const QoECoverageBoosterScreen: React.FC = () => {
  const { panelInputs, selectedProduct } = useDiagnostic();
  const [boosterAnswer, setBoosterAnswer] = useState<"yes" | "no" | "unknown" | null>(null);
  const homeInputs = getHomeInputs(panelInputs, selectedProduct);

  if (!boosterAnswer) return <BoosterQuestion onAnswer={setBoosterAnswer} />;
  if (boosterAnswer === "yes") return homeInputs.modemWifiOn ? <CoverageInterference /> : <CoveragePoorBooster />;
  return <CoverageGeneral />;
};

export default QoECoverageBoosterScreen;
