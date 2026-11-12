import React from 'react';
import { X, Instagram, Mail, MapPin, Clock, Users, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { Club, CampusEvent } from '../types';

interface ClubDetailModalProps {
  club: Club | null;
  onClose: () => void;
  events: CampusEvent[];
  onViewEventCalendar: (event: CampusEvent) => void;
  onFilterEventsForThisClub: (clubId: string) => void;
}

export const ClubDetailModal: React.FC<ClubDetailModalProps> = ({
  club,
  onClose,
  events,
  onViewEventCalendar,
  onFilterEventsForThisClub
}) => {
  if (!club) return null;

  const clubEvents = events.filter(e => e.clubId === club.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl ${club.logoBg} text-white font-bold font-display text-xl flex items-center justify-center shadow-md`}
            >
              {club.shortName.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {club.category}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-emerald-600 font-medium">Recruitment Open</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {club.name}
              </h2>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-pink-600 hover:underline flex items-center gap-1 font-medium mt-0.5"
              >
                <Instagram className="w-3.5 h-3.5" />
                {club.handle} (Official Instagram)
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              About Society
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {club.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-900">Weekly Meeting:</span>
                <span>{club.meetingTime}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-900">Meeting Venue:</span>
                <span>{club.meetingVenue}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-900">Active Membership:</span>
                <span>{club.membersCount} APU Students</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-900">Official Contact:</span>
                <span>{club.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Focus Tags */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Key Focus Areas & Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {club.focusTags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Events for this club */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Upcoming Events ({clubEvents.length})
              </h3>
              {clubEvents.length > 0 && (
                <button
                  onClick={() => {
                    onFilterEventsForThisClub(club.id);
                    onClose();
                  }}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View in Main Feed →
                </button>
              )}
            </div>

            {clubEvents.length === 0 ? (
              <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                No active events right now. Check their Instagram for latest stories!
              </div>
            ) : (
              <div className="space-y-3">
                {clubEvents.map(evt => (
                  <div
                    key={evt.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold text-blue-600">{evt.category}</span>
                        <span>·</span>
                        <span>{evt.displayDate} ({evt.time})</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {evt.venue}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onViewEventCalendar(evt)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Calendar
                      </button>
                      <a
                        href={evt.registrationUrl || 'https://www.instagram.com/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        RSVP
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 hover:underline"
          >
            <Instagram className="w-4 h-4" />
            Open {club.handle} on Instagram
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
