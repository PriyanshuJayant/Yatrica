import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { destination, departureCity, name, phone, email, agreed } = req.body;

  // Validate input
  if (!destination || !departureCity || !name || !phone || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // User Agreement Verification (separate check)
  if (!agreed) {
    return res
      .status(400)
      .json({ error: "You must agree to the User Agreement to proceed" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || process.env.VITE_EMAIL_USER,
        pass: process.env.EMAIL_PASS || process.env.VITE_EMAIL_PASS,
      },
    });

    // Email to the person who filled the form
    const userMailOptions = {
      from: `"Yatrica Travel" <${
        process.env.EMAIL_USER || process.env.VITE_EMAIL_USER
      }>`,
      to: email,
      subject: "Thank You for Your Quote Request - Yatrica Travel",
      html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Quote Request — Yatrica Travel</title>
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

      .wrapper{ max-width:var(--max-width); margin:28px auto; padding:20px; }

      .header-card{ background: linear-gradient(90deg,var(--accent-2),var(--accent)); color:white; padding:22px 24px; border-radius:var(--radius); box-shadow:var(--shadow); display:flex; gap:16px; align-items:center; }

      .header-card h1{ margin:0; font-size:20px }

      .card{ background:var(--card); margin-top:16px; border-radius:calc(var(--radius)-2px); padding:20px; box-shadow:var(--shadow); border:1px solid rgba(15,23,42,0.04); }

      .lead{ font-size:15px; color:#0f172a; font-weight:700; margin-bottom:8px }

      .details{ background:linear-gradient(180deg,#fbfdff,#fbfffb); padding:14px; border-radius:10px; border:1px solid rgba(37,99,235,0.06); }

      .detail-row{ display:flex; gap:12px; padding:10px 0; border-bottom:1px dashed rgba(15,23,42,0.04); }
      .detail-row:last-child{ border-bottom:0 }
      .detail-label{ min-width:140px; color:var(--muted); font-weight:600 }
      .detail-value{ color:#0f172a; font-weight:500 }

      .cta{ text-align:center; margin:22px 0 }
      .cta a{ display:inline-block; padding:12px 28px; border-radius:8px; background:var(--accent-2); color:white; text-decoration:none; font-weight:600; box-shadow:0 6px 18px rgba(37,99,235,0.12) }

      .info{ background:linear-gradient(90deg, rgba(37,99,235,0.06), rgba(14,165,164,0.04)); padding:12px; border-radius:8px; color:var(--muted); margin:16px 0 }

      .footer{ margin-top:14px; font-size:13px; color:var(--muted); text-align:center }

      @media (max-width:560px){ .header-card{flex-direction:column;align-items:flex-start} .detail-row{flex-direction:column} .detail-label{min-width:0} }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header-card" role="banner" aria-label="Quote request received">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-size:28px;line-height:1">✈️</div>
          <h1>Quote Request Received!</h1>
        </div>
        <div style="margin-left:auto;color:rgba(255,255,255,0.95);font-weight:600">Yatrica Travel</div>
      </div>

      <div class="card" role="main">
        <p style="margin:0 0 10px 0">Dear ${name},</p>

        <p style="margin-top:0;color:var(--muted)">Thank you for requesting a quote with <strong>Yatrica Travel</strong>! We have received your travel inquiry and our holiday experts are already reviewing your requirements.</p>

        <div style="margin:14px 0">
          <div class="lead">Your Travel Details</div>
          <div class="details">
            <div class="detail-row"><div class="detail-label">✈️ Destination</div><div class="detail-value">${destination}</div></div>
            <div class="detail-row"><div class="detail-label">🛫 Departure City</div><div class="detail-value">${departureCity}</div></div>
            <div class="detail-row"><div class="detail-label">👤 Name</div><div class="detail-value">${name}</div></div>
            <div class="detail-row"><div class="detail-label">📞 Phone</div><div class="detail-value">${phone}</div></div>
            <div class="detail-row"><div class="detail-label">📧 Email</div><div class="detail-value">${email}</div></div>
          </div>
        </div>

        <div class="info">
          <div style="font-weight:700;color:#07203a;margin-bottom:6px">What Happens Next?</div>
          <div>✓ Our travel expert will review your requirements</div>
          <div>✓ You'll receive a personalized quote within 24 hours</div>
          <div>✓ We'll contact you via phone or email with the best options</div>
        </div>

        <div class="cta"><a href="https://yatrica.vercel.app/packages/allpackages">Explore More Packages</a></div>

        <p style="margin-top:10px;color:var(--muted)"><strong>Need immediate assistance?</strong><br/>Call us at <strong style="color:var(--accent-2)">+91 (000) 000-0000</strong><br/>Email us at <strong style="color:var(--accent-2)">info@yatricatravel.com</strong></p>

        <p style="margin-top:16px">Best regards,<br/><strong style="color:var(--accent-2)">The Yatrica Travel Team</strong><br/><em style="font-size:13px;color:var(--muted)">Your Journey, Our Passion</em></p>

        <div class="footer">© ${new Date().getFullYear()} Yatrica Travel. All rights reserved.<br/>📧 <a href="mailto:info@yatricatravel.com">info@yatricatravel.com</a> | 📞 +91 (981) 845-6811</div>
      </div>
    </div>
  </body>
</html>

      `,
    };

    // Email to your business (admin notification)
    const adminMailOptions = {
      from: `"Yatrica Quote Form" <${
        process.env.EMAIL_USER || process.env.VITE_EMAIL_USER
      }>`,
      to: process.env.EMAIL_USER || process.env.VITE_EMAIL_USER,
      subject: `🎯 New Quote Request from ${name}`,
      html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New Quote Request — Yatrica Travel</title>
    <style>
      :root{
        --bg: #f6f8fa;
        --card: #ffffff;
        --muted: #6b7280;
        --accent: #0ea5a4;
        --accent-2: #2563eb;
        --success: #16a34a;
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
        -webkit-font-smoothing:antialiased;
        -moz-osx-font-smoothing:grayscale;
      }

      .wrapper{ max-width:var(--max-width); margin:28px auto; padding:20px; }

      .header-card{ background: linear-gradient(90deg,var(--accent-2),var(--accent)); color:white; padding:22px 24px; border-radius:var(--radius); box-shadow:var(--shadow); display:flex; gap:16px; align-items:center; }

      .header-card h1{ margin:0; font-size:20px; letter-spacing:-0.2px }

      .meta{ margin-left:auto; text-align:right; font-size:13px; opacity:0.95 }

      .card{ background:var(--card); margin-top:16px; border-radius:calc(var(--radius)-2px); padding:20px; box-shadow:var(--shadow); border:1px solid rgba(15,23,42,0.04); }

      .alert{ background:linear-gradient(90deg, rgba(245,158,11,0.08), rgba(234,179,8,0.06)); padding:12px 14px; border-radius:8px; color:#92400e; font-size:14px; display:flex; gap:10px; align-items:center; margin-bottom:16px }

      .travel-box{ background:linear-gradient(180deg,#fbfdff,#f0f9ff); padding:16px; border-radius:10px; border:1px solid rgba(37,99,235,0.12); margin:14px 0 }
      .travel-row{ display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px dashed rgba(15,23,42,0.06) }
      .travel-row:last-child{ border-bottom:0 }

      .lead{ font-size:15px; color:#0f172a; font-weight:700; margin-bottom:8px }

      .row{ display:flex; gap:16px; align-items:flex-start; padding:12px 0; border-bottom:1px dashed rgba(15,23,42,0.04); }
      .row:last-child{ border-bottom:0 }
      .label{ width:140px; color:var(--muted); font-weight:600 }
      .value{ color:#0f172a; font-weight:500; word-break:break-word }
      .value a{ color:var(--accent-2); text-decoration:none }
      .value a:hover{ text-decoration:underline }

      .action{ background:linear-gradient(90deg, rgba(22,163,74,0.06), rgba(34,197,94,0.04)); padding:14px; border-radius:8px; margin:16px 0 }
      .action ul{ margin:8px 0 12px 20px; color:#15803d }
      .cta-group{ display:flex; gap:10px; flex-wrap:wrap }
      .cta-btn{ display:inline-block; padding:10px 20px; border-radius:6px; background:var(--accent-2); color:white; text-decoration:none; font-weight:600; font-size:14px }

      .tip{ background:#fef3c7; padding:12px; border-radius:8px; color:#92400e; font-size:13px; margin-top:14px }

      .footer{ margin-top:14px; font-size:13px; color:var(--muted); text-align:center }

      @media (max-width:560px){ .header-card{flex-direction:column;align-items:flex-start} .meta{text-align:left;margin-left:0;margin-top:8px} .row{flex-direction:column} .label{width:100%;font-size:13px} }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header-card" role="banner" aria-label="New quote request">
        <div style="display:flex;align-items:center;gap:12px">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="24" height="24" rx="6" fill="rgba(255,255,255,0.12)"/>
            <path d="M9 11l3 3 8-8" stroke="rgba(255,255,255,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="rgba(255,255,255,0.95)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h1>New Quote Request</h1>
        </div>
        <div class="meta">
          <div style="font-weight:600">Received</div>
          <div style="opacity:0.9">${new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
            timeStyle: "short",
          })}</div>
        </div>
      </div>

      <div class="card" role="main">
        <div class="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div><strong>Action Required:</strong> A new customer is waiting for a travel quote. Please respond within 24 hours for best conversion rates.</div>
        </div>

        <div style="margin:14px 0">
          <div class="lead">Travel Request Details</div>
          <div class="travel-box">
            <div class="travel-row">
              <span style="font-weight:600;color:var(--muted)">✈️ Destination</span>
              <span style="color:var(--accent-2);font-weight:700;font-size:16px">${destination}</span>
            </div>
            <div class="travel-row">
              <span style="font-weight:600;color:var(--muted)">🛫 Departure City</span>
              <span style="color:var(--accent-2);font-weight:700;font-size:16px">${departureCity}</span>
            </div>
          </div>
        </div>

        <div style="margin:14px 0">
          <div class="lead">Customer Information</div>
          
          <div class="row">
            <div class="label">👤 Name</div>
            <div class="value">${name}</div>
          </div>

          <div class="row">
            <div class="label">📧 Email</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>

          <div class="row">
            <div class="label">📞 Phone</div>
            <div class="value"><a href="tel:${phone}">${phone}</a></div>
          </div>
        </div>

        <div class="action">
          <div style="font-weight:700;color:#15803d;margin-bottom:6px">📋 Next Steps</div>
          <ul>
            <li>Review available packages for ${destination}</li>
            <li>Prepare customized quote with pricing</li>
            <li>Contact customer within 24 hours</li>
            <li>Send detailed itinerary options</li>
          </ul>
          <div class="cta-group">
            <a href="mailto:${email}" class="cta-btn">📧 Send Email</a>
            <a href="tel:${phone}" class="cta-btn">📞 Call Now</a>
          </div>
        </div>

        <div class="tip">💡 <strong>Pro Tip:</strong> Customers who receive quotes within 2 hours are 3x more likely to book!</div>

        <div class="footer">This is an automated notification from Yatrica Travel Quote Request System<br/>Generated at ${new Date().toLocaleTimeString(
          "en-IN",
          { timeZone: "Asia/Kolkata" }
        )}</div>
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
      message: "Quote request sent successfully",
    });
  } catch (error) {
    console.error("Error sending quote email:", error);
    return res.status(500).json({
      error: "Failed to send quote request",
      details: error.message,
    });
  }
}
