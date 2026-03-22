import type { DiagnosticResult, ScreenState, QoEItem } from "@/types/diagnostic";

// Mock API — replace with real API calls
export const fetchDiagnosticData = (): Promise<DiagnosticResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomize for demo purposes
      const scenarios = [
        // modem offline
        {
          modem: { inService: false },
          network: { incident: { active: false }, change: { active: false }, problem: { active: false } },
          qoe: [],
        },
        // network incident
        {
          modem: { inService: true },
          network: { incident: { active: true, startDate: "2026-03-21T08:30:00Z", eta: "2026-03-21T14:00:00Z" }, change: { active: false }, problem: { active: false } },
          qoe: [],
        },
        // all clear
        {
          modem: { inService: true },
          network: { incident: { active: false }, change: { active: false }, problem: { active: false } },
          qoe: [],
        },
        // qoe issues
        {
          modem: { inService: true },
          network: { incident: { active: false }, change: { active: false }, problem: { active: false } },
          qoe: [
            { type: "modem_deregs", priority: 1, description: "Modem signal deregistrations detected" },
            { type: "coverage", priority: 3, description: "WiFi coverage issues" },
          ],
        },
        // dropcable
        {
          modem: { inService: true },
          network: { incident: { active: false }, change: { active: false }, problem: { active: false } },
          qoe: [{ type: "dropcable", priority: 2, description: "Drop cable signal issues" }],
        },
        // filter issue
        {
          modem: { inService: true },
          network: { incident: { active: false }, change: { active: false }, problem: { active: false } },
          qoe: [{ type: "filter", priority: 4, description: "Filter replacement needed" }],
        },
      ] as DiagnosticResult[];

      resolve(scenarios[Math.floor(Math.random() * scenarios.length)]);
    }, 2500);
  });
};

export const evaluateDiagnostic = (
  result: DiagnosticResult,
  sentiment?: "positive" | "neutral" | "negative"
): { state: ScreenState; qoeSelected: QoEItem | null } => {
  if (!result.modem.inService) {
    return { state: "modem_offline", qoeSelected: null };
  }

  if (result.network.incident.active || result.network.change.active || result.network.problem.active) {
    if (sentiment === "positive") {
      return { state: "positive_mismatch", qoeSelected: null };
    }
    return { state: "network_incident", qoeSelected: null };
  }

  if (result.qoe.length === 0) {
    // Negative sentiment + no issues = sentiment mismatch
    if (sentiment === "negative" || sentiment === "neutral") {
      return { state: "sentiment_mismatch", qoeSelected: null };
    }
    return { state: "all_clear", qoeSelected: null };
  }

  const sorted = [...result.qoe].sort((a, b) => a.priority - b.priority);
  const selected = sorted[0];

  // Positive sentiment + QoE issues = positive mismatch
  if (sentiment === "positive") {
    return { state: "positive_mismatch", qoeSelected: selected };
  }

  const stateMap: Record<string, ScreenState> = {
    modem_deregs: "qoe_modem_deregs",
    dropcable: "qoe_dropcable",
    coverage: "qoe_coverage",
    filter: "qoe_filter",
    filter_hp47: "qoe_filter_hp47",
    filter_tof: "qoe_filter_tof",
    dice: "qoe_dice",
    broken_hardware_modem: "qoe_broken_hardware_modem",
  };

  return {
    state: stateMap[selected.type] || "support",
    qoeSelected: selected,
  };
};
