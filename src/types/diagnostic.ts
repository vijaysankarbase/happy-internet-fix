export type ExperienceMode = "positive" | "negative";
export type Sentiment = "positive" | "neutral" | "negative";
export type EntryPoint = "elt" | "product" | "support";

export type ScreenState =
  | "intro"
  | "scanning"
  | "modem_offline"
  | "network_incident"
  | "all_clear"
  | "clarification"
  | "qoe_modem_deregs"
  | "qoe_dropcable"
  | "qoe_coverage"
  | "qoe_filter"
  | "qoe_filter_hp47"
  | "qoe_filter_tof"
  | "qoe_dice"
  | "qoe_broken_hardware_modem"
  | "misalignment"
  | "support"
  | "success"
  | "wifi_flow";

export interface QoEItem {
  type: string;
  priority: number;
  description?: string;
}

export interface DiagnosticResult {
  modem: {
    inService: boolean;
  };
  network: {
    incident: { active: boolean; startDate?: string; eta?: string };
    change: { active: boolean };
    problem: { active: boolean };
  };
  qoe: QoEItem[];
}

export interface AppState {
  experienceMode: ExperienceMode;
  sentiment: Sentiment;
  entryPoint: EntryPoint;
  currentState: ScreenState;
  qoeSelected: QoEItem | null;
  diagnosticResult: DiagnosticResult | null;
}
