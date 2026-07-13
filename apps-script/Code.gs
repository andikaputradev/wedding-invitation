// Google Apps Script — Wedding Invitation Backend
// Deploy sebagai: Web App | Execute as: Me | Access: Anyone
// Gunakan PropertiesService untuk menyimpan SPREADSHEET_ID

var SHEET_RSVP = "RSVP";
var SHEET_GUESTBOOK = "Guestbook";

var MAX_NAME = 80;
var MAX_MESSAGE = 500;
var MAX_GUEST_COUNT = 5;
var MIN_GUEST_COUNT = 1;
var VALID_ATTENDANCE = ["attending", "not_attending", "maybe"];
var VALID_ACTIONS = ["rsvp", "guestbook", "get_guestbook"];

function getSpreadsheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SPREADSHEET_ID");
  if (!id) {
    throw new Error("SPREADSHEET_ID belum dikonfigurasi di Script Properties.");
  }
  return SpreadsheetApp.openById(id);
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#D4AF37");
  }
  return sheet;
}

function sanitizeString(input, maxLen) {
  if (typeof input !== "string") return "";
  var cleaned = input
    .replace(/<[^>]*>/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.substring(0, maxLen);
}

function jsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function successResponse(message, data) {
  return jsonResponse({
    success: true,
    message: message || "Request processed successfully",
    data: data || {}
  });
}

function errorResponse(message, errorCode) {
  return jsonResponse({
    success: false,
    message: message || "Terjadi kesalahan",
    error: errorCode || "UNKNOWN_ERROR"
  });
}

function doGet(e) {
  try {
    var action = e.parameter && e.parameter.action;
    if (!action || !VALID_ACTIONS.includes(action)) {
      return errorResponse("Action tidak valid", "INVALID_ACTION");
    }
    if (action === "get_guestbook") {
      return handleGetGuestbook();
    }
    return errorResponse("Method tidak didukung untuk action ini", "METHOD_NOT_ALLOWED");
  } catch (err) {
    Logger.log("doGet error: " + err.toString());
    return errorResponse("Terjadi kesalahan server", "SERVER_ERROR");
  }
}

function doPost(e) {
  try {
    var body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (_) {
      return errorResponse("Request body tidak valid", "INVALID_JSON");
    }

    var action = body.action;
    if (!action || !VALID_ACTIONS.includes(action)) {
      return errorResponse("Action tidak valid", "INVALID_ACTION");
    }

    if (action === "rsvp") {
      return handleRsvp(body);
    }
    if (action === "guestbook") {
      return handleGuestbook(body);
    }

    return errorResponse("Action tidak dikenali", "UNKNOWN_ACTION");
  } catch (err) {
    Logger.log("doPost error: " + err.toString());
    return errorResponse("Terjadi kesalahan server", "SERVER_ERROR");
  }
}

function handleGetGuestbook() {
  var ss = getSpreadsheet();
  var sheet = getOrCreateSheet(ss, SHEET_GUESTBOOK, [
    "timestamp", "name", "message", "userAgent"
  ]);

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return successResponse("Berhasil", { entries: [], total: 0 });
  }

  var rows = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  var entries = [];

  for (var i = rows.length - 1; i >= 0; i--) {
    var row = rows[i];
    if (!row[0] || !row[1] || !row[2]) continue;
    entries.push({
      timestamp: row[0] ? new Date(row[0]).toISOString() : "",
      name: String(row[1]),
      message: String(row[2])
    });
    if (entries.length >= 50) break;
  }

  return successResponse("Berhasil", { entries: entries, total: entries.length });
}

function handleRsvp(body) {
  var name = sanitizeString(body.name, MAX_NAME);
  var attendance = body.attendance;
  var guestCount = parseInt(body.guestCount, 10);
  var message = sanitizeString(body.message || "", MAX_MESSAGE);
  var userAgent = sanitizeString(body.userAgent || "", 200);

  if (!name || name.length < 2) {
    return errorResponse("Nama tidak valid", "INVALID_NAME");
  }
  if (!VALID_ATTENDANCE.includes(attendance)) {
    return errorResponse("Status kehadiran tidak valid", "INVALID_ATTENDANCE");
  }
  if (isNaN(guestCount) || guestCount < MIN_GUEST_COUNT || guestCount > MAX_GUEST_COUNT) {
    return errorResponse(
      "Jumlah tamu harus antara " + MIN_GUEST_COUNT + " dan " + MAX_GUEST_COUNT,
      "INVALID_GUEST_COUNT"
    );
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(8000);
  } catch (_) {
    return errorResponse("Server sibuk, coba lagi sebentar", "LOCK_TIMEOUT");
  }

  try {
    var ss = getSpreadsheet();
    var sheet = getOrCreateSheet(ss, SHEET_RSVP, [
      "timestamp", "name", "attendance", "guestCount", "message", "userAgent"
    ]);

    sheet.appendRow([
      new Date(),
      name,
      attendance,
      guestCount,
      message,
      userAgent
    ]);

    return successResponse("RSVP berhasil dikirim. Terima kasih!");
  } finally {
    lock.releaseLock();
  }
}

function handleGuestbook(body) {
  var name = sanitizeString(body.name, MAX_NAME);
  var message = sanitizeString(body.message, MAX_MESSAGE);
  var userAgent = sanitizeString(body.userAgent || "", 200);

  if (!name || name.length < 2) {
    return errorResponse("Nama tidak valid", "INVALID_NAME");
  }
  if (!message || message.length < 5) {
    return errorResponse("Pesan terlalu pendek (minimal 5 karakter)", "MESSAGE_TOO_SHORT");
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(8000);
  } catch (_) {
    return errorResponse("Server sibuk, coba lagi sebentar", "LOCK_TIMEOUT");
  }

  try {
    var ss = getSpreadsheet();
    var sheet = getOrCreateSheet(ss, SHEET_GUESTBOOK, [
      "timestamp", "name", "message", "userAgent"
    ]);

    var lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      var recentRows = sheet.getRange(
        Math.max(2, lastRow - 4), 1, Math.min(5, lastRow - 1), 2
      ).getValues();
      for (var i = 0; i < recentRows.length; i++) {
        var rowName = String(recentRows[i][1]).toLowerCase();
        if (rowName === name.toLowerCase()) {
          var rowTime = new Date(recentRows[i][0]).getTime();
          if (Date.now() - rowTime < 30000) {
            return errorResponse(
              "Mohon tunggu 30 detik sebelum mengirim ucapan lagi",
              "RATE_LIMITED"
            );
          }
        }
      }
    }

    sheet.appendRow([new Date(), name, message, userAgent]);
    return successResponse("Ucapan berhasil dikirim. Terima kasih!");
  } finally {
    lock.releaseLock();
  }
}

function setupProperties() {
  var ui = SpreadsheetApp.getUi
    ? SpreadsheetApp.getUi()
    : null;
  Logger.log(
    "Untuk setup: buka Apps Script > Project Settings > Script Properties\n" +
    "Tambahkan properti: SPREADSHEET_ID = [ID spreadsheet Anda]"
  );
}
