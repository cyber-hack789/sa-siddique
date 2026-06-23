import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Toast {
  type: 'success' | 'error';
  message: string;
  visible: boolean;
}

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null!);
  const inView = useInView(sectionRef);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast>({ type: 'success', message: '', visible: false });
  const [form, setForm] = useState<FormData>({
    name: '', email: '', subject: '', message: '',
  });

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      showToast('error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      showToast('success', "\u2713 Message sent! I'll get back to you soon.");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      const msg = err?.response?.data?.error || 'Something went wrong. Please try again.';
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Location',
      value: 'Sharjah, UAE & Bhatkal, Karnataka',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'UAE Phone',
      value: '+971 54 281 8656',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'India Phone',
      value: '+91 97425 09495',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'sasprints17@gmail.com',
    },
  ];

  return (
    <>
      <section className="contact" id="contact" ref={sectionRef}>
        {/* Background orb */}
        <div className="orb orb-gold" style={{
          width: 600, height: 600, bottom: '-20%', left: '-10%',
          position: 'absolute', opacity: 0.4,
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div className="contact-grid">
            {/* Left — Info */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -60, rotateY: -10, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title">
                Let's Build Something <em>Remarkable</em>
              </h2>
              <p className="contact-tagline">
                Have a project in mind? I'd love to hear about it.
                From brand identities to NFC smart cards, let's
                craft something that makes your audience stop and stare.
              </p>

              {/* Contact details */}
              <div className="contact-details">
                {contactInfo.map((c) => (
                  <div className="contact-detail" key={c.label}>
                    <div className="contact-detail-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</div>
                    <div>
                      <div className="contact-detail-label">{c.label}</div>
                      <div className="contact-detail-value">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="contact-social">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    ),
                    label: 'LinkedIn',
                    href: 'https://linkedin.com',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    ),
                    label: 'Instagram',
                    href: 'https://instagram.com',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    ),
                    label: 'Behance',
                    href: 'https://behance.net',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
                      </svg>
                    ),
                    label: 'Dribbble',
                    href: 'https://dribbble.com',
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={s.label}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              className="contact-form"
              initial={{ opacity: 0, x: 60, rotateY: 10, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div>
                    <label className="form-label" htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className="form-input"
                    placeholder="Brand Identity Project / NFC Card Design..."
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell me about your project, timeline, and budget..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Toast notification */}
      <div className={`toast ${toast.type} ${toast.visible ? 'show' : ''}`}>
        {toast.message}
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
