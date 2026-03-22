import React from "react";
import { AnimatePresence } from "framer-motion";
import { DiagnosticProvider, useDiagnostic } from "@/context/DiagnosticContext";
import BottomNav from "@/components/BottomNav";
import DebugInfo from "@/components/DebugInfo";
import StartTab from "@/components/tabs/StartTab";
import BillsTab from "@/components/tabs/BillsTab";
import SupportTab from "@/components/tabs/SupportTab";
import AccountTab from "@/components/tabs/AccountTab";
import IntroScreen from "@/components/screens/IntroScreen";
import ScanningScreen from "@/components/screens/ScanningScreen";
import PreScanScreen from "@/components/screens/PreScanScreen";
import RetestWarningScreen from "@/components/screens/RetestWarningScreen";
import ScanDoneScreen from "@/components/screens/ScanDoneScreen";
import ModemOfflineScreen from "@/components/screens/ModemOfflineScreen";
import NetworkIncidentScreen from "@/components/screens/NetworkIncidentScreen";
import AllClearScreen from "@/components/screens/AllClearScreen";
import ClarificationScreen from "@/components/screens/ClarificationScreen";
import { QoEModemDeregsScreen, QoEDropcableScreen, QoECoverageScreen, QoETechnicianScreen, QoEBrokenHardwareScreen } from "@/components/screens/QoEScreens";
import MisalignmentScreen from "@/components/screens/MisalignmentScreen";
import SentimentMismatchScreen from "@/components/screens/SentimentMismatchScreen";
import MismatchActionsScreen from "@/components/screens/MismatchActionsScreen";
import WifiHelpScreen from "@/components/screens/WifiHelpScreen";
import ChatFlowScreen from "@/components/screens/ChatFlowScreen";
import SupportScreen from "@/components/screens/SupportScreen";
import SuccessScreen from "@/components/screens/SuccessScreen";
import WifiFlowScreen from "@/components/screens/WifiFlowScreen";
import ProductDetailScreen from "@/components/screens/ProductDetailScreen";

const DiagnosticFlow: React.FC = () => {
  const { currentState, currentTab } = useDiagnostic();

  // If we're in a diagnostic flow (not entry), show the flow screens
  const inDiagnosticFlow = currentState !== "entry" && currentState !== "product_detail";

  const renderDiagnosticScreen = () => {
    switch (currentState) {
      case "intro":
        return <IntroScreen key="intro" />;
      case "pre_scan":
        return <PreScanScreen key="prescan" />;
      case "retest_warning":
        return <RetestWarningScreen key="retest" />;
      case "scanning":
        return <ScanningScreen key="scanning" />;
      case "scan_done":
        return <ScanDoneScreen key="scandone" />;
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
      case "sentiment_mismatch":
        return <SentimentMismatchScreen key="mismatch" />;
      case "mismatch_actions":
        return <MismatchActionsScreen key="mismatch-actions" />;
      case "wifi_help":
        return <WifiHelpScreen key="wifi-help" />;
      case "chat_flow":
        return <ChatFlowScreen key="chat-flow" />;
      case "support":
        return <SupportScreen key="support" />;
      case "success":
        return <SuccessScreen key="success" />;
      case "wifi_flow":
        return <WifiFlowScreen key="wifi" />;
      default:
        return null;
    }
  };

  const renderProductDetail = () => {
    if (currentState === "product_detail") {
      return <ProductDetailScreen key="product_detail" />;
    }
    return null;
  };

  const renderTab = () => {
    switch (currentTab) {
      case "start":
        return <StartTab key="start-tab" />;
      case "bills":
        return <BillsTab key="bills-tab" />;
      case "support":
        return <SupportTab key="support-tab" />;
      case "account":
        return <AccountTab key="account-tab" />;
      default:
        return <StartTab key="start-tab-default" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-14">
      <AnimatePresence mode="wait">
        {inDiagnosticFlow ? (
          <div key="diagnostic-flow" className="min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
              <h2 className="text-lg font-bold text-foreground tracking-tight">My Internet Scan</h2>
            </header>
            <AnimatePresence mode="wait">
              {renderDiagnosticScreen()}
            </AnimatePresence>
          </div>
        ) : currentState === "product_detail" ? (
          <div key="product-detail" className="min-h-screen bg-background pt-4">
            {renderProductDetail()}
          </div>
        ) : (
          <div key="tab-content">
            {renderTab()}
          </div>
        )}
      </AnimatePresence>
      {!inDiagnosticFlow && <BottomNav />}
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
