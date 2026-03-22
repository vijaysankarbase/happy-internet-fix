import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { MessageCircle, Phone } from "lucide-react";

const SupportScreen: React.FC = () => {
  const { isPositive, setCurrentState } = useDiagnostic();

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><MessageCircle className="w-8 h-8 text-primary" /></div>}
      title="We're here to help"
      subtitle={isPositive ? "Choose how you'd like to get in touch with our support team." : "Get in touch."}
    >
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("chat_flow")} icon={<MessageCircle className="w-5 h-5" />}>
          Chat with us
        </ActionButton>
        <ActionButton variant="outline" onClick={() => window.open("tel:+1800000000")} icon={<Phone className="w-5 h-5" />}>
          Call support
        </ActionButton>
      </div>
    </ScreenShell>
  );
};

export default SupportScreen;
