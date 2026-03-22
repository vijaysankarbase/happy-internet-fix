import React from "react";
import { motion } from "framer-motion";
import { Router, AlertTriangle, CheckCircle, Search } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { evaluateDiagnostic } from "@/lib/diagnosticEngine";
import ActionButton from "@/components/ActionButton";
import DiagnosticPanel from "@/components/DiagnosticPanel";
import type { DiagnosticResult } from "@/types/diagnostic";

const PRIORITY_MAP: Record<string, number> = {
  filter_hp47: 0.0,
  filter_tof: 0.0,
  dropcable: 1.1,
  dice: 1.2,
  modem_deregs: 2.1,
  broken_hardware_modem: 2.2,
  coverage: 3.5,
};

const SupportTab: React.FC = () => {
  const { panelInputs, setSentiment, setDiagnosticResult, setQoeSelected, setCurrentState } = useDiagnostic();

  const modemOnline = panelInputs.modemInService;

  const handleStartScan = () => {
    setSentiment("negative");
    setEntryPoint("support");

    const apiResponse: DiagnosticResult = {
      modem: { inService: panelInputs.modemInService },
      network: {
        incident: { active: panelInputs.incidentActive },
        change: { active: panelInputs.changeActive },
        problem: { active: panelInputs.problemActive },
      },
      qoe: panelInputs.selectedQoe.map((type) => ({
        type,
        priority: PRIORITY_MAP[type] ?? 99,
      })),
    };

    setDiagnosticResult(apiResponse);
    setCurrentState("intro");
  };

  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-20">
      <DiagnosticPanel />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Support</h1>
        <p className="text-sm text-muted-foreground mt-0.5">We're here to help</p>
      </motion.div>

      {/* Modem status card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <div className="px-5 pt-5 pb-4 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${modemOnline ? "bg-success/10" : "bg-destructive/10"}`}>
            <Router className={`w-6 h-6 ${modemOnline ? "text-success" : "text-destructive"}`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Modem Status</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {modemOnline ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs font-medium text-success">Online</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                  <span className="text-xs font-medium text-destructive">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="px-5 pb-5">
          <ActionButton onClick={handleStartScan} icon={<Search className="w-5 h-5" />}>
            Start my internet scan
          </ActionButton>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportTab;
