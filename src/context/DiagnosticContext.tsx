import React, { createContext, useContext, useState, useCallback } from "react";
import type { AppState, ExperienceMode, Sentiment, EntryPoint, ScreenState, TabId, QoEItem, DiagnosticResult } from "@/types/diagnostic";

export interface PanelInputs {
  modemInService: boolean;
  incidentActive: boolean;
  changeActive: boolean;
  problemActive: boolean;
  selectedQoe: string[];
}

interface DiagnosticContextType extends AppState {
  setSentiment: (s: Sentiment) => void;
  setEntryPoint: (e: EntryPoint) => void;
  setCurrentState: (s: ScreenState) => void;
  setCurrentTab: (t: TabId) => void;
  setDiagnosticResult: (r: DiagnosticResult) => void;
  setQoeSelected: (q: QoEItem | null) => void;
  isPositive: boolean;
  reset: () => void;
  panelInputs: PanelInputs;
  setPanelInputs: React.Dispatch<React.SetStateAction<PanelInputs>>;
}

const initialPanelInputs: PanelInputs = {
  modemInService: true,
  incidentActive: false,
  changeActive: false,
  problemActive: false,
  selectedQoe: [],
};

const initialState: AppState = {
  experienceMode: "positive",
  sentiment: "neutral",
  entryPoint: "elt",
  currentState: "entry",
  currentTab: "start",
  qoeSelected: null,
  diagnosticResult: null,
};

const DiagnosticContext = createContext<DiagnosticContextType | null>(null);

export const useDiagnostic = () => {
  const ctx = useContext(DiagnosticContext);
  if (!ctx) throw new Error("useDiagnostic must be used within DiagnosticProvider");
  return ctx;
};

export const DiagnosticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [panelInputs, setPanelInputs] = useState<PanelInputs>(initialPanelInputs);

  const setSentiment = useCallback((sentiment: Sentiment) => {
    const experienceMode: ExperienceMode = sentiment === "positive" ? "positive" : "negative";
    setState((s) => ({ ...s, sentiment, experienceMode }));
  }, []);

  const setEntryPoint = useCallback((entryPoint: EntryPoint) => {
    setState((s) => ({
      ...s,
      entryPoint,
      ...(entryPoint === "support" ? { experienceMode: "negative" as ExperienceMode, sentiment: "negative" as Sentiment } : {}),
    }));
  }, []);

  const setCurrentState = useCallback((currentState: ScreenState) => {
    setState((s) => ({ ...s, currentState }));
  }, []);

  const setCurrentTab = useCallback((currentTab: TabId) => {
    setState((s) => ({ ...s, currentTab }));
  }, []);

  const setDiagnosticResult = useCallback((diagnosticResult: DiagnosticResult) => {
    setState((s) => ({ ...s, diagnosticResult }));
  }, []);

  const setQoeSelected = useCallback((qoeSelected: QoEItem | null) => {
    setState((s) => ({ ...s, qoeSelected }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    setPanelInputs(initialPanelInputs);
  }, []);

  return (
    <DiagnosticContext.Provider
      value={{
        ...state,
        setSentiment,
        setEntryPoint,
        setCurrentState,
        setCurrentTab,
        setDiagnosticResult,
        setQoeSelected,
        isPositive: state.experienceMode === "positive",
        reset,
        panelInputs,
        setPanelInputs,
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
};
