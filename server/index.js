require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));

// Rate limiting — contact form: 5 requests per 15 min per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Database Connection ─────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sinan-portfolio')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ─── Email Transporter ────────────────────────────────────────────────────────
const createTransporter = () => {
  if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_gmail_app_password_here') {
    console.warn('⚠️  SMTP not configured — emails will be skipped');
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Contact form submission
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save to MongoDB
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send email (optional — skipped if SMTP not configured)
    const transporter = createTransporter();
    if (transporter) {
      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO || process.env.SMTP_USER,
        subject: `[Portfolio] ${subject} — from ${name}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; padding: 40px; border-radius: 12px; border: 1px solid #222;">
            <h2 style="color: #C8A96E; margin-bottom: 24px;">New Portfolio Inquiry</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888;">From</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C8A96E;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Subject</td><td style="padding: 8px 0;">${subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
            <p style="line-height: 1.8; color: #ccc;">${message.replace(/\n/g, '<br/>')}</p>
            <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
            <p style="color: #555; font-size: 12px;">Sent at ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (UAE time)</p>
          </div>
        `,
        replyTo: email,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
    });
  } catch (err) {
    console.error('Contact route error:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join('. ') });
    }
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP: ${process.env.SMTP_USER || 'not configured'}`);
});
