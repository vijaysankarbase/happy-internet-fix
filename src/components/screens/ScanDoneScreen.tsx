import React from "react";
import { motion } from "framer-motion";
import ScreenShell from "@/components/ScreenShell";
import ActionButton from "@/components/ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { evaluateDiagnostic } from "@/lib/diagnosticEngine";
import { CheckCircle2, ChevronRight } from "lucide-react";

const PRIORITY_MAP: Record<string, number> = {
  filter_hp47: 0.0,
  filter_tof: 0.0,
  dropcable: 1.1,
  dice: 1.2,
  modem_deregs: 2.1,
  broken_hardware_modem: 2.2,
  coverage: 3.5,
};

const ScanDoneScreen: React.FC = () => {
  const { panelInputs, setDiagnosticResult, setQoeSelected, setCurrentState, sentiment } = useDiagnostic();

  const handleSeeResult = () => {
    const apiResponse = {
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
    const { state, qoeSelected } = evaluateDiagnostic(apiResponse, sentiment);
    setQoeSelected(qoeSelected);
    setCurrentState(state);
  };

  const steps = ["Modem", "Network", "Connection"];

  return (
    <ScreenShell>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold tracking-tight text-foreground mb-2"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        Scan complete
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-muted-foreground mb-6 text-sm"
      >
        We've finished analysing your connection.
      </motion.p>

      {/* Progress steps – all complete */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="w-full mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </motion.div>
                <span className="text-xs font-medium text-muted-foreground">{step}</span>
              </div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.3 }}
                  className="flex-1 h-0.5 bg-success/30 mx-2 mb-5 origin-left"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      <ActionButton onClick={handleSeeResult} icon={<ChevronRight className="w-5 h-5" />}>
        See result
      </ActionButton>
    </ScreenShell>
  );
};

export default ScanDoneScreen;
