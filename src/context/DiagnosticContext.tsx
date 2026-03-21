import React, { createContext, useContext, useState, useCallback } from "react";
import type { AppState, ExperienceMode, Sentiment, EntryPoint, ScreenState, QoEItem, DiagnosticResult } from "@/types/diagnostic";

interface DiagnosticContextType extends AppState {
  setSentiment: (s: Sentiment) => void;
  setEntryPoint: (e: EntryPoint) => void;
  setCurrentState: (s: ScreenState) => void;
  setDiagnosticResult: (r: DiagnosticResult) => void;
  setQoeSelected: (q: QoEItem | null) => void;
  isPositive: boolean;
  reset: () => void;
}

const initialState: AppState = {
  experienceMode: "positive",
  sentiment: "neutral",
  entryPoint: "elt",
  currentState: "entry",
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

  const setDiagnosticResult = useCallback((diagnosticResult: DiagnosticResult) => {
    setState((s) => ({ ...s, diagnosticResult }));
  }, []);

  const setQoeSelected = useCallback((qoeSelected: QoEItem | null) => {
    setState((s) => ({ ...s, qoeSelected }));
  }, []);

  const reset = useCallback(() => setState(initialState), []);

  return (
    <DiagnosticContext.Provider
      value={{
        ...state,
        setSentiment,
        setEntryPoint,
        setCurrentState,
        setDiagnosticResult,
        setQoeSelected,
        isPositive: state.experienceMode === "positive",
        reset,
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
};
