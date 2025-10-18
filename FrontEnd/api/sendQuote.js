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
    return res.status(400).json({ error: "You must agree to the terms and conditions to proceed" });
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
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #61daff 0%, #0056b3 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .icon {
              font-size: 56px;
              margin-bottom: 15px;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 18px;
              color: #61daff;
              font-weight: 600;
              margin-bottom: 20px;
            }
            .details-box {
              background: #f8f9fa;
              border-left: 4px solid #61daff;
              padding: 20px;
              margin: 25px 0;
              border-radius: 8px;
            }
            .details-box h3 {
              margin: 0 0 15px 0;
              color: #61daff;
              font-size: 18px;
            }
            .detail-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #e9ecef;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #495057;
              min-width: 140px;
            }
            .detail-value {
              color: #212529;
            }
            .info-section {
              background: #e7f3ff;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
            }
            .info-section p {
              margin: 8px 0;
              font-size: 14px;
              color: #0056b3;
            }
            .cta-section {
              text-align: center;
              margin: 30px 0;
            }
            .cta-button {
              display: inline-block;
              padding: 14px 32px;
              background: #61daff;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
            }
            .footer {
              background: #2c3e50;
              color: white;
              padding: 25px 30px;
              text-align: center;
              font-size: 14px;
            }
            .footer a {
              color: #61dafb;
              text-decoration: none;
            }
            .divider {
              height: 2px;
              background: linear-gradient(90deg, transparent, #61daff, transparent);
              margin: 25px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="icon">✈️</div>
              <h1>Quote Request Received!</h1>
              <p style="margin: 0; opacity: 0.9;">We're excited to help plan your journey</p>
            </div>
            
            <div class="content">
              <p class="greeting">Dear ${name},</p>
              
              <p>Thank you for requesting a quote with <strong>Yatrica Travel</strong>! We have received your travel inquiry and our holiday experts are already reviewing your requirements.</p>
              
              <div class="details-box">
                <h3>📋 Your Travel Details:</h3>
                <div class="detail-row">
                  <span class="detail-label">✈️ Destination:</span>
                  <span class="detail-value">${destination}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">🛫 Departure City:</span>
                  <span class="detail-value">${departureCity}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">👤 Name:</span>
                  <span class="detail-value">${name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">📞 Phone:</span>
                  <span class="detail-value">${phone}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">📧 Email:</span>
                  <span class="detail-value">${email}</span>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="info-section">
                <h3 style="margin: 0 0 12px 0; color: #0056b3;">🌟 What Happens Next?</h3>
                <p>✓ Our travel expert will review your requirements</p>
                <p>✓ You'll receive a personalized quote within 24 hours</p>
                <p>✓ We'll contact you via phone or email with the best options</p>
                <p>✓ Feel free to ask any questions - we're here to help!</p>
              </div>
              
              <div class="cta-section">
                <a href="https://yatrica.vercel.app/packages/allpackages" class="cta-button">
                  Explore More Packages
                </a>
              </div>
              
              <p style="margin-top: 30px; font-size: 14px; color: #6c757d;">
                <strong>Need immediate assistance?</strong><br>
                Call us at <strong style="color: #61daff;">+91 (000) 000-0000</strong><br>
                Email us at <strong style="color: #61daff;">info@yatricatravel.com</strong>
              </p>
              
              <p style="margin-top: 25px;">
                Best regards,<br>
                <strong style="color: #61daff;">The Yatrica Travel Team</strong><br>
                <em style="font-size: 13px; color: #6c757d;">Your Journey, Our Passion</em>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} Yatrica Travel. All rights reserved.</p>
              <p style="margin: 0;">📧 <a href="mailto:info@yatricatravel.com">info@yatricatravel.com</a> | 📞 +91 (000) 000-0000</p>
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
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
              color: white;
              padding: 35px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 26px;
            }
            .timestamp {
              background: rgba(255, 255, 255, 0.2);
              padding: 8px 16px;
              border-radius: 20px;
              display: inline-block;
              margin-top: 12px;
              font-size: 13px;
            }
            .content {
              padding: 35px 30px;
            }
            .alert-box {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px 20px;
              margin-bottom: 25px;
              border-radius: 6px;
            }
            .alert-box strong {
              color: #856404;
            }
            .details-card {
              background: #f8f9fa;
              border-radius: 10px;
              padding: 25px;
              margin: 20px 0;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
            .details-card h3 {
              margin: 0 0 20px 0;
              color: #28a745;
              font-size: 20px;
              border-bottom: 2px solid #28a745;
              padding-bottom: 10px;
            }
            .info-row {
              display: flex;
              padding: 14px;
              background: white;
              margin: 10px 0;
              border-radius: 8px;
              border-left: 4px solid #61daff;
              align-items: center;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            }
            .info-icon {
              font-size: 24px;
              margin-right: 15px;
            }
            .info-content {
              flex: 1;
            }
            .label {
              font-weight: 600;
              color: #61daff;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              display: block;
              margin-bottom: 4px;
            }
            .value {
              color: #212529;
              font-size: 16px;
              font-weight: 500;
            }
            .value a {
              color: #61daff;
              text-decoration: none;
            }
            .value a:hover {
              text-decoration: underline;
            }
            .travel-details {
              background: linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%);
              border-radius: 10px;
              padding: 20px;
              margin: 25px 0;
              border: 2px solid #61daff;
            }
            .travel-details h4 {
              margin: 0 0 15px 0;
              color: #0056b3;
            }
            .travel-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid rgba(0, 123, 255, 0.2);
            }
            .travel-row:last-child {
              border-bottom: none;
            }
            .action-section {
              background: #d4edda;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
              border-left: 4px solid #28a745;
            }
            .action-section strong {
              color: #155724;
              font-size: 16px;
            }
            .quick-actions {
              display: flex;
              gap: 10px;
              margin-top: 15px;
              flex-wrap: wrap;
            }
            .action-btn {
              padding: 10px 20px;
              background: #61daff;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 600;
              display: inline-block;
            }
            .footer {
              background: #2c3e50;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Quote Request</h1>
              <div class="timestamp">
                📅 ${new Date().toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </div>
            </div>
            
            <div class="content">
              <div class="alert-box">
                <strong>⚡ Action Required:</strong> A new customer is waiting for a travel quote. Please respond within 24 hours for best conversion rates.
              </div>
              
              <div class="travel-details">
                <h4>✈️ Travel Request Details</h4>
                <div class="travel-row">
                  <span style="font-weight: 600;">Destination:</span>
                  <span style="color: #0056b3; font-weight: 600; font-size: 18px;">${destination}</span>
                </div>
                <div class="travel-row">
                  <span style="font-weight: 600;">Departure City:</span>
                  <span style="color: #0056b3; font-weight: 600; font-size: 18px;">${departureCity}</span>
                </div>
              </div>
              
              <div class="details-card">
                <h3>👤 Customer Information</h3>
                
                <div class="info-row">
                  <span class="info-icon">👤</span>
                  <div class="info-content">
                    <span class="label">Full Name</span>
                    <span class="value">${name}</span>
                  </div>
                </div>
                
                <div class="info-row">
                  <span class="info-icon">📧</span>
                  <div class="info-content">
                    <span class="label">Email Address</span>
                    <span class="value"><a href="mailto:${email}">${email}</a></span>
                  </div>
                </div>
                
                <div class="info-row">
                  <span class="info-icon">📞</span>
                  <div class="info-content">
                    <span class="label">Phone Number</span>
                    <span class="value"><a href="tel:${phone}">${phone}</a></span>
                  </div>
                </div>
              </div>
              
              <div class="action-section">
                <strong>📋 Next Steps:</strong>
                <ul style="margin: 10px 0 0 20px; color: #155724;">
                  <li>Review available packages for ${destination}</li>
                  <li>Prepare customized quote with pricing</li>
                  <li>Contact customer within 24 hours</li>
                  <li>Send detailed itinerary options</li>
                </ul>
                
                <div class="quick-actions">
                  <a href="mailto:${email}" class="action-btn">📧 Send Email</a>
                  <a href="tel:${phone}" class="action-btn">📞 Call Now</a>
                </div>
              </div>
              
              <p style="margin-top: 25px; padding: 15px; background: #fff3cd; border-radius: 6px; font-size: 14px; color: #856404;">
                💡 <strong>Pro Tip:</strong> Customers who receive quotes within 2 hours are 3x more likely to book!
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">This is an automated notification from Yatrica Travel Quote Request System</p>
              <p style="margin: 10px 0 0 0; opacity: 0.8;">Generated at ${new Date().toLocaleTimeString(
                "en-IN",
                { timeZone: "Asia/Kolkata" }
              )}</p>
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
