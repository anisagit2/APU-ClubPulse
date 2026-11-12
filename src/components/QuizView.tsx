import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Code,
  ShieldAlert,
  Gamepad2,
  Mic,
  Music,
  Trophy,
  Zap,
  Flame,
  Briefcase,
  Heart,
  Clock,
  CheckCircle2,
  Award,
  Cpu,
  Users,
  Sparkles,
  Coffee,
  FileCode2,
  Sparkle,
  Smile,
  Globe,
  ArrowRight,
  RotateCcw,
  Instagram,
  Calendar,
  ExternalLink,
  ChevronRight,
  Check
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { APU_CLUBS } from '../data/clubsData';
import { calculateClubMatches } from '../utils/quizMatcher';
import { QuizResult, Club } from '../types';

interface QuizViewProps {
  onSelectClub: (club: Club) => void;
  onExploreEventsForClub?: (clubId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code,
  ShieldAlert,
  Gamepad2,
  Mic,
  Music,
  Trophy,
  Zap,
  Flame,
  Briefcase,
  Heart,
  Clock,
  CheckCircle2,
  Award,
  Cpu,
  Users,
  Sparkles,
  Coffee,
  FileCode2,
  Sparkle,
  Smile,
  Globe
};

export const QuizView: React.FC<QuizViewProps> = ({
  onSelectClub,
  onExploreEventsForClub
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [results, setResults] = useState<QuizResult[]>([]);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100);

  const handleSelectOption = (optionIndex: number) => {
    const updated = {
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex
    };
    setSelectedAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate results and trigger confetti!
      const computedResults = calculateClubMatches(updated);
      setResults(computedResults);
      setQuizFinished(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentStep(0);
    setQuizFinished(false);
    setResults([]);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (quizFinished) {
    const topMatches = results.slice(0, 3);
    const clubsById = new Map(APU_CLUBS.map(c => [c.id, c]));

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Check className="w-3.5 h-3.5" />
            Quiz Completed · Personalized APU Match Results
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Your Top APU Club Matches
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Based on your interests, time commitment, and semester goals, here are the university societies where you will thrive the most.
          </p>
        </div>

        {/* Top 3 Matches */}
        <div className="space-y-4 mb-8">
          {topMatches.map((match, idx) => {
            const club = clubsById.get(match.clubId);
            if (!club) return null;

            return (
              <div
                key={club.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Ranking accent ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-display">
                        {club.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-blue-600">{club.handle}</span>
                        <span>·</span>
                        <span>{club.category}</span>
                        <span>·</span>
                        <span>{club.membersCount} members</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-blue-600 font-display tabular-nums">
                      {match.matchPercentage}%
                    </span>
                    <span className="block text-[11px] font-medium text-slate-500">
                      Match Compatibility
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {club.description}
                </p>

                {/* Match reasons */}
                <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 border border-slate-100">
                  <div className="text-xs font-semibold text-slate-700">Why it matches your profile:</div>
                  {match.fitReasons.map((reason, rIdx) => (
                    <div key={rIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="text-blue-500 font-bold">✓</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Details strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div>
                    <span className="font-medium text-slate-700">Meeting: </span>
                    <span>{club.meetingTime} · {club.meetingVenue}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={club.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      View Instagram
                    </a>

                    <button
                      onClick={() => onSelectClub(club)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors"
                    >
                      Club Details & Events
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retake Matchmaker Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Quiz Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
          <span className="tabular-nums">{progressPercent}% complete</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Current Question */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-1.5">
          {currentQuestion.question}
        </h2>
        <p className="text-sm text-slate-500">
          {currentQuestion.subtitle}
        </p>
      </div>

      {/* Options Grid */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, idx) => {
          const IconComponent = ICON_MAP[option.iconName] || Sparkles;
          const isSelected = selectedAnswers[currentQuestion.id] === idx;

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 shadow-sm'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900 mb-0.5">
                  {option.label}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  {option.description}
                </div>
              </div>

              <div className="shrink-0 self-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            currentStep === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Back
        </button>

        <span className="text-xs text-slate-500">
          Click any option above to advance automatically
        </span>
      </div>
    </div>
  );
};
