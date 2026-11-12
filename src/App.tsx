import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventsFeed } from './components/EventsFeed';
import { ClubsDirectory } from './components/ClubsDirectory';
import { QuizView } from './components/QuizView';
import { SavedEventsView } from './components/SavedEventsView';
import { ClubDetailModal } from './components/ClubDetailModal';
import { EventSubmitModal } from './components/EventSubmitModal';
import { HackathonRepoInfo } from './components/HackathonRepoInfo';
import { Footer } from './components/Footer';

import { INITIAL_EVENTS } from './data/eventsData';
import { APU_CLUBS } from './data/clubsData';
import { CampusEvent, Club } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'events' | 'clubs' | 'quiz' | 'saved'>('events');
  const [events, setEvents] = useState<CampusEvent[]>(() => {
    try {
      const saved = localStorage.getItem('apu_events_list');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EVENTS;
  });

  const [savedEventIds, setSavedEventIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('apu_saved_event_ids');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    return new Set(['evt-gdsc-hackathon', 'evt-fsec-ctf']);
  });

  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [filterByClubId, setFilterByClubId] = useState<string | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync saved events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apu_saved_event_ids', JSON.stringify(Array.from(savedEventIds)));
    } catch (e) {
      console.error(e);
    }
  }, [savedEventIds]);

  // Sync events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apu_events_list', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleSaveEvent = (eventId: string) => {
    setSavedEventIds(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
        showToast('Event removed from your saved schedule');
      } else {
        next.add(eventId);
        showToast('Event saved! Added to your schedule');
      }
      return next;
    });
  };

  const handleSubmitNewEvent = (newEvent: CampusEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published to APU feed!`);
    setActiveTab('events');
  };

  const handleFilterEventsByClub = (clubId: string) => {
    setFilterByClubId(clubId);
    setActiveTab('events');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const savedEventsList = events.filter(e => savedEventIds.has(e.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Banner addressing the user's GitHub prompt question */}
      <HackathonRepoInfo />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          if (tab !== 'events') setFilterByClubId(null);
        }}
        savedCount={savedEventIds.size}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Hero section on events or quiz page */}
      {activeTab === 'events' && !filterByClubId && (
        <Hero
          onStartQuiz={() => setActiveTab('quiz')}
          onExploreEvents={() => {
            const el = document.getElementById('events-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          eventsCount={events.length}
          clubsCount={APU_CLUBS.length}
        />
      )}

      {/* Main Content Area */}
      <main id="events-section" className="flex-1">
        {activeTab === 'events' && (
          <EventsFeed
            events={events}
            savedEventIds={savedEventIds}
            onToggleSaveEvent={handleToggleSaveEvent}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            filterByClubId={filterByClubId}
            onClearClubFilter={() => setFilterByClubId(null)}
          />
        )}

        {activeTab === 'clubs' && (
          <ClubsDirectory
            onSelectClub={club => setSelectedClub(club)}
            onFilterEventsByClub={handleFilterEventsByClub}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onSelectClub={club => setSelectedClub(club)}
            onExploreEventsForClub={handleFilterEventsByClub}
          />
        )}

        {activeTab === 'saved' && (
          <SavedEventsView
            savedEvents={savedEventsList}
            onRemoveSaved={handleToggleSaveEvent}
            onExploreEvents={() => setActiveTab('events')}
          />
        )}
      </main>

      {/* Club Detail Modal */}
      <ClubDetailModal
        club={selectedClub}
        onClose={() => setSelectedClub(null)}
        events={events}
        onViewEventCalendar={evt => {
          handleToggleSaveEvent(evt.id);
          setActiveTab('saved');
        }}
        onFilterEventsForThisClub={handleFilterEventsByClub}
      />

      {/* Submit Event Modal */}
      <EventSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitEvent={handleSubmitNewEvent}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
