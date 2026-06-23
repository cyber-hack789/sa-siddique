# Sinan Ahmed Siddique — Premium MERN Portfolio

A cinematic, award-quality portfolio built with the MERN stack.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+  
- MongoDB running locally **or** a MongoDB Atlas URI

### 1. Install Dependencies

```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 2. Configure Environment

Edit `server/.env` with your values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sinan-portfolio
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sasprints17@gmail.com
SMTP_PASS=your_gmail_app_password   # Google Account → Security → App Passwords
SMTP_TO=sasprints17@gmail.com
```

### 3. Run in Development

```bash
# Terminal 1 — Backend (port 5000)
cd server && npm run dev

# Terminal 2 — Frontend (port 5173)
cd client && npm run dev
```

Open **http://localhost:5173**

---

## 📁 Project Structure

```
sas/
├── server/
│   ├── index.js          # Express API (contact route + health check)
│   ├── models/Contact.js # Mongoose schema
│   ├── .env              # Environment variables (not committed)
│   └── package.json
└── client/
    ├── public/images/    # Portfolio project images
    ├── src/
    │   ├── components/
    │   │   ├── CustomCursor.tsx   # Lerp cursor with blend mode
    │   │   ├── Loader.tsx         # Cinematic percentage counter
    │   │   ├── Navbar.tsx         # Glass sticky nav + mobile menu
    │   │   ├── Hero.tsx           # Full-viewport animated hero
    │   │   ├── About.tsx          # Split layout + stat counters
    │   │   ├── Services.tsx       # 3D tilt service cards
    │   │   ├── Portfolio.tsx      # Masonry grid with filter
    │   │   ├── Testimonials.tsx   # Infinite marquee
    │   │   ├── Contact.tsx        # Form → API → MongoDB + Email
    │   │   └── Footer.tsx         # Links + social + back-to-top
    │   ├── App.tsx                # Root with Lenis smooth scroll
    │   ├── main.tsx               # React entry point
    │   └── index.css              # Full design system
    ├── vite.config.ts
    └── package.json
```

## ✨ Features

| Feature | Details |
|---|---|
| 🎬 Cinematic Loader | Ease-out counter 0→100% with clip-path fill |
| ✍️ Typing Animation | Cycling role titles with cursor blink |
| 🖱️ Custom Cursor | Lerp-smoothed ring, mix-blend-mode: difference |
| 🌊 Smooth Scroll | Lenis with ease-out quart easing |
| 🃏 3D Tilt Cards | Mouse-tracking perspective transforms |
| 🖼️ Portfolio Filter | Animated category filter with Framer Motion |
| 💬 Marquee | Infinite scrolling testimonials, hover to pause |
| 📧 Contact Form | POST → MongoDB + Nodemailer email |
| 🌈 Floating Orbs | Animated radial gradient blobs |
| ✨ Grain Texture | Animated SVG noise overlay |
| 📱 Responsive | Mobile hamburger, stacked layouts |

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0A0A0A` |
| Gold Accent | `#C8A96E` |
| Font | Inter + Playfair Display |
| Glass | `rgba(255,255,255,0.03)` + blur(20px) |

## 📞 Contact

**Sinan Ahmed Siddique**  
📍 Sharjah, UAE | Bhatkal, Karnataka, India  
📞 +971 54 281 8656 | +91 97425 09495  
📧 sasprints17@gmail.com
