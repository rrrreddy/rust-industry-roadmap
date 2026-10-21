import React, { useState, useEffect } from 'react';
import { 
  Cpu, Cloud, ShieldAlert, Globe, Terminal, Code2, 
  Copy, Check, ExternalLink, Flame, Layers, Hammer, 
  Library, Milestone, Zap, Activity, HardDrive, ShieldCheck,
  CheckCircle2, Circle, BookOpen, Sparkles, TrendingUp,
  BarChart3, Target, Shield, Workflow, Boxes, Rocket, ArrowRight,
  Database, RefreshCw, CheckSquare, Award
} from 'lucide-react';

import { 
  INDUSTRY_CASE_STUDIES, 
  FUTURE_PURPOSE_PILLARS, 
  TECH_COMPARISON_MATRIX 
} from './data/industryPurpose';

import { 
  HOW_TO_LEARN_PILLARS, 
  WHAT_TO_LEARN_TIERS 
} from './data/masteryTiers';

import { 
  PHASE_1_CORE_ENGINE, 
  PHASE_2_DOMAINS, 
  PHASE_3_PERFORMANCE_FRONTIER 
} from './data/principalArchitecture';

type NavigationTab = 'purpose' | 'how-to-learn' | 'what-to-learn' | 'domains' | 'frontier';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('purpose');
  
  // Tab 1 state
  const [selectedIndustryCaseId, setSelectedIndustryCaseId] = useState<string>('os-kernel');
  
  // Tab 3 state (WHAT to learn)
  const [activeTierNumber, setActiveTierNumber] = useState<number>(1);
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rust_completed_skills');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Tab 4 state (Domains)
  const [selectedDomainId, setSelectedDomainId] = useState<string>('os-dev');

  // Copy code state
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('rust_completed_skills', JSON.stringify(completedSkills));
    } catch {
      // ignore
    }
  }, [completedSkills]);

  const toggleSkill = (skillId: string) => {
    setCompletedSkills(prev => ({
      ...prev,
      [skillId]: !prev[skillId]
    }));
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Calculations for progress
  const allSkillItems = WHAT_TO_LEARN_TIERS.flatMap(tier => tier.items);
  const totalSkillsCount = allSkillItems.length;
  const completedSkillsCount = allSkillItems.filter(item => completedSkills[item.id]).length;
  const overallProgressPercent = totalSkillsCount > 0 ? Math.round((completedSkillsCount / totalSkillsCount) * 100) : 0;

  const currentTier = WHAT_TO_LEARN_TIERS.find(t => t.tierNumber === activeTierNumber) || WHAT_TO_LEARN_TIERS[0];
  const tierCompletedCount = currentTier.items.filter(item => completedSkills[item.id]).length;
  const tierProgressPercent = Math.round((tierCompletedCount / currentTier.items.length) * 100);

  const selectedIndustry = INDUSTRY_CASE_STUDIES.find(i => i.id === selectedIndustryCaseId) || INDUSTRY_CASE_STUDIES[0];
  const selectedDomain = PHASE_2_DOMAINS.find(d => d.id === selectedDomainId) || PHASE_2_DOMAINS[0];

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'Coins': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-orange-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-purple-400" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-pink-400" />;
      default: return <Terminal className="w-5 h-5 text-orange-400" />;
    }
  };

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
      {/* Top Header */}
      <header className="border-b border-orange-500/20 bg-[#111622]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('purpose')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-600 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-orange-500/25 border border-orange-400/40">
              🦀
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">
                  Rust Systems Mastery
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Global Architecture Blueprint
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Industry Realities • HOW to Learn • WHAT to Learn • Domain Deep Dives • Compiler Frontier
              </p>
            </div>
          </div>

          {/* Top Level Nav Tabs */}
          <div className="hidden lg:flex items-center space-x-1 bg-[#090d16] p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('purpose')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'purpose'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>1. Industry & Purpose</span>
            </button>

            <button
              onClick={() => setActiveTab('how-to-learn')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'how-to-learn'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>2. HOW to Learn</span>
            </button>

            <button
              onClick={() => setActiveTab('what-to-learn')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'what-to-learn'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>3. WHAT to Learn (4 Tiers)</span>
            </button>

            <button
              onClick={() => setActiveTab('domains')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'domains'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>4. Domain Deep Dives</span>
            </button>

            <button
              onClick={() => setActiveTab('frontier')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'frontier'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-pink-400" />
              <span>5. Compiler Frontier</span>
            </button>
          </div>

          {/* GitHub Link & Overall Progress pill */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Mastery:</span>
              <span className="font-bold text-orange-400 font-mono">{overallProgressPercent}%</span>
              <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300" 
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
            </div>

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

        {/* Mobile Submenu Bar */}
        <div className="lg:hidden flex items-center space-x-1 px-3 py-2 border-t border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('purpose')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'purpose' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400'
            }`}
          >
            1. Industry & Purpose
          </button>
          <button
            onClick={() => setActiveTab('how-to-learn')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'how-to-learn' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400'
            }`}
          >
            2. HOW to Learn
          </button>
          <button
            onClick={() => setActiveTab('what-to-learn')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'what-to-learn' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400'
            }`}
          >
            3. WHAT to Learn (4 Tiers)
          </button>
          <button
            onClick={() => setActiveTab('domains')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'domains' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400'
            }`}
          >
            4. Domain Deep Dives
          </button>
          <button
            onClick={() => setActiveTab('frontier')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'frontier' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400'
            }`}
          >
            5. Compiler Frontier
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* ========================================================================= */}
        {/* TAB 1: WHERE RUST IS USED & ITS FUTURE PURPOSE IN GLOBAL INDUSTRY         */}
        {/* ========================================================================= */}
        {activeTab === 'purpose' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-[#171d2b] via-[#111622] to-[#0a0d14] p-6 sm:p-8 rounded-2xl border border-orange-500/30 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium mb-3">
                  <Globe className="w-3.5 h-3.5" />
                  <span>THE GLOBAL REVOLUTION IN SYSTEMS INFRASTRUCTURE</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Where Rust is Used & Its Future Purpose in Industry
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Rust is not just another programming language—it represents the biggest shift in systems engineering since C in 1972. It provides <strong>nanosecond bare-metal speed</strong> with <strong>100% compile-time memory safety</strong>. From Linux kernels and Windows internals to Solana blockchains and Cloudflare edge proxies, global infrastructure is migrating to Rust to eliminate the 70% of vulnerabilities caused by memory bugs.
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    White House & CISA Endorsed
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    Linux 6.1+ Official Kernel Language
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    Eliminates 70% of Global CVEs
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    AWS 80% Server Energy Reduction
                  </span>
                </div>
              </div>
            </div>

            {/* 8 Dominant Industries Interactive Grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Boxes className="w-5 h-5 text-orange-400" />
                    <span>The 8 Dominant Industries Powered by Rust</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Click any industry to inspect what is engineered, production adopters, and verified real-world metrics.
                  </p>
                </div>
              </div>

              {/* Industry Selection Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {INDUSTRY_CASE_STUDIES.map((ind) => {
                  const isSelected = selectedIndustryCaseId === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedIndustryCaseId(ind.id)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-500/15 ring-1 ring-orange-500'
                          : 'border-slate-800 bg-[#111622] hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                          {getIndustryIcon(ind.icon)}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {ind.badge}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white leading-snug">
                        {ind.industry}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Industry Detail Card */}
              <div className="bg-[#111622] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
                <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      {selectedIndustry.badge}
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-1">
                      {selectedIndustry.industry}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {selectedIndustry.tagline}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: What is Built */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-orange-400 flex items-center space-x-2">
                      <Terminal className="w-4 h-4" />
                      <span>What is Engineered in this Industry:</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedIndustry.whatIsBuilt.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                          <span className="text-orange-400 font-bold">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Real-World Adopters & Proven Impact */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-400 flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Real-World Production Adopters & Proven Impact:</span>
                    </h4>
                    <div className="space-y-2.5">
                      {selectedIndustry.realWorldAdopters.map((adopter, aIdx) => (
                        <div key={aIdx} className="p-3.5 rounded-xl bg-[#090d16] border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">{adopter.company}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/50 text-emerald-300">
                              Production Tested
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-snug">{adopter.description}</p>
                          <div className="pt-1.5 border-t border-slate-800/80 text-[11px] text-emerald-300 font-mono">
                            ⚡ Metric: {adopter.provenImpact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The 5 Strategic Future Purpose Pillars */}
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span>The 5 Strategic Future Purpose Pillars of Rust</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Why governments, defense agencies, and enterprise hyperscalers are standardizing on Rust for the next 30 years.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FUTURE_PURPOSE_PILLARS.map((pillar) => (
                  <div key={pillar.number} className="p-5 rounded-2xl bg-[#111622] border border-slate-800 flex flex-col justify-between space-y-3 shadow-lg">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                          #{pillar.number}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {pillar.subtitle}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white mb-2 leading-snug">{pillar.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {pillar.mandateOrReality}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-[11px] text-cyan-200">
                      <strong className="text-cyan-400 block font-mono text-[10px] uppercase mb-0.5">Strategic Impact:</strong>
                      {pillar.strategicImpact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Language Systems Comparison Matrix */}
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  <span>Cross-Language Systems Comparison: Why Rust Wins</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Head-to-head comparison against C++, Go, and Java across the 6 critical physical engineering dimensions.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#111622]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#090d16] border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Engineering Metric</th>
                      <th className="py-3 px-4">C++</th>
                      <th className="py-3 px-4">Go (Golang)</th>
                      <th className="py-3 px-4">Java</th>
                      <th className="py-3 px-4 bg-orange-950/20 text-orange-400 border-l border-orange-500/30">Rust (The Frontier)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {TECH_COMPARISON_MATRIX.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/20 transition">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.criterion}</td>
                        <td className="py-3 px-4 text-slate-300">{row.cpp}</td>
                        <td className="py-3 px-4 text-slate-300">{row.golang}</td>
                        <td className="py-3 px-4 text-slate-300">{row.java}</td>
                        <td className="py-3 px-4 text-orange-200 font-bold bg-orange-950/10 border-l border-orange-500/20">{row.rust}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Call to Action to Next Step */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-950/30 via-[#111622] to-amber-950/30 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-base">Ready to start the journey?</h3>
                <p className="text-xs text-slate-300">Learn the 4 core learning methodologies to avoid the trap of tutorial hell and syntax memorization.</p>
              </div>
              <button
                onClick={() => setActiveTab('how-to-learn')}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-orange-600/30 shrink-0"
              >
                <span>Explore HOW to Learn</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: HOW TO LEARN (THE 4 STRATEGIC METHODOLOGIES)                       */}
        {/* ========================================================================= */}
        {activeTab === 'how-to-learn' && (
          <div className="space-y-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-[#171d2b] via-[#111622] to-[#0a0d14] p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
                  <Target className="w-3.5 h-3.5" />
                  <span>HOW TO LEARN RUST: THE SYSTEMS ARCHITECT STRATEGY</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Never Learn Rust Like a Scripting Language
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Python and JavaScript developers often struggle with Rust because they try to memorize syntax rules. Rust is grounded directly in physical computer architecture. To master it, you must adopt the mental models of an operating systems engineer: connect language mechanics to CPU registers, stack frames, heap pointers, and cachelines.
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    Physical Hardware Mental Model
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    Zero .clone() / .unwrap() Rule
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    The 4 Projects Pipeline
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300">
                    Inspect LLVM-IR & Assembly
                  </span>
                </div>
              </div>
            </div>

            {/* The 4 Methodology Pillars */}
            <div className="space-y-6">
              {HOW_TO_LEARN_PILLARS.map((pillar) => (
                <div key={pillar.pillarNumber} className="bg-[#111622] rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Methodological Principle #{pillar.pillarNumber}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-white mt-1">{pillar.title}</h2>
                      <span className="text-xs text-slate-400 font-mono">{pillar.subtitle}</span>
                    </div>
                  </div>

                  {/* Core Rule Quote */}
                  <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 text-xs sm:text-sm text-orange-200">
                    <strong className="text-orange-400 block font-mono text-xs uppercase mb-1">
                      💡 The Golden Rule:
                    </strong>
                    {pillar.ruleOrPhilosophy}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Strategy */}
                    <div className="space-y-2">
                      <strong className="text-xs font-mono uppercase text-slate-400 block">
                        Strategic Architectural Reasoning:
                      </strong>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {pillar.detailedStrategy}
                      </p>
                    </div>

                    {/* Actionable Habit */}
                    <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 flex flex-col justify-between">
                      <div>
                        <strong className="text-xs font-mono uppercase text-emerald-400 block mb-1.5 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Actionable Daily Practice:</span>
                        </strong>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {pillar.actionableStep}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                        Enforce this in every Git commit and PR review.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* The 4 Milestone Projects Pipeline Diagram */}
            <div className="bg-[#111622] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Workflow className="w-5 h-5 text-amber-400" />
                  <span>The 4-Project Mastery Pipeline: Escape Tutorial Hell</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Build these exact 4 milestones sequentially to transition from beginner to staff systems architect.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#090d16] border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-400 font-bold">Milestone 1</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-300">Beginner</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">CLI Systems Tool</h4>
                  <p className="text-xs text-slate-400">A high-speed file searcher (`ripgrep` clone) or disk usage analyzer using `clap` and `walkdir`.</p>
                  <div className="text-[10px] font-mono text-blue-300 pt-2 border-t border-slate-800">
                    Target: Master ownership, error handling with `anyhow`, and pattern matching.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090d16] border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold">Milestone 2</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300">Intermediate</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">Async Key-Value Store</h4>
                  <p className="text-xs text-slate-400">A Redis-compatible TCP server with Tokio, custom binary frame encoding, and connection pools.</p>
                  <div className="text-[10px] font-mono text-cyan-300 pt-2 border-t border-slate-800">
                    Target: Master `tokio::spawn`, async channels (`mpsc`), and concurrent locks (`RwLock`).
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090d16] border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold">Milestone 3</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/40 text-amber-300">Advanced</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">Zero-Copy LSM Storage</h4>
                  <p className="text-xs text-slate-400">Log-Structured Merge Tree engine with WAL, SSTables, memory mapped I/O (`memmap2`), and bloom filters.</p>
                  <div className="text-[10px] font-mono text-amber-300 pt-2 border-t border-slate-800">
                    Target: Master custom allocators, zero-copy pointer casting, and cacheline alignment.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090d16] border border-red-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-red-400 font-bold">Milestone 4</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-900/40 text-red-300">Staff Capstone</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">Kernel / HFT Engine</h4>
                  <p className="text-xs text-slate-400">A bare-metal x86_64 microkernel or a sub-microsecond HFT matching engine with lock-free ringbuffers.</p>
                  <div className="text-[10px] font-mono text-red-300 pt-2 border-t border-slate-800">
                    Target: Master inline assembly, SIMD intrinsics, formal verification with Kani.
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-[#111622] to-blue-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-base">Now discover WHAT to learn across the 4 Tiers</h3>
                <p className="text-xs text-slate-300">Track your progress through 16 foundational to staff-level engineering skills.</p>
              </div>
              <button
                onClick={() => setActiveTab('what-to-learn')}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-orange-600/30 shrink-0"
              >
                <span>View WHAT to Learn (4 Tiers)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WHAT TO LEARN (THE 4 PROGRESSIVE TIERS)                            */}
        {/* ========================================================================= */}
        {activeTab === 'what-to-learn' && (
          <div className="space-y-8">
            {/* Banner & Tracker */}
            <div className="bg-gradient-to-r from-[#171d2b] via-[#111622] to-[#0a0d14] p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>WHAT TO LEARN: 4 PROGRESSIVE MASTERY TIERS</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                    Complete Inventory of Rust Engineering Skills
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Organized across 4 sequential phases from Absolute Beginner to Staff/Principal level. Every item includes the <strong>Concepts to Master</strong>, the <strong>Physical Hardware Reality</strong>, a <strong>Practical Drill</strong>, and executable code snippets. Check off skills as you build mastery.
                  </p>
                </div>

                {/* Interactive Progress Box */}
                <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 shrink-0 min-w-[240px] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Overall Mastery:</span>
                    <span className="font-extrabold text-sm font-mono text-orange-400">{completedSkillsCount} / {totalSkillsCount} Skills</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${overallProgressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{overallProgressPercent}% Completed</span>
                    <button 
                      onClick={() => setCompletedSkills({})}
                      className="text-slate-500 hover:text-slate-300 flex items-center space-x-1"
                      title="Reset progress"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier Tabs Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {WHAT_TO_LEARN_TIERS.map((tier) => {
                const isSelected = activeTierNumber === tier.tierNumber;
                const tierDone = tier.items.filter(i => completedSkills[i.id]).length;
                const tierPct = Math.round((tierDone / tier.items.length) * 100);

                return (
                  <button
                    key={tier.tierNumber}
                    onClick={() => setActiveTierNumber(tier.tierNumber)}
                    className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/15 ring-1 ring-orange-500'
                        : 'border-slate-800 bg-[#111622] hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tier.badgeColor}`}>
                          Tier {tier.tierNumber}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{tier.timeframe}</span>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-white mb-1">{tier.tierName}</h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{tier.goal}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">{tierDone}/{tier.items.length} Done</span>
                      <span className={tierPct === 100 ? 'text-emerald-400 font-bold' : 'text-orange-400'}>{tierPct}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Tier Detail & Skills Checklist */}
            <div className="bg-[#111622] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs font-mono uppercase px-2.5 py-0.5 rounded-full border ${currentTier.badgeColor}`}>
                      {currentTier.tierName}
                    </span>
                    <span className="text-xs font-mono text-slate-400">⏱️ {currentTier.timeframe}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white">{currentTier.goal}</h2>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <span>Tier Progress:</span>
                  <span className="font-bold text-orange-400">{tierCompletedCount} of {currentTier.items.length} ({tierProgressPercent}%)</span>
                </div>
              </div>

              {/* Skills Cards Grid */}
              <div className="space-y-6">
                {currentTier.items.map((item, idx) => {
                  const isDone = !!completedSkills[item.id];
                  return (
                    <div 
                      key={item.id} 
                      className={`rounded-2xl border p-6 transition-all ${
                        isDone 
                          ? 'border-emerald-500/40 bg-[#0d171b]/90 shadow-emerald-950/20 shadow-lg' 
                          : 'border-slate-800 bg-[#090d16]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleSkill(item.id)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center transition border ${
                              isDone
                                ? 'bg-emerald-500 text-black border-emerald-400'
                                : 'bg-slate-900 border-slate-700 text-transparent hover:border-slate-500'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>
                          <div>
                            <span className="text-xs font-mono text-orange-400 block font-semibold">
                              Skill #{idx + 1}
                            </span>
                            <h3 className={`text-base font-bold ${isDone ? 'text-emerald-200 line-through' : 'text-white'}`}>
                              {item.domain}
                            </h3>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSkill(item.id)}
                          className={`text-xs font-mono px-3 py-1 rounded-lg border transition ${
                            isDone 
                              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300' 
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          {isDone ? '✓ Mastered' : 'Mark as Mastered'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Concepts & Hardware Reality */}
                        <div className="space-y-3">
                          <div>
                            <strong className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-1">
                              Concepts to Master:
                            </strong>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                              {item.conceptsToMaster}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/30">
                            <strong className="text-xs uppercase font-mono tracking-wider text-cyan-400 block mb-1 flex items-center space-x-1.5">
                              <Cpu className="w-3.5 h-3.5" />
                              <span>Physical Hardware Reality (Under the Hood):</span>
                            </strong>
                            <p className="text-xs text-cyan-200/90 leading-relaxed">
                              {item.hardwareReality}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/30">
                            <strong className="text-xs uppercase font-mono tracking-wider text-amber-400 block mb-1 flex items-center space-x-1.5">
                              <Terminal className="w-3.5 h-3.5" />
                              <span>Practical Hands-On Drill:</span>
                            </strong>
                            <p className="text-xs text-amber-200/90 leading-relaxed">
                              {item.practicalDrill}
                            </p>
                          </div>
                        </div>

                        {/* Code Snippet */}
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between px-3 py-2 bg-[#06080d] rounded-t-xl border border-b-0 border-slate-800">
                            <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                              <Code2 className="w-3.5 h-3.5 text-orange-400" />
                              <span>Reference Idiom & Pattern</span>
                            </span>
                            <button
                              onClick={() => copyCode(item.codeSnippet, item.id)}
                              className="text-[10px] flex items-center space-x-1 text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 transition"
                            >
                              {copiedCodeId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedCodeId === item.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <div className="bg-[#04060a] p-3.5 rounded-b-xl border border-slate-800 font-mono text-xs overflow-x-auto text-orange-200 flex-1 leading-relaxed">
                            <pre>{item.codeSnippet}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-[#111622] to-orange-950/30 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-base">Ready to specialize in an industry?</h3>
                <p className="text-xs text-slate-300">Dive into the deep engineering specifics of OS Kernels, Distributed Networks, and Cybersecurity.</p>
              </div>
              <button
                onClick={() => setActiveTab('domains')}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-orange-600/30 shrink-0"
              >
                <span>Go to Industry Deep Dives</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: INDUSTRY DOMAIN DEEP DIVES (THEORY VS RUST TECHNICALITIES)          */}
        {/* ========================================================================= */}
        {activeTab === 'domains' && (
          <div className="space-y-8">
            {/* Phase 2 Header & Domain Switcher */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-1">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>INDUSTRY DOMAIN DEEP DIVES: THEORY VS IMPLEMENTATION</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                    Theoretical CS Foundations Explicitly Separated from Rust Technicalities
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    For every domain, master the hardware & OS architecture first, then command the exact Rust language weapons, crates, scratch projects, and canonical resources.
                  </p>
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
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
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
        {/* TAB 5: THE COMPILER & PERFORMANCE FRONTIER                                */}
        {/* ========================================================================= */}
        {activeTab === 'frontier' && (
          <div className="space-y-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-[#171d2b] via-[#111622] to-[#0a0d14] p-6 sm:p-8 rounded-2xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>THE COMPILER & PERFORMANCE FRONTIER: SQUEEZING SILICON</span>
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
