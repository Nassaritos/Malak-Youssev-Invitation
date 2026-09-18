/**
 * Single source of truth for the event details.
 * Year is set so the countdown targets the upcoming celebration.
 */
export const EVENT = {
  bride: 'Malak',
  groom: 'Youssef',
  dayName: 'Friday',
  dateLabel: '16 October',
  timeLabel: '6:00 PM',
  timeShort: '6 PM',
  venue: 'Taracina Wedding Venue',
  mapUrl: 'https://maps.app.goo.gl/2MviKpX1bjEhPayC9',
  // 16 October, 6:00 PM (local time)
  datetime: new Date('2026-10-16T18:00:00'),
}

/**
 * RSVP collection endpoint.
 * -------------------------------------------------------------
 * Paste the deployed Google Apps Script web-app URL here (it ends with /exec).
 * See apps-script/Code.gs for the script and deploy steps.
 * While this is left as the placeholder, RSVPs are just saved to the
 * visitor's browser (localStorage) and the thank-you still shows.
 */
export const RSVP_ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_EXEC_URL_HERE'
