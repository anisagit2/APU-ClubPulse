export type ClubCategory =
  | 'Tech & Computing'
  | 'Cybersecurity'
  | 'Gaming & eSports'
  | 'Leadership & Speaking'
  | 'Arts & Culture'
  | 'Sports & Fitness'
  | 'Community & Social';

export interface Club {
  id: string;
  name: string;
  shortName: string;
  category: ClubCategory;
  instagram: string;
  handle: string;
  description: string;
  focusTags: string[];
  meetingTime: string;
  meetingVenue: string;
  membersCount: number;
  featuredColor: string;
  logoBg: string;
  registrationOpen: boolean;
  contactEmail: string;
}

export type EventCategory =
  | 'Hackathon'
  | 'Workshop'
  | 'Tournament'
  | 'Conference'
  | 'Cultural'
  | 'Social'
  | 'Sports';

export interface CampusEvent {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  clubHandle: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g., "14:00 - 17:30"
  displayDate: string; // e.g., "Nov 18, 2026"
  venue: string; // e.g. "Auditorium 1, Level 4"
  category: EventCategory;
  description: string;
  instagramUrl: string;
  registrationUrl?: string;
  fee: string; // e.g., "Free" or "RM 10"
  capacity: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    iconName: string;
    clubWeights: Record<string, number>;
  }[];
}

export interface QuizResult {
  clubId: string;
  score: number;
  matchPercentage: number;
  fitReasons: string[];
}
