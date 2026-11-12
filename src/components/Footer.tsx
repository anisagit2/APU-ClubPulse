import React from 'react';
import { Instagram, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'events' | 'clubs' | 'quiz' | 'saved') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold font-display text-base">
                P
              </div>
              <span className="text-base font-bold text-slate-900 font-display">
                APU ClubPulse
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Consolidated campus events aggregator & society matchmaker built for students at Asia Pacific University of Technology & Innovation (APU), Bukit Jalil, Kuala Lumpur.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Technology Park Malaysia, Bukit Jalil, 57000 Kuala Lumpur</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Consolidated Events Feed
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('clubs')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Clubs & Societies Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Club Matchmaker Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('saved')}
                  className="hover:text-blue-600 transition-colors"
                >
                  My Saved Schedule
                </button>
              </li>
            </ul>
          </div>

          {/* Social Sources */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Aggregated From
            </h4>
            <p className="text-xs text-slate-500 mb-2 leading-relaxed">
              Events are synced from official APU Club Instagram pages including @gdsc.apu, @apu.fsec, @apu_esports, @aputoastmasters, and 10+ student clubs.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-pink-600 font-semibold">
              <Instagram className="w-3.5 h-3.5" />
              <span>Powered by Club Community</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} APU ClubPulse · Hackathon Project Prototype
          </div>
          <div className="flex items-center gap-4">
            <span>Built with React + Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
