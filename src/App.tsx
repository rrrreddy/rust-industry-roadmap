import React, { useState } from 'react';
import { 
  BookOpen, Layers, Terminal, Video, ExternalLink, 
  Sparkles, CheckCircle2, Bookmark, Code2, Award, 
  HelpCircle, Zap, ShieldCheck, Play, Cpu
} from 'lucide-react';

import { RustCurriculumViewer } from './components/RustCurriculumViewer';
import { RustBookViewer } from './components/RustBookViewer';
import { SystemsCheatSheet } from './components/SystemsCheatSheet';

import {
  TOP_YOUTUBE_CHANNELS,
  CANONICAL_BOOKS,
  FLAGSHIP_REPOSITORIES,
  INTERACTIVE_PLATFORMS
} from './data/masterResourcesHub';

type NavigationTab = 'modules' | 'book' | 'cheatsheet' | 'resources';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('modules');

  return (
    <div className="min-h-screen bg-[#0c1017] text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header Bar */}
      <header className="border-b border-amber-500/20 bg-[#101520]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Platform Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setActiveTab('modules')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 border border-amber-400/40">
              🦀
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-amber-400 via-orange-200 to-amber-500 bg-clip-text text-transparent">
                  Rust Core Mastery
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Dedicated Learning Path
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Everything you need to master before starting learn-by-doing projects
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden lg:flex items-center space-x-1 bg-[#090d16] p-1 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => setActiveTab('modules')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'modules'
                  ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>1. 📖 Step-by-Step Modules</span>
            </button>

            <button
              onClick={() => setActiveTab('book')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'book'
                  ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-400" />
              <span>2. 📘 The Rust Book (3rd Ed)</span>
            </button>

            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'cheatsheet'
                  ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>3. 🧠 Memory & Diagnostics</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'resources'
                  ? 'bg-red-600 text-white shadow-md font-bold'
                  : 'text-red-400 hover:text-white hover:bg-red-950/40'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-red-400" />
              <span>4. 🎬 Video & Books Hub</span>
            </button>
          </div>

          {/* GitHub Link */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/rrrreddy/rust-industry-roadmap"
              target="_blank"
              rel="noreferrer"
              className="text-xs flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-stone-800 bg-[#090d16] text-stone-300 hover:border-amber-500/50 hover:text-amber-400 transition"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub Repository</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Submenu */}
        <div className="lg:hidden flex items-center space-x-1 px-3 py-2 border-t border-stone-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'modules' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            1. 📖 Modules
          </button>
          <button
            onClick={() => setActiveTab('book')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'book' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            2. 📘 Rust Book (3rd Ed)
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'cheatsheet' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
            }`}
          >
            3. 🧠 Memory & Diagnostics
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
              activeTab === 'resources' ? 'bg-red-600 text-white font-bold' : 'text-red-400'
            }`}
          >
            4. 🎬 Video Hub
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* ========================================================================= */}
        {/* TAB 1: 10 DEDICATED SEQUENTIAL MODULES                                    */}
        {/* ========================================================================= */}
        {activeTab === 'modules' && (
          <RustCurriculumViewer onNavigateToCheatSheet={() => setActiveTab('cheatsheet')} />
        )}

        {/* ========================================================================= */}
        {/* TAB 2: THE RUST PROGRAMMING LANGUAGE (3RD EDITION) CHAPTER GUIDE           */}
        {/* ========================================================================= */}
        {activeTab === 'book' && (
          <RustBookViewer onNavigateToDomains={() => setActiveTab('modules')} />
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MEMORY & COMPILER DIAGNOSTICS CHEAT SHEET                          */}
        {/* ========================================================================= */}
        {activeTab === 'cheatsheet' && (
          <SystemsCheatSheet />
        )}

        {/* ========================================================================= */}
        {/* TAB 4: AUTHORITATIVE VIDEO & BOOKS HUB                                    */}
        {/* ========================================================================= */}
        {activeTab === 'resources' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-red-950/40 via-stone-900 to-stone-950 p-6 sm:p-8 rounded-2xl border border-red-500/30 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-mono font-medium mb-3">
                  <Video className="w-3.5 h-3.5" />
                  <span>CURATED DEEP-LEARNING REPOSITORY</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Authoritative Video Lectures, Books & Repositories
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                  Learn directly from core compiler contributors, systems architects, and authors who designed Rust's async runtimes and concurrency primitives.
                </p>
              </div>
            </div>

            {/* YouTube Channels Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h2 className="text-lg font-bold text-stone-200 flex items-center space-x-2">
                  <Video className="w-5 h-5 text-red-400" />
                  <span>Validated YouTube Channels & Deep-Dive Playlists</span>
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  {TOP_YOUTUBE_CHANNELS.length} Top-Tier Creators
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TOP_YOUTUBE_CHANNELS.map((ch, idx) => (
                  <div 
                    key={idx}
                    className="bg-stone-900/70 border border-stone-800 rounded-xl p-5 flex flex-col justify-between hover:border-red-500/40 transition-all space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <a 
                            href={ch.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-base font-bold text-white hover:text-red-400 transition flex items-center space-x-1.5"
                          >
                            <span>{ch.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                          </a>
                          <div className="text-xs text-stone-400 font-mono mt-0.5">
                            {ch.handle} • <span className="text-red-400">{ch.subscriberTag}</span>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                          {ch.focusArea}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                        {ch.whySubscribe}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80">
                      <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                        Must-Watch Playlists & Videos:
                      </div>
                      <div className="space-y-1.5">
                        {ch.highlightedPlaylistsOrVideos.map((item, vIdx) => (
                          <a
                            key={vIdx}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-stone-300 hover:text-red-300 flex items-center space-x-2 bg-stone-950/60 px-2.5 py-1.5 rounded-lg border border-stone-800/80 hover:border-stone-700 transition"
                          >
                            <Play className="w-3 h-3 text-red-400 shrink-0" />
                            <span className="truncate">{item.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Canonical Books Section */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h2 className="text-lg font-bold text-stone-200 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>The Canonical Books for Systems Mastery</span>
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  {CANONICAL_BOOKS.length} Definitive Books
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CANONICAL_BOOKS.map((book, bIdx) => (
                  <div 
                    key={bIdx}
                    className="bg-stone-900/70 border border-stone-800 rounded-xl p-5 space-y-3 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <a 
                            href={book.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-bold text-white hover:text-amber-400 transition flex items-center space-x-1.5"
                          >
                            <span>{book.title}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                          </a>
                          <div className="text-xs text-stone-400 mt-0.5">
                            By <strong className="text-stone-300">{book.author}</strong> ({book.publisher})
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          {book.level}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                        {book.annotation}
                      </p>
                    </div>

                    <div className="bg-stone-950/80 p-2.5 rounded-lg border border-stone-800/80 text-xs text-amber-300">
                      <strong className="text-amber-400">Core Takeaway: </strong>{book.keyTakeaway}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-[#0a0d14] py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span>🦀 Rust Core Mastery</span>
            <span>•</span>
            <span>The Comprehensive Step-by-Step Path</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-stone-400">Offline Manuals in <code>docs/modules/</code></span>
            <a 
              href="https://github.com/rrrreddy/rust-industry-roadmap" 
              target="_blank" 
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
