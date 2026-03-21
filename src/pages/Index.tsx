import React, { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { DiagnosticProvider, useDiagnostic } from "@/context/DiagnosticContext";
import { fetchDiagnosticData, evaluateDiagnostic } from "@/lib/diagnosticEngine";
import DiagnosticPanel from "@/components/DiagnosticPanel";
import DebugInfo from "@/components/DebugInfo";
import EntryScreen from "@/components/screens/EntryScreen";
import ScanningScreen from "@/components/screens/ScanningScreen";
import ModemOfflineScreen from "@/components/screens/ModemOfflineScreen";
import NetworkIncidentScreen from "@/components/screens/NetworkIncidentScreen";
import AllClearScreen from "@/components/screens/AllClearScreen";
import ClarificationScreen from "@/components/screens/ClarificationScreen";
import { QoEModemDeregsScreen, QoEDropcableScreen, QoECoverageScreen, QoETechnicianScreen, QoEBrokenHardwareScreen } from "@/components/screens/QoEScreens";
import MisalignmentScreen from "@/components/screens/MisalignmentScreen";
import SupportScreen from "@/components/screens/SupportScreen";
import SuccessScreen from "@/components/screens/SuccessScreen";
import WifiFlowScreen from "@/components/screens/WifiFlowScreen";

const DiagnosticFlow: React.FC = () => {
  const { currentState, setCurrentState, setDiagnosticResult, setQoeSelected } = useDiagnostic();

  const handleEntryComplete = useCallback(() => {
    // After sentiment selection, go to a ready state (entry stays but sentiment is set)
    // User should use the Diagnostic Panel to run diagnosis
    setCurrentState("all_clear");
  }, [setCurrentState]);

  const renderScreen = () => {
    switch (currentState) {
      case "entry":
        return <EntryScreen key="entry" onComplete={handleEntryComplete} />;
      case "scanning":
        return <ScanningScreen key="scanning" />;
      case "modem_offline":
        return <ModemOfflineScreen key="modem" />;
      case "network_incident":
        return <NetworkIncidentScreen key="incident" />;
      case "all_clear":
        return <AllClearScreen key="clear" />;
      case "clarification":
        return <ClarificationScreen key="clarification" />;
      case "qoe_modem_deregs":
        return <QoEModemDeregsScreen key="deregs" />;
      case "qoe_dropcable":
        return <QoEDropcableScreen key="dropcable" />;
      case "qoe_coverage":
        return <QoECoverageScreen key="coverage" />;
      case "qoe_filter":
      case "qoe_filter_hp47":
      case "qoe_filter_tof":
      case "qoe_dice":
        return <QoETechnicianScreen key="tech" />;
      case "qoe_broken_hardware_modem":
        return <QoEBrokenHardwareScreen key="hardware" />;
      case "misalignment":
        return <MisalignmentScreen key="misalign" />;
      case "support":
        return <SupportScreen key="support" />;
      case "success":
        return <SuccessScreen key="success" />;
      case "wifi_flow":
        return <WifiFlowScreen key="wifi" />;
      default:
        return <EntryScreen key="entry-default" onComplete={handleEntryComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
        <h2 className="text-lg font-bold text-foreground tracking-tight">My Internet Scan</h2>
      </header>
      <DiagnosticPanel />
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
      <DebugInfo />
    </div>
  );
};

const Index: React.FC = () => (
  <DiagnosticProvider>
    <DiagnosticFlow />
  </DiagnosticProvider>
);

export default Index;
