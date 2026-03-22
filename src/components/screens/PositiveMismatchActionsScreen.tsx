import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Clock, Search, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

const PositiveMismatchActionsScreen: React.FC = () => {
  const { setCurrentState, diagnosticResult, qoeSelected } = useDiagnostic();
  const { t } = useTranslation();

  const isNetworkIssue = diagnosticResult && (
    diagnosticResult.network.incident.active ||
    diagnosticResult.network.change.active ||
    diagnosticResult.network.problem.active
  );

  const handleDiveIn = () => {
    if (isNetworkIssue && !qoeSelected) {
      setCurrentState("network_incident");
    } else {
      setCurrentState("qoe_explainer");
    }
  };

  return (
    <ScreenShell
      icon={<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"><Lightbulb className="w-10 h-10 text-primary" /></div>}
      title={t("positiveMismatchActions.title")}
      subtitle={t("positiveMismatchActions.subtitle")}
    >
      <div className="flex flex-col gap-3">
        <ActionButton variant="outline" onClick={() => setCurrentState("entry")} icon={<Clock className="w-5 h-5" />}>{t("positiveMismatchActions.doNothing")}</ActionButton>
        <ActionButton onClick={handleDiveIn} icon={<Search className="w-5 h-5" />}>{t("positiveMismatchActions.diveIn")}</ActionButton>
      </div>
    </ScreenShell>
  );
};

export default PositiveMismatchActionsScreen;
