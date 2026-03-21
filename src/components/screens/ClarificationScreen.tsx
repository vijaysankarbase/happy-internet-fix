import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Wifi, HelpCircle } from "lucide-react";

const ClarificationScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><HelpCircle className="w-8 h-8 text-primary" /></div>}
      title="What kind of issue?"
      subtitle="Help us narrow down the problem."
    >
      <div className="flex flex-col gap-3">
        <ActionButton variant="outline" onClick={() => setCurrentState("wifi_flow")} icon={<Wifi className="w-5 h-5" />}>
          WiFi issues
        </ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<HelpCircle className="w-5 h-5" />}>
          Something else
        </ActionButton>
      </div>
    </ScreenShell>
  );
};

export default ClarificationScreen;
