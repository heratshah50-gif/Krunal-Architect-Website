function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function contactNotificationHtml(data: {
  name: string;
  email: string;
  phone?: string | null;
  projectType?: string | null;
  message: string;
}) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Project Type", data.projectType || "—"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#4a3f3c;font-weight:600;">${label}</td><td style="padding:4px 0;">${escapeHtml(
          String(value)
        )}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1c1210;max-width:520px;">
      <h2 style="color:#200000;margin-bottom:16px;">New website inquiry</h2>
      <table>${rows}</table>
      <p style="margin-top:16px;color:#4a3f3c;font-weight:600;">Message</p>
      <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `;
}
