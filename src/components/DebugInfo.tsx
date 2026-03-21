import React from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";

const DebugInfo: React.FC = () => {
  const { currentState, qoeSelected, experienceMode } = useDiagnostic();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground/90 text-background px-3 py-1.5 flex items-center gap-4 text-[10px] font-mono backdrop-blur-sm">
      <span>
        <span className="opacity-60">state:</span> {currentState}
      </span>
      <span>
        <span className="opacity-60">qoe:</span> {qoeSelected?.type ?? "none"}
      </span>
      <span>
        <span className="opacity-60">mode:</span> {experienceMode}
      </span>
    </div>
  );
};

export default DebugInfo;
