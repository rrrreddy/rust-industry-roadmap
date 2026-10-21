import React, { useState, useEffect } from 'react';
import { 
  Coins, Cpu, ShieldAlert, Rocket, Cloud, TrendingUp, Bot, Globe, 
  Terminal, CheckCircle2, Circle, Sparkles, ExternalLink, Search, 
  Trophy, Code2, Copy, Check, Lightbulb, ArrowRight, Layers,
  Compass, ChevronDown, ChevronUp, BookOpen, Flame
} from 'lucide-react';

import { UNIFIED_INDUSTRY_TRACKS } from './data/unifiedTracks';
import { UnifiedIndustryTrack, UnifiedSkill } from './data/unifiedTypes';

export default function App() {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('web3-crypto');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

  // Persistent progress stored per industry in localStorage
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
    localStorage.setItem('rust_unified_progress_v1', JSON.stringify(completedSkills));
  }, [completedSkills]);

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

  // Calculate stats
  const totalSkillsCount = UNIFIED_INDUSTRY_TRACKS.reduce(
    (acc, t) => acc + t.phases.reduce((pAcc, p) => pAcc + p.skills.length, 0), 
    0
  );

  const totalCompletedCount = Object.values(completedSkills).reduce(
    (acc, list) => acc + list.length, 
    0
  );

  const globalMasteryPercentage = Math.round((totalCompletedCount / totalSkillsCount) * 100);

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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-600 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-orange-500/25 border border-orange-400/40">
              🦀
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">
                  Rust Industry Mastery
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Unified Roadmap
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Beginner to Staff Expert In Every Major Industry — Zero Segregation
              </p>
            </div>
          </div>

          {/* Global Progress Pill */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0d1117] border border-slate-800 text-xs">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Total Mastery:</span>
              <span className="font-mono font-bold text-orange-400">{globalMasteryPercentage}%</span>
              <span className="text-slate-500 text-[11px]">({totalCompletedCount}/{totalSkillsCount})</span>
            </div>

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

      {/* Main Body Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* 1. Industry Quick Switcher (Top Banner) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-orange-400" />
              <span>Select an Industry to Explore (Beginner ➔ Expert)</span>
            </span>
            <span className="text-xs text-orange-400/90 font-mono hidden sm:inline">
              8 Major Fields Included
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
                  
                  {/* Progress Micro Pill */}
                  <span className="mt-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-orange-300">
                    {stats.completed}/{stats.total}
                  </span>

                  {/* Micro Progress Bar */}
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

        {/* 2. Unified Area Master Container */}
        <div className="bg-[#161b22]/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
          
          {/* Header Banner */}
          <div className="p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r from-[#1c2128] via-[#161b22] to-[#0d1117]">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/40">
                    {getTrackIcon(currentTrack.icon)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {currentTrack.title}
                      </h1>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 font-mono">
                        {currentTrack.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-orange-400 font-medium mt-0.5">
                      {currentTrack.tagline}
                    </p>
                  </div>
                </div>

                {/* Plain English ELI5 Introduction */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-950/20 to-orange-950/20 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-amber-400 flex items-center space-x-1.5 mb-1 text-xs uppercase tracking-wider font-bold">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Explain Like I'm 5 (What is this area?):</span>
                  </strong>
                  {currentTrack.eli5Overview}
                </div>
              </div>

              {/* Progress & Salary Quick Box */}
              <div className="bg-[#0d1117] p-5 rounded-2xl border border-slate-800 shrink-0 w-full lg:w-80 space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-0.5">Demand & Average Salary:</span>
                  <span className="text-xs font-semibold text-emerald-400 block">
                    {currentTrack.salaryAndDemand}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-300">Your Area Mastery:</span>
                    <span className="text-orange-400 font-bold">{currentTrackStats.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${currentTrackStats.percentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                    {currentTrackStats.completed} of {currentTrackStats.total} Skills Mastered
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    Prerequisites: <strong className="text-slate-300">{currentTrack.beginnerZeroPrerequisites[0]}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Why Rust Dominates & Legacy Flaws */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-xs">
                <span className="font-bold text-red-400 uppercase tracking-wider block mb-1">
                  ✕ Why Legacy Tech Failed ({currentTrack.title}):
                </span>
                <p className="text-red-200/90 leading-relaxed mb-2">
                  {currentTrack.legacyFlawsVsRust.legacyFlaw}
                </p>
                <div className="text-[11px] text-red-400/80 font-mono">
                  Impact: Unacceptable latency spikes, crashes, and CVE security breaches.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-xs">
                <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  ✓ The Rust Solution & Revolution:
                </span>
                <p className="text-emerald-200/90 leading-relaxed mb-2">
                  {currentTrack.legacyFlawsVsRust.rustFix}
                </p>
                <div className="text-[11px] text-emerald-300 font-mono font-bold">
                  ⚡ Measured Impact: {currentTrack.legacyFlawsVsRust.measuredImpact}
                </div>
              </div>
            </div>
          </div>

          {/* 3. The Unified Continuous Roadmap (Phase 1 ➔ Phase 4) */}
          <div className="p-6 sm:p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span>The Unified Journey: Beginner to Staff Expert</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Follow this sequential path. Click the checkbox on each skill as you complete it to save your progress!
                </p>
              </div>
            </div>

            {/* Sequential Phases */}
            <div className="space-y-8">
              {currentTrack.phases.map((phaseGroup, pIdx) => (
                <div key={pIdx} className="space-y-4">
                  {/* Phase Section Title Banner */}
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0d1117] border border-slate-800">
                    <span className="w-7 h-7 rounded-lg bg-orange-600 text-white font-bold flex items-center justify-center text-xs">
                      {pIdx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        {phaseGroup.phaseTitle}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-400">
                        {phaseGroup.phaseDescription}
                      </p>
                    </div>
                  </div>

                  {/* Skills under this Phase */}
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
                          {/* Skill Header */}
                          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/60">
                            <div className="flex items-start space-x-3">
                              <button
                                onClick={() => toggleSkill(currentTrack.id, skill.id)}
                                className="mt-1 transition hover:scale-110"
                                title={isDone ? "Mark as incomplete" : "Mark as completed"}
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
                                  <h4 className="text-base sm:text-lg font-bold text-white">
                                    {skill.title}
                                  </h4>
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

                          {/* Skill Body (Left: Explanation, Right: Code) */}
                          <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column: ELI5 + Why it matters + Concepts + Exercise */}
                            <div className="space-y-4">
                              {/* ELI5 Explanation */}
                              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                                <strong className="text-amber-400 block mb-1">🐣 Plain English (ELI5):</strong>
                                {skill.eli5}
                              </div>

                              {/* Why in this industry */}
                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                <strong className="text-slate-100">Why needed in {currentTrack.title}: </strong>
                                {skill.whyInThisIndustry}
                              </p>

                              {/* Concepts to Master */}
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

                              {/* Practical Hands-On Exercise */}
                              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/30">
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
                                  🎯 Practice Exercise:
                                </span>
                                <p className="text-xs text-purple-200/90 mb-1">{skill.exercise.task}</p>
                                <p className="text-[11px] text-purple-300/70 italic">💡 Hint: {skill.exercise.hint}</p>
                              </div>
                            </div>

                            {/* Right Column: Code Snippet */}
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

            {/* 4. Portfolio Capstone Project Walkthrough */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-950/25 via-slate-900 to-[#161b22] border border-orange-500/40">
              <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm mb-1">
                <Rocket className="w-4 h-4" />
                <span>Production Portfolio Capstone: {currentTrack.capstoneProject.title}</span>
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

            {/* 5. Must-Know Crates & Ecosystem */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Must-Know Production Crates for {currentTrack.title}</span>
              </h3>
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

            {/* 6. Technical Interview Scenarios */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Staff/Principal Interview Questions ({currentTrack.title})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTrack.interviewPrep.map((qa, qIdx) => (
                  <div key={qIdx} className="bg-[#0d1117] p-4 rounded-xl border border-slate-800">
                    <p className="font-semibold text-white text-xs sm:text-sm mb-2 flex items-start space-x-2">
                      <span className="text-orange-400 font-mono font-bold">Q{qIdx + 1}:</span>
                      <span>{qa.question}</span>
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-emerald-400 block mb-0.5">What Interviewers Expect:</strong>
                      {qa.expectedAnswer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#161b22] py-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🦀</span>
            <span className="text-slate-400 font-medium">Rust Across Industries — Unified Zero-to-Hero Architecture Guide</span>
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
