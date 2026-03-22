import React, { useState } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertTriangle, Clock, Wrench, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const NetworkIncidentScreen: React.FC = () => {
  const { diagnosticResult, setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const incident = diagnosticResult?.network.incident;
  const [step, setStep] = useState<"cause" | "solutions">("cause");
  const eta = incident?.eta ? new Date(incident.eta).toLocaleString() : null;

  if (step === "solutions") {
    return (
      <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-warning" /></div>} title={t("networkIncident.solutionsTitle")}>
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><Clock className="w-5 h-5" /></div>
            <div><p className="font-semibold text-foreground">{t("networkIncident.waitForTech")}</p><p className="text-sm text-muted-foreground mt-1">{t("networkIncident.waitForTechDesc")}</p></div>
          </div>
          {eta && (<div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left"><Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground">{t("networkIncident.estimatedFix")} <span className="font-medium text-foreground">{eta}</span></p></div>)}
        </div>
        <ActionButton onClick={() => setCurrentState("entry")}>{t("networkIncident.gotIt")}</ActionButton>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><AlertTriangle className="w-8 h-8 text-warning" /></div>} title={t("networkIncident.title")} subtitle={t("networkIncident.subtitle")}>
      <ActionButton onClick={() => setStep("solutions")}>{t("common.whatCanIDo")}</ActionButton>
    </ScreenShell>
  );
};

export default NetworkIncidentScreen;
