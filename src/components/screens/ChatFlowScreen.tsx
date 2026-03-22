import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Copy, Check, Send, MessageCircle, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const ChatFlowScreen: React.FC = () => {
  const { setCurrentState, sentiment, qoeSelected, diagnosticResult } = useDiagnostic();
  const { t } = useTranslation();
  const isModemOffline = diagnosticResult ? !diagnosticResult.modem.inService : false;

  const getIssueDesc = (qoeType: string | undefined): string => {
    if (!qoeType) return t("chatPrompt.issues.default");
    return t(`chatPrompt.issues.${qoeType}`, { defaultValue: t("chatPrompt.issues.default") });
  };

  const buildPrompt = (): string => {
    if (isModemOffline) {
      if (sentiment === "positive") return t("chatPrompt.positiveNoIssue");
      if (sentiment === "neutral") return t("chatPrompt.neutralModemOffline");
      return t("chatPrompt.negativeModemOffline");
    }
    const issue = getIssueDesc(qoeSelected?.type);
    const hasIssue = !!qoeSelected?.type;
    if (sentiment === "positive") return t("chatPrompt.positiveWithIssue", { issue });
    if (sentiment === "neutral") return hasIssue ? t("chatPrompt.neutralWithIssue", { issue }) : t("chatPrompt.neutralNoIssue");
    return hasIssue ? t("chatPrompt.negativeWithIssue", { issue }) : t("chatPrompt.negativeNoIssue");
  };

  const PROMPT_TEXT = buildPrompt();
  const [limitationSeen, setLimitationSeen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (chatOpen && chatMessages.length === 0) setChatMessages([{ role: "bot", text: t("chatFlow.greeting") }]); }, [chatOpen]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages, botTyping]);

  const handleCopy = async () => { await navigator.clipboard.writeText(PROMPT_TEXT); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleSend = () => {
    if (!inputText.trim()) return;
    setChatMessages((p) => [...p, { role: "user", text: inputText.trim() }]);
    setInputText("");
    setBotTyping(true);
    setTimeout(() => { setBotTyping(false); setChatMessages((p) => [...p, { role: "bot", text: t("chatFlow.botReply") }]); }, 2000);
  };

  if (!limitationSeen) {
    return (
      <ScreenShell icon={<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"><MessageCircle className="w-10 h-10 text-primary" /></div>} title={t("chatFlow.title")} subtitle={t("chatFlow.subtitle")}>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border text-left">
            <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p dangerouslySetInnerHTML={{ __html: t("chatFlow.notLiveChat") }} />
              <p>{t("chatFlow.speedUp")}</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-left">
            <p className="text-xs font-medium text-muted-foreground mb-2">{t("chatFlow.promptLabel")}</p>
            <p className="text-sm text-foreground leading-relaxed mb-3">{PROMPT_TEXT}</p>
            <button onClick={handleCopy} className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors active:scale-95">
              {copied ? <><Check className="w-4 h-4" /><span>{t("chatFlow.copied")}</span></> : <><Copy className="w-4 h-4" /><span>{t("chatFlow.copyToClipboard")}</span></>}
            </button>
          </div>
        </div>
        <ActionButton onClick={() => { setLimitationSeen(true); setChatOpen(true); }} icon={<MessageCircle className="w-5 h-5" />}>{t("chatFlow.openChat")}</ActionButton>
      </ScreenShell>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center"><MessageCircle className="w-5 h-5 text-primary-foreground" /></div>
          <div><p className="text-sm font-semibold text-foreground">{t("chatFlow.baseSupportChat")}</p><p className="text-xs text-muted-foreground">{t("chatFlow.chat")}</p></div>
        </div>
        <button onClick={() => setCurrentState("entry")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("chatFlow.close")}</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {chatMessages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-foreground rounded-bl-md"}`}>{msg.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        {botTyping && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start"><div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 text-sm text-muted-foreground"><span className="flex gap-1"><span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span><span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span><span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span></span></div></motion.div>)}
        <div ref={chatEndRef} />
      </div>
      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder={t("chatFlow.placeholder")} rows={1} className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground" />
          <button onClick={handleSend} disabled={!inputText.trim()} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity active:scale-95 shrink-0"><Send className="w-4 h-4" /></button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatFlowScreen;
