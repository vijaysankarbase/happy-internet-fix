import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertTriangle, Clock } from "lucide-react";

const NetworkIncidentScreen: React.FC = () => {
  const { isPositive, diagnosticResult, setCurrentState } = useDiagnostic();
  const incident = diagnosticResult?.network.incident;

  const startDate = incident?.startDate
    ? new Date(incident.startDate).toLocaleString()
    : "Unknown";
  const eta = incident?.eta
    ? new Date(incident.eta).toLocaleString()
    : null;

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><AlertTriangle className="w-8 h-8 text-warning" /></div>}
      title="Network issue in your area"
      subtitle={isPositive ? "We're aware of a network issue affecting your area. Our team is actively working on resolving it." : "Known issue detected."}
    >
      <div className="flex flex-col gap-3 mb-6">
        <div className="p-4 rounded-xl bg-card border border-border text-left">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Clock className="w-4 h-4" /> Started
          </div>
          <p className="font-semibold text-foreground">{startDate}</p>
        </div>
        {eta && (
          <div className="p-4 rounded-xl bg-card border border-border text-left">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="w-4 h-4" /> Estimated resolution
            </div>
            <p className="font-semibold text-foreground">{eta}</p>
          </div>
        )}
      </div>
      {isPositive && (
        <p className="text-sm text-muted-foreground mb-4">
          You'll be automatically reconnected once the issue is resolved. No action needed on your end.
        </p>
      )}
      <ActionButton onClick={() => setCurrentState("success")}>Got it, thanks</ActionButton>
    </ScreenShell>
  );
};

export default NetworkIncidentScreen;
