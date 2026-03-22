import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import {
  Wifi, WifiOff, MapPin, ShoppingCart, ExternalLink, XCircle,
  CheckCircle2, AlertTriangle, Loader2, HelpCircle, RotateCcw,
} from "lucide-react";

/* ─── Step 1: Booster question ─── */
const BoosterQuestion: React.FC<{ onAnswer: (answer: "yes" | "no" | "unknown") => void }> = ({ onAnswer }) => (
  <ScreenShell
    icon={
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <Wifi className="w-10 h-10 text-primary" />
      </div>
    }
    title="Quick question"
    subtitle="Do you have a WiFi booster installed in your home?"
  >
    <div className="flex flex-col gap-3">
      <ActionButton onClick={() => onAnswer("yes")} icon={<CheckCircle2 className="w-5 h-5" />}>
        Yes
      </ActionButton>
      <ActionButton variant="outline" onClick={() => onAnswer("no")} icon={<XCircle className="w-5 h-5" />}>
        No
      </ActionButton>
      <ActionButton variant="outline" onClick={() => onAnswer("unknown")} icon={<HelpCircle className="w-5 h-5" />}>
        I don't know
      </ActionButton>
    </div>
  </ScreenShell>
);

/* ─── Flow 1: Booster YES + modem wifi ON → interference ─── */
const CoverageInterference: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "solutions" | "turning_off" | "verify">("cause");

  useEffect(() => {
    if (step !== "turning_off") return;
    const timer = setTimeout(() => setStep("verify"), 5000);
    return () => clearTimeout(timer);
  }, [step]);

  if (step === "verify") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-primary" /></div>}
        title="Verify if it worked"
        subtitle="Did turning off the modem WiFi improve your experience?"
      >
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>
            Yes, it's better!
          </ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("wifi_help")} icon={<XCircle className="w-5 h-5" />}>
            No, I still need help
          </ActionButton>
        </div>
      </ScreenShell>
    );
  }

  if (step === "turning_off") {
    return (
      <ScreenShell title="Turning off modem WiFi">
        <div className="flex flex-col items-center gap-6 py-8">
          <Loader2 className="w-14 h-14 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground text-center">
            Please wait while we turn off your modem's WiFi radio…
          </p>
        </div>
      </ScreenShell>
    );
  }

  if (step === "solutions") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><WifiOff className="w-8 h-8 text-warning" /></div>}
        title="Possible solutions"
        subtitle="Your modem WiFi and booster may be competing for signal. Turning off the modem's WiFi lets your booster handle everything — reducing interference."
      >
        <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left mb-4">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
            <WifiOff className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Turn off modem WiFi</p>
            <p className="text-xs text-muted-foreground mt-1">Let your booster manage the wireless signal to avoid interference.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setStep("turning_off")} icon={<WifiOff className="w-5 h-5" />}>
            Turn off modem WiFi remotely
          </ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>
            This suggestion is not helpful
          </ActionButton>
        </div>
      </ScreenShell>
    );
  }

  // cause
  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wifi className="w-8 h-8 text-warning" /></div>}
      title="Wobbly WiFi detected"
      subtitle="The most probable cause is battling WiFi signals — your modem and booster are both broadcasting, which can create interference."
    >
      <ActionButton onClick={() => setStep("solutions")}>What can I do?</ActionButton>
    </ScreenShell>
  );
};

/* ─── Flow 2: Booster YES + modem wifi OFF → poor booster location ─── */
const CoveragePoorBooster: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "solutions">("cause");

  if (step === "solutions") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><MapPin className="w-8 h-8 text-warning" /></div>}
        title="Possible solutions"
        subtitle="Your booster might be too far from the modem, or it may not be strong enough to cover your whole home."
      >
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Reposition your booster</p>
              <p className="text-xs text-muted-foreground mt-1">Move it closer to your modem or to a central location in your home.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton
            onClick={() => window.open("https://www.base.be/en/internet/wifi-booster.html", "_blank")}
            icon={<ShoppingCart className="w-5 h-5" />}
          >
            Buy a booster
          </ActionButton>
          <ActionButton
            variant="outline"
            onClick={() => window.open("https://www.base.be/en/support/internet/problem-with-internet-or-wifi/my-deco-wifi-booster-is-not-working-well.html", "_blank")}
            icon={<ExternalLink className="w-5 h-5" />}
          >
            Tips and tricks
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
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><MapPin className="w-8 h-8 text-warning" /></div>}
      title="Wobbly WiFi detected"
      subtitle="The most probable cause is poor booster placement — your modem WiFi is off, so coverage depends entirely on your booster's reach."
    >
      <ActionButton onClick={() => setStep("solutions")}>What can I do?</ActionButton>
    </ScreenShell>
  );
};

/* ─── Flow 3: No booster / unknown → general coverage ─── */
const CoverageGeneral: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "solutions">("cause");

  if (step === "solutions") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wifi className="w-8 h-8 text-warning" /></div>}
        title="Possible solutions"
        subtitle="Your modem's WiFi signal may not be strong enough to reach every room. Here's what can help."
      >
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Reposition your modem</p>
              <p className="text-xs text-muted-foreground mt-1">Move it to a central, elevated spot away from walls and electronics.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton
            onClick={() => window.open("https://www.base.be/en/internet/wifi-booster.html", "_blank")}
            icon={<ShoppingCart className="w-5 h-5" />}
          >
            Order a WiFi Booster
          </ActionButton>
          <ActionButton
            variant="outline"
            onClick={() => window.open("https://www.base.be/en/support/internet/problem-with-internet-or-wifi/problem-with-wi-fi-at-home.html", "_blank")}
            icon={<ExternalLink className="w-5 h-5" />}
          >
            DIY tips and tricks
          </ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>
            These suggestions are not helpful
          </ActionButton>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wifi className="w-8 h-8 text-warning" /></div>}
      title="Wobbly WiFi detected"
      subtitle="The most probable cause is a WiFi coverage issue — your modem's signal may not reach all areas of your home."
    >
      <ActionButton onClick={() => setStep("solutions")}>What can I do?</ActionButton>
    </ScreenShell>
  );
};

/* ─── Main coverage orchestrator ─── */
const QoECoverageBoosterScreen: React.FC = () => {
  const { panelInputs } = useDiagnostic();
  const [boosterAnswer, setBoosterAnswer] = useState<"yes" | "no" | "unknown" | null>(null);

  if (!boosterAnswer) {
    return <BoosterQuestion onAnswer={setBoosterAnswer} />;
  }

  if (boosterAnswer === "yes") {
    // Has booster — check modem wifi
    if (panelInputs.modemWifiOn) {
      return <CoverageInterference />;
    }
    return <CoveragePoorBooster />;
  }

  // No booster or unknown
  return <CoverageGeneral />;
};

export default QoECoverageBoosterScreen;
