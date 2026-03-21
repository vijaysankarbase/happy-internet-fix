import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { evaluateDiagnostic } from "@/lib/diagnosticEngine";
import type { DiagnosticResult } from "@/types/diagnostic";

const QOE_TYPES = [
  { value: "filter_hp47", label: "filter_hp47" },
  { value: "filter_tof", label: "filter_tof" },
  { value: "dropcable", label: "dropcable" },
  { value: "dice", label: "dice" },
  { value: "modem_deregs", label: "modem_deregs" },
  { value: "broken_hardware_modem", label: "broken_hardware_modem" },
  { value: "coverage", label: "coverage" },
] as const;

const PRIORITY_MAP: Record<string, number> = {
  filter_hp47: 0.0,
  filter_tof: 0.0,
  dropcable: 1.1,
  dice: 1.2,
  modem_deregs: 2.1,
  broken_hardware_modem: 2.2,
  coverage: 3.5,
};

const DiagnosticPanel: React.FC = () => {
  const { setCurrentState, setDiagnosticResult, setQoeSelected } = useDiagnostic();
  const [open, setOpen] = useState(false);

  const [modemInService, setModemInService] = useState(true);
  const [incidentActive, setIncidentActive] = useState(false);
  const [changeActive, setChangeActive] = useState(false);
  const [problemActive, setProblemActive] = useState(false);
  const [selectedQoe, setSelectedQoe] = useState<string[]>([]);

  const toggleQoe = (type: string) => {
    setSelectedQoe((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleRun = () => {
    const apiResponse: DiagnosticResult = {
      modem: { inService: modemInService },
      network: {
        incident: { active: incidentActive },
        change: { active: changeActive },
        problem: { active: problemActive },
      },
      qoe: selectedQoe.map((type) => ({
        type,
        priority: PRIORITY_MAP[type] ?? 99,
      })),
    };

    setDiagnosticResult(apiResponse);
    const { state, qoeSelected } = evaluateDiagnostic(apiResponse);
    setQoeSelected(qoeSelected);
    setCurrentState(state);
    setOpen(false);
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between px-4 py-2.5 bg-card border-b border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <span>🛠 Diagnostic Input Panel</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-4 bg-card border-b border-border space-y-4">
          {/* Modem */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">modem.inService</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{modemInService ? "Online" : "Offline"}</span>
              <Switch checked={modemInService} onCheckedChange={setModemInService} />
            </div>
          </div>

          {/* Network toggles */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Network</p>
            {[
              { label: "incident.active", value: incidentActive, set: setIncidentActive },
              { label: "change.active", value: changeActive, set: setChangeActive },
              { label: "problem.active", value: problemActive, set: setProblemActive },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.label}</span>
                <Switch checked={item.value} onCheckedChange={item.set} />
              </div>
            ))}
          </div>

          {/* QOE multi-select */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">QOE Types</p>
            <div className="grid grid-cols-2 gap-2">
              {QOE_TYPES.map((qoe) => (
                <label
                  key={qoe.value}
                  className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <Checkbox
                    checked={selectedQoe.includes(qoe.value)}
                    onCheckedChange={() => toggleQoe(qoe.value)}
                  />
                  <span className="text-xs font-medium text-foreground">{qoe.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Button onClick={handleRun} className="w-full">
            Run Diagnosis
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DiagnosticPanel;
