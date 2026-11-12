import { APU_CLUBS } from '../data/clubsData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizResult } from '../types';

export function calculateClubMatches(selectedOptionIndices: Record<number, number>): QuizResult[] {
  const scores: Record<string, number> = {};

  // Initialize all clubs with base score
  APU_CLUBS.forEach(c => {
    scores[c.id] = 0;
  });

  // Calculate scores from answers
  Object.entries(selectedOptionIndices).forEach(([qIdStr, optIdx]) => {
    const qId = parseInt(qIdStr, 10);
    const question = QUIZ_QUESTIONS.find(q => q.id === qId);
    if (!question) return;

    const chosenOption = question.options[optIdx];
    if (!chosenOption) return;

    Object.entries(chosenOption.clubWeights).forEach(([clubId, weight]) => {
      scores[clubId] = (scores[clubId] || 0) + weight;
    });
  });

  // Find max possible theoretical score
  const maxScore = Math.max(...Object.values(scores), 1);

  // Map to QuizResult with fit reasons
  const results: QuizResult[] = APU_CLUBS.map(club => {
    const rawScore = scores[club.id] || 0;
    // Calculate 60% - 99% scale for matched clubs
    const matchPercentage = Math.min(
      99,
      Math.max(45, Math.round((rawScore / maxScore) * 100))
    );

    const fitReasons: string[] = [];

    // Analyze specific reasons based on selections
    const q1Choice = selectedOptionIndices[1];
    if (q1Choice === 0 && (club.id === 'gdsc-apu' || club.id === 'apu-cloud' || club.id === 'apu-ieee')) {
      fitReasons.push('Directly matches your interest in software engineering and cloud tech');
    }
    if (q1Choice === 1 && club.id === 'apu-fsec') {
      fitReasons.push('Aligns with your cybersecurity and ethical hacking focus at APU CyberZone');
    }
    if (q1Choice === 2 && (club.id === 'apu-esports' || club.id === 'apu-gdc')) {
      fitReasons.push('Perfect match for your competitive gaming and game development passion');
    }
    if (q1Choice === 3 && (club.id === 'apu-toastmasters' || club.id === 'apu-mun')) {
      fitReasons.push('Boosts your public speaking, stage charisma and debate leadership');
    }
    if (q1Choice === 4 && (club.id === 'apu-music' || club.id === 'apu-dance')) {
      fitReasons.push('Matches your artistic jam and performance expression vibe');
    }
    if (q1Choice === 5 && (club.id === 'apu-badminton' || club.id === 'apu-rotaract')) {
      fitReasons.push('Ideal for an active, healthy sports routine and community impact');
    }

    const q3Choice = selectedOptionIndices[3];
    if (q3Choice === 0) {
      fitReasons.push('Welcomes flexible attendance around heavy exam and assignment weeks');
    } else if (q3Choice === 2) {
      fitReasons.push('Strong pathway into executive committee leadership roles');
    }

    if (fitReasons.length === 0) {
      fitReasons.push(`Active community with ${club.membersCount}+ members and weekly workshops`);
      fitReasons.push(`Regular meetups at ${club.meetingVenue}`);
    }

    return {
      clubId: club.id,
      score: rawScore,
      matchPercentage,
      fitReasons
    };
  });

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results;
}
