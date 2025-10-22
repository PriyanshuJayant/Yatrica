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
      from: `"Yatrica" <${
        process.env.EMAIL_USER || process.env.VITE_EMAIL_USER
      }>`,
      to: email,
      subject: "Thank You for Contacting Yatrica",
      html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f6f8fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f8fa; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
            
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(90deg, #2563eb, #0ea5a4); border-radius: 12px; padding: 30px; text-align: center;">
                <img src="https://raw.githubusercontent.com/PriyanshuJayant/Yatrica/main/FrontEnd/public/images/Logo.png" alt="Yatrica Logo" style="width: 80px; height: 60px; margin-bottom: 10px;" />
                <h1 style="color: white; margin: 10px 0 5px 0; font-size: 24px; font-weight: 600;">Thank You for Reaching Out!</h1>
                <p style="color: rgba(255, 255, 255, 0.95); margin: 0; font-size: 14px;">Yatrica</p>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="background-color: white; border-radius: 10px; padding: 30px; margin-top: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                
                <p style="margin: 0 0 15px 0; font-size: 16px; color: #0f172a;">Dear <strong>${name}</strong>,</p>

                <p style="margin: 0 0 20px 0; color: #6b7280; line-height: 1.6;">
                  Thank you for contacting <strong style="color: #2563eb;">Yatrica</strong>. We have received your message and our team will get back to you within 24 hours.
                </p>

                <!-- Message Box -->
                <div style="margin: 20px 0;">
                  <h3 style="font-size: 16px; color: #0f172a; font-weight: 700; margin: 0 0 12px 0;">Your Message</h3>
                  <div style="background: linear-gradient(180deg, #fbfdff, #f0f9ff); padding: 16px; border-radius: 10px; border: 1px solid rgba(37, 99, 235, 0.1); color: #374151; line-height: 1.6;">
                    ${message}
                  </div>
                </div>

                <p style="margin: 20px 0; color: #6b7280; line-height: 1.6;">
                  In the meantime, feel free to explore our website for amazing travel packages and destinations.
                </p>

                <p style="margin: 20px 0; color: #6b7280; line-height: 1.6;">
                  If you have any urgent queries, please feel free to call us at <strong style="color: #2563eb;">+91 (981) 845-6811</strong>
                </p>

                <p style="margin-top: 20px; color: #0f172a;">
                  Best regards,<br/>
                  <strong style="color: #2563eb;">The Yatrica's Team</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Yatrica. All rights reserved.</p>
                <p style="margin: 8px 0 0 0;">📧 <a href="mailto:info@yatrica.co.in" style="color: #2563eb; text-decoration: none;">info@yatrica.co.in</a> | 📞 +91 (981) 845-6811</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f6f8fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f8fa; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
            
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(90deg, #2563eb, #0ea5a4); border-radius: 12px; padding: 30px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">🔔 New Contact Form Submission</h1>
                    </td>
                    <td align="right">
                      <div style="color: rgba(255, 255, 255, 0.95); font-size: 12px;">
                        <div style="font-weight: 600; margin-bottom: 4px;">Received</div>
                        <div>${new Date().toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="background-color: white; border-radius: 10px; padding: 30px; margin-top: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                
                <h3 style="font-size: 16px; color: #0f172a; font-weight: 700; margin: 0 0 16px 0; padding-bottom: 12px; border-bottom: 2px solid rgba(37, 99, 235, 0.1);">Contact Details</h3>

                <!-- Contact Info Table -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px dashed rgba(15, 23, 42, 0.06); color: #6b7280; font-weight: 600; width: 30%;">👤 Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px dashed rgba(15, 23, 42, 0.06); color: #0f172a; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px dashed rgba(15, 23, 42, 0.06); color: #6b7280; font-weight: 600;">📧 Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px dashed rgba(15, 23, 42, 0.06);"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px dashed rgba(15, 23, 42, 0.06); color: #6b7280; font-weight: 600;">📞 Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px dashed rgba(15, 23, 42, 0.06);"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 16px 0 8px 0; color: #6b7280; font-weight: 600;">💬 Message</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <div style="background: linear-gradient(180deg, #fbfdff, #f0f9ff); padding: 16px; border-radius: 10px; border: 1px solid rgba(34, 197, 94, 0.08); color: #374151; line-height: 1.6; margin-top: 8px;">
                        ${message}
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Action Notice -->
                <table width="100%" cellpadding="12" cellspacing="0" style="background: linear-gradient(90deg, rgba(37, 99, 235, 0.06), rgba(14, 165, 164, 0.04)); border-radius: 8px; margin-top: 20px;">
                  <tr>
                    <td style="color: #374151; font-size: 13px;">
                      <strong style="color: #0f172a;">⚠️ Action Required:</strong>
                      <div style="margin-top: 6px;">Please respond to this inquiry within 24 hours for best customer satisfaction.</div>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                <p style="margin: 0;">This is an automated notification from Yatrica Contact Form</p>
                <p style="margin: 8px 0 0 0;">Generated at ${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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
