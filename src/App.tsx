import React, { useState } from 'react';
import { 
  Cpu, Cloud, ShieldAlert, Globe, Terminal, Code2, 
  Copy, Check, ExternalLink, Flame, Layers, Hammer, 
  Library, Milestone, Zap, Activity, HardDrive, ShieldCheck
} from 'lucide-react';

import { 
  PHASE_1_CORE_ENGINE, 
  PHASE_2_DOMAINS, 
  PHASE_3_PERFORMANCE_FRONTIER 
} from './data/principalArchitecture';

export default function App() {
  const [activePhase, setActivePhase] = useState<'phase1' | 'phase2' | 'phase3'>('phase1');
  const [selectedDomainId, setSelectedDomainId] = useState<string>('os-dev');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const selectedDomain = PHASE_2_DOMAINS.find(d => d.id === selectedDomainId) || PHASE_2_DOMAINS[0];

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-emerald-400" />;
      default: return <Terminal className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      {/* Top Main Navigation Bar */}
      <header className="border-b border-orange-500/20 bg-[#111622]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePhase('phase1')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-600 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-orange-500/25 border border-orange-400/40">
              🦀
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">
                  Rust Systems Mastery
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Principal Architect Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Grounded in Computer Science Theory, Hardware Architecture & Low-Level Systems
              </p>
            </div>
          </div>

          {/* Phase Switcher Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-[#090d16] p-1 rounded-xl border border-slate-800 text-xs sm:text-sm">
            <button
              onClick={() => setActivePhase('phase1')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activePhase === 'phase1'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Phase 1: Core Engine</span>
            </button>

            <button
              onClick={() => setActivePhase('phase2')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activePhase === 'phase2'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HardDrive className="w-4 h-4 text-amber-400" />
              <span>Phase 2: Domain Deep Dives</span>
            </button>

            <button
              onClick={() => setActivePhase('phase3')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activePhase === 'phase3'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Phase 3: Compiler Frontier</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/rrrreddy/rust-industry-roadmap"
              target="_blank"
              rel="noreferrer"
              className="text-xs flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#090d16] hover:border-orange-500/50 hover:text-orange-400 transition"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ========================================================================= */}
        {/* PHASE 1: THE CORE RUST ENGINE (BEGINNER TO INTERMEDIATE)                  */}
        {/* ========================================================================= */}
        {activePhase === 'phase1' && (
          <div className="space-y-6">
            {/* Phase 1 Banner */}
            <div className="bg-gradient-to-r from-[#171d2b] via-[#111622] to-[#0a0d14] p-6 sm:p-8 rounded-2xl border border-orange-500/30 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  <span>PHASE 1: THE CORE RUST ENGINE</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Language Mechanics Grounded in Hardware Reality
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Before specializing in any industry, you must master the fundamental mechanics of the language. In Rust, language features are not arbitrary syntax; every single one was engineered to solve a specific physical hardware problem (stack vs. heap allocation, CPU cache coherency, or preventing use-after-free without a garbage collector).
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    Stack LIFO Deallocation
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    No Garbage Collector
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    Deterministic RAII Assembly
                  </span>
                </div>
              </div>
            </div>

            {/* Core Mechanics Deep Cards */}
            <div className="space-y-6">
              {PHASE_1_CORE_ENGINE.map((item) => (
                <div key={item.id} className="bg-[#111622] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span>{item.topic}</span>
                    </h2>
                    <span className="text-[11px] font-mono uppercase text-orange-400">
                      Core Language Mechanic
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Mechanics & Hardware Problem */}
                    <div className="space-y-3">
                      <div>
                        <strong className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-1">
                          Syntax & Mechanics:
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {item.syntaxAndMechanics}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30">
                        <strong className="text-xs uppercase font-mono tracking-wider text-red-400 block mb-1">
                          The Hardware "Why" (The Physical Computer Problem Solved):
                        </strong>
                        <p className="text-xs text-red-200/90 leading-relaxed">
                          {item.hardwareProblemSolved}
                        </p>
                      </div>
                    </div>

                    {/* Right: Code Demonstration */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between px-3 py-2 bg-[#090d16] rounded-t-xl border border-b-0 border-slate-800">
                        <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                          <Code2 className="w-3.5 h-3.5 text-orange-400" />
                          <span>Hardware & Syntax Manifestation</span>
                        </span>
                        <button
                          onClick={() => copyCode(item.memoryDiagramOrCode, item.id)}
                          className="text-[10px] flex items-center space-x-1 text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 transition"
                        >
                          {copiedCodeId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCodeId === item.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="bg-[#06080d] p-3.5 rounded-b-xl border border-slate-800 font-mono text-xs overflow-x-auto text-orange-200 flex-1 leading-relaxed">
                        <pre>{item.memoryDiagramOrCode}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Definitive Curated Resources for Core Rust */}
            <div className="p-6 rounded-2xl bg-[#111622] border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center space-x-2">
                <Library className="w-4 h-4 text-orange-400" />
                <span>Definitive Resources: Phase 1 Core Rust Engine</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="https://doc.rust-lang.org/book/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-[#090d16] rounded-xl border border-slate-800 hover:border-orange-500/50 transition block"
                >
                  <span className="font-bold text-xs text-white block mb-0.5">The Rust Programming Language</span>
                  <span className="text-[10px] font-mono text-orange-400 block mb-1">Official Canonical Book</span>
                  <p className="text-xs text-slate-400">Chapters 1–10 and 13. The foundational text for ownership, borrowing, and traits.</p>
                </a>

                <a
                  href="https://github.com/rust-lang/rustlings"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-[#090d16] rounded-xl border border-slate-800 hover:border-orange-500/50 transition block"
                >
                  <span className="font-bold text-xs text-white block mb-0.5">Rustlings Interactive Course</span>
                  <span className="text-[10px] font-mono text-orange-400 block mb-1">CLI-Based Exercises</span>
                  <p className="text-xs text-slate-400">Small interactive compiler exercises to build muscle memory reading borrow checker errors.</p>
                </a>

                <a
                  href="https://doc.rust-lang.org/rust-by-example/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-[#090d16] rounded-xl border border-slate-800 hover:border-orange-500/50 transition block"
                >
                  <span className="font-bold text-xs text-white block mb-0.5">Rust by Example</span>
                  <span className="text-[10px] font-mono text-orange-400 block mb-1">Code-First Reference</span>
                  <p className="text-xs text-slate-400">Bite-sized, practical code examples showing idiomatic patterns and trait implementations.</p>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: INDUSTRY-SPECIFIC DEEP DIVES (INTERMEDIATE TO MASTER)            */}
        {/* ========================================================================= */}
        {activePhase === 'phase2' && (
          <div className="space-y-6">
            {/* Phase 2 Header & Domain Switcher */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium mb-1">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>PHASE 2: INDUSTRY-SPECIFIC DEEP DIVES</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                    Theoretical CS Foundations vs. Rust Implementation Technicalities
                  </h1>
                </div>
              </div>

              {/* 4 Domain Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PHASE_2_DOMAINS.map((domain) => {
                  const isSelected = selectedDomainId === domain.id;
                  return (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomainId(domain.id)}
                      className={`text-left p-3.5 rounded-xl border transition flex items-start space-x-3 ${
                        isSelected
                          ? 'border-orange-500 bg-orange-500/15 text-white ring-1 ring-orange-500'
                          : 'border-slate-800 bg-[#111622] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                        {getDomainIcon(domain.icon)}
                      </div>
                      <div>
                        <h2 className="font-bold text-xs sm:text-sm text-white leading-snug">{domain.domainName}</h2>
                        <span className="text-[11px] font-mono text-orange-400 block mt-0.5">{domain.badge}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Domain Full Deep Dive Card */}
            <div className="bg-[#111622] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-8">
              
              {/* Domain Header */}
              <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      {selectedDomain.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">{selectedDomain.domainName}</h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">{selectedDomain.tagline}</p>
                </div>
              </div>

              {/* PART A: CONCEPTUAL & SYSTEMS FOUNDATIONS (NO RUST CODE YET) */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-cyan-400 border-b border-cyan-500/20 pb-2">
                  <Layers className="w-5 h-5" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">
                    A. Conceptual & Systems Foundations (Pure Computer Science & Hardware)
                  </h3>
                </div>

                {/* Mental Model Box */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 leading-relaxed">
                  <strong className="text-cyan-400 block font-mono text-xs uppercase mb-1">
                    🧠 The Architectural Mental Model (How to think before coding):
                  </strong>
                  {selectedDomain.conceptualFoundations.mentalModel}
                </div>

                {/* Hardware & OS Concepts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDomain.conceptualFoundations.hardwareAndOsConcepts.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#090d16] border border-slate-800 space-y-1.5">
                      <span className="text-xs font-mono font-bold text-orange-400 block">
                        Concept #{idx + 1}: {item.concept}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.inDepthExplanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PART B: RUST IMPLEMENTATION TECHNICALITIES */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-2 text-orange-400 border-b border-orange-500/20 pb-2">
                  <Hammer className="w-5 h-5" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">
                    B. Rust Implementation Technicalities (Deep Technical Skills & Weapons)
                  </h3>
                </div>

                {/* Advanced Language Weapons */}
                <div>
                  <strong className="text-xs font-mono uppercase text-slate-400 block mb-2">
                    Advanced Language Features & Weapons:
                  </strong>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedDomain.rustTechnicalities.advancedLanguageWeapons.map((weapon, wIdx) => (
                      <div key={wIdx} className="p-3.5 rounded-xl bg-[#090d16] border border-slate-800">
                        <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">
                          {weapon.feature}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {weapon.mechanicsAndUsage}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Domain Crates & Tools */}
                <div>
                  <strong className="text-xs font-mono uppercase text-slate-400 block mb-2">
                    Industry-Standard Production Crates & Profilers:
                  </strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {selectedDomain.rustTechnicalities.domainCratesAndTools.map((crate, cIdx) => (
                      <a
                        key={cIdx}
                        href={crate.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-[#090d16] rounded-xl border border-slate-800 hover:border-orange-500/50 transition block group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-orange-400 group-hover:text-orange-300">
                            {crate.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                            {crate.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{crate.role}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* PART C: CONCRETE MILESTONE PROJECTS */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-2 text-amber-400 border-b border-amber-500/20 pb-2">
                  <Milestone className="w-5 h-5" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">
                    C. Concrete Milestone Projects (Non-Trivial Systems Built From Scratch)
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {selectedDomain.milestoneProjects.map((proj, pIdx) => (
                    <div key={pIdx} className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/20 to-orange-950/20 border border-amber-500/30 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-white">{proj.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-amber-500/40 text-amber-300">
                            {proj.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {proj.technicalObjective}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-amber-500/20">
                        <strong className="text-[11px] font-mono uppercase text-amber-400 block mb-1.5">
                          Architectural Specifications:
                        </strong>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {proj.architecturalSpec.map((spec, sIdx) => (
                            <li key={sIdx} className="flex items-start space-x-2">
                              <span className="text-orange-400 font-bold">▹</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PART D: MASTER-LEVEL CURATED RESOURCES */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-2 text-emerald-400 border-b border-emerald-500/20 pb-2">
                  <Library className="w-5 h-5" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">
                    D. Master-Level Curated Resources (Whitepapers, Source Repos & Authoritative Textbooks)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedDomain.masterResources.map((res, rIdx) => (
                    <a
                      key={rIdx}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 bg-[#090d16] rounded-xl border border-slate-800 hover:border-emerald-500/50 transition block group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white group-hover:text-emerald-300 transition">
                          {res.title}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 block mb-1">{res.type}</span>
                      <p className="text-xs text-slate-400 leading-relaxed">{res.annotation}</p>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: THE COMPILER & PERFORMANCE FRONTIER                              */}
        {/* ========================================================================= */}
        {activePhase === 'phase3' && (
          <div className="space-y-6">
            {/* Phase 3 Banner */}
            <div className="bg-gradient-to-r from-[#171d2b] via-[#111622] to-[#0a0d14] p-6 sm:p-8 rounded-2xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>PHASE 3: THE COMPILER & PERFORMANCE FRONTIER</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Squeezing Maximum Physical Silicon Throughput
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  The boundary between senior and staff systems architects is knowing what the compiler, linker, and CPU silicon do with your code. Master vector registers (SIMD), zero-copy pointer casting, hardware cacheline alignment (MESI protocol), and profiling assembly output.
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    AVX2 / AVX-512 / NEON
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    Zero-Copy Deserialization
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    False Sharing Elimination (64B)
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    perf / flamegraph
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Modules */}
            <div className="space-y-6">
              {PHASE_3_PERFORMANCE_FRONTIER.map((topic, idx) => (
                <div key={idx} className="bg-[#111622] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{topic.title}</span>
                    </h2>
                    <span className="text-[11px] font-mono uppercase text-emerald-400">
                      Silicon Optimization
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Hardware Mechanism & Rust Strategy */}
                    <div className="space-y-3">
                      <div>
                        <strong className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-1">
                          Physical Hardware Mechanism:
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {topic.hardwareMechanism}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
                        <strong className="text-xs uppercase font-mono tracking-wider text-emerald-400 block mb-1">
                          Rust Optimization Strategy:
                        </strong>
                        <p className="text-xs text-emerald-200/90 leading-relaxed">
                          {topic.rustOptimizationStrategy}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#090d16] border border-slate-800 text-xs font-mono text-cyan-300">
                        🛠️ Tooling & Diagnostics: {topic.toolingAndDiagnostics}
                      </div>
                    </div>

                    {/* Right: Code or CLI demonstration */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between px-3 py-2 bg-[#090d16] rounded-t-xl border border-b-0 border-slate-800">
                        <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Implementation & Commands</span>
                        </span>
                        <button
                          onClick={() => copyCode(topic.codeSnippet, `perf-${idx}`)}
                          className="text-[10px] flex items-center space-x-1 text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 transition"
                        >
                          {copiedCodeId === `perf-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCodeId === `perf-${idx}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="bg-[#06080d] p-3.5 rounded-b-xl border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-200 flex-1 leading-relaxed">
                        <pre>{topic.codeSnippet}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#111622] py-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🦀</span>
            <span className="text-slate-400 font-medium">Rust Across Industries — Principal Systems Architecture Curriculum</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400 font-mono">
            <a 
              href="https://rrrreddy.github.io/rust-industry-roadmap/" 
              target="_blank" 
              rel="noreferrer"
              className="text-orange-400 hover:underline font-bold"
            >
              rrrreddy.github.io/rust-industry-roadmap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
