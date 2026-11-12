import { CampusEvent } from '../types';

/**
 * Generates an .ics file string for an event
 */
export function generateIcsContent(event: CampusEvent): string {
  // Convert event date and time to simple ICS format
  const dateStr = event.date.replace(/-/g, '');
  const [startTimeStr, endTimeStr] = event.time.includes('-')
    ? event.time.split('-').map(s => s.trim())
    : [event.time.trim(), '21:00'];

  const startFormatted = formatTime(startTimeStr);
  const endFormatted = formatTime(endTimeStr || '21:00');

  const dtStart = `${dateStr}T${startFormatted}00`;
  const dtEnd = `${dateStr}T${endFormatted}00`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//APU ClubPulse//Campus Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-${Date.now()}@apu.edu.my`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description + ' | Organised by ' + event.clubName + ' (' + event.clubHandle + ')')}`,
    `LOCATION:${escapeIcsText(event.venue + ', Asia Pacific University, Technology Park Malaysia, Bukit Jalil')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return ics;
}

function formatTime(timeStr: string): string {
  const parts = timeStr.replace(/[^0-9:]/g, '').split(':');
  if (parts.length >= 2) {
    const hh = parts[0].padStart(2, '0');
    const mm = parts[1].padStart(2, '0');
    return `${hh}${mm}`;
  }
  return '1000';
}

function escapeIcsText(str: string): string {
  return str.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

/**
 * Triggers browser download of .ics calendar file
 */
export function downloadIcsFile(event: CampusEvent): void {
  const content = generateIcsContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Returns Google Calendar web create URL
 */
export function getGoogleCalendarUrl(event: CampusEvent): string {
  const dateStr = event.date.replace(/-/g, '');
  const [startTimeStr, endTimeStr] = event.time.includes('-')
    ? event.time.split('-').map(s => s.trim())
    : [event.time.trim(), '21:00'];

  const startFormatted = formatTime(startTimeStr);
  const endFormatted = formatTime(endTimeStr || '21:00');

  const dates = `${dateStr}T${startFormatted}00/${dateStr}T${endFormatted}00`;
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(`${event.description}\n\nOrganiser: ${event.clubName} (${event.clubHandle})\nInstagram: ${event.instagramUrl}`);
  const location = encodeURIComponent(`${event.venue}, Asia Pacific University, Bukit Jalil`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}
