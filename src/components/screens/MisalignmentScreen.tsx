import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { RefreshCw, WifiOff, Gauge, MapPin, Zap, HelpCircle } from "lucide-react";
import type { ScreenState } from "@/types/diagnostic";

const MisalignmentScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();

  const options: { label: string; icon: React.ReactNode; target: ScreenState }[] = [
    { label: "No internet at all", icon: <WifiOff className="w-5 h-5" />, target: "modem_offline" },
    { label: "Slow speeds", icon: <Gauge className="w-5 h-5" />, target: "qoe_modem_deregs" },
    { label: "WiFi coverage", icon: <MapPin className="w-5 h-5" />, target: "qoe_coverage" },
    { label: "Intermittent drops", icon: <Zap className="w-5 h-5" />, target: "qoe_dropcable" },
    { label: "Something else", icon: <HelpCircle className="w-5 h-5" />, target: "support" },
  ];

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><RefreshCw className="w-8 h-8 text-warning" /></div>}
      title="Let's try again"
      subtitle="We may not have identified the right issue. What best describes your problem?"
    >
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <ActionButton key={opt.label} variant="outline" onClick={() => setCurrentState(opt.target)} icon={opt.icon}>
            {opt.label}
          </ActionButton>
        ))}
      </div>
    </ScreenShell>
  );
};

export default MisalignmentScreen;
