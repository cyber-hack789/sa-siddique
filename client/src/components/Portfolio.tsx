import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from './BlurText';

const FILTERS = ['All', 'Branding', 'NFC Cards', 'Web Design', 'Print', 'Social Media'];

const projects = [
  {
    id: 1,
    title: 'Luxe Brand Identity',
    category: 'Branding',
    image: '/images/branding.png',
    span: 'large',
  },
  {
    id: 2,
    title: 'NFC Pro Card',
    category: 'NFC Cards',
    image: '/images/nfc.png',
    span: 'medium',
  },
  {
    id: 3,
    title: 'Social Campaign',
    category: 'Social Media',
    image: '/images/social.png',
    span: 'small',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    category: 'Web Design',
    image: '/images/web.png',
    span: 'small',
  },
  {
    id: 5,
    title: 'Premium Brochure',
    category: 'Print',
    image: '/images/print.png',
    span: 'small',
  },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const sectionRef = useRef<HTMLElement>(null!);
  const inView = useInView(sectionRef);

  const filtered = projects.filter((p) => active === 'All' || p.category === active);

  // Grid column spans
  const spanClass: Record<string, string> = {
    large:  'port-large',
    medium: 'port-medium',
    small:  'port-small',
  };

  return (
    <section className="portfolio" id="portfolio" ref={sectionRef}>
      <div className="container">
        {/* Header row */}
        <motion.div
          className="portfolio-header"
          initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="section-label">Selected Work</span>
            <BlurText
              text="Projects That *Speak*"
              as="h2"
              className="section-title"
              delay={80}
              animateBy="words"
              direction="bottom"
              stepDuration={0.4}
              threshold={0.15}
            />
          </div>

          {/* Filters */}
          <div className="portfolio-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn ${active === f ? 'active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                className={`portfolio-item ${spanClass[p.span] ?? ''}`}
                layout
                initial={{ opacity: 0, y: 60, rotateX: 10, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                data-cursor
              >
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="portfolio-overlay">
                  <div className="portfolio-overlay-content">
                    <div className="portfolio-cat">{p.category}</div>
                    <div className="portfolio-title">{p.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View all CTA */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '56px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a
            href="#contact"
            className="btn btn-outline"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span>Commission a Project</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
