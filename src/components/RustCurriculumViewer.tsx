import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle2, Circle, Clock, Sparkles, AlertTriangle, 
  HelpCircle, ChevronLeft, ChevronRight, Copy, Check, Search, 
  Layers, Cpu, Code2, Terminal, ShieldCheck, ArrowRight, Lightbulb, 
  FileText, Award, Zap, CheckSquare
} from 'lucide-react';

import { 
  RUST_MASTERY_CURRICULUM, 
  MasteryModule, 
  Lesson, 
  QA, 
  MCQ 
} from '../data/rustMasteryCurriculum';

type ModuleTab = 'lessons' | 'takeaways' | 'qas' | 'mcqs';

interface RustCurriculumViewerProps {
  onNavigateToCheatSheet?: () => void;
}

export const RustCurriculumViewer: React.FC<RustCurriculumViewerProps> = ({ onNavigateToCheatSheet }) => {
  // Currently selected module (1 to 10)
  const [selectedModuleId, setSelectedModuleId] = useState<string>('module-1');
  
  // Active inner tab: lessons | takeaways | qas | mcqs
  const [activeInnerTab, setActiveInnerTab] = useState<ModuleTab>('lessons');

  // Track completed modules in localStorage
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rust_completed_modules');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track user MCQ answers: { [mcqId]: selectedOptionIndex }
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('rust_mcq_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Code snippet copy status
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rust_completed_modules', JSON.stringify(completedModules));
    } catch (e) {
      console.error(e);
    }
  }, [completedModules]);

  useEffect(() => {
    try {
      localStorage.setItem('rust_mcq_answers', JSON.stringify(mcqAnswers));
    } catch (e) {
      console.error(e);
    }
  }, [mcqAnswers]);

  const toggleModuleCompletion = (modId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const currentModule: MasteryModule = RUST_MASTERY_CURRICULUM.find(
    m => m.id === selectedModuleId
  ) || RUST_MASTERY_CURRICULUM[0];

  // Navigation helpers
  const currentIdx = RUST_MASTERY_CURRICULUM.findIndex(m => m.id === selectedModuleId);
  const prevModule = currentIdx > 0 ? RUST_MASTERY_CURRICULUM[currentIdx - 1] : null;
  const nextModule = currentIdx < RUST_MASTERY_CURRICULUM.length - 1 ? RUST_MASTERY_CURRICULUM[currentIdx + 1] : null;

  // Statistics
  const totalModules = RUST_MASTERY_CURRICULUM.length;
  const completedCount = Object.values(completedModules).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);
  const remainingMinutes = RUST_MASTERY_CURRICULUM.reduce((acc, m) => {
    return completedModules[m.id] ? acc : acc + m.estimatedMinutes;
  }, 0);

  // Calculate MCQs answered correctly in this module
  const moduleMcqs = currentModule.mcqs;
  const answeredCount = moduleMcqs.filter(q => mcqAnswers[q.id] !== undefined).length;
  const correctCount = moduleMcqs.filter(q => mcqAnswers[q.id] === q.correctIndex).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wider uppercase border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Dedicated Rust Learning Path • 10 Core Sequential Modules</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Mastering Rust: <span className="text-amber-400">Everything Before Learn-by-Doing</span>
            </h1>
            
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Ground your understanding in <strong className="text-amber-200">low-level hardware architecture, memory models, and compiler invariants</strong> before writing project code. Every module includes in-depth lessons, key takeaways, interview-grade conceptual Q&As, and interactive MCQ assessments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-400">
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-md border border-stone-800">
                <Layers className="w-3.5 h-3.5 text-amber-400" /> 10 Progressive Modules
              </span>
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-md border border-stone-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> ~9.7 Hours Total Study Time
              </span>
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-md border border-stone-800">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Key Takeaways, Q&As & MCQs in every module
              </span>
            </div>
          </div>

          {/* Progress Widget */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-5 min-w-[280px] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-stone-300 uppercase tracking-wider">Curriculum Progress</span>
                <span className="text-amber-400 font-mono text-sm">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
              <span className="text-stone-400">
                Mastered: <strong className="text-stone-200">{completedCount}</strong> / {totalModules} Modules
              </span>
              <span className="text-stone-400">
                Est. Remaining: <strong className="text-amber-300">{remainingMinutes}m</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Modules Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 shadow-md sticky top-20 z-10 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-1">
              <span className="uppercase tracking-wider">Sequential Learning Path</span>
              <span className="text-amber-400 font-mono">{completedCount}/{totalModules} Completed</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Progress sequentially. Complete lessons, review key takeaways, read Q&As, and pass MCQs for each module.
            </p>
          </div>

          {/* Module Cards List */}
          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {RUST_MASTERY_CURRICULUM.map(mod => {
              const isSelected = mod.id === selectedModuleId;
              const isCompleted = !!completedModules[mod.id];

              let levelColor = 'bg-blue-950/60 text-blue-300 border-blue-800/50';
              if (mod.level.includes('Advanced')) levelColor = 'bg-orange-950/60 text-orange-300 border-orange-800/50';
              if (mod.level.includes('Master')) levelColor = 'bg-red-950/60 text-red-300 border-red-800/50';

              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    setSelectedModuleId(mod.id);
                    setActiveInnerTab('lessons');
                  }}
                  className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/30 border-amber-500/60 shadow-md ring-1 ring-amber-500/20'
                      : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                          Mod {mod.number}
                        </span>
                        <span className="text-[10px] text-stone-500">•</span>
                        <span className="text-[10px] text-stone-400">
                          {mod.estimatedMinutes}m read
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded border font-mono ${levelColor}`}>
                          {mod.level}
                        </span>
                      </div>
                      <h4 className={`text-xs font-semibold truncate ${
                        isSelected ? 'text-amber-200 font-bold' : 'text-stone-200 group-hover:text-amber-300'
                      }`}>
                        {mod.title.replace(/^Module \d+: /, '')}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">
                        {mod.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={(e) => toggleModuleCompletion(mod.id, e)}
                      title={isCompleted ? "Mark as incomplete" : "Mark as completed"}
                      className="p-1 rounded-md text-stone-500 hover:text-amber-400 transition-colors shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                      ) : (
                        <Circle className="w-4 h-4 hover:stroke-stone-300" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Module Classroom (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            {/* Module Header */}
            <div className="space-y-4 border-b border-stone-800 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                  Module {currentModule.number} • {currentModule.level}
                </span>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {currentModule.estimatedMinutes} minutes
                  </span>

                  <button
                    onClick={() => toggleModuleCompletion(currentModule.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      completedModules[currentModule.id]
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/40 hover:bg-emerald-900/50'
                        : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                    }`}
                  >
                    {completedModules[currentModule.id] ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Module Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Mark as Completed</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-100">
                  {currentModule.title}
                </h2>
                <p className="text-stone-300 text-sm sm:text-base mt-1.5 font-medium">
                  {currentModule.subtitle}
                </p>
                <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  {currentModule.description}
                </p>
              </div>

              {/* Inner Tabs for the Module: Lessons, Takeaways, Q&As, MCQs */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-800/80 overflow-x-auto scrollbar-thin">
                <button
                  onClick={() => setActiveInnerTab('lessons')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeInnerTab === 'lessons'
                      ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                      : 'bg-stone-800/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>1. Deep Lessons ({currentModule.lessons.length})</span>
                </button>

                <button
                  onClick={() => setActiveInnerTab('takeaways')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeInnerTab === 'takeaways'
                      ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                      : 'bg-stone-800/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>2. Key Takeaways ({currentModule.keyTakeaways.length})</span>
                </button>

                <button
                  onClick={() => setActiveInnerTab('qas')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeInnerTab === 'qas'
                      ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                      : 'bg-stone-800/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>3. Deep Q&A Archive ({currentModule.qas.length})</span>
                </button>

                <button
                  onClick={() => setActiveInnerTab('mcqs')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeInnerTab === 'mcqs'
                      ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                      : 'bg-stone-800/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>4. Mastery MCQs ({currentModule.mcqs.length})</span>
                  {answeredCount > 0 && (
                    <span className="text-[10px] bg-stone-900 px-1.5 py-0.2 rounded font-mono">
                      {correctCount}/{moduleMcqs.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: LESSONS */}
            {activeInnerTab === 'lessons' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>In-Depth Conceptual & Hardware Lessons</span>
                  </h3>
                  <span className="text-xs text-stone-500 font-mono">
                    {currentModule.lessons.length} Detailed Sections
                  </span>
                </div>

                {currentModule.lessons.map((lesson, idx) => (
                  <div 
                    key={idx}
                    className="bg-stone-950/70 border border-stone-800/90 rounded-xl p-5 sm:p-6 space-y-4 hover:border-stone-700/80 transition-colors"
                  >
                    <div className="flex items-baseline justify-between border-b border-stone-800/80 pb-2.5">
                      <h4 className="text-base font-semibold text-amber-200 flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {currentModule.number}.{idx + 1}
                        </span>
                        <span>{lesson.title}</span>
                      </h4>
                    </div>

                    <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                      {lesson.theory}
                    </p>

                    {/* Hardware Reality Box */}
                    <div className="bg-stone-900 border border-cyan-800/40 rounded-lg p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span>Hardware & Low-Level Theory Reality</span>
                      </div>
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed pl-6">
                        {lesson.hardwareCallout}
                      </p>
                    </div>

                    {/* Code Snippet Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <span className="font-mono text-amber-400 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5" />
                          Canonical Implementation
                        </span>
                        <button
                          onClick={() => handleCopyCode(`code-${currentModule.id}-${idx}`, lesson.code)}
                          className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 bg-stone-900 px-2 py-0.5 rounded border border-stone-800 transition-colors"
                        >
                          {copiedCodeId === `code-${currentModule.id}-${idx}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="relative bg-stone-950 rounded-lg border border-stone-800 overflow-hidden font-mono text-xs">
                        <pre className="p-4 text-stone-200 overflow-x-auto leading-relaxed">
                          <code>{lesson.code}</code>
                        </pre>
                      </div>

                      <p className="text-xs text-stone-400 italic">
                        💡 {lesson.codeExplanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 2: KEY TAKEAWAYS */}
            {activeInnerTab === 'takeaways' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>Essential Architectural Takeaways for Module {currentModule.number}</span>
                  </div>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    These are the fundamental invariants and mental models you must internalize before advancing to project code or the next module:
                  </p>

                  <div className="space-y-3 pt-2">
                    {currentModule.keyTakeaways.map((takeaway, tIdx) => (
                      <div 
                        key={tIdx}
                        className="bg-stone-900/80 border border-stone-800 rounded-lg p-3.5 flex items-start gap-3"
                      >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold shrink-0 mt-0.5">
                          {tIdx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                          {takeaway}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: DEEP Q&A ARCHIVE */}
            {activeInnerTab === 'qas' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <h3 className="text-base font-bold text-stone-200 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Systems & Interview-Grade Conceptual Q&A</span>
                  </h3>
                  <span className="text-xs text-stone-500 font-mono">
                    {currentModule.qas.length} In-Depth Questions
                  </span>
                </div>

                {currentModule.qas.map((qa, qIdx) => (
                  <div 
                    key={qIdx}
                    className="bg-stone-950/80 border border-stone-800 rounded-xl p-5 space-y-3 hover:border-stone-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-semibold text-amber-200 flex items-start gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                          Q{qIdx + 1}
                        </span>
                        <span>{qa.question}</span>
                      </h4>
                      <span className="text-[10px] font-mono bg-stone-900 text-stone-400 px-2 py-0.5 rounded border border-stone-800 whitespace-nowrap shrink-0">
                        {qa.concept}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-8">
                      {qa.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 4: MASTERY MCQS */}
            {activeInnerTab === 'mcqs' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-stone-200 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Module {currentModule.number} Mastery Assessment</span>
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Test your low-level memory and compiler understanding.
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      Score: {correctCount} / {moduleMcqs.length}
                    </span>
                  </div>
                </div>

                {moduleMcqs.map((mcq, mIdx) => {
                  const selectedOpt = mcqAnswers[mcq.id];
                  const hasAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === mcq.correctIndex;

                  return (
                    <div 
                      key={mcq.id}
                      className="bg-stone-950 border border-stone-800/90 rounded-xl p-5 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-400 shrink-0 mt-0.5">
                          Question {mIdx + 1}
                        </span>
                        <p className="text-sm font-semibold text-stone-100 leading-relaxed">
                          {mcq.question}
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        {mcq.options.map((opt, oIdx) => {
                          const isOptionSelected = selectedOpt === oIdx;
                          const isThisCorrect = oIdx === mcq.correctIndex;

                          let optionStyle = 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-850';

                          if (hasAnswered) {
                            if (isThisCorrect) {
                              optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium';
                            } else if (isOptionSelected && !isThisCorrect) {
                              optionStyle = 'bg-red-950/40 border-red-500/60 text-red-200';
                            } else {
                              optionStyle = 'bg-stone-900/50 border-stone-800/50 text-stone-500 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={hasAnswered}
                              onClick={() => setMcqAnswers(prev => ({
                                ...prev,
                                [mcq.id]: oIdx
                              }))}
                              className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                            >
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-800/80 shrink-0">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="flex-1">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation reveal */}
                      {hasAnswered && (
                        <div className="mt-3 p-3.5 rounded-lg bg-stone-900/90 border border-stone-800 space-y-1 animate-fadeIn">
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            {isCorrect ? (
                              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                                <Check className="w-3.5 h-3.5" /> Correct Answer!
                              </span>
                            ) : (
                              <span className="text-red-400 flex items-center gap-1 font-bold">
                                <AlertTriangle className="w-3.5 h-3.5" /> Incorrect
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-300 leading-relaxed">
                            <strong className="text-stone-200">Architectural Reality: </strong>
                            {mcq.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Module Navigation Controls */}
            <div className="pt-6 border-t border-stone-800 flex items-center justify-between gap-4">
              {prevModule ? (
                <button
                  onClick={() => {
                    setSelectedModuleId(prevModule.id);
                    setActiveInnerTab('lessons');
                    window.scrollTo({ top: 250, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/40 text-xs sm:text-sm font-medium transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate max-w-[150px] sm:max-w-none">
                    Module {prevModule.number}: {prevModule.title.replace(/^Module \d+: /, '')}
                  </span>
                </button>
              ) : <div />}

              {nextModule ? (
                <button
                  onClick={() => {
                    setSelectedModuleId(nextModule.id);
                    setActiveInnerTab('lessons');
                    window.scrollTo({ top: 250, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <span className="truncate max-w-[150px] sm:max-w-none">
                    Next: Module {nextModule.number}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Curriculum Complete! Ready for Real-World Projects.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
