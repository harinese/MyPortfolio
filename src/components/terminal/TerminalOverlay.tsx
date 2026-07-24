'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTerminalStore } from '@/store/useTerminalStore';
import {
  IoTerminal,
  IoDesktopOutline,
  IoTrashOutline,
  IoHelpCircleOutline,
  IoOpenOutline,
} from 'react-icons/io5';
import { EASE_OUT_EXPO } from '@/lib/animations';

export const TerminalOverlay: React.FC = () => {
  const isCliMode = useTerminalStore((s) => s.isCliMode);
  const toggleCliMode = useTerminalStore((s) => s.toggleCliMode);
  const history = useTerminalStore((s) => s.history);
  const commandHistory = useTerminalStore((s) => s.commandHistory);
  const addLog = useTerminalStore((s) => s.addLog);
  const clearHistory = useTerminalStore((s) => s.clearHistory);

  const [input, setInput] = useState('');
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input on CLI open or click anywhere in terminal
  useEffect(() => {
    if (isCliMode) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCliMode]);

  // Auto-scroll to bottom on output update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isCliMode]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];

    let output: React.ReactNode;

    switch (mainCmd) {
      case 'help':
      case '?':
        output = (
          <div className="space-y-1.5 text-xs text-emerald-300/90 my-1">
            <p className="text-emerald-400 font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 font-mono">
              <span className="text-cyan-400 font-semibold">about</span>
              <span>Display Hari's bio &amp; background info</span>

              <span className="text-cyan-400 font-semibold">skills</span>
              <span>List tech arsenal (Python, React, Next.js, Flask, etc.)</span>

              <span className="text-cyan-400 font-semibold">projects</span>
              <span>List all 7 deployed flagship &amp; freelance projects</span>

              <span className="text-cyan-400 font-semibold">certs</span>
              <span>List hackathon credentials &amp; certifications</span>

              <span className="text-cyan-400 font-semibold">contact</span>
              <span>Print email, LinkedIn, GitHub, X, Instagram links</span>

              <span className="text-cyan-400 font-semibold">resume</span>
              <span>Open Hari's official Resume (PDF)</span>

              <span className="text-cyan-400 font-semibold">gui / exit</span>
              <span>Return to GUI mode</span>

              <span className="text-cyan-400 font-semibold">clear / cls</span>
              <span>Clear terminal output buffer</span>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        output = (
          <div className="space-y-2 text-xs leading-relaxed text-emerald-300 my-1">
            <p className="text-cyan-400 font-bold text-sm">Hari Babu S R</p>
            <p className="text-emerald-400/80">MCA Student &amp; Full-Stack Architect | Davanagere, Karnataka, India</p>
            <p className="text-white/80">
              I specialize in architecting scalable solutions across the full stack.
              From React frontends to Python backends, I build systems that are
              performant, secure, and maintainable. Currently pursuing MCA with a
              focus on network security, cryptography, and ethical hacking.
            </p>
            <div className="border-t border-emerald-500/20 pt-1 text-white/60">
              <p>🎓 MCA: GM University (2026-2027)</p>
              <p>🎓 BCA: Don Bosco Degree College (2022-2025, CGPA 7.6/10)</p>
            </div>
          </div>
        );
        break;

      case 'skills':
      case 'tech':
      case 'stack':
        output = (
          <div className="space-y-1.5 text-xs text-emerald-300 my-1">
            <p className="text-cyan-400 font-bold">TECH ARSENAL:</p>
            <div className="space-y-1 text-white/80">
              <p><span className="text-emerald-400">Languages:</span> Python, JavaScript</p>
              <p><span className="text-emerald-400">Frontend:</span> React, Next.js, Tailwind CSS</p>
              <p><span className="text-emerald-400">Backend:</span> Flask, REST APIs, Node.js</p>
              <p><span className="text-emerald-400">Databases:</span> MongoDB, MySQL</p>
              <p><span className="text-emerald-400">Tools &amp; Focus:</span> Git, Docker, Machine Learning, Network Security &amp; Cryptography</p>
            </div>
          </div>
        );
        break;

      case 'projects':
      case 'ls':
        output = (
          <div className="space-y-2 text-xs text-emerald-300 my-1">
            <p className="text-cyan-400 font-bold">DEPLOYED PROJECTS (7):</p>
            <div className="space-y-2 font-mono">
              <div>
                <p className="text-emerald-400 font-semibold">1. AgriLens AI <span className="text-emerald-500 text-[10px]">[FLAGSHIP / LIVE]</span></p>
                <p className="text-white/70 text-[11px]">AI-powered crop disease detection (React, Python, FastAPI, Gemini AI, Docker)</p>
                <a href="https://agrilensai.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-[11px] flex items-center gap-1">
                  https://agrilensai.onrender.com/ <IoOpenOutline className="w-3 h-3 inline" />
                </a>
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">2. CORA <span className="text-emerald-500 text-[10px]">[FLAGSHIP / LIVE]</span></p>
                <p className="text-white/70 text-[11px]">Content-based movie recommendation engine (Flask, Vanilla JS, REST APIs)</p>
                <a href="https://cora-b6o6.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-[11px] flex items-center gap-1">
                  https://cora-b6o6.onrender.com/ <IoOpenOutline className="w-3 h-3 inline" />
                </a>
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">3. Tassels by Saritha <span className="text-blue-400 text-[10px]">[FREELANCE / LIVE]</span></p>
                <p className="text-white/70 text-[11px]">Handcrafted tassel brand showcase (React, Vite)</p>
                <a href="https://tasselsbysaritha.me" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-[11px] flex items-center gap-1">
                  https://tasselsbysaritha.me <IoOpenOutline className="w-3 h-3 inline" />
                </a>
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">4. Zyra Unique Events <span className="text-blue-400 text-[10px]">[FREELANCE / LIVE]</span></p>
                <p className="text-white/70 text-[11px]">Event management platform (React)</p>
                <a href="https://zyra-unique-events.vercel.app" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-[11px] flex items-center gap-1">
                  https://zyra-unique-events.vercel.app <IoOpenOutline className="w-3 h-3 inline" />
                </a>
              </div>
              <div>
                <p className="text-emerald-400 font-semibold">5. Varada's Kitchen <span className="text-blue-400 text-[10px]">[FREELANCE / LIVE]</span></p>
                <p className="text-white/70 text-[11px]">Cloud kitchen order platform (React, JS, Tailwind)</p>
                <a href="https://varadas-kitchen-oaxa.onrender.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-[11px] flex items-center gap-1">
                  https://varadas-kitchen-oaxa.onrender.com <IoOpenOutline className="w-3 h-3 inline" />
                </a>
              </div>
              <div className="text-white/50 text-[11px]">
                <p>6. QR Attendance System [Enterprise Internal]</p>
                <p>7. Event Approval System [Enterprise Internal]</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'certs':
      case 'certificates':
        output = (
          <div className="space-y-1.5 text-xs text-emerald-300 my-1">
            <p className="text-cyan-400 font-bold">CERTIFICATIONS &amp; CREDENTIALS:</p>
            <div className="space-y-1 text-white/80">
              <p>🏆 <span className="text-emerald-400 font-semibold">Google Cloud Agentic AI Day</span> (Google Cloud x Hack2skill)</p>
              <p>🏆 <span className="text-emerald-400 font-semibold">Build for Bengaluru Hackathon</span> (30-hr hackathon by GDG Bengaluru)</p>
              <p>🏆 <span className="text-emerald-400 font-semibold">OpenAI Academy x NxtWave Regional Buildathon</span> (Karnataka)</p>
            </div>
          </div>
        );
        break;

      case 'contact':
      case 'socials':
      case 'social':
        output = (
          <div className="space-y-1 text-xs text-emerald-300 my-1">
            <p className="text-cyan-400 font-bold">CONTACT &amp; SOCIAL LINKS:</p>
            <p>📧 Email: <a href="mailto:haribabusr78@gmail.com" className="text-cyan-400 underline">haribabusr78@gmail.com</a></p>
            <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/hari-babu-nese-a29b27237/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">linkedin.com/in/hari-babu-nese-a29b27237/</a></p>
            <p>💻 GitHub: <a href="https://github.com/harinese/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">github.com/harinese/</a></p>
            <p>🐦 X (Twitter): <a href="https://x.com/Hari_Nese" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">x.com/Hari_Nese</a></p>
            <p>📷 Instagram: <a href="https://www.instagram.com/hari.nese/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">instagram.com/hari.nese/</a></p>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        window.open("/Hari'sResume.pdf", '_blank');
        output = <p className="text-xs text-cyan-400">Opening Hari's Resume (PDF) in a new browser tab...</p>;
        break;

      case 'gui':
      case 'exit':
      case 'quit':
        toggleCliMode();
        return;

      case 'clear':
      case 'cls':
        clearHistory();
        setInput('');
        setHistoryIdx(-1);
        return;

      case 'sudo':
        output = <p className="text-xs text-rose-400">Permission denied: Hari Babu S R owns root privileges on this system.</p>;
        break;

      case 'whoami':
        output = <p className="text-xs text-cyan-400">guest@portfolio-os (Recruiter / Tech Lead)</p>;
        break;

      case 'date':
        output = <p className="text-xs text-emerald-300">{new Date().toString()}</p>;
        break;

      default:
        output = (
          <p className="text-xs text-rose-400 font-mono">
            zsh: command not found: {cmd}. Type <span className="text-cyan-400 font-bold underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> to view available commands.
          </p>
        );
        break;
    }

    addLog(cmd, output);
    setInput('');
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1 < commandHistory.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] ?? '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] ?? '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  if (!isCliMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-neutral-950/95 backdrop-blur-2xl text-emerald-400 font-mono flex flex-col select-text"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-emerald-500/20 select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button onClick={toggleCliMode} className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity" title="Exit CLI" />
              <div className="w-3 h-3 rounded-full bg-amber-500 opacity-60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-60" />
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <IoTerminal className="w-4 h-4 text-emerald-400" />
              <span>Hari Babu S R — CLI Mode v2.4</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCommand('help')}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.06] border border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer"
            >
              <IoHelpCircleOutline className="w-3.5 h-3.5" />
              <span>Help</span>
            </button>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.06] border border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer"
            >
              <IoTrashOutline className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={toggleCliMode}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              <IoDesktopOutline className="w-3.5 h-3.5 text-cyan-400" />
              <span>Return to GUI Desktop</span>
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 font-mono">
          {history.map((log) => {
            if (log.id === 'init-welcome') {
              return (
                <div key={log.id} className="space-y-2 text-xs pb-2 border-b border-emerald-500/20">
                  <pre className="text-emerald-400 font-bold leading-none hidden sm:block">
                    {`  _   _            _    ____        _            ____    ____  
 | | | | __ _ _ __(_)  | __ )  __ _| |__  _   _  / ___|  |  _ \\ 
 | |_| |/ _\` | '__| |  |  _ \\ / _\` | '_ \\| | | | \\___ \\  | |_) |
 |  _  | (_| | |  | |  | |_) | (_| | |_) | |_| |  ___) | |  _ < 
 |_| |_|\\__,_|_|  |_|  |____/ \\__,_|_.__/ \\__,_| |____/  |_| \\_\\`}
                  </pre>
                  <p className="text-cyan-400 font-bold text-sm">
                    Portfolio-OS Interactive Shell [v2.4]
                  </p>
                  <p className="text-white/70">
                    Type <span className="text-cyan-400 font-bold underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> to view commands, or type <span className="text-emerald-400 font-bold underline cursor-pointer" onClick={toggleCliMode}>gui</span> to return to Desktop mode.
                  </p>
                </div>
              );
            }

            return (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-500">hari@portfolio-os:~$</span>
                  <span className="text-white font-bold">{log.command}</span>
                </div>
                <div className="pl-4 border-l-2 border-emerald-500/30">{log.output}</div>
              </div>
            );
          })}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-xs pt-1">
            <span className="text-emerald-400 font-bold shrink-0">hari@portfolio-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-xs caret-emerald-400"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
