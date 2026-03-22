import React, { useState } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { WifiOff, Plug, RotateCcw, XCircle, AlertTriangle, Info } from "lucide-react";
import { evaluateDiagnostic } from "@/lib/diagnosticEngine";

const ModemOfflineScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "solutions">("cause");

  const redoDiagnosis = () => {
    const apiResponse = {
      modem: { inService: panelInputs.modemInService },
      network: {
        incident: { active: panelInputs.incidentActive },
        change: { active: panelInputs.changeActive },
        problem: { active: panelInputs.problemActive },
      },
      qoe: panelInputs.selectedQoe.map((type) => ({
        type,
        priority: PRIORITY_MAP[type] ?? 99,
      })),
    };
    const { state, qoeSelected } = evaluateDiagnostic(apiResponse);
    setQoeSelected(qoeSelected);
    setCurrentState(state);
  };

  if (step === "solutions") {
    return (
      <ScreenShell
        icon={
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <WifiOff className="w-8 h-8 text-destructive" />
          </div>
        }
        title="Possible solutions"
      >
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
              <Plug className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Turn on the modem</p>
              <p className="text-sm text-muted-foreground mt-1">Make sure your modem is powered on and the power light is solid.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Restart the modem</p>
              <p className="text-sm text-muted-foreground mt-1">Unplug your modem, wait 10 seconds, then plug it back in.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
            <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Wait at least 5 minutes before retesting your connection.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton onClick={redoDiagnosis} icon={<RotateCcw className="w-5 h-5" />}>
            Redo test
          </ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>
            This suggestion is not helpful
          </ActionButton>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <WifiOff className="w-8 h-8 text-destructive" />
        </div>
      }
      title="No internet connection"
      subtitle="We detect that you have no internet connection."
    >
      <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20 mb-6">
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
        <p className="text-sm font-medium text-foreground">Most probable cause: <span className="text-destructive">modem offline</span></p>
      </div>
      <ActionButton onClick={() => setStep("solutions")}>
        What can I do?
      </ActionButton>
    </ScreenShell>
  );
};

export default ModemOfflineScreen;
