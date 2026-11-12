import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your primary area of passion or study at APU?',
    subtitle: 'Pick what gets you excited or what you want to dive deeper into beyond lectures.',
    options: [
      {
        label: 'Building Software, Apps & AI Solutions',
        description: 'Writing code, tinkering with cloud APIs, web/mobile development, or machine learning models.',
        iconName: 'Code',
        clubWeights: {
          'gdsc-apu': 5,
          'apu-cloud': 4,
          'apu-ieee': 3,
          'apu-gdc': 2
        }
      },
      {
        label: 'Cybersecurity, Ethical Hacking & Digital Defense',
        description: 'Playing CTFs, exploring security vulnerabilities, network protocols, or digital forensics.',
        iconName: 'ShieldAlert',
        clubWeights: {
          'apu-fsec': 5,
          'apu-cloud': 2,
          'gdsc-apu': 2
        }
      },
      {
        label: 'Competitive Gaming, Game Design & Virtual Worlds',
        description: 'Playing ranked competitive titles or building indie games with Unity, Godot, or Unreal.',
        iconName: 'Gamepad2',
        clubWeights: {
          'apu-esports': 5,
          'apu-gdc': 4
        }
      },
      {
        label: 'Public Speaking, Leadership & Global Debates',
        description: 'Pitching ideas, commanding the stage, discussing international policies, or honing charisma.',
        iconName: 'Mic',
        clubWeights: {
          'apu-toastmasters': 5,
          'apu-mun': 5,
          'apu-rotaract': 2
        }
      },
      {
        label: 'Creative Arts, Music, Dance & Expression',
        description: 'Jamming in a band, acoustic covers, K-Pop/Hip-Hop choreography, or creative performances.',
        iconName: 'Music',
        clubWeights: {
          'apu-music': 5,
          'apu-dance': 5
        }
      },
      {
        label: 'Sports, Fitness & Community Volunteering',
        description: 'Smashing shuttles on the court, working out, organizing charity drives, or social causes.',
        iconName: 'Trophy',
        clubWeights: {
          'apu-badminton': 5,
          'apu-rotaract': 4
        }
      }
    ]
  },
  {
    id: 2,
    question: 'What kind of vibe and community are you looking for?',
    subtitle: 'How do you want your university club experience to feel?',
    options: [
      {
        label: 'Fast-paced, Hackathons & Tech Building',
        description: 'Brainstorming solutions at 2 AM, submitting projects to competitions, and racking up awards.',
        iconName: 'Zap',
        clubWeights: {
          'gdsc-apu': 4,
          'apu-fsec': 4,
          'apu-gdc': 3,
          'apu-cloud': 3
        }
      },
      {
        label: 'High-energy Team Competition & Arena Battles',
        description: 'Tournaments, cheering squads, clutch plays, and collegiate championship pride.',
        iconName: 'Flame',
        clubWeights: {
          'apu-esports': 5,
          'apu-badminton': 4
        }
      },
      {
        label: 'Professional Polish, Mentorship & Executive Network',
        description: 'Structured growth, constructive speech evaluations, resume-building networking.',
        iconName: 'Briefcase',
        clubWeights: {
          'apu-toastmasters': 5,
          'apu-mun': 4,
          'apu-ieee': 3
        }
      },
      {
        label: 'Supportive, Chill & Social Friends Hub',
        description: 'No pressure, lots of laughs, casual weekend meetups, and making lifelong university friends.',
        iconName: 'Heart',
        clubWeights: {
          'apu-music': 4,
          'apu-rotaract': 4,
          'apu-badminton': 3,
          'apu-dance': 3
        }
      }
    ]
  },
  {
    id: 3,
    question: 'How much time can you commit between APU lectures and assignments?',
    subtitle: 'Be realistic—APU coursework, Moodle deadlines, and exams can get intense!',
    options: [
      {
        label: '1 - 2 hours weekly (Light & Flexible)',
        description: 'Drop in for occasional workshops, social jams, or weekend game sessions whenever free.',
        iconName: 'Clock',
        clubWeights: {
          'apu-badminton': 3,
          'apu-music': 3,
          'apu-rotaract': 3,
          'apu-esports': 2
        }
      },
      {
        label: '3 - 5 hours weekly (Active Contributor)',
        description: 'Regular weekly club sessions, collaborating on team projects, and hands-on participation.',
        iconName: 'CheckCircle2',
        clubWeights: {
          'gdsc-apu': 4,
          'apu-fsec': 4,
          'apu-toastmasters': 4,
          'apu-gdc': 3,
          'apu-cloud': 3,
          'apu-dance': 3
        }
      },
      {
        label: '6+ hours weekly (Core Committee & Organizer Track)',
        description: 'Help lead events, run social media, organize campus hackathons, or compete varsity.',
        iconName: 'Award',
        clubWeights: {
          'gdsc-apu': 5,
          'apu-fsec': 5,
          'apu-mun': 5,
          'apu-dance': 4,
          'apu-ieee': 4
        }
      }
    ]
  },
  {
    id: 4,
    question: 'Where do you feel most comfortable on the APU campus?',
    subtitle: 'APU Bukit Jalil has distinct hotspots for every personality.',
    options: [
      {
        label: 'Tech Labs & Cyber Zones (Block E & D)',
        description: 'Dual-monitor workstations, high-speed campus LAN, and collaborative developer pods.',
        iconName: 'Cpu',
        clubWeights: {
          'gdsc-apu': 4,
          'apu-fsec': 5,
          'apu-cloud': 4,
          'apu-gdc': 4
        }
      },
      {
        label: 'Auditoriums & Atrium Center Stage',
        description: 'Grand presentation halls, tiered seating, podiums, and large-scale public events.',
        iconName: 'Users',
        clubWeights: {
          'apu-toastmasters': 4,
          'apu-mun': 5,
          'apu-dance': 3
        }
      },
      {
        label: 'Sports Complex, Jam Rooms & Courts',
        description: 'Indoor sports hall, mirror studios, acoustic jamming spaces, and open air recreation.',
        iconName: 'Sparkles',
        clubWeights: {
          'apu-badminton': 5,
          'apu-music': 5,
          'apu-dance': 5
        }
      },
      {
        label: 'Cafeteria, Student Lounge & Virtual Discord',
        description: 'Boba runs, casual couch hangouts, playing games, and late night group calls.',
        iconName: 'Coffee',
        clubWeights: {
          'apu-esports': 4,
          'apu-rotaract': 4,
          'apu-music': 3
        }
      }
    ]
  },
  {
    id: 5,
    question: 'What is your top goal before graduating from APU?',
    subtitle: 'This will ensure your matched clubs directly propel your personal roadmap.',
    options: [
      {
        label: 'Stack real projects, certifications & hackathon trophies',
        description: 'Stand out on LinkedIn and land dream software, security, or cloud engineering roles.',
        iconName: 'FileCode2',
        clubWeights: {
          'gdsc-apu': 5,
          'apu-fsec': 5,
          'apu-cloud': 4,
          'apu-ieee': 4
        }
      },
      {
        label: 'Overcome stage fright and speak with charismatic authority',
        description: 'Impress recruiters, ace viva presentations, and articulate thoughts effortlessly.',
        iconName: 'Sparkle',
        clubWeights: {
          'apu-toastmasters': 5,
          'apu-mun': 4
        }
      },
      {
        label: 'Form a close-knit crew of creative and athletic friends',
        description: 'Make memories that define your college years with music, gaming, dance, or sports.',
        iconName: 'Smile',
        clubWeights: {
          'apu-music': 5,
          'apu-dance': 5,
          'apu-badminton': 5,
          'apu-esports': 4
        }
      },
      {
        label: 'Create meaningful real-world impact for society',
        description: 'Help underprivileged communities, champion sustainability, and lead volunteer programs.',
        iconName: 'Globe',
        clubWeights: {
          'apu-rotaract': 5,
          'apu-mun': 3
        }
      }
    ]
  }
];
