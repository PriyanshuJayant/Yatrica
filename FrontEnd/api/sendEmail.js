import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  // Validate input
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER || process.env.VITE_EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS || process.env.VITE_EMAIL_PASS, // Your email app password
      },
    });

    // Email to the person who filled the form
    const userMailOptions = {
      from: `"Yatrica Travel" <${process.env.EMAIL_USER || process.env.VITE_EMAIL_USER}>`,
      to: email,
      subject: 'Thank You for Contacting Yatrica Travel',
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
            }
            .header {
              background: linear-gradient(135deg, #42a5f5 0%, #0056b3 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-left: 4px solid #42a5f5;
              margin: 20px 0;
              border-radius: 5px;
            }
            .footer {
              background: #333;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 0 0 10px 10px;
              font-size: 14px;
            }
            .icon {
              font-size: 48px;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="icon">✈️</div>
            <h1>Thank You for Reaching Out!</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for contacting <strong>Yatrica Travel</strong>. We have received your message and our team will get back to you within 24 hours.</p>
            
            <div class="message-box">
              <h3>Your Message:</h3>
              <p>${message}</p>
            </div>
            
            <p>In the meantime, feel free to explore our website for amazing travel packages and destinations.</p>
            
            <p>If you have any urgent queries, please feel free to call us at <strong>+91 (981) 845-6811</strong></p>
            
            <p>Best regards,<br>
            <strong>The Yatrica Travel Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Yatrica Travel. All rights reserved.</p>
            <p>📧 info@yatrica.co.in | 📞 +91 (981) 845-6811</p>
          </div>
        </body>
        </html>
      `,
    };

    // Email to your business (admin notification)
    const adminMailOptions = {
      from: `"Yatrica Contact Form" <${process.env.EMAIL_USER || process.env.VITE_EMAIL_USER}>`,
      to: process.env.EMAIL_USER || process.env.VITE_EMAIL_USER, // Your business email
      subject: `New Contact Form Submission from ${name}`,
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
            }
            .header {
              background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .info-row {
              display: flex;
              padding: 12px;
              background: white;
              margin: 8px 0;
              border-radius: 5px;
              border-left: 4px solid #42a5f5;
            }
            .label {
              font-weight: bold;
              color: #42a5f5;
              min-width: 120px;
            }
            .value {
              color: #333;
            }
            .message-section {
              background: white;
              padding: 20px;
              margin: 20px 0;
              border-radius: 5px;
              border-left: 4px solid #28a745;
            }
            .footer {
              background: #333;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 0 0 10px 10px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔔 New Contact Form Submission</h1>
            <p style="margin: 0; font-size: 14px;">Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
          <div class="content">
            <h2>Contact Details:</h2>
            
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">${name}</span>
            </div>
            
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${email}">${email}</a></span>
            </div>
            
            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value"><a href="tel:${phone}">${phone}</a></span>
            </div>
            
            <div class="message-section">
              <h3>Message:</h3>
              <p>${message}</p>
            </div>
            
            <p><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
          </div>
          <div class="footer">
            <p>This is an automated notification from Yatrica Travel Contact Form</p>
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
      message: 'Emails sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}
