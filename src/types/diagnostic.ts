export type ExperienceMode = "positive" | "negative";
export type Sentiment = "positive" | "neutral" | "negative";
export type EntryPoint = "elt" | "product" | "support";
export type TabId = "start" | "bills" | "support" | "account";

export type ScreenState =
  | "entry"
  | "intro"
  | "pre_scan"
  | "retest_warning"
  | "scanning"
  | "scan_done"
  | "modem_offline"
  | "network_incident"
  | "all_clear"
  | "clarification"
  | "qoe_modem_deregs"
  | "qoe_dropcable"
  | "qoe_coverage"
  | "qoe_coverage_booster"
  | "qoe_filter"
  | "qoe_filter_hp47"
  | "qoe_filter_tof"
  | "qoe_dice"
  | "qoe_broken_hardware_modem"
  | "misalignment"
  | "sentiment_mismatch"
  | "positive_mismatch"
  | "positive_mismatch_actions"
  | "qoe_explainer"
  | "mismatch_actions"
  | "wifi_help"
  | "modem_restart"
  | "restart_verify"
  | "chat_flow"
  | "support"
  | "success"
  | "wifi_flow"
  | "product_detail";

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
  currentTab: TabId;
  qoeSelected: QoEItem | null;
  diagnosticResult: DiagnosticResult | null;
}
