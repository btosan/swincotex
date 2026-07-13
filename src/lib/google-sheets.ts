import { google } from "googleapis";

/**
 * Appends one row to the configured Google Sheet for every contact form
 * submission. Uses a Google Service Account (free, no OAuth consent
 * screen needed) — share the target Sheet with the service account's
 * email as an Editor.
 *
 * Required env vars:
 *   GOOGLE_SHEETS_CLIENT_EMAIL   — service account email
 *   GOOGLE_SHEETS_PRIVATE_KEY    — service account private key (keep the \n escapes)
 *   GOOGLE_SHEETS_SPREADSHEET_ID — the ID from the sheet's URL
 */
export async function appendContactSubmissionToSheet(row: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  createdAt: Date;
}) {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.warn("Google Sheets env vars not set — skipping sheet sync");
    return { skipped: true };
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Submissions!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          row.createdAt.toISOString(),
          row.name,
          row.email,
          row.phone ?? "",
          row.company ?? "",
          row.service ?? "",
          row.message,
        ],
      ],
    },
  });

  return { skipped: false };
}
