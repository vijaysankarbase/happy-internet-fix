import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { CheckCircle2, HelpCircle } from "lucide-react";

const AllClearScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-success" /></div>}
      title="No issues detected"
      subtitle="Your connection looks healthy from our end."
    >
      <p className="text-foreground font-medium mb-6">Are you still experiencing problems?</p>
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>
          No, everything's fine
        </ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("clarification")} icon={<HelpCircle className="w-5 h-5" />}>
          Yes, I still have issues
        </ActionButton>
      </div>
    </ScreenShell>
  );
};

export default AllClearScreen;
