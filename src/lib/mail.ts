import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: Number(process.env.SMTP_PORT ?? 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordSetupEmail(to: string, link: string) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Set your password - Whispers of Wisdom",
    text: `Welcome! Set your password using this link (valid for 1 hour): ${link}`,
    html: `
      <p>Welcome to Whispers of Wisdom!</p>
      <p>Click the button below to set your password. This link is valid for 1 hour.</p>
      <p><a href="${link}" style="background:#2196F3;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none">Set my password</a></p>
      <p>If you did not register, you can ignore this email.</p>
    `,
  });
}

export async function sendAdminPasswordResetEmail(to: string, link: string) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Reset your admin password - Whispers of Wisdom",
    text: `A password reset was requested for your Whispers of Wisdom admin account. Reset it using this link (valid for 1 hour): ${link}\n\nIf you did not request this, you can ignore this email.`,
    html: `
      <p>A password reset was requested for your Whispers of Wisdom admin account.</p>
      <p>Click the button below to choose a new password. This link is valid for 1 hour and can be used once.</p>
      <p><a href="${link}" style="background:#2196F3;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none">Reset my password</a></p>
      <p>If you did not request this, you can ignore this email — your password will not change.</p>
    `,
  });
}
