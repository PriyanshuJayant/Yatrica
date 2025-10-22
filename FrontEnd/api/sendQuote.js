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
      from: `"Yatrica" <${
        process.env.EMAIL_USER || process.env.VITE_EMAIL_USER
      }>`,
      to: email,
      subject: "Thank You for Your Quote Request - Yatrica",
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
                <h1 style="color: white; margin: 10px 0 5px 0; font-size: 24px; font-weight: 600;">Quote Request Received!</h1>
                <p style="color: rgba(255, 255, 255, 0.95); margin: 0; font-size: 14px;">Yatrica</p>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="background-color: white; border-radius: 10px; padding: 30px; margin-top: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                
                <p style="margin: 0 0 15px 0; font-size: 16px; color: #0f172a;">Dear <strong>${name}</strong>,</p>

                <p style="margin: 0 0 20px 0; color: #6b7280; line-height: 1.6;">Thank you for requesting a quote with <strong style="color: #2563eb;">Yatrica</strong>! We have received your travel inquiry and our holiday experts are already reviewing your requirements.</p>

                <!-- Travel Details Box -->
                <div style="margin: 20px 0;">
                  <h3 style="font-size: 16px; color: #0f172a; font-weight: 700; margin: 0 0 12px 0;">Your Travel Details</h3>
                  <table width="100%" cellpadding="12" cellspacing="0" style="background: linear-gradient(180deg, #fbfdff, #f0f9ff); border-radius: 10px; border: 1px solid rgba(37, 99, 235, 0.1);">
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #6b7280; font-weight: 600; width: 40%;">✈️ Destination</td>
                      <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #0f172a; font-weight: 600;">${destination}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #6b7280; font-weight: 600;">🛫 Departure City</td>
                      <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #0f172a; font-weight: 600;">${departureCity}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #6b7280; font-weight: 600;">👤 Name</td>
                      <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #0f172a; font-weight: 500;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #6b7280; font-weight: 600;">📞 Phone</td>
                      <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #0f172a; font-weight: 500;">${phone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; color: #6b7280; font-weight: 600;">📧 Email</td>
                      <td style="padding: 12px; color: #0f172a; font-weight: 500;">${email}</td>
                    </tr>
                  </table>
                </div>

                <!-- What Happens Next -->
                <div style="background: linear-gradient(90deg, rgba(37, 99, 235, 0.06), rgba(14, 165, 164, 0.04)); padding: 16px; border-radius: 8px; margin: 20px 0;">
                  <p style="font-weight: 700; color: #0f172a; margin: 0 0 10px 0;">What Happens Next?</p>
                  <p style="margin: 5px 0; color: #374151; font-size: 14px;">✓ Our travel expert will review your requirements</p>
                  <p style="margin: 5px 0; color: #374151; font-size: 14px;">✓ You'll receive a personalized quote within 24 hours</p>
                  <p style="margin: 5px 0; color: #374151; font-size: 14px;">✓ We'll contact you via phone or email with the best options</p>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 25px 0;">
                  <a href="https://yatrica.vercel.app/packages/allpackages" style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">Explore More Packages</a>
                </div>

                <p style="margin: 20px 0 0 0; color: #6b7280; line-height: 1.6; font-size: 14px;">
                  <strong style="color: #0f172a;">Need immediate assistance?</strong><br/>
                  Call us at <strong style="color: #2563eb;">+91 (981) 845-6811</strong><br/>
                  Email us at <strong style="color: #2563eb;">info@yatrica.co.in</strong>
                </p>

                <p style="margin-top: 20px; color: #0f172a;">
                  Best regards,<br/>
                  <strong style="color: #2563eb;">The Yatrica's Team</strong><br/>
                  <em style="font-size: 13px; color: #6b7280;">Your Journey, Our Passion</em>
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
                      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">🔔 New Quote Request</h1>
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
                
                <!-- Alert Box -->
                <table width="100%" cellpadding="12" cellspacing="0" style="background: linear-gradient(90deg, rgba(245, 158, 11, 0.08), rgba(234, 179, 8, 0.06)); border-radius: 8px; margin-bottom: 20px;">
                  <tr>
                    <td style="color: #92400e; font-size: 14px;">
                      <strong>⚠️ Action Required:</strong> A new customer is waiting for a travel quote. Please respond within 24 hours for best conversion rates.
                    </td>
                  </tr>
                </table>

                <!-- Travel Details -->
                <h3 style="font-size: 16px; color: #0f172a; font-weight: 700; margin: 20px 0 12px 0;">Travel Request Details</h3>
                <table width="100%" cellpadding="14" cellspacing="0" style="background: linear-gradient(180deg, #fbfdff, #f0f9ff); border-radius: 10px; border: 1px solid rgba(37, 99, 235, 0.12); margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #6b7280; font-weight: 600; width: 40%;">✈️ Destination</td>
                    <td style="padding: 12px; border-bottom: 1px dashed rgba(15, 23, 42, 0.1); color: #2563eb; font-weight: 700; font-size: 16px;">${destination}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; color: #6b7280; font-weight: 600;">🛫 Departure City</td>
                    <td style="padding: 12px; color: #2563eb; font-weight: 700; font-size: 16px;">${departureCity}</td>
                  </tr>
                </table>

                <!-- Customer Information -->
                <h3 style="font-size: 16px; color: #0f172a; font-weight: 700; margin: 20px 0 12px 0;">Customer Information</h3>
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
                    <td style="padding: 12px 0; color: #6b7280; font-weight: 600;">📞 Phone</td>
                    <td style="padding: 12px 0;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
                  </tr>
                </table>

                <!-- Action Box -->
                <table width="100%" cellpadding="16" cellspacing="0" style="background: linear-gradient(90deg, rgba(22, 163, 74, 0.06), rgba(34, 197, 94, 0.04)); border-radius: 8px; margin: 20px 0;">
                  <tr>
                    <td>
                      <p style="font-weight: 700; color: #15803d; margin: 0 0 10px 0;">📋 Next Steps</p>
                      <ul style="margin: 8px 0 16px 20px; padding: 0; color: #15803d;">
                        <li style="margin: 6px 0;">Review available packages for ${destination}</li>
                        <li style="margin: 6px 0;">Prepare customized quote with pricing</li>
                        <li style="margin: 6px 0;">Contact customer within 24 hours</li>
                        <li style="margin: 6px 0;">Send detailed itinerary options</li>
                      </ul>
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-right: 10px;">
                            <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">📧 Send Email</a>
                          </td>
                          <td>
                            <a href="tel:${phone}" style="display: inline-block; padding: 12px 24px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">📞 Call Now</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Pro Tip -->
                <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #fef3c7; border-radius: 8px; margin-top: 20px;">
                  <tr>
                    <td style="color: #92400e; font-size: 13px;">
                      💡 <strong>Pro Tip:</strong> Customers who receive quotes within 2 hours are 3x more likely to book!
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                <p style="margin: 0;">This is an automated notification from Yatrica Quote Request System</p>
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
