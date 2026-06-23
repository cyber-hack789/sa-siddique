import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    text: "Sinan transformed our brand completely. The NFC cards are a conversation starter at every event — clients are genuinely impressed. Exceptional quality and creative vision.",
    name: "Ahmed Al Rashidi",
    role: "CEO, Rashidi Ventures — Dubai",
    initial: "A",
  },
  {
    text: "Working with Sinan was an absolute pleasure. He delivered a premium brand identity package that perfectly captured our luxury positioning. Far exceeded expectations.",
    name: "Priya Sharma",
    role: "Founder, Lumière Interiors — Bangalore",
    initial: "P",
  },
  {
    text: "The NFC business card Sinan designed for me is incredible. Everyone I meet comments on it. My digital profile engagement went up 300% after switching. Worth every dirham.",
    name: "Mohammed Al Farsi",
    role: "Marketing Director, Gulf Trade Co.",
    initial: "M",
  },
  {
    text: "Our social media metrics doubled within 60 days of Sinan redesigning our content strategy and templates. His creative direction is sharp, modern, and results-driven.",
    name: "Sara Mendonca",
    role: "Brand Manager, Coastal Foods",
    initial: "S",
  },
  {
    text: "Sinan's print designs for our product launch were stunning — the packaging won us an industry design award. His attention to detail is unmatched in the region.",
    name: "Khalid Hussain",
    role: "Product Director, Al Noor Trading",
    initial: "K",
  },
  {
    text: "I've worked with many designers across UAE and India. Sinan stands out for his professionalism, creativity, and commitment to delivering premium work on time.",
    name: "Fatima Al Zaabi",
    role: "Entrepreneur, Zaabi Group",
    initial: "F",
  },
];

// Double the array for seamless marquee
const doubled = [...testimonials, ...testimonials];

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null!);
  const inView = useInView(sectionRef);

  return (
    <section className="testimonials" id="testimonials" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Client Love</span>
          <h2 className="section-title">
            What People <em>Say</em>
          </h2>
        </motion.div>
      </div>

      {/* Marquee — full bleed outside container */}
      <motion.div
        style={{ overflow: 'hidden', paddingBottom: 16 }}
        initial={{ opacity: 0, y: 60, rotateX: 10, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Fade edges */}
        <div style={{
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
            background: 'linear-gradient(90deg, var(--color-bg), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
            background: 'linear-gradient(-90deg, var(--color-bg), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <div className="marquee-track">
            {doubled.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
