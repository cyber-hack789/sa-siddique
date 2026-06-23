import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ROLES = [
  { line1: 'Brand Identity', line2: 'Designer' },
  { line1: 'NFC Card', line2: 'Specialist' },
  { line1: 'Web UI/UX', line2: 'Developer' },
  { line1: 'Social Media', line2: 'Creator' },
];

const ORB_CONFIGS = [
  { size: 600, top: '-10%', left: '-10%', delay: 0, dur: 8 },
  { size: 400, top: '40%', right: '-5%', delay: 1.5, dur: 10 },
  { size: 300, top: '70%', left: '20%', delay: 0.8, dur: 12 },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [typing, setTyping] = useState(true);


  // Typing animation
  useEffect(() => {
    const role = ROLES[roleIdx];
    const line1 = role.line1;
    const line2 = role.line2;
    const totalLength = line1.length + line2.length;
    let i = typing ? 0 : totalLength;
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      const typeNext = () => {
        if (i <= totalLength) {
          if (i <= line1.length) {
            setDisplayedLine1(line1.slice(0, i));
            setDisplayedLine2('');
          } else {
            setDisplayedLine1(line1);
            setDisplayedLine2(line2.slice(0, i - line1.length));
          }
          i++;
          timeout = setTimeout(typeNext, 55);
        } else {
          timeout = setTimeout(() => setTyping(false), 1800);
        }
      };
      typeNext();
    } else {
      const eraseNext = () => {
        if (i >= 0) {
          if (i <= line1.length) {
            setDisplayedLine1(line1.slice(0, i));
            setDisplayedLine2('');
          } else {
            setDisplayedLine1(line1);
            setDisplayedLine2(line2.slice(0, i - line1.length));
          }
          i--;
          timeout = setTimeout(eraseNext, 28);
        } else {
          setRoleIdx((prev) => (prev + 1) % ROLES.length);
          setTyping(true);
        }
      };
      eraseNext();
    }

    return () => clearTimeout(timeout);
  }, [roleIdx, typing]);



  return (
    <section className="hero" id="hero">
      {/* Background Orbs — Subtle highlights */}
      <div className="hero-bg" style={{ opacity: 0.35 }}>
        {ORB_CONFIGS.map((o, i) => (
          <motion.div
            key={i}
            className="orb orb-gold"
            style={{
              width: o.size,
              height: o.size,
              top: o.top,
              left: 'left' in o ? (o as any).left : undefined,
              right: 'right' in o ? (o as any).right : undefined,
              position: 'absolute',
            }}
            animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
            transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="container">
        {/* Zepmeusel style split layout */}
        <div className="hero-layout">
          {/* Left Column — Brand & Typing Roles */}
          <motion.div
            className="hero-left-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-brand-eyebrow">
              <span className="hero-eyebrow-text">SAS</span>
              <div className="hero-eyebrow-line" />
              <span className="hero-eyebrow-sub">PRINTING &amp; IT SOLUTIONS</span>
            </div>

            <h1 className="hero-main-title font-serif">
              I am a <br />
              <span className="typing-text text-gold" style={{ display: 'inline-block', minHeight: '2.2em', verticalAlign: 'top' }}>
                {displayedLine1}
                {displayedLine2 && <br />}
                {displayedLine2}
              </span>
            </h1>
          </motion.div>

          {/* Right Column — Paragraph & Get in Touch button */}
          <motion.div
            className="hero-right-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="hero-intro-text">
              SAS Printing &amp; IT Solutions brings your vision to life. We deliver premium
              branding, high-performance web development, smart NFC card integrations, and bespoke
              print &amp; packaging designs. We combine creative precision with technical innovation.
            </p>
            <div className="hero-cta-wrapper">
              <a
                href="#contact"
                className="btn btn-outline hero-cta-btn"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
              >
                <span>Get In Touch</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Vertical Scroll Down Indicator (Centered) */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="scroll-arrow"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </motion.div>


      </div>
    </section>
  );
}


