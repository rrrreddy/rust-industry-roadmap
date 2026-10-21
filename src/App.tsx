import React, { useState, useEffect } from 'react';
import { 
  Coins, Cpu, ShieldAlert, Rocket, Cloud, TrendingUp, Bot, Globe, 
  Terminal, CheckCircle2, Circle, Sparkles, ExternalLink, Search, 
  Trophy, Code2, Copy, Check, Lightbulb, ArrowRight, Layers,
  Compass, BookOpen, Flame, AlertTriangle, ShieldCheck, GraduationCap,
  Hammer, Library, Milestone
} from 'lucide-react';

import { 
  PARETO_CORE_CONCEPTS, 
  CONCEPTUAL_FOUNDATION_STEPS, 
  SKILL_BUILDING_PHASES, 
  COMMON_BEGINNER_PITFALLS 
} from './data/masterclassFoundation';
import { UNIFIED_INDUSTRY_TRACKS } from './data/unifiedTracks';
import { UnifiedIndustryTrack } from './data/unifiedTypes';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<'masterclass' | 'industries'>('masterclass');
  const [masterclassSection, setMasterclassSection] = useState<'pareto' | 'concepts' | 'phases' | 'pitfalls'>('pareto');
  const [selectedTrackId, setSelectedTrackId] = useState<string>('web3-crypto');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Checkpoints state stored in localStorage
  const [completedCheckpoints, setCompletedCheckpoints] = useState<string[]>(() => {
    const saved = localStorage.getItem('rust_masterclass_checkpoints_v1');
    return saved ? JSON.parse(saved) : ['chk-1-1'];
  });

  // Industry skills state stored in localStorage
  const [completedSkills, setCompletedSkills] = useState<{ [trackId: string]: string[] }>(() => {
    const saved = localStorage.getItem('rust_unified_progress_v1');
    return saved ? JSON.parse(saved) : {
      'web3-crypto': ['w3-p1-1'],
      'operating-systems': [],
      'cyber-security': [],
      'defense-aerospace': [],
      'cloud-infrastructure': [],
      'fintech-hft': [],
      'robotics-automotive': [],
      'webassembly-edge': []
    };
  });

  useEffect(() => {
    localStorage.setItem('rust_masterclass_checkpoints_v1', JSON.stringify(completedCheckpoints));
  }, [completedCheckpoints]);

  useEffect(() => {
    localStorage.setItem('rust_unified_progress_v1', JSON.stringify(completedSkills));
  }, [completedSkills]);

  const toggleCheckpoint = (id: string) => {
    setCompletedCheckpoints(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSkill = (trackId: string, skillId: string) => {
    setCompletedSkills(prev => {
      const current = prev[trackId] || [];
      const updated = current.includes(skillId)
        ? current.filter(id => id !== skillId)
        : [...current, skillId];
      return { ...prev, [trackId]: updated };
    });
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const currentTrack = UNIFIED_INDUSTRY_TRACKS.find(t => t.id === selectedTrackId) || UNIFIED_INDUSTRY_TRACKS[0];

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins': return <Coins className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-yellow-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-teal-400" />;
      default: return <Terminal className="w-5 h-5 text-orange-400" />;
    }
  };

  // Compute Checkpoint Stats
  const totalCheckpoints = SKILL_BUILDING_PHASES.reduce((acc, p) => acc + p.masteryCheckpoints.length, 0);
  const completedCheckpointsCount = completedCheckpoints.length;
  const checkpointMasteryPct = Math.round((completedCheckpointsCount / totalCheckpoints) * 100);

  // Compute Industry Stats
  const totalIndustrySkills = UNIFIED_INDUSTRY_TRACKS.reduce(
    (acc, t) => acc + t.phases.reduce((pAcc, p) => pAcc + p.skills.length, 0), 0
  );
  const totalCompletedIndustrySkills = Object.values(completedSkills).reduce(
    (acc, list) => acc + list.length, 0
  );
  const industryMasteryPct = Math.round((totalCompletedIndustrySkills / totalIndustrySkills) * 100);

  const getTrackStats = (track: UnifiedIndustryTrack) => {
    const totalInTrack = track.phases.reduce((acc, p) => acc + p.skills.length, 0);
    const completedInTrack = (completedSkills[track.id] || []).length;
    return {
      completed: completedInTrack,
      total: totalInTrack,
      percentage: Math.round((completedInTrack / totalInTrack) * 100)
    };
  };

  const currentTrackStats = getTrackStats(currentTrack);

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      {/* Top Main Navigation Bar */}
      <header className="border-b border-orange-500/20 bg-[#161b22]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveMainTab('masterclass')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-600 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-orange-500/25 border border-orange-400/40">
              🦀
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">
                  Rust Mastery Platform
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Zero to Staff
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Masterclass Foundations & Industry Specializations
              </p>
            </div>
          </div>

          {/* Master Tabs (Universal Foundations vs Industry Tracks) */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-[#0d1117] p-1 rounded-xl border border-slate-800 text-xs sm:text-sm">
            <button
              onClick={() => setActiveMainTab('masterclass')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeMainTab === 'masterclass'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-orange-400" />
              <span>Universal Masterclass</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-orange-300 font-mono hidden md:inline">
                {checkpointMasteryPct}%
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('industries')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeMainTab === 'industries'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Industry Specializations</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono hidden sm:inline">
                8 Fields
              </span>
            </button>
          </div>

          {/* GitHub Link */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/rrrreddy/rust-industry-roadmap"
              target="_blank"
              rel="noreferrer"
              className="text-xs flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#0d1117] hover:border-orange-500/50 hover:text-orange-400 transition"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ========================================================================= */}
        {/* VIEW 1: UNIVERSAL MASTERCLASS FOUNDATION                                  */}
        {/* ========================================================================= */}
        {activeMainTab === 'masterclass' && (
          <div className="space-y-6">
            {/* Masterclass Hero Banner */}
            <div className="bg-gradient-to-r from-[#1c2128] via-[#161b22] to-[#0d1117] p-6 sm:p-8 rounded-2xl border border-orange-500/30 shadow-xl relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-medium mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Strategic Learning Blueprint for Absolute Beginners</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                  The Masterclass Foundation
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Master the top 20% of core concepts that unlock 80% of real-world capability, understand the strict theoretical dependency tree from hardware memory to async runtimes, follow sequential skill-building phases with real mini-projects, and avoid common beginner traps.
                </p>

                {/* Sub-Navigation for the 4 Sections */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => setMasterclassSection('pareto')}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                      masterclassSection === 'pareto'
                        ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-orange-300" />
                    <span>1. Pareto Core (20/20 Rule)</span>
                  </button>

                  <button
                    onClick={() => setMasterclassSection('concepts')}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                      masterclassSection === 'concepts'
                        ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-300" />
                    <span>2. Conceptual Dependencies</span>
                  </button>

                  <button
                    onClick={() => setMasterclassSection('phases')}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                      masterclassSection === 'phases'
                        ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Hammer className="w-3.5 h-3.5 text-amber-300" />
                    <span>3. Skill-Building Phases & Projects</span>
                  </button>

                  <button
                    onClick={() => setMasterclassSection('pitfalls')}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                      masterclassSection === 'pitfalls'
                        ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>4. Common Pitfalls & Fixes</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 1: PARETO CORE */}
            {masterclassSection === 'pareto' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span>Section 1: The Pareto Core (The 20/20 Rule)</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      The top 20% of mental models and architectural invariants that unlock 80% of production engineering capability.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {PARETO_CORE_CONCEPTS.map((concept) => (
                    <div key={concept.id} className="bg-[#161b22] p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-lg">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                          <div>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                              Core Pillar #{concept.rank}
                            </span>
                            <h3 className="text-lg font-bold text-white mt-1.5">{concept.title}</h3>
                            <p className="text-xs font-semibold text-orange-400/90">{concept.tagline}</p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                            <strong className="text-amber-400 block mb-0.5">Mental Model:</strong>
                            {concept.mentalModel}
                          </div>

                          <div className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-slate-100">Why It Unlocks 80% Capability: </strong>
                            {concept.whyItUnlocks80Percent}
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400">
                            ⚡ Invariant Rule: {concept.keyRule}
                          </div>
                        </div>

                        {/* Code snippet */}
                        <div className="w-full lg:w-96 flex flex-col shrink-0">
                          <div className="flex items-center justify-between px-3 py-2 bg-[#0d1117] rounded-t-xl border border-b-0 border-slate-800">
                            <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1.5">
                              <Code2 className="w-3.5 h-3.5 text-orange-400" />
                              <span>Idiomatic Code</span>
                            </span>
                            <button
                              onClick={() => copyCode(concept.codeSnippet, concept.id)}
                              className="text-[10px] flex items-center space-x-1 text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 transition"
                            >
                              {copiedCodeId === concept.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedCodeId === concept.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <div className="bg-[#090d16] p-3.5 rounded-b-xl border border-slate-800 font-mono text-xs overflow-x-auto text-orange-200 leading-relaxed">
                            <pre>{concept.codeSnippet}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 2: CONCEPTUAL FOUNDATIONS */}
            {masterclassSection === 'concepts' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    <span>Section 2: Conceptual Foundation (Ordered by Strict Dependency)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Never skip a step. Each theoretical concept builds physically and mathematically on the one directly preceding it.
                  </p>
                </div>

                <div className="space-y-4">
                  {CONCEPTUAL_FOUNDATION_STEPS.map((step, idx) => (
                    <div key={step.id} className="bg-[#161b22] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center shrink-0 font-mono text-sm">
                        {step.stepNumber}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="font-bold text-white text-base">{step.title}</h3>
                          <span className="text-[11px] font-mono text-slate-400">
                            Strict Dependency: <strong className="text-cyan-400">{step.dependsOn}</strong>
                          </span>
                        </div>

                        <div className="text-xs text-slate-300 leading-relaxed">
                          <strong className="text-slate-100 block mb-0.5">Physical Machine Reality:</strong>
                          {step.physicalReality}
                        </div>

                        <div className="text-xs text-slate-400 leading-relaxed">
                          <strong className="text-slate-200">Why It Matters: </strong>
                          {step.whyItMatters}
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#0d1117] border border-slate-800 text-xs font-mono text-amber-300">
                          💡 Key Takeaway: {step.keyTakeaway}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: SKILL BUILDING PHASES */}
            {masterclassSection === 'phases' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Hammer className="w-5 h-5 text-amber-400" />
                    <span>Section 3: Practical Skill-Building Phases</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sequential milestones: core skills to drill, hands-on portfolio mini-projects, authoritative resources, and measurable checkpoints.
                  </p>
                </div>

                <div className="space-y-8">
                  {SKILL_BUILDING_PHASES.map((phase) => (
                    <div key={phase.phaseName} className="bg-[#161b22] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                      {/* Phase Header */}
                      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#1c2128] via-[#161b22] to-[#0d1117] border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                              {phase.badge}
                            </span>
                            <h3 className="text-xl font-bold text-white">{phase.phaseName}</h3>
                          </div>
                          <span className="text-xs text-slate-400 font-medium mt-1 block">
                            Target Audience: {phase.targetAudience}
                          </span>
                        </div>
                      </div>

                      {/* Phase Content */}
                      <div className="p-6 space-y-6">
                        {/* 1. Core Skills */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold mb-3 flex items-center space-x-1.5">
                            <Milestone className="w-4 h-4" />
                            <span>Core Skills to Practice</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {phase.coreSkills.map((skill, sIdx) => (
                              <div key={sIdx} className="bg-[#0d1117] p-3.5 rounded-xl border border-slate-800">
                                <h5 className="font-bold text-white text-xs sm:text-sm mb-1">{skill.title}</h5>
                                <p className="text-xs text-slate-400 leading-relaxed mb-2">{skill.description}</p>
                                <span className="text-[11px] font-mono text-emerald-400 block">
                                  🎯 Goal: {skill.practicalFocus}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 2. Hands-on Mini-Projects */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center space-x-1.5">
                            <Rocket className="w-4 h-4" />
                            <span>Hands-On Mini-Projects & Real-World Tasks</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {phase.handsOnProjects.map((proj, pIdx) => (
                              <div key={pIdx} className="bg-gradient-to-r from-amber-950/20 to-orange-950/20 p-4 rounded-xl border border-amber-500/30 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-bold text-white text-sm">{proj.title}</h5>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-amber-500/30 text-amber-300">
                                      {proj.difficulty}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{proj.description}</p>
                                </div>
                                <div className="pt-2 border-t border-amber-500/20 text-xs">
                                  <strong className="text-amber-400 block text-[11px] uppercase mb-1">Constraints & Deliverables:</strong>
                                  <ul className="space-y-1 text-slate-400 text-xs">
                                    {proj.constraints.map((c, cIdx) => (
                                      <li key={cIdx}>• {c}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 3. Recommended Free & Authoritative Resources */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center space-x-1.5">
                            <Library className="w-4 h-4" />
                            <span>Recommended Authoritative Resources</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {phase.recommendedResources.map((res, rIdx) => (
                              <a
                                key={rIdx}
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3.5 bg-[#0d1117] rounded-xl border border-slate-800 hover:border-cyan-500/50 transition block group"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-xs text-white group-hover:text-cyan-300 transition">
                                    {res.title}
                                  </span>
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                                </div>
                                <span className="text-[10px] font-mono text-cyan-400 block mb-1">{res.type}</span>
                                <p className="text-xs text-slate-400 leading-relaxed">{res.description}</p>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* 4. Measurable Mastery Checkpoints */}
                        <div className="p-4 rounded-xl bg-[#0d1117] border border-slate-800">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center space-x-1.5">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Measurable Mastery Checkpoints (Click to Complete)</span>
                          </h4>
                          <div className="space-y-2">
                            {phase.masteryCheckpoints.map((chk) => {
                              const isChecked = completedCheckpoints.includes(chk.id);
                              return (
                                <button
                                  key={chk.id}
                                  onClick={() => toggleCheckpoint(chk.id)}
                                  className={`w-full text-left p-3 rounded-xl border transition flex items-start space-x-3 ${
                                    isChecked
                                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                                  }`}
                                >
                                  <div className="mt-0.5">
                                    {isChecked ? (
                                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-slate-600" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-xs sm:text-sm font-medium">{chk.criteria}</p>
                                    <span className="text-[11px] font-mono text-slate-400">
                                      Validation: {chk.verificationMethod}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 4: COMMON PITFALLS */}
            {masterclassSection === 'pitfalls' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span>Section 4: Common Beginner Pitfalls & Idiomatic Solutions</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    What beginners frequently misunderstand and how to write idiomatic, safe Rust from day one.
                  </p>
                </div>

                <div className="space-y-4">
                  {COMMON_BEGINNER_PITFALLS.map((pitfall) => (
                    <div key={pitfall.id} className="bg-[#161b22] p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="p-1 rounded bg-red-950/40 text-red-400 border border-red-900/40">
                            <AlertTriangle className="w-4 h-4" />
                          </span>
                          <h3 className="font-bold text-white text-base">{pitfall.mistake}</h3>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-900/40">
                          {pitfall.frequency}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
                        <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-red-200">
                          <strong className="text-red-400 block mb-1">Why It Happens & Consequences:</strong>
                          <p>{pitfall.whyItHappens}</p>
                          <p className="mt-1 font-semibold text-red-300">{pitfall.consequences}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-200">
                          <strong className="text-emerald-400 block mb-1">The Idiomatic Fix:</strong>
                          <p>{pitfall.idiomaticFix}</p>
                        </div>
                      </div>

                      {/* Before / After Code */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-red-400 block mb-1 font-bold">✕ What Beginners Do:</span>
                          <div className="bg-[#090d16] p-3 rounded-xl border border-red-900/30 font-mono text-xs text-red-300 overflow-x-auto">
                            <pre>{pitfall.badCode}</pre>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1 font-bold">✓ What Senior Engineers Do:</span>
                          <div className="bg-[#090d16] p-3 rounded-xl border border-emerald-900/30 font-mono text-xs text-emerald-300 overflow-x-auto">
                            <pre>{pitfall.goodCode}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: INDUSTRY SPECIALIZATIONS (8 SEQUENTIAL FIELDS)                   */}
        {/* ========================================================================= */}
        {activeMainTab === 'industries' && (
          <div className="space-y-6">
            {/* Quick Switcher for 8 Industries */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-orange-400" />
                  <span>Select an Industry Specialization (Zero to Staff Expert)</span>
                </span>
                <span className="text-xs text-orange-400/90 font-mono hidden sm:inline">
                  8 Fields Available
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {UNIFIED_INDUSTRY_TRACKS.map((track) => {
                  const isSelected = selectedTrackId === track.id;
                  const stats = getTrackStats(track);
                  return (
                    <button
                      key={track.id}
                      onClick={() => setSelectedTrackId(track.id)}
                      className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all text-xs relative overflow-hidden ${
                        isSelected
                          ? 'border-orange-500 bg-orange-500/15 shadow-lg shadow-orange-500/20 text-white font-bold ring-1 ring-orange-500'
                          : 'border-slate-800/80 bg-[#161b22]/70 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mb-1.5 ${isSelected ? 'bg-orange-500/30' : 'bg-slate-800/80'}`}>
                        {getTrackIcon(track.icon)}
                      </div>
                      <span className="line-clamp-2 leading-tight text-[11px] sm:text-xs">{track.title}</span>
                      
                      <span className="mt-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-orange-300">
                        {stats.completed}/{stats.total}
                      </span>

                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500" 
                          style={{ width: `${stats.percentage}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Industry Card */}
            <div className="bg-[#161b22]/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
              {/* Header */}
              <div className="p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r from-[#1c2128] via-[#161b22] to-[#0d1117]">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="max-w-3xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/40">
                        {getTrackIcon(currentTrack.icon)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {currentTrack.title}
                          </h2>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 font-mono">
                            {currentTrack.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-orange-400 font-medium mt-0.5">
                          {currentTrack.tagline}
                        </p>
                      </div>
                    </div>

                    {/* ELI5 Overview */}
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-950/20 to-orange-950/20 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm leading-relaxed">
                      <strong className="text-amber-400 flex items-center space-x-1.5 mb-1 text-xs uppercase tracking-wider font-bold">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>Area Orientation & Mental Model (ELI5):</span>
                      </strong>
                      {currentTrack.eli5Overview}
                    </div>
                  </div>

                  {/* Quick Stats Pill */}
                  <div className="bg-[#0d1117] p-5 rounded-2xl border border-slate-800 shrink-0 w-full lg:w-80 space-y-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-slate-400 block mb-0.5">Salary & Market Demand:</span>
                      <span className="text-xs font-semibold text-emerald-400 block">
                        {currentTrack.salaryAndDemand}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1 font-mono">
                        <span className="text-slate-300">Your Specialization Mastery:</span>
                        <span className="text-orange-400 font-bold">{currentTrackStats.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${currentTrackStats.percentage}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                        {currentTrackStats.completed} of {currentTrackStats.total} Technical Skills Mastered
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-400 block">
                        Prerequisites: <strong className="text-slate-300">{currentTrack.beginnerZeroPrerequisites[0]}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legacy Flaws vs Rust */}
                <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-xs">
                    <span className="font-bold text-red-400 uppercase tracking-wider block mb-1">
                      ✕ Why Legacy Stacks Failed ({currentTrack.title}):
                    </span>
                    <p className="text-red-200/90 leading-relaxed mb-2">{currentTrack.legacyFlawsVsRust.legacyFlaw}</p>
                    <div className="text-[11px] text-red-400/80 font-mono">
                      Result: Latency spikes, unhandled crashes, and security vulnerabilities.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-xs">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      ✓ The Rust Solution & Revolution:
                    </span>
                    <p className="text-emerald-200/90 leading-relaxed mb-2">{currentTrack.legacyFlawsVsRust.rustFix}</p>
                    <div className="text-[11px] text-emerald-300 font-mono font-bold">
                      ⚡ Measured Impact: {currentTrack.legacyFlawsVsRust.measuredImpact}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sequential Technical Roadmap */}
              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span>Real-Time Industry Technicalities (Junior ➔ Staff Expert)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Step-by-step technical progression with hands-on code examples and exercises.
                  </p>
                </div>

                <div className="space-y-8">
                  {currentTrack.phases.map((phaseGroup, pIdx) => (
                    <div key={pIdx} className="space-y-4">
                      {/* Phase Banner */}
                      <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0d1117] border border-slate-800">
                        <span className="w-7 h-7 rounded-lg bg-orange-600 text-white font-bold flex items-center justify-center text-xs">
                          {pIdx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-white">{phaseGroup.phaseTitle}</h4>
                          <p className="text-[11px] sm:text-xs text-slate-400">{phaseGroup.phaseDescription}</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-4 pl-0 sm:pl-4">
                        {phaseGroup.skills.map((skill) => {
                          const isDone = (completedSkills[currentTrack.id] || []).includes(skill.id);
                          return (
                            <div 
                              key={skill.id}
                              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                isDone 
                                  ? 'border-emerald-500/40 bg-[#161b22] shadow-lg' 
                                  : 'border-slate-800 bg-[#0d1117] hover:border-slate-700'
                              }`}
                            >
                              {/* Header */}
                              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/60">
                                <div className="flex items-start space-x-3">
                                  <button
                                    onClick={() => toggleSkill(currentTrack.id, skill.id)}
                                    className="mt-1 transition hover:scale-110"
                                    title={isDone ? "Mark incomplete" : "Mark complete"}
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                    ) : (
                                      <Circle className="w-6 h-6 text-slate-600 hover:text-orange-400" />
                                    )}
                                  </button>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                                        skill.levelBadge === 'Beginner' ? 'bg-blue-900/40 text-blue-300 border border-blue-700/60' :
                                        skill.levelBadge === 'Intermediate' ? 'bg-amber-900/40 text-amber-300 border border-amber-700/60' :
                                        skill.levelBadge === 'Advanced' ? 'bg-orange-900/40 text-orange-300 border border-orange-700/60' :
                                        'bg-red-900/40 text-red-300 border border-red-700/60'
                                      }`}>
                                        {skill.levelBadge}
                                      </span>
                                      <h5 className="text-base sm:text-lg font-bold text-white">{skill.title}</h5>
                                    </div>
                                    <span className="text-[11px] text-slate-400 font-mono">
                                      ⏱️ Estimated Time: {skill.estimatedTime}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => toggleSkill(currentTrack.id, skill.id)}
                                  className={`text-xs px-3.5 py-1.5 rounded-xl border font-semibold transition self-start sm:self-center ${
                                    isDone
                                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-orange-600 hover:text-white hover:border-orange-500'
                                  }`}
                                >
                                  {isDone ? 'Completed ✓' : 'Mark Complete'}
                                </button>
                              </div>

                              {/* Body */}
                              <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                                    <strong className="text-amber-400 block mb-1">Plain English (ELI5):</strong>
                                    {skill.eli5}
                                  </div>

                                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                    <strong className="text-slate-100">Why in {currentTrack.title}: </strong>
                                    {skill.whyInThisIndustry}
                                  </p>

                                  <div>
                                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">
                                      Key Concepts to Master:
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                      {skill.conceptsToMaster.map((concept, cIdx) => (
                                        <div key={cIdx} className="text-xs bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center space-x-1.5">
                                          <span className="text-orange-400">▹</span>
                                          <span>{concept}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/30">
                                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
                                      🎯 Practice Exercise:
                                    </span>
                                    <p className="text-xs text-purple-200/90 mb-1">{skill.exercise.task}</p>
                                    <p className="text-[11px] text-purple-300/70 italic">💡 Hint: {skill.exercise.hint}</p>
                                  </div>
                                </div>

                                {/* Code */}
                                <div className="flex flex-col">
                                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] rounded-t-xl border border-b-0 border-slate-800">
                                    <span className="text-xs font-mono text-slate-300 font-semibold flex items-center space-x-2">
                                      <Code2 className="w-3.5 h-3.5 text-orange-400" />
                                      <span>{skill.codeExample.title}</span>
                                    </span>
                                    <button
                                      onClick={() => copyCode(skill.codeExample.code, skill.id)}
                                      className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 transition"
                                    >
                                      {copiedCodeId === skill.id ? (
                                        <>
                                          <Check className="w-3 h-3 text-emerald-400" />
                                          <span className="text-emerald-400">Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          <span>Copy</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <div className="bg-[#090d16] p-4 rounded-b-xl border border-slate-800 font-mono text-xs overflow-x-auto text-orange-200 flex-1 leading-relaxed">
                                    <pre>{skill.codeExample.code}</pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Capstone Project */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-950/25 via-slate-900 to-[#161b22] border border-orange-500/40">
                  <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm mb-1">
                    <Rocket className="w-4 h-4" />
                    <span>Real-Time Capstone Project: {currentTrack.capstoneProject.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                    {currentTrack.capstoneProject.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                    {currentTrack.capstoneProject.stepByStepGuide.map((step, sIdx) => (
                      <div key={sIdx} className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                        <span className="text-xs font-mono font-bold text-orange-400 mb-1">Step {sIdx + 1}</span>
                        <p className="text-xs text-slate-300 leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Must Know Crates */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Must-Know Production Crates ({currentTrack.title})</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {currentTrack.mustKnowCrates.map((crate, cIdx) => (
                      <a
                        key={cIdx}
                        href={crate.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3.5 bg-[#0d1117] rounded-xl border border-slate-800 hover:border-orange-500/50 hover:bg-slate-900 transition block group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm font-bold text-orange-400 group-hover:text-orange-300">
                            {crate.name}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-orange-400 transition" />
                        </div>
                        <p className="text-xs text-slate-400 leading-snug">{crate.purpose}</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Interview Scenarios */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Staff/Principal Technical Interview Questions</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentTrack.interviewPrep.map((qa, qIdx) => (
                      <div key={qIdx} className="bg-[#0d1117] p-4 rounded-xl border border-slate-800">
                        <p className="font-semibold text-white text-xs sm:text-sm mb-2 flex items-start space-x-2">
                          <span className="text-orange-400 font-mono font-bold">Q{qIdx + 1}:</span>
                          <span>{qa.question}</span>
                        </p>
                        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <strong className="text-emerald-400 block mb-0.5">What Hiring Panels Expect:</strong>
                          {qa.expectedAnswer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#161b22] py-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🦀</span>
            <span className="text-slate-400 font-medium">Rust Across Industries — Strategic Mastery Blueprint</span>
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
