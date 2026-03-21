import React from "react";
import { Home, FileText, Headphones, User } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import type { TabId } from "@/types/diagnostic";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "start", label: "Start", icon: <Home className="w-5 h-5" /> },
  { id: "bills", label: "Bills", icon: <FileText className="w-5 h-5" /> },
  { id: "support", label: "Support", icon: <Headphones className="w-5 h-5" /> },
  { id: "account", label: "Account", icon: <User className="w-5 h-5" /> },
];

const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, setCurrentState } = useDiagnostic();

  const handleTabClick = (id: TabId) => {
    setCurrentTab(id);
    // Reset to entry when switching tabs so we see tab content, not diagnostic flow
    setCurrentState("entry");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border">
      <div className="flex items-center justify-around max-w-md mx-auto h-14">
        {tabs.map((tab) => {
          const active = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors active:scale-95 ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
