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

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatValue(val: unknown): string {
  if (val === undefined || val === null || val === "") return "N/A";
  if (Array.isArray(val)) {
    return val.length > 0 ? val.join(", ") : "None";
  }
  if (typeof val === "object") {
    return Object.entries(val as Record<string, unknown>)
      .map(([k, v]) => `<strong>${formatKey(k)}:</strong> ${String(v)}`)
      .join("<br/>");
  }
  return String(val);
}

export function generateLuxuryLeadEmailHtml(payload: LeadEmailPayload): string {
  const badgeText =
    payload.type === "demo" || payload.type === "testdrive"
      ? "🏎️ TEST DRIVE / DEMO BOOKING"
      : payload.type === "quote"
      ? "⚡ CUSTOM CART QUOTE REQUEST"
      : payload.type === "dealer"
      ? "🏢 DEALER PARTNERSHIP APPLICATION"
      : "💬 VIP INQUIRY";

  const rows = Object.entries(payload.data)
    .filter(([_, val]) => val !== undefined && val !== null && val !== "")
    .map(
      ([key, val], idx) => `
      <tr style="background-color: ${idx % 2 === 0 ? "#ffffff" : "#f8fafc"};">
        <td style="padding: 14px 18px; font-weight: 700; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 13px; width: 36%; text-transform: capitalize; vertical-align: top; letter-spacing: 0.02em;">
          ${formatKey(key)}
        </td>
        <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; font-weight: 600; line-height: 1.5;">
          ${formatValue(val)}
        </td>
      </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${payload.subject}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; margin: 0; padding: 40px 16px;">
        <!-- Email Container -->
        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); border: 1px solid #27272a;">
          
          <!-- Luxury Header Banner -->
          <tr>
            <td style="background: linear-gradient(180deg, #18181b 0%, #09090b 100%); padding: 36px 32px 32px 32px; text-align: center; border-bottom: 4px solid #ef4444;">
              <!-- Zebra Brand Text Logo -->
              <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px auto;">
                <tr>
                  <td style="padding: 0 8px;">
                    <span style="font-size: 28px; font-weight: 900; letter-spacing: 0.15em; color: #ffffff; font-family: 'Arial Black', Impact, sans-serif; text-transform: uppercase;">
                      ZEBRA
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">
                    <span style="font-size: 9px; font-weight: 800; letter-spacing: 0.35em; color: #ef4444; text-transform: uppercase;">
                      STRIPES OF POWER · LUXURY LSV
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Lead Category Pill -->
              <div style="display: inline-block; padding: 6px 16px; background-color: #ef4444; color: #ffffff; border-radius: 9999px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);">
                ${badgeText}
              </div>

              <!-- Main Title -->
              <h1 style="margin: 18px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; line-height: 1.3;">
                ${payload.subject}
              </h1>
            </td>
          </tr>

          <!-- Customer VIP Profile Card -->
          <tr>
            <td style="padding: 28px 32px 12px 32px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #fef2f2; border: 1.5px solid #fecaca; border-radius: 14px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 12px; border-bottom: 1px dashed #fca5a5;">
                          <span style="font-size: 11px; font-weight: 800; color: #991b1b; text-transform: uppercase; letter-spacing: 0.1em;">
                            👤 Customer Contact Profile
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 14px;">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 4px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 90px;">Full Name:</td>
                              <td style="padding: 4px 0; font-size: 16px; color: #0f172a; font-weight: 800;">${payload.senderName}</td>
                            </tr>
                            <tr>
                              <td style="padding: 4px 0; font-size: 13px; color: #64748b; font-weight: 600;">Email:</td>
                              <td style="padding: 4px 0; font-size: 14px;">
                                <a href="mailto:${payload.senderEmail}" style="color: #ef4444; font-weight: 700; text-decoration: none;">
                                  ${payload.senderEmail}
                                </a>
                              </td>
                            </tr>
                            ${
                              payload.senderPhone
                                ? `<tr>
                                <td style="padding: 4px 0; font-size: 13px; color: #64748b; font-weight: 600;">Phone:</td>
                                <td style="padding: 4px 0; font-size: 14px;">
                                  <a href="tel:${payload.senderPhone.replace(/[^0-9+]/g, "")}" style="color: #ef4444; font-weight: 700; text-decoration: none;">
                                    ${payload.senderPhone}
                                  </a>
                                </td>
                              </tr>`
                                : ""
                            }
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Submission Full Specification Table -->
          <tr>
            <td style="padding: 16px 32px 28px 32px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <span style="font-size: 12px; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.08em;">
                      📋 Request Specifications & Options
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                      <tbody>
                        ${rows}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Actions Bar -->
          <tr>
            <td style="padding: 0 32px 32px 32px; text-align: center;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 6px;">
                    <a href="mailto:${payload.senderEmail}?subject=Re: ${encodeURIComponent(payload.subject)}" 
                       style="display: inline-block; padding: 14px 28px; background-color: #ef4444; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; box-shadow: 0 6px 16px rgba(239, 68, 68, 0.35);">
                      ✉️ Reply to Lead
                    </a>
                  </td>
                  ${
                    payload.senderPhone
                      ? `<td style="padding: 0 6px;">
                          <a href="tel:${payload.senderPhone.replace(/[^0-9+]/g, "")}" 
                             style="display: inline-block; padding: 14px 28px; background-color: #0f172a; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase;">
                            📞 Call Customer
                          </a>
                        </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="background-color: #0f172a; color: #94a3b8; padding: 24px 32px; text-align: center; font-size: 12px; line-height: 1.6; border-top: 1px solid #1e293b;">
              <p style="margin: 0 0 6px 0; font-weight: 700; color: #f8fafc; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">
                Zebra Golf Cart Showroom Network
              </p>
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #cbd5e1;">
                Florida · Arizona · Atlanta · Direct Concierge: (954) 820-4220
              </p>
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                Captured automatically on ${new Date().toLocaleString("en-US", { timeZoneName: "short" })} via zebragolfcart.com
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

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

  const htmlContent = generateLuxuryLeadEmailHtml(payload);

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
        to: [{ email: recipientEmail, name: "Zebra Concierge Team" }],
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
