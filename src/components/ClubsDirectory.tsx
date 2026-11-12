import React, { useState } from 'react';
import { Search, Instagram, Users, MapPin, Clock, ArrowRight, ExternalLink, Calendar, Mail, Sparkles, Filter } from 'lucide-react';
import { Club, ClubCategory } from '../types';
import { APU_CLUBS } from '../data/clubsData';

interface ClubsDirectoryProps {
  onSelectClub: (club: Club) => void;
  onFilterEventsByClub: (clubId: string) => void;
}

export const ClubsDirectory: React.FC<ClubsDirectoryProps> = ({
  onSelectClub,
  onFilterEventsByClub
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: (ClubCategory | 'All')[] = [
    'All',
    'Tech & Computing',
    'Cybersecurity',
    'Gaming & eSports',
    'Leadership & Speaking',
    'Arts & Culture',
    'Sports & Fitness',
    'Community & Social'
  ];

  const filteredClubs = APU_CLUBS.filter(club => {
    if (selectedCategory !== 'All' && club.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        club.name.toLowerCase().includes(q) ||
        club.shortName.toLowerCase().includes(q) ||
        club.handle.toLowerCase().includes(q) ||
        club.description.toLowerCase().includes(q) ||
        club.meetingVenue.toLowerCase().includes(q) ||
        club.focusTags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
          <span className="text-xs font-semibold text-blue-800 tracking-wide uppercase">
            Asia Pacific University Societies
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          APU Clubs & Societies Directory
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore student organizations, weekly meeting locations, and their official Instagram channels.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search clubs by name, handle, tech stack (e.g. AI, CTF, Flutter), or sport..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-medium text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Clubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map(club => (
          <div
            key={club.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${club.logoBg} text-white font-bold font-display text-base flex items-center justify-center shadow-sm shrink-0`}
                  >
                    {club.shortName.slice(0, 3)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 font-display truncate">
                      {club.shortName}
                    </h3>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-pink-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Instagram className="w-3 h-3" />
                      {club.handle}
                    </a>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                  {club.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {club.description}
                </p>

                {/* Focus Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {club.focusTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meeting & Venue Details */}
                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{club.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{club.meetingVenue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{club.membersCount} active members</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onFilterEventsByClub(club.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                View Events
              </button>

              <button
                onClick={() => onSelectClub(club)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Club Hub
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
