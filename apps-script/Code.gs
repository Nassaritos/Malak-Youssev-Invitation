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
 * ---- UPDATING -------------------------------------------------
 * After editing this code: Deploy → Manage deployments → pencil icon on
 * the existing deployment → Version: "New version" → Deploy.
 * The /exec URL stays the same, so the website needs no change.
 * =============================================================
 */

var SHEET_NAME = 'RSVPs';
var HEADERS = ['Submitted at', 'Name', 'Guests', 'Attending', 'Message', 'ID'];
var ID_COLUMN = 6; // column F

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // one writer at a time

    var sheet = getSheet_();
    var p = (e && e.parameter) || {};
    var id = String(p.id || '').trim();

    // Ignore a submission we have already recorded (retries, double taps).
    if (id && alreadyRecorded_(sheet, id)) {
      return json_({ result: 'duplicate' });
    }

    var declining = p.attendance === 'no';
    var attending =
      p.attendance === 'yes' ? 'Joyfully accepts' :
      declining              ? 'Regretfully declines' :
      (p.attendance || '');

    // Someone who isn't coming brings no guests, whatever the dropdown said.
    var guests = declining ? 0 : (p.guests || '');

    sheet.appendRow([
      new Date(),
      p.name || '',
      guests,
      attending,
      p.message || '',
      id
    ]);

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

// A friendly response if someone opens the URL directly in a browser.
function doGet() {
  return json_({ result: 'ok', message: 'RSVP endpoint is live.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    return sheet;
  }
  // Older sheets were created without the ID column — add its header once.
  if (sheet.getRange(1, ID_COLUMN).getValue() === '') {
    sheet.getRange(1, ID_COLUMN).setValue('ID');
  }
  return sheet;
}

function alreadyRecorded_(sheet, id) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  return sheet
    .getRange(2, ID_COLUMN, lastRow - 1, 1)
    .createTextFinder(id)
    .matchEntireCell(true)
    .findNext() !== null;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
