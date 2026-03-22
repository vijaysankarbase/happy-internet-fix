import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Copy, Check, Send, MessageCircle, Info } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

const PROMPT_TEXT = `Hi, I ran the internet self-diagnosis tool and it shows no issues on your end, but I'm still experiencing problems with my connection. My WiFi feels slow/unstable and doesn't match what your system reports. Could you please help me investigate further?`;

const ChatFlowScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [limitationSeen, setLimitationSeen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen && chatMessages.length === 0) {
      setChatMessages([{ role: "bot", text: "Hello Vijay 👋 How can BASE help you today?" }]);
    }
  }, [chatOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, botTyping]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PROMPT_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInputText("");
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: "Thank you for reaching out. I'll assign you to the next available advisor who can help resolve this. Please hold on for a moment. 🙏" },
      ]);
    }, 2000);
  };

  // Step 1: Limitation info bottom sheet
  if (!limitationSeen) {
    return (
      <ScreenShell
        icon={
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-10 h-10 text-primary" />
          </div>
        }
        title="Chat with support"
        subtitle="Before you start, here's what to expect."
      >
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border text-left">
            <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Our chat is <span className="font-medium text-foreground">not a live chat</span> — responses may be delayed. An advisor will reply as soon as possible.</p>
              <p>To speed things up, we've prepared a summary of your issue that you can paste into the chat.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border text-left">
            <p className="text-xs font-medium text-muted-foreground mb-2">Your summary prompt:</p>
            <p className="text-sm text-foreground leading-relaxed mb-3">{PROMPT_TEXT}</p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy to clipboard</span>
                </>
              )}
            </button>
          </div>
        </div>

        <ActionButton onClick={() => { setLimitationSeen(true); setChatOpen(true); }} icon={<MessageCircle className="w-5 h-5" />}>
          Open chat
        </ActionButton>
      </ScreenShell>
    );
  }

  // Step 2: Chat window
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-background"
    >
      {/* Chat header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">BASE Support</p>
            <p className="text-xs text-muted-foreground">Chat</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentState("entry")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Close
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-foreground rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {botTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
              </span>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message…"
            rows={1}
            className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatFlowScreen;
