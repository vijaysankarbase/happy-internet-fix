import React, { useState } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Wifi, Router, MapPin, CheckCircle2, XCircle } from "lucide-react";

const WifiFlowScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"tips" | "verify">("tips");

  if (step === "verify") {
    return (
      <ScreenShell title="Is your WiFi better now?">
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>Yes!</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>No, I need help</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  const tips = [
    { icon: <Router className="w-5 h-5" />, text: "Restart your WiFi router" },
    { icon: <MapPin className="w-5 h-5" />, text: "Move closer to the router" },
    { icon: <Wifi className="w-5 h-5" />, text: "Disconnect unused devices" },
  ];

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><Wifi className="w-8 h-8 text-primary" /></div>}
      title="WiFi troubleshooting"
      subtitle={isPositive ? "Let's try a few things to improve your WiFi:" : "Quick WiFi fixes:"}
    >
      <div className="flex flex-col gap-3 mb-6">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">{tip.icon}</div>
            <p className="text-foreground font-medium text-sm">{tip.text}</p>
          </div>
        ))}
      </div>
      <ActionButton onClick={() => setStep("verify")}>I've tried these</ActionButton>
    </ScreenShell>
  );
};

export default WifiFlowScreen;
