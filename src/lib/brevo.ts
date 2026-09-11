/**
 * Brevo (formerly Sendinblue) Transactional Email Service
 * Handles lead notifications for Zebra Golf Cart
 */

export interface LeadEmailPayload {
  type: "quote" | "demo" | "dealer" | "contact" | "testdrive";
  subject: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  data: Record<string, unknown>;
}

const FALLBACK_BREVO_KEY = "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";

export async function sendLeadEmail(payload: LeadEmailPayload): Promise<{ success: boolean; error?: string; simulated?: boolean }> {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY || FALLBACK_BREVO_KEY;
  const senderEmail = import.meta.env.VITE_BREVO_SENDER_EMAIL || "notifications@zebragolfcart.com";
  const recipientEmail = import.meta.env.VITE_BREVO_RECIPIENT_EMAIL || "info@zebragolfcart.com";

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_brevo_api_key_here") {
    console.info(
      `[Brevo Service] VITE_BREVO_API_KEY not configured. Simulating lead submission for: ${payload.subject}`,
      payload
    );
    return { success: true, simulated: true };
  }

  const rows = Object.entries(payload.data)
    .filter(([_, val]) => val !== undefined && val !== null && val !== "")
    .map(
      ([key, val]) => `
      <tr>
        <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb; color: #374151; text-transform: capitalize;">
          ${key.replace(/([A-Z])/g, " $1")}
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">
          ${typeof val === "object" ? JSON.stringify(val) : String(val)}
        </td>
      </tr>`
    )
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
          .header { background: #111827; color: #ffffff; padding: 24px; text-align: center; }
          .badge { display: inline-block; padding: 4px 12px; background: #ef4444; color: #ffffff; border-radius: 9999px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; }
          .content { padding: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          .footer { background: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">Zebra Lead Alert</span>
            <h2 style="margin: 0; font-size: 20px;">${payload.subject}</h2>
          </div>
          <div class="content">
            <p style="font-size: 14px; color: #4b5563; margin-bottom: 16px;">
              You have received a new lead from the Zebra Golf Cart website:
            </p>
            <table>
              <tbody>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb; color: #374151;">Contact Name</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">${payload.senderName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb; color: #374151;">Email</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">
                    <a href="mailto:${payload.senderEmail}" style="color: #ef4444; text-decoration: none;">${payload.senderEmail}</a>
                  </td>
                </tr>
                ${
                  payload.senderPhone
                    ? `<tr>
                    <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb; color: #374151;">Phone</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">${payload.senderPhone}</td>
                  </tr>`
                    : ""
                }
                ${rows}
              </tbody>
            </table>
          </div>
          <div class="footer">
            Submitted from Zebra Golf Cart Website · ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Zebra Golf Cart", email: senderEmail },
        to: [{ email: recipientEmail, name: "Zebra Team" }],
        replyTo: { email: payload.senderEmail, name: payload.senderName },
        subject: `[Zebra Lead] ${payload.subject} - ${payload.senderName}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[Brevo Service] API Error:", errorData);
      return { success: false, error: errorData.message || `Request failed with status ${response.status}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    console.error("[Brevo Service] Network / dispatch error:", err);
    return { success: false, error: message };
  }
}
