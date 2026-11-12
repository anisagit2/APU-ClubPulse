import React from 'react';
import { Sparkles, Calendar, Instagram, Search, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onExploreEvents: () => void;
  eventsCount: number;
  clubsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuiz,
  onExploreEvents,
  eventsCount,
  clubsCount
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 border-b border-slate-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Asia Pacific University · Bukit Jalil Campus
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.15]">
              Every APU Club Event. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
                Consolidated in One Feed.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              No more scrolling through a dozen separate club Instagram accounts to find out what's happening this week. Take our 60-second quiz to find your ideal society, and sync campus hackathons, workshops, and tournaments straight to your calendar.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartQuiz}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Find My Club (Matchmaker Quiz)
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreEvents}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                Explore Upcoming Events ({eventsCount})
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Aggregated from {clubsCount} verified APU club IG accounts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>APU Atrium, Block E & Auditorium venues</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>One-click Google Calendar & .ics sync</span>
              </div>
            </div>
          </div>

          {/* Right Preview Card: Live Problem & Solution Comparison */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-slate-500 ml-1">Live Campus Radar</span>
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Live & Aggregated
                </span>
              </div>

              {/* Problem vs Solution banner */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">Problem:</span>
                  <span className="text-slate-600">
                    Events scattered across @gdsc.apu, @apu.fsec, @aputoastmasters, etc. Easy to miss deadlines!
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
                  <span className="text-emerald-600 font-bold shrink-0">Solution:</span>
                  <span className="text-slate-700 font-medium">
                    Consolidated timeline with calendar export and quiz-based club recommendations.
                  </span>
                </div>
              </div>

              {/* Sample Mini Cards */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-blue-600">@gdsc.apu</span>
                    <span>Nov 21 · 09:00</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    APU HackSprint 2026: AI & Sustainability
                  </h4>
                  <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                    <span>APU Atrium & Tech Pods</span>
                    <span className="text-emerald-600 font-medium">Free Entry</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-emerald-600">@apu.fsec</span>
                    <span>Nov 19 · 14:00</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    DefendAPU: Inter-Varsity Beginner CTF
                  </h4>
                  <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                    <span>CyberSecurity Talent Zone Level 3</span>
                    <span className="text-emerald-600 font-medium">CTF Challenge</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={onExploreEvents}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  View full consolidated schedule →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
