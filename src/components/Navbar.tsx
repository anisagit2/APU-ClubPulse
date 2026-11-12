import React from 'react';
import { Compass, Sparkles, Bookmark, CalendarDays } from 'lucide-react';

interface NavbarProps {
  activeTab: 'events' | 'clubs' | 'quiz' | 'saved';
  setActiveTab: (tab: 'events' | 'clubs' | 'quiz' | 'saved') => void;
  savedCount: number;
  onOpenSubmitModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSubmitModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('events')}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold font-display text-lg shadow-sm">
              P
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap block leading-tight">
                APU ClubPulse
              </span>
              <span className="text-[11px] text-slate-600 font-medium tracking-wide">
                Asia Pacific University
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('events')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'events'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            Events Feed
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'clubs'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            Clubs Directory
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Club Matchmaker
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            My Saved ({savedCount})
          </button>
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSubmitModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            + Post Instagram Event
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5" />
            Take Club Quiz
          </button>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 py-2 px-2 bg-slate-50 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-2 py-1 rounded ${activeTab === 'events' ? 'text-blue-600 font-semibold' : ''}`}
        >
          Events
        </button>
        <button
          onClick={() => setActiveTab('clubs')}
          className={`px-2 py-1 rounded ${activeTab === 'clubs' ? 'text-blue-600 font-semibold' : ''}`}
        >
          Clubs
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-2 py-1 rounded flex items-center gap-1 ${activeTab === 'quiz' ? 'text-blue-600 font-semibold' : ''}`}
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          Quiz
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-2 py-1 rounded ${activeTab === 'saved' ? 'text-blue-600 font-semibold' : ''}`}
        >
          Saved ({savedCount})
        </button>
      </div>
    </header>
  );
};
