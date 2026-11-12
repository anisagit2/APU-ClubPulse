import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, X } from 'lucide-react';
import { CampusEvent } from '../types';

interface EventRegistrationModalProps {
  event: CampusEvent;
  isRegistered: boolean;
  onClose: () => void;
  onRegister: (eventId: string) => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  isRegistered,
  onClose,
  onRegister
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(event.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200"
      >
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <h2 id="registration-title" className="text-lg font-bold text-slate-900 font-display">
              RSVP for {event.title}
            </h2>
            <div className="mt-2 space-y-1 text-xs text-slate-500">
              <p className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                {event.displayDate}
                <Clock className="w-3.5 h-3.5 ml-1" />
                {event.time}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {event.venue}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration form"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isRegistered ? (
          <div className="p-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900">RSVP saved on this device</h3>
            <p className="text-xs text-slate-500 mt-2">
              This demo does not send your registration to the event organizers.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <p className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-900">
              Demo registration: submitting saves this RSVP in your browser only. The organizers
              will not receive your details.
            </p>

            <div>
              <label htmlFor="registration-name" className="block font-semibold text-slate-700 mb-1">
                Full name
              </label>
              <input
                id="registration-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="registration-email" className="block font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <input
                id="registration-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Submit RSVP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
