import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('loading');

    const duration = 1400; // ms — faster, smoother loading
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${eased})`;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Brief hold, then fade out
        setTimeout(() => {
          setVisible(false);
          document.body.classList.remove('loading');
          setTimeout(onComplete, 700);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="loader-content">
            {/* Elegant Circular Logo Frame with spinning gold border */}
            <motion.div
              className="loader-logo-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="loader-logo-ring" />
              <img
                src="/images/logo.png"
                alt="SAS Logo"
                className="loader-logo-image"
              />
            </motion.div>

            {/* Brand Title */}
            <motion.h2
              className="loader-brand-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              SA <span>Siddique</span>
            </motion.h2>

            {/* Brand Eyebrow Subtitle */}
            <motion.p
              className="loader-brand-subtitle"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Printing &amp; IT Solutions
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              className="loader-bar"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="loader-bar-fill" ref={barRef} style={{ transform: 'scaleX(0)' }} />
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="loader-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Crafting your experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

