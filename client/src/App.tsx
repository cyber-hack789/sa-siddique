import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Lenis smooth scroll — initialise after loader completes
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loaded]);

  return (
    <>

      {/* Cinematic loader */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Main site — rendered immediately, transitions from blur to clear when loaded */}
      <div
        style={{
          opacity: loaded ? 1 : 0.85,
          filter: loaded ? 'none' : 'blur(10px)',
          transition: 'filter 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <Navbar />

        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
