import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    num:  '01',
    icon: '✦',
    name: 'Brand Identity',
    desc: 'Comprehensive brand identity systems that tell your story. Logo design, color palettes, typography, and brand guidelines that make a lasting impression.',
    tags: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Stationery'],
  },
  {
    num:  '02',
    icon: '◈',
    name: 'NFC Smart Cards',
    desc: 'Premium NFC-enabled business cards that turn a handshake into a digital experience. Tap to share contacts, portfolio, social media, and more instantly.',
    tags: ['NFC Technology', 'Metal Cards', 'Digital Profile', 'Smart Cards'],
  },
  {
    num:  '03',
    icon: '◇',
    name: 'Web Design',
    desc: 'Stunning, conversion-focused websites with modern animations and pixel-perfect interfaces. From landing pages to full web applications.',
    tags: ['UI/UX Design', 'Responsive', 'Figma', 'Prototyping'],
  },
  {
    num:  '04',
    icon: '○',
    name: 'Print & Packaging',
    desc: 'Premium print design that commands attention. Brochures, flyers, packaging, signage, and marketing collateral with world-class production quality.',
    tags: ['Brochures', 'Packaging', 'Signage', 'Marketing Materials'],
  },
  {
    num:  '05',
    icon: '△',
    name: 'Social Media',
    desc: 'Scroll-stopping social media content designed to grow your audience. Reels templates, story sets, post designs, and comprehensive content strategies.',
    tags: ['Instagram', 'Content Strategy', 'Reels', 'Brand Consistency'],
  },
  {
    num:  '06',
    icon: '⬡',
    name: 'Motion & Video',
    desc: 'Dynamic motion graphics and video editing that bring your brand to life. Animated logos, promotional videos, and social media motion content.',
    tags: ['Motion Graphics', 'Video Editing', 'Animation', 'After Effects'],
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

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null!);
  const inView = useInView(sectionRef);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);

    // 3D tilt
    const tiltX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -8;
    const tiltY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, rotateX: 12, scale: 0.95, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="services-header"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className="section-label">What I Do</span>
          <h2 className="section-title">
            Services That <em>Elevate</em><br />Your Brand
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {services.map((s) => (
            <motion.div
              key={s.num}
              className="service-card"
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="service-number">{s.num}</div>
              <span className="service-icon">{s.icon}</span>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map((t) => (
                  <span key={t} className="service-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
