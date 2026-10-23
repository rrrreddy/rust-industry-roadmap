import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle2, Circle, Clock, Sparkles, AlertTriangle, 
  HelpCircle, ChevronLeft, ChevronRight, Copy, Check, Search, 
  Filter, ExternalLink, Bookmark, CheckSquare, Layers, Cpu, Code2,
  Terminal, ShieldCheck, ArrowRight
} from 'lucide-react';

import { 
  RUST_BOOK_CHAPTERS, 
  BOOK_PARTS, 
  BOOK_METADATA, 
  BookChapter 
} from '../data/theRustBook3rdEdition';

interface RustBookViewerProps {
  onNavigateToDomains?: () => void;
}

export const RustBookViewer: React.FC<RustBookViewerProps> = ({ onNavigateToDomains }) => {
  // Current active chapter (1 to 26)
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(1);
  
  // Completed chapters tracking (persisted in localStorage)
  const [completedChapters, setCompletedChapters] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rust_book_completed_chapters');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Quiz user selections: { [chapterNumber]: selectedOptionIndex }
  const [quizSelections, setQuizSelections] = useState<Record<number, number>>({});
  
  // Search query & filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>('all');
  
  // Code copy feedback
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Sync completed chapters to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rust_book_completed_chapters', JSON.stringify(completedChapters));
    } catch (e) {
      console.error('Failed to save completed chapters to localStorage', e);
    }
  }, [completedChapters]);

  const toggleChapterCompletion = (chapterNum: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedChapters(prev => ({
      ...prev,
      [chapterNum]: !prev[chapterNum]
    }));
  };

  const handleCopyCode = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Filter chapters based on search query and part filter
  const filteredChapters = RUST_BOOK_CHAPTERS.filter(ch => {
    const matchesSearch = searchQuery.trim() === '' || 
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.sections.some(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.hardwareOrTheoryReality.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesPart = selectedPartFilter === 'all' || ch.part.startsWith(selectedPartFilter);

    return matchesSearch && matchesPart;
  });

  // Find currently selected chapter object
  const currentChapter: BookChapter = RUST_BOOK_CHAPTERS.find(
    ch => ch.chapterNumber === selectedChapterNumber
  ) || RUST_BOOK_CHAPTERS[0];

  // Calculate statistics
  const totalChaptersCount = RUST_BOOK_CHAPTERS.length;
  const completedCount = Object.values(completedChapters).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalChaptersCount) * 100);
  const remainingMinutes = RUST_BOOK_CHAPTERS.reduce((acc, ch) => {
    return completedChapters[ch.chapterNumber] ? acc : acc + ch.estimatedReadingMinutes;
  }, 0);

  // Navigation handlers
  const currentIndex = RUST_BOOK_CHAPTERS.findIndex(c => c.chapterNumber === selectedChapterNumber);
  const prevChapter = currentIndex > 0 ? RUST_BOOK_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < RUST_BOOK_CHAPTERS.length - 1 ? RUST_BOOK_CHAPTERS[currentIndex + 1] : null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wider uppercase border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official 3rd Edition Curriculum • Rust 2024</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              The Rust Programming Language <span className="text-amber-400 font-mono text-2xl sm:text-3xl">(3rd Edition)</span>
            </h1>
            
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              By <span className="text-amber-200 font-medium">Steve Klabnik, Carol Nichols, and Chris Krycho</span>.
              Master the conceptual theory, low-level hardware reality, and compiler diagnostics of all 21 chapters and 5 reference appendices <span className="text-amber-400 font-semibold">before</span> building domain-specific projects.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-400">
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-md border border-stone-800">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> 26 Total Units (Ch 1–21 + Appendices A–E)
              </span>
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-md border border-stone-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> ~17.3 Hours Total Deep Reading
              </span>
              <a 
                href={BOOK_METADATA.officialDocsUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-amber-500/50"
              >
                <span>Read Official Book on doc.rust-lang.org</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Progress Tracker Widget */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-5 min-w-[280px] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-stone-300 uppercase tracking-wider">Book Mastery Progress</span>
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
                Completed: <strong className="text-stone-200">{completedCount}</strong> / {totalChaptersCount}
              </span>
              <span className="text-stone-400">
                Est. Left: <strong className="text-amber-300">{remainingMinutes}m</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chapter Index & Search (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Filter Header */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 shadow-md space-y-3 sticky top-20 z-10 backdrop-blur-md">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topics, syntax, or hardware..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700/70 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-xs text-stone-500 hover:text-stone-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Part Quick Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
              <button
                onClick={() => setSelectedPartFilter('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedPartFilter === 'all'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                All Parts (26)
              </button>
              {['Part I', 'Part II', 'Part III', 'Part IV', 'Part V', 'Part VI', 'Part VII', 'Part VIII'].map(partLabel => (
                <button
                  key={partLabel}
                  onClick={() => setSelectedPartFilter(partLabel)}
                  className={`px-2 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                    selectedPartFilter === partLabel
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                  }`}
                >
                  {partLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter List */}
          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredChapters.map(chapter => {
              const isSelected = chapter.chapterNumber === selectedChapterNumber;
              const isCompleted = !!completedChapters[chapter.chapterNumber];

              return (
                <div
                  key={chapter.chapterNumber}
                  onClick={() => setSelectedChapterNumber(chapter.chapterNumber)}
                  className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/30 border-amber-500/60 shadow-md ring-1 ring-amber-500/20'
                      : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold">
                          Ch {chapter.chapterNumber}
                        </span>
                        <span className="text-[10px] text-stone-500">•</span>
                        <span className="text-[10px] text-stone-400">
                          {chapter.estimatedReadingMinutes}m read
                        </span>
                        {chapter.chapterNumber === 17 && (
                          <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.2 rounded font-mono">
                            New 3rd Ed
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-semibold truncate ${
                        isSelected ? 'text-amber-200 font-bold' : 'text-stone-200 group-hover:text-amber-300'
                      }`}>
                        {chapter.title.replace(/^Chapter \d+: /, '')}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">
                        {chapter.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={(e) => toggleChapterCompletion(chapter.chapterNumber, e)}
                      title={isCompleted ? "Mark as unread" : "Mark as read"}
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

            {filteredChapters.length === 0 && (
              <div className="text-center py-12 text-stone-500 text-xs">
                No chapters match your search query "{searchQuery}".
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Chapter Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
            {/* Chapter Header */}
            <div className="space-y-4 border-b border-stone-800 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
                  {currentChapter.part}
                </span>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {currentChapter.estimatedReadingMinutes} minutes
                  </span>

                  <button
                    onClick={() => toggleChapterCompletion(currentChapter.chapterNumber)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      completedChapters[currentChapter.chapterNumber]
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/40 hover:bg-emerald-900/50'
                        : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                    }`}
                  >
                    {completedChapters[currentChapter.chapterNumber] ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Mark Complete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-100">
                  {currentChapter.title}
                </h2>
                <p className="text-stone-300 text-sm sm:text-base mt-1.5 font-medium">
                  {currentChapter.subtitle}
                </p>
              </div>

              {/* 3rd Edition Highlight Note */}
              {currentChapter.thirdEditionNote && (
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block font-semibold mb-0.5">
                      3rd Edition Critical Highlight:
                    </strong>
                    {currentChapter.thirdEditionNote}
                  </div>
                </div>
              )}
            </div>

            {/* Chapter Detailed Sections */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-stone-200 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>Core Conceptual & Hardware Sections</span>
                </h3>
                <span className="text-xs text-stone-500 font-mono">
                  {currentChapter.sections.length} Detailed Topics
                </span>
              </div>

              {currentChapter.sections.map((sec, idx) => (
                <div 
                  key={idx}
                  className="bg-stone-950/70 border border-stone-800/90 rounded-xl p-5 sm:p-6 space-y-5 hover:border-stone-700/80 transition-colors"
                >
                  <div className="flex items-baseline justify-between border-b border-stone-800/80 pb-3">
                    <h4 className="text-base font-semibold text-amber-200 flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {sec.sectionNumber}
                      </span>
                      <span>{sec.title}</span>
                    </h4>
                  </div>

                  <p className="text-stone-300 text-sm leading-relaxed">
                    {sec.summary}
                  </p>

                  {/* Hardware / Low-Level Reality Callout */}
                  <div className="bg-stone-900 border border-cyan-800/40 rounded-lg p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Hardware & Low-Level Theory Reality</span>
                    </div>
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed pl-6">
                      {sec.hardwareOrTheoryReality}
                    </p>
                  </div>

                  {/* Key Points */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                      Key Invariants & Rules:
                    </div>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {sec.keyPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs text-stone-300 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="font-mono text-amber-400 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" />
                        {sec.codeExample.title}
                      </span>
                      <button
                        onClick={() => handleCopyCode(`code-${currentChapter.chapterNumber}-${idx}`, sec.codeExample.code)}
                        className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 bg-stone-900 px-2 py-0.5 rounded border border-stone-800 transition-colors"
                      >
                        {copiedCodeId === `code-${currentChapter.chapterNumber}-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="relative bg-stone-950 rounded-lg border border-stone-800 overflow-hidden font-mono text-xs">
                      <pre className="p-4 text-stone-200 overflow-x-auto leading-relaxed">
                        <code>{sec.codeExample.code}</code>
                      </pre>
                    </div>

                    <p className="text-xs text-stone-400 italic">
                      💡 {sec.codeExample.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Common Pitfalls & Compiler Errors */}
            {currentChapter.pitfallsToAvoid.length > 0 && (
              <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Beginner Traps & Compiler Errors to Avoid</span>
                </div>
                <ul className="space-y-2">
                  {currentChapter.pitfallsToAvoid.map((pitfall, pIdx) => (
                    <li key={pIdx} className="text-xs sm:text-sm text-stone-300 flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Knowledge Check / Quiz */}
            <div className="bg-stone-950 border border-amber-500/30 rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>Interactive Knowledge Check: Memory & Compiler Semantics</span>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  Ch {currentChapter.chapterNumber} Assessment
                </span>
              </div>

              <p className="text-sm font-medium text-stone-200">
                {currentChapter.knowledgeCheck.question}
              </p>

              <div className="space-y-2 pt-1">
                {currentChapter.knowledgeCheck.options.map((opt, oIdx) => {
                  const selectedIdx = quizSelections[currentChapter.chapterNumber];
                  const isSelected = selectedIdx === oIdx;
                  const isCorrect = oIdx === currentChapter.knowledgeCheck.correctIndex;
                  const hasAnswered = selectedIdx !== undefined;

                  let optionStyle = 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-850';

                  if (hasAnswered) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-950/40 border-red-500/60 text-red-200';
                    } else {
                      optionStyle = 'bg-stone-900/50 border-stone-800/50 text-stone-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={hasAnswered}
                      onClick={() => setQuizSelections(prev => ({
                        ...prev,
                        [currentChapter.chapterNumber]: oIdx
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

              {/* Quiz Explanation Reveal */}
              {quizSelections[currentChapter.chapterNumber] !== undefined && (
                <div className="mt-4 p-4 rounded-lg bg-stone-900/90 border border-stone-800 space-y-1.5 animate-fadeIn">
                  <div className="text-xs font-semibold flex items-center gap-2">
                    {quizSelections[currentChapter.chapterNumber] === currentChapter.knowledgeCheck.correctIndex ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold">
                        <Check className="w-4 h-4" /> Correct Answer!
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1 font-bold">
                        <AlertTriangle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    <strong className="text-stone-200">Architectural Explanation: </strong>
                    {currentChapter.knowledgeCheck.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="pt-6 border-t border-stone-800 flex items-center justify-between gap-4">
              {prevChapter ? (
                <button
                  onClick={() => {
                    setSelectedChapterNumber(prevChapter.chapterNumber);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/40 text-xs sm:text-sm font-medium transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate max-w-[150px] sm:max-w-none">
                    Ch {prevChapter.chapterNumber}: {prevChapter.title.replace(/^Chapter \d+: /, '')}
                  </span>
                </button>
              ) : <div />}

              {nextChapter ? (
                <button
                  onClick={() => {
                    setSelectedChapterNumber(nextChapter.chapterNumber);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <span className="truncate max-w-[150px] sm:max-w-none">
                    Next: Ch {nextChapter.chapterNumber}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                onNavigateToDomains && (
                  <button
                    onClick={onNavigateToDomains}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md"
                  >
                    <span>Proceed to Domain Deep Dives</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
