import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { baseUrl } from "../Url";

const AstroChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Comms Link established. I am the Commander's AI. Awaiting your query regarding Mission Control.",
    },
  ]);

  // Show the text prompt after a short delay to grab attention
  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    setShowCTA(false); // Hide the CTA once they interact

    try {
      const res = await fetch(`${baseUrl}/api/chat/ask-me`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }), // Matches Groq Controller
      });

      if (!res.ok) throw new Error("Uplink Failure");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Signal lost. Mission Control may be in 'Cold Start' mode. Please retry in 10 seconds.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-blue-500/50 rounded-2xl flex flex-col shadow-[0_0_40px_rgba(59,130,246,0.3)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-blue-600/20 border-b border-blue-500/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
                  Astro-Link v1.0
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-blue-500/50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`${m.role === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block p-3 rounded-2xl max-w-[85%] ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none shadow-lg"
                        : "bg-slate-800 text-blue-100 border border-blue-900 rounded-bl-none"
                    }`}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-left"
                >
                  <span className="inline-block p-3 rounded-2xl bg-slate-800 text-blue-400 font-mono text-xs italic animate-pulse">
                    📡 Intercepting data...
                  </span>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-950/50 border-t border-blue-500/20 flex gap-2">
              <input
                value={input}
                disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={isLoading ? "Syncing..." : "Type mission query..."}
                className="bg-slate-900 border border-blue-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400 w-full transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-all active:scale-95 disabled:bg-slate-700"
              >
                {isLoading ? "⌛" : "🚀"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Group */}
      <div className="flex items-center gap-4">
        {/* The New Side Text (CTA) */}
        <AnimatePresence>
          {showCTA && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg border border-blue-400 cursor-pointer whitespace-nowrap hidden md:block"
              onClick={() => setIsOpen(true)}
            >
              System Query? Ask the Commander 👨‍🚀
              {/* Little arrow pointing to button */}
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-blue-600"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all active:scale-90 relative overflow-hidden group ${
            isOpen ? "bg-slate-800 border border-blue-500" : "bg-blue-600"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span
            className={`text-2xl transition-transform duration-500 ${isOpen ? "rotate-180" : "animate-pulse"}`}
          >
            {isOpen ? "✕" : "🛰️"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AstroChat;
