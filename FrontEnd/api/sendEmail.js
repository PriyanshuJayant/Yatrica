import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  // Validate input
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER || process.env.VITE_EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS || process.env.VITE_EMAIL_PASS, // Your email app password
      },
    });

    // Email to the person who filled the form
    const userMailOptions = {
      from: `"Yatrica Travel" <${
        process.env.EMAIL_USER || process.env.VITE_EMAIL_USER
      }>`,
      to: email,
      subject: "Thank You for Contacting Yatrica Travel",
      html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Thank you — Yatrica Travel</title>
    <style>
      :root{
        --bg: #f6f8fa;
        --card: #ffffff;
        --muted: #6b7280;
        --accent: #0ea5a4; /* teal */
        --accent-2: #2563eb; /* blue */
        --radius: 12px;
        --max-width: 720px;
        --shadow: 0 6px 18px rgba(18, 38, 63, 0.08);
      }

      html,body{
        height:100%;
        margin:0;
        padding:0;
        background: linear-gradient(180deg,var(--bg),#eef2f7 60%);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        color: #0f172a;
      }

      .wrapper{
        max-width:var(--max-width);
        margin:28px auto;
        padding:20px;
      }

      .header-card{
        background: linear-gradient(90deg,var(--accent-2),var(--accent));
        color: white;
        padding:22px 24px;
        border-radius:var(--radius);
        box-shadow: var(--shadow);
        display:flex;
        gap:16px;
        align-items:center;
      }

      .header-card h1{ margin:0; font-size:20px; }

      .card{ background:var(--card); margin-top:16px; border-radius:calc(var(--radius)-2px); padding:20px; box-shadow:var(--shadow); border:1px solid rgba(15,23,42,0.04); }

      .lead{ font-size:15px; color:#0f172a; font-weight:700; margin-bottom:8px }

      .message-box{ background:linear-gradient(180deg,#fbfdff,#fbfffb); padding:16px; border-radius:10px; border:1px solid rgba(37,99,235,0.06); }

      .footer{ margin-top:14px; font-size:13px; color:var(--muted); text-align:center; }

      @media (max-width:560px){ .header-card{flex-direction:column;align-items:flex-start} }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header-card" role="banner" aria-label="Thank you message">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-size:28px;line-height:1">✈️</div>
          <h1>Thank You for Reaching Out!</h1>
        </div>
        <div style="margin-left:auto;color:rgba(255,255,255,0.95);font-weight:600">Yatrica</div>
      </div>

      <div class="card" role="main">
        <p style="margin:0 0 10px 0">Dear ${name},</p>

        <p style="margin-top:0; color:var(--muted)">
          Thank you for contacting <strong>Yatrica</strong>. We have received your message and our team will get back to you within 24 hours.
        </p>

        <div style="margin:14px 0">
          <div class="lead">Your Message</div>
          <div class="message-box">${message}</div>
        </div>

        <p style="color:var(--muted)">In the meantime, feel free to explore our website for amazing travel packages and destinations.</p>

        <p style="color:var(--muted)">If you have any urgent queries, please feel free to call us at <strong>+91 (981) 845-6811</strong></p>

        <p style="margin-top:18px">Best regards,<br /><strong>The YatricaTeam</strong></p>

        <div class="footer">© ${new Date().getFullYear()} Yatrica. All rights reserved.<br/>📧 info@yatrica.co.in | 📞 +91 (981) 845-6811</div>
      </div>
    </div>
  </body>
</html>

      `,
    };

    // Email to your business (admin notification)
    const adminMailOptions = {
      from: `"Yatrica Contact Form" <${
        process.env.EMAIL_USER || process.env.VITE_EMAIL_USER
      }>`,
      to: process.env.EMAIL_USER || process.env.VITE_EMAIL_USER, // Your business email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Contact Form Submission</title>
    <style>
      :root{
        --bg: #f6f8fa;
        --card: #ffffff;
        --muted: #6b7280;
        --accent: #0ea5a4; /* teal */
        --accent-2: #2563eb; /* blue */
        --success: #16a34a;
        --radius: 12px;
        --max-width: 720px;
        --shadow: 0 6px 18px rgba(18, 38, 63, 0.08);
        font-synthesis: none;
      }

      html,body{
        height:100%;
        margin:0;
        padding:0;
        background: linear-gradient(180deg,var(--bg),#eef2f7 60%);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        color: #0f172a;
        -webkit-font-smoothing:antialiased;
        -moz-osx-font-smoothing:grayscale;
      }

      .wrapper{
        max-width:var(--max-width);
        margin:28px auto;
        padding:20px;
      }

      .header-card{
        background: linear-gradient(90deg,var(--accent-2),var(--accent));
        color: white;
        padding:22px 24px;
        border-radius:var(--radius);
        box-shadow: var(--shadow);
        display:flex;
        gap:16px;
        align-items:center;
      }

      .header-card h1{
        margin:0;
        font-size:20px;
        letter-spacing: -0.2px;
      }

      .meta{
        margin-left:auto;
        text-align:right;
        font-size:13px;
        opacity:0.95;
      }

      .card{
        background:var(--card);
        margin-top:16px;
        border-radius:calc(var(--radius) - 2px);
        padding:20px;
        box-shadow: var(--shadow);
        border:1px solid rgba(15,23,42,0.04);
      }

      .row{
        display:flex;
        gap:16px;
        align-items:flex-start;
        padding:12px 0;
        border-bottom:1px dashed rgba(15,23,42,0.04);
      }

      .row:last-child{ border-bottom:0; }

      .label{ width:140px; color:var(--muted); font-weight:600; }
      .value{ color:#0f172a; font-weight:500; word-break:break-word; }

      .value a{ color:var(--accent-2); text-decoration:none; }
      .value a:hover{ text-decoration:underline; }

      .message{
        background:linear-gradient(180deg,#fbfdff, #fbfffb);
        padding:14px;
        border-radius:10px;
        border:1px solid rgba(34,197,94,0.08);
        color:#0b1720;
      }

      .notice{
        margin-top:12px;
        background:linear-gradient(90deg, rgba(37,99,235,0.06), rgba(14,165,164,0.04));
        padding:10px 12px;
        border-radius:8px;
        color:var(--muted);
        font-size:13px;
        display:flex; gap:8px; align-items:center;
      }

      .footer{
        margin-top:14px;
        font-size:13px;
        color:var(--muted);
        text-align:center;
      }

      /* Responsive */
      @media (max-width:560px){
        .row{ flex-direction:column; }
        .label{ width:100%; font-size:13px; }
        .meta{ text-align:left; margin-left:0; margin-top:8px; }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header-card" role="banner" aria-label="New contact submission">
        <div style="display:flex;align-items:center;gap:12px">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="24" height="24" rx="6" fill="rgba(255,255,255,0.12)"/>
            <path d="M12 7v6l4 2" stroke="rgba(255,255,255,0.95)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="meta">
          <div style="font-weight:600">Received</div>
          <div style="opacity:0.9;">${new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}</div>
        </div>
      </div>

      <div class="card" role="main">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div style="font-size:15px;font-weight:700;color:#0f172a">Contact Details</div>
          <div style="font-size:13px;color:var(--muted)">Yatrica</div>
        </div>

        <div class="row">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>

        <div class="row">
          <div class="label">Email</div>
          <div class="value"><a href="mailto:${email}">${email}</a></div>
        </div>

        <div class="row">
          <div class="label">Phone</div>
          <div class="value"><a href="tel:${phone}">${phone}</a></div>
        </div>

        <div class="row">
          <div class="label">Message</div>
          <div class="value message">${message}</div>
        </div>

        <div class="notice" role="note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 9v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div>
            <strong style="color:#07203a">Action Required:</strong>
            <div style="margin-top:4px">Please respond to this inquiry within 24 hours.</div>
          </div>
        </div>

        <div class="footer">This is an automated notification from Yatrica Travel Contact Form</div>
      </div>
    </div>
  </body>
</html>
      `,
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
}
