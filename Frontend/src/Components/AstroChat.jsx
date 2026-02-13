import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { baseUrl } from "../Url";
const AstroChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Comms Link established. I am Saurav's AI assistant. Ask me anything about this mission.",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input; // store before clearing
    const userMsg = { role: "user", content: question };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(`${baseUrl}/api/chat/ask-me`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("CHAT ERROR:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Unable to reach Mission Control. Backend may be waking up (Render cold start). Try again in a few seconds.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 h-[500px] bg-slate-900/90 backdrop-blur-xl border border-blue-500/50 rounded-2xl flex flex-col shadow-[0_0_30px_rgba(59,130,246,0.2)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-blue-600/20 border-b border-blue-500/30 flex justify-between items-center">
              <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
                Astro-Link v1.0
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-blue-500">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`${m.role === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block p-3 rounded-2xl ${m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-blue-100 border border-blue-900"}`}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-950/50 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type query..."
                className="bg-transparent border border-blue-500/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 w-full"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-500 p-2 rounded-lg transition-colors"
              >
                🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-blue-500 transition-all active:scale-90 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
        <span className="text-2xl animate-pulse">🛰️</span>
      </button>
    </div>
  );
};

export default AstroChat;
