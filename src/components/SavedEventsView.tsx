import React from 'react';
import { Bookmark, Calendar, Clock, MapPin, Instagram, Trash2, CalendarPlus, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import { CampusEvent } from '../types';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';

interface SavedEventsViewProps {
  savedEvents: CampusEvent[];
  onRemoveSaved: (eventId: string) => void;
  onExploreEvents: () => void;
}

export const SavedEventsView: React.FC<SavedEventsViewProps> = ({
  savedEvents,
  onRemoveSaved,
  onExploreEvents
}) => {
  // Check for clashes on same date
  const dateMap: Record<string, CampusEvent[]> = {};
  savedEvents.forEach(evt => {
    if (!dateMap[evt.date]) {
      dateMap[evt.date] = [];
    }
    dateMap[evt.date].push(evt);
  });

  const clashingDates = Object.entries(dateMap).filter(([_, list]) => list.length > 1);

  const handleExportAll = () => {
    // Sequentially download ICS for each saved event
    savedEvents.forEach((evt, idx) => {
      setTimeout(() => {
        downloadIcsFile(evt);
      }, idx * 250);
    });
  };

  if (savedEvents.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-8 h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">
          No Saved Events Yet
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          Bookmark upcoming APU hackathons, workshops, and tournaments from the feed so you can track your semester schedule and export to your calendar.
        </p>
        <button
          onClick={onExploreEvents}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
        >
          Explore Campus Events
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            My Saved Campus Schedule
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            You have bookmarked {savedEvents.length} APU club events for this semester.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
          >
            <CalendarPlus className="w-4 h-4" />
            Export All to Calendar (.ics)
          </button>
        </div>
      </div>

      {/* Clash warnings if any */}
      {clashingDates.length > 0 && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm mb-0.5">Potential Schedule Clashes Detected!</span>
            <span>
              You have multiple events scheduled on the same date:
            </span>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-amber-800">
              {clashingDates.map(([date, list]) => (
                <li key={date}>
                  <strong>{list[0].displayDate}</strong>: {list.map(e => e.title).join(' AND ')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {savedEvents.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-blue-600">{event.clubName}</span>
                <span>·</span>
                <span className="text-pink-600 font-medium">{event.clubHandle}</span>
                <span>·</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-700 font-medium">
                  {event.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-display">
                {event.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold">{event.displayDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Google Cal
              </a>

              <button
                onClick={() => downloadIcsFile(event)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                .ics
              </button>

              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-1 shadow-sm"
                >
                  RSVP
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <button
                onClick={() => onRemoveSaved(event.id)}
                title="Remove from saved"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
