import React, { useState, useEffect } from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { RotateCcw, Cable, MapPin, Wrench, CheckCircle2, XCircle } from "lucide-react";

const QoEModemDeregsScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();
  const [phase, setPhase] = useState<"rebooting" | "verify">("rebooting");
  const [countdown, setCountdown] = useState(180);

  useEffect(() => {
    if (phase !== "rebooting") return;
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          setPhase("verify");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  if (phase === "rebooting") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><RotateCcw className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: "3s" }} /></div>}
        title="Rebooting your modem"
        subtitle={isPositive ? "We've triggered a remote reboot. This usually takes 2-3 minutes." : "Rebooting remotely..."}
      >
        <div className="text-4xl font-bold text-foreground tabular-nums">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we restart your modem</p>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center"><RotateCcw className="w-8 h-8 text-success" /></div>}
      title="Reboot complete"
      subtitle="Is your connection working now?"
    >
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>Yes, it's working!</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("misalignment")} icon={<XCircle className="w-5 h-5" />}>No, still having issues</ActionButton>
      </div>
    </ScreenShell>
  );
};

const QoEDropcableScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"action" | "verify">("action");

  if (step === "verify") {
    return (
      <ScreenShell title="Did that fix the issue?">
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>Yes!</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("misalignment")} icon={<XCircle className="w-5 h-5" />}>No</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Cable className="w-8 h-8 text-warning" /></div>}
      title="Cable connection issue"
      subtitle={isPositive ? "We've detected a signal issue that may be caused by a loose cable. Please check and tighten the coax cable connected to your modem." : "Check and tighten the cable on your modem."}
    >
      <ActionButton onClick={() => setStep("verify")}>I've checked the cable</ActionButton>
    </ScreenShell>
  );
};

const QoECoverageScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();
  const [phase, setPhase] = useState<"confirm" | "tips" | "verify">("confirm");

  if (phase === "verify") {
    return (
      <ScreenShell title="Did repositioning help?">
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>Yes, much better!</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")}>No, I need more help</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  if (phase === "tips") {
    const tips = [
      "Move your router to a central, elevated location",
      "Keep it away from walls, microwaves, and other electronics",
      "Consider a WiFi booster for hard-to-reach areas",
    ];
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><MapPin className="w-8 h-8 text-primary" /></div>}
        title="Coverage tips"
        subtitle={isPositive ? "Here are some things that can improve your WiFi coverage:" : "Try these:"}
      >
        <div className="flex flex-col gap-3 mb-6 text-left">
          {tips.map((tip, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="text-foreground text-sm">{tip}</p>
            </div>
          ))}
        </div>
        <ActionButton onClick={() => setPhase("verify")}>I've tried these</ActionButton>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><MapPin className="w-8 h-8 text-warning" /></div>}
      title="WiFi coverage issues detected"
      subtitle="Does this match what you're experiencing — weak signal in parts of your home?"
    >
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setPhase("tips")}>Yes, that sounds right</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("misalignment")}>No, my issue is different</ActionButton>
      </div>
    </ScreenShell>
  );
};

const QoETechnicianScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-destructive" /></div>}
      title="Technician required"
      subtitle="This issue requires an on-site visit from one of our technicians."
    >
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("support")}>Contact support</ActionButton>
      </div>
    </ScreenShell>
  );
};

const QoEBrokenHardwareScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-destructive" /></div>}
      title="Modem replacement needed"
      subtitle={isPositive ? "We've detected a hardware issue with your modem that requires a replacement." : "Your modem needs to be replaced."}
    >
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("support")}>Schedule replacement</ActionButton>
      </div>
    </ScreenShell>
  );
};

export { QoEModemDeregsScreen, QoEDropcableScreen, QoECoverageScreen, QoETechnicianScreen, QoEBrokenHardwareScreen };
