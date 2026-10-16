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