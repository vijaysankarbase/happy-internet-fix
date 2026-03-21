import React, { useState } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { WifiOff, Plug, Cable, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

const ModemOfflineScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"steps" | "verify">("steps");

  if (step === "verify") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><WifiOff className="w-8 h-8 text-warning" /></div>}
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
