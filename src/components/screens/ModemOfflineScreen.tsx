import React, { useState } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { WifiOff, Plug, Cable, RotateCcw, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import { evaluateDiagnostic } from "@/lib/diagnosticEngine";

const PRIORITY_MAP: Record<string, number> = {
  filter_hp47: 0.0,
  filter_tof: 0.0,
  dropcable: 1.1,
  dice: 1.2,
  modem_deregs: 2.1,
  broken_hardware_modem: 2.2,
  coverage: 3.5,
};

const ModemOfflineScreen: React.FC = () => {
  const { isPositive, setCurrentState, setQoeSelected, panelInputs } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "solutions" | "verify">("cause");

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

  // POSITIVE FLOW
  if (isPositive) {
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
              This is not helpful
            </ActionButton>
          </div>
        </ScreenShell>
      );
    }

    // Step: cause (initial positive screen)
    return (
      <ScreenShell
        icon={
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <WifiOff className="w-8 h-8 text-destructive" />
          </div>
        }
        title="No WiFi"
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
  }

  // NEGATIVE FLOW (unchanged)
  if (step === "verify") {
    return (
      <ScreenShell
        icon={
          <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
            <WifiOff className="w-8 h-8 text-warning" />
          </div>
        }
        title="Is your internet working now?"
      >
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>
            Yes, it's working!
          </ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>
            No, still not working
          </ActionButton>
        </div>
      </ScreenShell>
    );
  }

  const steps = [
    { icon: <Plug className="w-5 h-5" />, label: "Check power connection", desc: isPositive ? "Make sure your modem's power cable is securely plugged in and the outlet is working." : undefined },
    { icon: <Cable className="w-5 h-5" />, label: "Check cables", desc: isPositive ? "Ensure all ethernet and coax cables are firmly connected to your modem." : undefined },
    { icon: <RotateCcw className="w-5 h-5" />, label: "Restart modem", desc: isPositive ? "Unplug your modem for 30 seconds, then plug it back in and wait 2 minutes." : undefined },
  ];

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><WifiOff className="w-8 h-8 text-destructive" /></div>}
      title="Your modem appears to be offline"
      subtitle={isPositive ? "Let's try a few things to get you back online." : "Try these quick fixes."}
    >
      <div className="flex flex-col gap-3 mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
              {s.icon}
            </div>
            <div>
              <p className="font-semibold text-foreground">{s.label}</p>
              {s.desc && <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>}
            </div>
          </div>
        ))}
      </div>
      <ActionButton onClick={() => setStep("verify")}>I've tried these steps</ActionButton>
      {!isPositive && (
        <div className="mt-3">
          <ActionButton variant="ghost" onClick={() => setCurrentState("support")}>
            Skip to support
          </ActionButton>
        </div>
      )}
    </ScreenShell>
  );
};

export default ModemOfflineScreen;
