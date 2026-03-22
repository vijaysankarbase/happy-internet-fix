import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Clock, Search, Lightbulb } from "lucide-react";

const PositiveMismatchActionsScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();

  return (
    <ScreenShell
      icon={
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-10 h-10 text-primary" />
        </div>
      }
      title="Possible actions"
      subtitle="Since everything feels fine on your end, here's what you can do."
    >
      <div className="flex flex-col gap-3">
        <ActionButton variant="outline" onClick={() => setCurrentState("entry")} icon={<Clock className="w-5 h-5" />}>
          Do nothing & come back later
        </ActionButton>
        <ActionButton onClick={() => setCurrentState("qoe_explainer")} icon={<Search className="w-5 h-5" />}>
          Dive into the problem
        </ActionButton>
      </div>
    </ScreenShell>
  );
};

export default PositiveMismatchActionsScreen;
