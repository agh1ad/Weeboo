const RESEND_ENDPOINT = "https://api.resend.com/emails";

const escapeHtml = (value) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function emailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.FROM_EMAIL &&
      process.env.LEAD_NOTIFICATION_EMAIL,
  );
}

async function sendEmail(message) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: process.env.FROM_EMAIL, ...message }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`Email provider returned ${response.status}.`);
  }
}

export async function sendProjectEmails(publicId, request) {
  if (!emailConfigured()) return false;

  const rows = [
    ["Reference", publicId],
    ["Name", request.name],
    ["Email", request.email],
    ["Client type", request.client_type],
    ["Service", request.service],
    ["Current website", request.current_website || "Not provided"],
    ["Timing", request.timing || "Not provided"],
    ["Materials", request.materials || "Not provided"],
  ]
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:7px 14px 7px 0">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  await Promise.all([
    sendEmail({
      to: [process.env.LEAD_NOTIFICATION_EMAIL],
      reply_to: request.email,
      subject: `New Weeboo project request — ${request.name}`,
      html: `<h1>New website project request</h1><table>${rows}</table><h2>Project idea</h2><p style="white-space:pre-wrap">${escapeHtml(request.project_idea)}</p><h2>Additional details</h2><p style="white-space:pre-wrap">${escapeHtml(request.additional_details || "Not provided")}</p>`,
    }),
    sendEmail({
      to: [request.email],
      subject: "We received your website idea — Weeboo",
      html: `<h1>Thank you, ${escapeHtml(request.name)}.</h1><p>We received your website project request and will review it carefully.</p><p>Your reference is <strong>${escapeHtml(publicId)}</strong>.</p><p>Our team will contact you at this email address with the next questions or a proposed way forward.</p><p>— Weeboo</p>`,
    }),
  ]);
  return true;
}
