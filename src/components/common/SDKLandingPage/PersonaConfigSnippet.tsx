"use client";

import { useState } from "react";

export default function PersonaSnippet() {
  const [copied, setCopied] = useState(false);

  const codeString = `persona = Persona(
  name="John",
  tone="professional",
  mode="standard",
  verbosity="medium",
  interruption_pause="3s",
  auto_record=True,
  handle_unknown=False,
)`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-77 max-w-77  overflow-hidden rounded-2xl bg-[#0b1329] border border-slate-800  font-sans">
      {/* Window Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-900 bg-[#0e172c]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
          <span className="w-3 h-3 rounded-full bg-[#10b981]" />
          <span className="ml-2 text-xs font-mono text-slate-400">
            persona_config.py
          </span>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="text-xs font-medium text-slate-400 hover:text-white transition-colors duration-200 px-2.5 py-1 rounded-md bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50"
        >
          {copied ? "Copied! ✓" : "Copy"}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-6 font-mono text-[14px] leading-relaxed select-text overflow-x-auto text-slate-100">
        <pre>
          <code>
            <span className="text-slate-300">persona</span> ={" "}
            <span className="text-[#a78bfa]">Persona</span>(
            <span className="block pl-4">
              <span className="text-slate-300">name</span>=
              <span className="text-[#3b82f6]">&quot;John&quot;</span>,<br />
              <span className="text-slate-300">tone</span>=
              <span className="text-[#3b82f6]">&quot;professional&quot;</span>,
              <br />
              <span className="text-slate-300">mode</span>=
              <span className="text-[#3b82f6]">&quot;standard&quot;</span>,
              <br />
              <span className="text-slate-300">verbosity</span>=
              <span className="text-[#3b82f6]">&quot;medium&quot;</span>,<br />
              <span className="text-slate-300">interruption_pause</span>=
              <span className="text-[#3b82f6]">&quot;3s&quot;</span>,<br />
              <span className="text-slate-300">auto_record</span>=
              <span className="text-[#ef4444]">True</span>,<br />
              <span className="text-slate-300">handle_unknown</span>=
              <span className="text-[#ef4444]">False</span>,
            </span>
            )
          </code>
        </pre>
      </div>
    </div>
  );
}
