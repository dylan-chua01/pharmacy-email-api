import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { to, subject, messageHtml } = req.body;

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }

  try {
    const data = await resend.emails.send({
      from: 'Pharmacy App <dylan.chua@globex.com.bn>', // ✅ Proper email format
      to,
      subject,
      html: messageHtml,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: error.message || "Email send failed" });
  }
}
