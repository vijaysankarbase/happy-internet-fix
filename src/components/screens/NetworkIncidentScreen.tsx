import React, { useState } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertTriangle, Clock, Wrench, Info } from "lucide-react";

const NetworkIncidentScreen: React.FC = () => {
  const { diagnosticResult, setCurrentState, entryPoint } = useDiagnostic();
  const incident = diagnosticResult?.network.incident;
  const [step, setStep] = useState<"cause" | "solutions">("cause");

  const eta = incident?.eta
    ? new Date(incident.eta).toLocaleString()
    : null;

  const exitToStart = () => {
    setCurrentState("entry");
  };

  if (step === "solutions") {
    return (
      <ScreenShell
        icon={
          <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
            <Wrench className="w-8 h-8 text-warning" />
          </div>
        }
        title="Possible solutions"
      >
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Wait until technicians fix it</p>
              <p className="text-sm text-muted-foreground mt-1">Our team is already aware and working on resolving this issue.</p>
            </div>
          </div>
          {eta && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">Estimated fix time: <span className="font-medium text-foreground">{eta}</span></p>
            </div>
          )}
        </div>
        <ActionButton onClick={exitToStart}>
          Got it, thanks
        </ActionButton>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={
        <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-warning" />
        </div>
      }
      title="Poor or no connectivity"
      subtitle="We detect that you have poor or no connectivity. The most probable cause is a network issue that we are already aware of and working on."
    >
      <ActionButton onClick={() => setStep("solutions")}>
        What can I do?
      </ActionButton>
    </ScreenShell>
  );
};

export default NetworkIncidentScreen;
