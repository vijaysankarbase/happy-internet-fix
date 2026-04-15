import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import type { AppState, ExperienceMode, Sentiment, EntryPoint, ScreenState, TabId, QoEItem, DiagnosticResult, SelectedProduct } from "@/types/diagnostic";

export interface HomeInputs {
  eltEnabled: boolean;
  modemInService: boolean;
  modemWifiOn: boolean;
  incidentActive: boolean;
  changeActive: boolean;
  problemActive: boolean;
  selectedQoe: string[];
}

export interface PanelInputs extends HomeInputs {
  multipleHomes: boolean;
  home2: HomeInputs;
}

/** Get the effective inputs for a given product selection */
export const getHomeInputs = (panelInputs: PanelInputs, product: SelectedProduct): HomeInputs => {
  if (product === "unlimited" && panelInputs.multipleHomes) {
    return panelInputs.home2;
  }
  return {
    eltEnabled: panelInputs.eltEnabled,
    modemInService: panelInputs.modemInService,
    modemWifiOn: panelInputs.modemWifiOn,
    incidentActive: panelInputs.incidentActive,
    changeActive: panelInputs.changeActive,
    problemActive: panelInputs.problemActive,
    selectedQoe: panelInputs.selectedQoe,
  };
};

interface DiagnosticContextType extends AppState {
  previousState: ScreenState | null;
  setSentiment: (s: Sentiment) => void;
  setEntryPoint: (e: EntryPoint) => void;
  setCurrentState: (s: ScreenState) => void;
  setCurrentTab: (t: TabId) => void;
  setDiagnosticResult: (r: DiagnosticResult) => void;
  setQoeSelected: (q: QoEItem | null) => void;
  setSelectedProduct: (p: SelectedProduct) => void;
  isPositive: boolean;
  reset: () => void;
  goBack: () => void;
  canGoBack: boolean;
  panelInputs: PanelInputs;
  setPanelInputs: React.Dispatch<React.SetStateAction<PanelInputs>>;
  serviceMomentDismissed: boolean;
  dismissServiceMoment: () => void;
}

const initialHomeInputs: HomeInputs = {
  eltEnabled: true,
  modemInService: true,
  modemWifiOn: true,
  incidentActive: false,
  changeActive: false,
  problemActive: false,
  selectedQoe: [],
};

const initialPanelInputs: PanelInputs = {
  ...initialHomeInputs,
  multipleHomes: false,
  home2: { ...initialHomeInputs },
};

const initialState: AppState = {
  experienceMode: "positive",
  sentiment: "neutral",
  entryPoint: "elt",
  currentState: "entry",
  currentTab: "start",
  qoeSelected: null,
  diagnosticResult: null,
  selectedProduct: "limited",
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
  const [serviceMomentDismissed, setServiceMomentDismissed] = useState(false);
  const historyRef = useRef<ScreenState[]>([]);

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
    setState((s) => {
      if (s.currentState !== "entry") {
        historyRef.current = [...historyRef.current, s.currentState];
      }
      if (currentState === "entry") {
        historyRef.current = [];
      }
      return { ...s, currentState };
    });
  }, []);

  const goBack = useCallback(() => {
    const history = historyRef.current;
    if (history.length === 0) {
      setState((s) => ({ ...s, currentState: "entry" }));
      return;
    }
    const previousState = history[history.length - 1];
    historyRef.current = history.slice(0, -1);
    setState((s) => ({ ...s, currentState: previousState }));
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

  const setSelectedProduct = useCallback((selectedProduct: SelectedProduct) => {
    setState((s) => ({ ...s, selectedProduct }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    setPanelInputs(initialPanelInputs);
    historyRef.current = [];
  }, []);

  return (
    <DiagnosticContext.Provider
      value={{
        ...state,
        previousState: historyRef.current.length > 0 ? historyRef.current[historyRef.current.length - 1] : null,
        setSentiment,
        setEntryPoint,
        setCurrentState,
        setCurrentTab,
        setDiagnosticResult,
        setQoeSelected,
        setSelectedProduct,
        isPositive: state.experienceMode === "positive",
        reset,
        goBack,
        canGoBack: historyRef.current.length > 0,
        panelInputs,
        setPanelInputs,
        serviceMomentDismissed,
        dismissServiceMoment: () => setServiceMomentDismissed(true),
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
};
