import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Cpu, Rocket, Cloud, TrendingUp, Bot, Globe, 
  Terminal, CheckCircle, Circle, BookOpen, Layers, 
  Sparkles, ExternalLink, ChevronRight, Search, 
  Award, Compass, Zap, HelpCircle, Code2, ArrowUpRight
} from 'lucide-react';

import { INDUSTRY_TRACKS } from './data/industryTracks';
import { CORE_ROADMAP_STAGES } from './data/coreRoadmap';
import { INITIAL_SKILLS_ASSESSMENT } from './data/skillsAssessment';
import { IndustryTrack } from './data/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'industries' | 'core' | 'comparison' | 'readiness'>('industries');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryTrack>(INDUSTRY_TRACKS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSkills, setCompletedSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('rust_completed_skills');
    return saved ? JSON.parse(saved) : ['c1', 'c2'];
  });

  useEffect(() => {
    localStorage.setItem('rust_completed_skills', JSON.stringify(completedSkills));
  }, [completedSkills]);

  const toggleSkill = (id: string) => {
    setCompletedSkills(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      case 'Cloud': return <Cloud className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      default: return <Terminal className="w-5 h-5" />;
    }
  };

  const filteredIndustries = INDUSTRY_TRACKS.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.coreConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const readinessScore = Math.round((completedSkills.length / INITIAL_SKILLS_ASSESSMENT.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-600 selection:text-white">
      {/* Top Banner Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl p-1.5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg shadow-orange-500/20 text-white flex items-center justify-center font-bold">
              🦀
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Rust Industry Mastery
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono font-medium">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                The comprehensive road to staff-level engineering across systems
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('industries')}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'industries'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Industries</span>
            </button>
            <button
              onClick={() => setActiveTab('core')}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'core'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Core Roadmap</span>
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'comparison'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Paradigm Shifts</span>
            </button>
            <button
              onClick={() => setActiveTab('readiness')}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'readiness'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Skill Matrix</span>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-full font-mono text-orange-300">
                {readinessScore}%
              </span>
            </button>
          </nav>

          {/* GitHub / Share link */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs flex items-center space-x-1.5 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 transition"
            >
              <span>GitHub Pages</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ======================= TAB: INDUSTRIES ======================= */}
        {activeTab === 'industries' && (
          <div>
            {/* Hero Sub-header */}
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Domain-Specific Deep Dives & Industry Transformations</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                How Rust Rewires Modern Engineering
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                From operating system kernels and cyber security to aerospace and microsecond trading—explore the exact skills, crates, architecture patterns, and capstone deliverables required in each field.
              </p>
            </div>

            {/* Industry Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
              {INDUSTRY_TRACKS.map((track) => {
                const isSelected = selectedIndustry.id === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedIndustry(track)}
                    className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10 text-white font-semibold'
                        : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mb-2 ${isSelected ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
                      {getIndustryIcon(track.icon)}
                    </div>
                    <span className="line-clamp-2 leading-tight">{track.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Industry Detail View */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-sm">
              {/* Header Banner */}
              <div className="p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="p-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        {getIndustryIcon(selectedIndustry.icon)}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {selectedIndustry.title}
                      </h2>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                        {selectedIndustry.badge}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
                      {selectedIndustry.tagline}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedIndustry.roleTitles.map((role, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-md bg-slate-800/80 text-orange-300 border border-slate-700/60 font-mono">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scope & Day in Life */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 border-b border-slate-800/60 bg-slate-950/40">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-400 mb-3 flex items-center space-x-2">
                    <Compass className="w-4 h-4" />
                    <span>Scope of Work & Responsibilities</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {selectedIndustry.scopeOfWork.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>A Day in the Life</span>
                  </h3>
                  <p className="text-sm text-slate-300 bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 leading-relaxed italic">
                    "{selectedIndustry.dayInTheLife}"
                  </p>
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Key Engineering Hurdles</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedIndustry.keyChallenges.map((challenge, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded bg-red-950/30 text-red-300 border border-red-900/40">
                          {challenge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Before vs After: The Paradigm Shift */}
              <div className="p-6 sm:p-8 border-b border-slate-800 bg-slate-900/40">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-orange-400" />
                  <span>How Rust Replaces Legacy Technology in this Industry</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-950/20 border border-red-900/30 p-5 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                        Traditional Approach
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-900/50 text-red-200">
                        {selectedIndustry.comparison.traditionalTech}
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-red-200/90">
                      {selectedIndustry.comparison.traditionalPainPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-red-500 font-bold shrink-0">✕</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-900/30 p-5 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                        The Rust Revolution
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-200">
                        Rust Advantage
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-emerald-200/90">
                      {selectedIndustry.comparison.rustParadigmShift.map((pt, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-emerald-900/40 text-xs font-mono text-emerald-300">
                      ⚡ Proven Impact: {selectedIndustry.comparison.metricsImprovement}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills to Learn: Core Concepts & Programmatic Skills */}
              <div className="p-6 sm:p-8 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Code2 className="w-5 h-5 text-orange-400" />
                  <span>Required Skills & Core Concepts</span>
                </h3>

                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Essential Theoretical Concepts</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIndustry.coreConcepts.map((concept, idx) => (
                      <span key={idx} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-mono">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="text-xs font-mono uppercase text-slate-400 mb-3">Programmatic & Architectural Capabilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedIndustry.programmaticSkills.map((skill, idx) => (
                    <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono">
                            {skill.importance}
                          </span>
                          <span className="text-[11px] text-slate-500 capitalize">{skill.category}</span>
                        </div>
                        <h5 className="font-semibold text-white text-sm mb-1">{skill.name}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">{skill.description}</p>
                      </div>
                      <div className="text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 text-slate-300">
                        <span className="text-orange-400 font-semibold block text-[11px]">Practical Application:</span>
                        {skill.practicalApplication}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Must-Know Crates & Ecosystem */}
              <div className="p-6 sm:p-8 border-b border-slate-800 bg-slate-950/40">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Must-Know Crates & Tooling Ecosystem</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedIndustry.mustKnowCrates.map((crate, idx) => (
                    <a
                      key={idx}
                      href={crate.link || `https://crates.io/crates/${crate.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-3.5 bg-slate-900 rounded-xl border border-slate-800 hover:border-orange-500/50 transition block"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm font-bold text-orange-400 group-hover:text-orange-300">
                          {crate.name}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-orange-400 transition" />
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">{crate.purpose}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Real World Use Cases */}
              <div className="p-6 sm:p-8 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Production Use Cases & Success Stories</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedIndustry.useCases.map((uc, idx) => (
                    <div key={idx} className="bg-slate-900/70 p-5 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white text-base mb-2">{uc.title}</h4>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <p><strong className="text-red-400">Problem:</strong> <span className="text-slate-300">{uc.problemSolved}</span></p>
                        <p><strong className="text-emerald-400">Rust Solution:</strong> <span className="text-slate-300">{uc.howRustSolvesIt}</span></p>
                        <p><strong className="text-cyan-400">Real-World Adopters:</strong> <span className="text-slate-300">{uc.realWorldExample}</span></p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                        {uc.cratesAndEcosystem.map((cr, cIdx) => (
                          <span key={cIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {cr}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capstone Projects */}
              <div className="p-6 sm:p-8 border-b border-slate-800 bg-slate-950/40">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span>Portfolio Capstone Projects (Staff Portfolio Builders)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedIndustry.capstoneProjects.map((proj, idx) => (
                    <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full inline-block mb-2 ${
                          proj.level === 'Beginner' ? 'bg-blue-900/40 text-blue-300 border border-blue-800' :
                          proj.level === 'Intermediate' ? 'bg-amber-900/40 text-amber-300 border border-amber-800' :
                          'bg-red-900/40 text-red-300 border border-red-800'
                        }`}>
                          {proj.level}
                        </span>
                        <h4 className="font-bold text-white text-base mb-2">{proj.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">{proj.description}</p>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono uppercase text-slate-400 mb-1.5">Deliverables:</div>
                        <ul className="text-xs space-y-1 text-slate-300">
                          {proj.deliverables.map((deliv, dIdx) => (
                            <li key={dIdx} className="flex items-center space-x-1.5">
                              <span className="text-orange-400">▹</span>
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Interview Questions */}
              <div className="p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-indigo-400" />
                  <span>Senior/Staff Technical Interview Scenarios</span>
                </h3>
                <div className="space-y-4">
                  {selectedIndustry.interviewQuestions.map((q, idx) => (
                    <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-start space-x-3">
                        <span className="text-xs font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded">
                          Q{idx + 1}
                        </span>
                        <div>
                          <p className="font-medium text-white text-sm mb-2">{q.question}</p>
                          <div className="text-xs bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-slate-300 leading-relaxed">
                            <span className="text-orange-400 font-semibold block mb-0.5">What Interviewers Expect:</span>
                            {q.whatInterviewersLookFor}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: CORE ROADMAP ======================= */}
        {activeTab === 'core' && (
          <div>
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Foundational Mastery Curriculum</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                Universal Rust Engineering Foundations
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                Regardless of your target industry, every staff-level systems engineer must conquer these four stages of memory semantics, concurrency primitives, asynchronous drivers, and bare-metal compilation.
              </p>
            </div>

            <div className="space-y-8">
              {CORE_ROADMAP_STAGES.map((stage) => (
                <div key={stage.stage} className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
                  <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        {stage.duration}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">{stage.title}</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-xl">{stage.objectives}</p>
                  </div>

                  <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {stage.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-white text-base mb-2">{topic.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{topic.description}</p>
                        </div>
                        {topic.codeSnippet && (
                          <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto text-orange-200">
                            <pre>{topic.codeSnippet}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 bg-slate-950/40 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase text-orange-400 shrink-0">
                      🛠️ Hands-on Drills:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {stage.handsOnDrills.map((drill, dIdx) => (
                        <span key={dIdx} className="text-xs bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-slate-300">
                          {drill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB: PARADIGM SHIFTS ======================= */}
        {activeTab === 'comparison' && (
          <div>
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Industry-Wide Architecture Comparison</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                Legacy Stack vs. Rust Modernization
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                Detailed side-by-side comparison illustrating why the world's most critical infrastructure is migrating away from C/C++, Java, and Go to Rust.
              </p>
            </div>

            <div className="space-y-6">
              {INDUSTRY_TRACKS.map((track) => (
                <div key={track.id} className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="p-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {getIndustryIcon(track.icon)}
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-white">{track.title}</h2>
                      <span className="text-xs text-slate-400">Category: {track.category}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-xl">
                      <span className="text-xs font-mono font-bold text-red-400 block mb-2">
                        Legacy Flaws ({track.comparison.traditionalTech})
                      </span>
                      <ul className="text-xs sm:text-sm space-y-1.5 text-red-200/90">
                        {track.comparison.traditionalPainPoints.map((pt, pIdx) => (
                          <li key={pIdx}>✕ {pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl">
                      <span className="text-xs font-mono font-bold text-emerald-400 block mb-2">
                        Rust Solution & Transformation
                      </span>
                      <ul className="text-xs sm:text-sm space-y-1.5 text-emerald-200/90">
                        {track.comparison.rustParadigmShift.map((pt, pIdx) => (
                          <li key={pIdx}>✓ {pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 text-xs font-mono bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-orange-300">
                    📈 Measured Impact: {track.comparison.metricsImprovement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB: READINESS ASSESSMENT ======================= */}
        {activeTab === 'readiness' && (
          <div>
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>Interactive Skill Matrix & Readiness Tracker</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                Your Rust Industry Readiness: {readinessScore}%
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mb-4">
                Check off competencies as you master them. Your progress is saved locally in your browser.
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-3 border border-slate-700 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INITIAL_SKILLS_ASSESSMENT.map((skill) => {
                const isDone = completedSkills.includes(skill.id);
                return (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`text-left p-4 rounded-xl border transition-all flex items-start space-x-3 ${
                      isDone
                        ? 'bg-orange-500/10 border-orange-500/50 text-white'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isDone ? (
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {skill.category}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          skill.level === 'Beginner' ? 'text-blue-400' :
                          skill.level === 'Intermediate' ? 'text-amber-400' :
                          'text-red-400'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                      <p className={`text-sm font-medium ${isDone ? 'text-white' : 'text-slate-300'}`}>
                        {skill.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Crafted for engineers aiming for Principal/Staff positions across Systems, Security, Defense, Aerospace, FinTech, and Cloud.
          </p>
          <p className="font-mono text-slate-400">
            Open Source • Deployable to GitHub Pages Anywhere
          </p>
        </div>
      </footer>
    </div>
  );
}
