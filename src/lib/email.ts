import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend's free tier requires sending FROM a domain you've verified in
// their dashboard. Until you verify swincotex.com, use their shared
// `onboarding@resend.dev` sender (works immediately, no card needed) —
// swap RESEND_FROM_EMAIL once your domain is verified.
const FROM = process.env.RESEND_FROM_EMAIL ?? "Swincotex Website <onboarding@resend.dev>";

export async function sendContactNotificationEmail(params: {
  to: string[];
  submitterName: string;
  submitterEmail: string;
  subject: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email notification");
    return { skipped: true };
  }

  return resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `New enquiry: ${params.subject}`,
    replyTo: params.submitterEmail,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New contact form submission</h2>
        <p><strong>From:</strong> ${escapeHtml(params.submitterName)} (${escapeHtml(params.submitterEmail)})</p>
        <p><strong>Subject:</strong> ${escapeHtml(params.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(params.message).replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/messages">View in admin dashboard</a></p>
      </div>
    `,
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
