import sgMail from "@sendgrid/mail";

const sg = sgMail;
if (process.env.SENDGRID_API_KEY) {
  sg.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface SendInviteEmailParams {
  recipientEmail: string;
  inviteUrl: string;
  invitedByName: string;
  workspaceName: string;
  role: string;
}

function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

function getAppName(): string {
  return process.env.NEXT_PUBLIC_APP_NAME || "AL Solutions AI";
}

export async function sendInviteEmail(params: SendInviteEmailParams): Promise<void> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("SENDGRID_API_KEY is not configured. Skipping email send.");
    return;
  }

  const appName = getAppName();
  const appUrl = getAppUrl();

  const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; line-height: 1.5; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
      .content { background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 8px 8px; }
      .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: 600; margin: 20px 0; }
      .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; }
      .role-badge { background: #e0e7ff; color: #4338ca; padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${appName}</h1>
      </div>
      <div class="content">
        <p>Hi there,</p>
        <p><strong>${params.invitedByName}</strong> has invited you to join their workspace <strong>${params.workspaceName}</strong> on ${appName}.</p>
        <p>Your role will be: <span class="role-badge">${params.role}</span></p>
        <p>Click the button below to accept the invitation and get started:</p>
        <a href="${params.inviteUrl}" class="button">Accept Invitation</a>
        <p style="color: #666; font-size: 14px;">Or copy this link: <a href="${params.inviteUrl}">${params.inviteUrl}</a></p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">This invitation will expire in 7 days.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
        <p><a href="${appUrl}" style="color: #667eea; text-decoration: none;">Visit ${appName}</a></p>
      </div>
    </div>
  </body>
</html>
  `.trim();

  try {
    console.log(`[Email] Sending invite to ${params.recipientEmail} via SendGrid...`);
    await sg.send({
      to: params.recipientEmail,
      from: `${appName} <noreply@al-solutions-ai.com>`,
      subject: `You're invited to ${params.workspaceName} on ${appName}`,
      html: emailHtml,
    });
    console.log(`[Email] Invite sent successfully to ${params.recipientEmail}`);
  } catch (error) {
    console.error("[Email] Failed to send invite email:", {
      recipientEmail: params.recipientEmail,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    // Don't throw - let the invite be created even if email fails
  }
}
