import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Wifi, Headphones, Lightbulb } from "lucide-react";

const MismatchActionsScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();

  return (
    <ScreenShell
      icon={
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-10 h-10 text-primary" />
        </div>
      }
      title="Let's make it right"
      subtitle="Here are some things you can try to improve your experience."
    >
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("wifi_help")} icon={<Wifi className="w-5 h-5" />}>
          General WiFi help
        </ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<Headphones className="w-5 h-5" />}>
          Contact us
        </ActionButton>
      </div>
    </ScreenShell>
  );
};

export default MismatchActionsScreen;
