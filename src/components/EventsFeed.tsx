import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Instagram,
  Bookmark,
  Share2,
  PlusCircle,
  Filter,
  Check,
  CalendarPlus
} from 'lucide-react';
import { CampusEvent, EventCategory } from '../types';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';
import { EventRegistrationModal } from './EventRegistrationModal';

interface EventsFeedProps {
  events: CampusEvent[];
  savedEventIds: Set<string>;
  onToggleSaveEvent: (eventId: string) => void;
  onOpenSubmitModal: () => void;
  filterByClubId?: string | null;
  onClearClubFilter?: () => void;
}

export const EventsFeed: React.FC<EventsFeedProps> = ({
  events,
  savedEventIds,
  onToggleSaveEvent,
  onOpenSubmitModal,
  filterByClubId,
  onClearClubFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState<'All' | 'This Week' | 'Hackathons'>('All');
  const [calendarMenuOpen, setCalendarMenuOpen] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [registrationEvent, setRegistrationEvent] = useState<CampusEvent | null>(null);
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('apu_registered_event_ids');
      const ids: unknown = saved ? JSON.parse(saved) : [];
      return new Set(Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string') : []);
    } catch (e) {
      console.error(e);
      return new Set();
    }
  });

  const categories: (EventCategory | 'All')[] = [
    'All',
    'Hackathon',
    'Workshop',
    'Tournament',
    'Cultural',
    'Sports',
    'Social'
  ];

  // Filter events
  const filteredEvents = events.filter(evt => {
    if (filterByClubId && evt.clubId !== filterByClubId) {
      return false;
    }

    if (selectedCategory !== 'All' && evt.category !== selectedCategory) {
      return false;
    }

    if (selectedDateFilter === 'Hackathons' && evt.category !== 'Hackathon') {
      return false;
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q) ||
        evt.clubName.toLowerCase().includes(q) ||
        evt.clubHandle.toLowerCase().includes(q) ||
        evt.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const handleCopyLink = (event: CampusEvent) => {
    const text = `${event.title} (${event.displayDate} at ${event.venue})\nOrganized by ${event.clubName} (${event.clubHandle})\nInstagram: ${event.instagramUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedId(event.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegister = (eventId: string) => {
    setRegisteredEventIds(prev => {
      const next = new Set(prev).add(eventId);
      try {
        localStorage.setItem('apu_registered_event_ids', JSON.stringify(Array.from(next)));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              Consolidated Campus Feed
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Upcoming APU Club Events
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Aggregated across student club Instagram accounts so you never miss an event on campus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSubmitModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Submit Club Instagram Post
          </button>
        </div>
      </div>

      {/* Active Club Filter Notice (if filtered from club detail) */}
      {filterByClubId && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-800">
          <span>Filtering events for selected club</span>
          <button
            onClick={onClearClubFilter}
            className="font-semibold underline hover:text-blue-950"
          >
            Clear club filter (Show all)
          </button>
        </div>
      )}

      {/* Search and Category Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search events by title, club (e.g. @gdsc.apu, @apu.fsec), venue (Atrium, Tech Pods), or keyword..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Category Pills & Quick Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-medium text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
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

      {/* Events Results Count */}
      <div className="text-xs text-slate-500 mb-4 flex items-center justify-between">
        <span>Showing {filteredEvents.length} upcoming events</span>
        <span>All events verified on club Instagram feeds</span>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            No events found matching your criteria
          </h3>
          <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
            Try adjusting your search terms or category filters, or contribute an upcoming event from your club's Instagram!
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              if (onClearClubFilter) onClearClubFilter();
            }}
            className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => {
            const isSaved = savedEventIds.has(event.id);

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Top: Club handle & Instagram badge */}
                  <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center">
                        {event.clubName.charAt(0)}
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-slate-900 block truncate max-w-[150px]">
                          {event.clubName}
                        </span>
                        <a
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-pink-600 hover:underline flex items-center gap-1 font-medium"
                        >
                          <Instagram className="w-3 h-3 inline" />
                          {event.clubHandle}
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleSaveEvent(event.id)}
                      title={isSaved ? 'Remove from saved' : 'Save event'}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    {/* Category & Status */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{event.category}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">{event.fee}</span>
                      <span>·</span>
                      <span>{event.capacity}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-display leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Meta details */}
                    <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-900">{event.displayDate}</span>
                        <span className="text-slate-400">|</span>
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {event.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setCalendarMenuOpen(calendarMenuOpen === event.id ? null : event.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-blue-600" />
                      Add to Cal
                    </button>

                    {/* Dropdown for Calendar */}
                    {calendarMenuOpen === event.id && (
                      <div className="absolute left-0 bottom-full mb-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-xs">
                        <a
                          href={getGoogleCalendarUrl(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCalendarMenuOpen(null)}
                          className="block px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          Google Calendar
                        </a>
                        <button
                          onClick={() => {
                            downloadIcsFile(event);
                            setCalendarMenuOpen(null);
                          }}
                          className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          Download .ics File (Apple/Outlook)
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopyLink(event)}
                      title="Copy event details"
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      {copiedId === event.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegistrationEvent(event)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-sm ${
                        registeredEventIds.has(event.id)
                          ? 'text-emerald-800 bg-emerald-100 hover:bg-emerald-200'
                          : 'text-white bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {registeredEventIds.has(event.id) ? 'Registered' : 'RSVP'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {registrationEvent && (
        <EventRegistrationModal
          event={registrationEvent}
          isRegistered={registeredEventIds.has(registrationEvent.id)}
          onClose={() => setRegistrationEvent(null)}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
};
