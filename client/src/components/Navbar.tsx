import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MonogramLogo from './MonogramLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: 'fixed', left: '50%', zIndex: 100 }}
      >
        <div className="navbar-inner" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo on Left */}
          <a
            href="#"
            className="navbar-logo"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ display: 'inline-flex', alignItems: 'center', zIndex: 101 }}
          >
            <img src="/images/logo.png" alt="SAS Logo" style={{ height: '48px', width: '48px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-gold)' }} />
          </a>

          {/* Centered Brand Name */}
          <a
            href="#"
            className="navbar-brand-center"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--color-text)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 101,
              whiteSpace: 'nowrap',
            }}
          >
            SA SIDDIQUE
          </a>

          {/* Hamburger Menu on Right */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ display: 'flex', zIndex: 101 }}
          >
            <span style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }}></span>
            <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
            <span style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}></span>
          </button>
        </div>
      </motion.nav>

      {/* Overlay Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-bg)',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s var(--ease-smooth)',
      }}>
        {['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={(e) => {
              e.preventDefault();
              if (item === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMenuOpen(false);
              } else {
                scrollTo(item);
              }
            }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              color: 'var(--color-text)',
              textDecoration: 'none',
              textTransform: 'capitalize',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}

