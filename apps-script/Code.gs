/**
 * Youssef & Malak — RSVP collector
 * =============================================================
 * Receives RSVP submissions from the invitation website and appends
 * each one as a row in a Google Sheet.
 *
 * ---- SETUP ----------------------------------------------------
 * 1. Create a new Google Sheet (this will hold the responses).
 * 2. In that sheet: Extensions → Apps Script.
 * 3. Delete the default code, paste THIS file, and Save.
 * 4. Deploy → New deployment → gear icon → "Web app".
 *      - Description:      RSVP endpoint
 *      - Execute as:       Me
 *      - Who has access:   Anyone
 *    Click Deploy, then Authorize access (allow the permissions).
 * 5. Copy the "Web app URL" (it ends with /exec).
 * 6. Paste that URL into src/data/event.js  →  RSVP_ENDPOINT
 * 7. Commit & push. Submissions now land in the sheet.
 *
 * To change the code later, edit here then Deploy → Manage deployments →
 * (edit the existing one) → Version: New version → Deploy. The /exec URL
 * stays the same.
 * =============================================================
 */

var SHEET_NAME = 'RSVPs';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // avoid two submissions writing at once

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Submitted at', 'Name', 'Guests', 'Attending', 'Message']);
    }

    var p = (e && e.parameter) || {};
    var attending =
      p.attendance === 'yes' ? 'Joyfully accepts' :
      p.attendance === 'no'  ? 'Regretfully declines' :
      (p.attendance || '');

    sheet.appendRow([
      new Date(),
      p.name || '',
      p.guests || '',
      attending,
      p.message || ''
    ]);

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

// A friendly response if someone opens the URL directly in a browser.
function doGet() {
  return json({ result: 'ok', message: 'RSVP endpoint is live.' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
