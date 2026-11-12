import React, { useState } from 'react';
import { X, Instagram, Sparkles, Check, AlertCircle } from 'lucide-react';
import { CampusEvent, EventCategory } from '../types';
import { APU_CLUBS } from '../data/clubsData';

interface EventSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEvent: (newEvent: CampusEvent) => void;
}

export const EventSubmitModal: React.FC<EventSubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmitEvent
}) => {
  const [selectedClubId, setSelectedClubId] = useState(APU_CLUBS[0].id);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Workshop');
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('15:00 - 18:00');
  const [venue, setVenue] = useState('APU Atrium, Level 3');
  const [description, setDescription] = useState('');
  const [instagramPostUrl, setInstagramPostUrl] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [fee, setFee] = useState('Free');
  const [capacity, setCapacity] = useState('60 seats');
  const [tagsInput, setTagsInput] = useState('Workshop, Hands-on, APU');
  const [isSimulatingExtract, setIsSimulatingExtract] = useState(false);

  if (!isOpen) return null;

  const handleSimulateAiExtract = () => {
    setIsSimulatingExtract(true);
    setTimeout(() => {
      setTitle('NextGen Cloud Architecture & Serverless Masterclass');
      setDescription('Join AWS & Google Cloud certified mentors as they guide you through containerization, Lambda serverless microservices, and deployment for final-year projects.');
      setCategory('Workshop');
      setVenue('Cloud Computing Lab B-03-01');
      setDate('2026-11-27');
      setTime('16:00 - 18:30');
      setFee('Free');
      setCapacity('50 students');
      setTagsInput('Cloud, AWS, Docker, Free Swag');
      setIsSimulatingExtract(false);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const club = APU_CLUBS.find(c => c.id === selectedClubId) || APU_CLUBS[0];

    const newEvt: CampusEvent = {
      id: `evt-user-${Date.now()}`,
      title: title.trim(),
      clubId: club.id,
      clubName: club.name,
      clubHandle: club.handle,
      date,
      time,
      displayDate: new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      venue: venue.trim() || 'APU Campus',
      category,
      description: description.trim() || 'No description provided.',
      instagramUrl: instagramPostUrl.trim() || club.instagram,
      registrationUrl: registrationUrl.trim() || undefined,
      fee: fee.trim() || 'Free',
      capacity: capacity.trim() || 'Open to all',
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    };

    onSubmitEvent(newEvt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Post Instagram Campus Event
              </h2>
              <p className="text-xs text-slate-500">
                Consolidate your club's flyer into the central APU event radar.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Quick AI extraction demo helper */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-blue-900">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Have a flyer text or Instagram caption? Try auto-fill sample:</span>
            </div>
            <button
              type="button"
              onClick={handleSimulateAiExtract}
              disabled={isSimulatingExtract}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md shrink-0 transition-colors"
            >
              {isSimulatingExtract ? 'Extracting...' : 'Auto-Fill Sample'}
            </button>
          </div>

          {/* Organizing Club */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Select Organizing APU Club:
            </label>
            <select
              value={selectedClubId}
              onChange={e => setSelectedClubId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {APU_CLUBS.map(club => (
                <option key={club.id} value={club.id}>
                  {club.shortName} ({club.handle})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Event Title:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Flutter DevFest 2026 or Inter-Faculty Futsal Cup"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Grid row: Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as EventCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Tournament">Tournament</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Date:
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Grid row: Time & Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Time (e.g. 14:00 - 17:00):
              </label>
              <input
                type="text"
                required
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Campus Venue:
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={e => setVenue(e.target.value)}
                placeholder="e.g. Auditorium 1 or Atrium Level 3"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Event Description / Caption:
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What will participants do, learn, or win?"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Grid row: Instagram URL & RSVP URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Instagram Post / Story Link:
              </label>
              <input
                type="url"
                value={instagramPostUrl}
                onChange={e => setInstagramPostUrl(e.target.value)}
                placeholder="https://instagram.com/p/..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                RSVP / Google Form Link (Optional):
              </label>
              <input
                type="url"
                value={registrationUrl}
                onChange={e => setRegistrationUrl(e.target.value)}
                placeholder="https://forms.gle/..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Grid row: Fee, Capacity, Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Fee:
              </label>
              <input
                type="text"
                value={fee}
                onChange={e => setFee(e.target.value)}
                placeholder="Free or RM 10"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Capacity:
              </label>
              <input
                type="text"
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                placeholder="e.g. 50 seats"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tags (comma separated):
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="AI, Cloud, Swags"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
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
              Publish to APU Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
