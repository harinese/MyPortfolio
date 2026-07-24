'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  IoSend,
  IoSparkles,
  IoTrashOutline,
  IoPerson,
  IoHardwareChipOutline,
} from 'react-icons/io5';
import { useWindowStore } from '@/store/useWindowStore';
import { APP_REGISTRY } from '@/components/apps/registry';
import { EASE_OUT_EXPO } from '@/lib/animations';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Hey! I'm Hari's personal AI Assistant. I use an Enterprise RAG architecture with strict grounding to answer queries about Hari's projects, skills, education, and credentials.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const SUGGESTIONS = [
  "What are Hari's flagship projects?",
  "How did Hari build CORA?",
  "Where did Hari complete his Bachelors?",
  "Give me Hari's Insta and LinkedIn",
];

export const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openApp = useWindowStore((s) => s.openApp);
  const openAboutGroup = useWindowStore((s) => s.openAboutGroup);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      // Step 1 & 2: Call Enterprise RAG API route
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const responseText = data.message ?? "I don't have enough information in Hari's portfolio records to answer that.";

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Step 3: Deterministic Action Execution if returned by RAG engine
      if (data.action && data.action.type === 'open_app') {
        const appId = data.action.id;
        if (appId === 'about') {
          openAboutGroup();
        } else {
          const appDef = APP_REGISTRY.find((a) => a.id === appId);
          if (appDef) {
            openApp(appDef.id, appDef.title, appDef.defaultSize, appDef.defaultPosition);
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "I encountered a network issue communicating with Hari's portfolio engine.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950/60 text-white select-text relative overflow-hidden">
      {/* Agent Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <IoSparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>Hari AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </h2>
            <p className="text-[10px] text-white/50">
              Enterprise RAG &middot; Grounded Portfolio Agent
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Clear Chat"
        >
          <IoTrashOutline className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3.5 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-white/10 text-white/90 border border-white/10'
                }`}
              >
                {msg.sender === 'user' ? <IoPerson className="w-3.5 h-3.5" /> : <IoHardwareChipOutline className="w-3.5 h-3.5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600/20 border border-cyan-500/30 text-white rounded-tr-xs'
                    : 'bg-white/[0.06] border border-white/[0.08] text-white/90 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {msg.text}
                </div>
                <span className="block text-[9px] text-white/30 mt-1 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/40 text-xs pl-8"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[10px]">Hari AI is searching knowledge base &amp; reasoning...</span>
          </motion.div>
        )}
      </div>

      {/* Suggestion Chips */}
      {messages.length < 5 && (
        <div className="px-4 py-2 border-t border-white/[0.04] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              onClick={() => handleSend(sug)}
              className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] text-white/70 hover:text-white hover:bg-white/[0.1] whitespace-nowrap transition-colors shrink-0 cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white/[0.03] border-t border-white/[0.06] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Hari AI about Hari's projects, skills, education..."
          className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 disabled:hover:bg-cyan-500/20 flex items-center justify-center transition-all shrink-0 cursor-pointer"
        >
          <IoSend className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
