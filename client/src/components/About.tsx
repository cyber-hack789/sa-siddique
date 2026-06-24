import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextType from './TextType';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image reveal scroll animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Title reveal staggered lines animation — scoped automatically to sectionRef by gsap.context
      gsap.fromTo(
        '.char-reveal',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Text block fade-in/slide-up reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-editorial" id="about" ref={sectionRef}>
      <div className="about-editorial-container">
        
        {/* Leaf Shadow SVG Background Overlay */}
        <div className="about-leaf-shadow" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
            <path
              d="M10,80 C30,75 40,60 45,50 C50,40 52,25 50,10 C48,25 45,35 38,45 C30,55 15,65 10,80 Z"
              fill="currentColor"
            />
            <path
              d="M30,65 C45,60 52,50 55,42 C58,34 59,20 57,8 C55,20 52,28 47,36 C40,44 32,52 30,65 Z"
              fill="currentColor"
            />
            <path
              d="M5,90 C22,82 30,70 33,60 C36,50 35,35 32,20 C31,33 28,42 22,50 C15,60 5,75 5,90 Z"
              fill="currentColor"
            />
            <path
              d="M20,50 C32,48 38,40 40,32 C42,24 40,12 37,2 C36,11 34,18 30,24 C25,30 18,40 20,50 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="about-editorial-grid">
          {/* Left Column: Portrait image with rotating stamp badge */}
          <div className="about-editorial-image-col" ref={imageRef}>
            <div className="about-editorial-image-wrapper">
              <img
                src="/images/about_developer.png"
                alt="Sinan Ahmed Siddique"
                className="about-editorial-image"
              />
              
              {/* Overlapping Stamp Badge */}
              <div className="about-editorial-badge">
                <svg viewBox="0 0 100 100">
                  <path
                    id="badgeCirclePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text>
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      SA SIDDIQUE • SHARJAH UAE • ESTD 2021 • DESIGN & IT •
                    </textPath>
                  </text>
                </svg>
                <div className="badge-center-icon">✦</div>
              </div>
            </div>
          </div>

          {/* Large display titles */}
          <div className="about-editorial-title-wrapper" ref={titleRef}>
            <h2 className="about-editorial-title">
              <span className="char-reveal block-line">Creative,</span>
              <span className="char-reveal block-line italic-line">Refined.</span>
            </h2>
          </div>

          {/* Right Column: Bio copy and outline pill button */}
          <div className="about-editorial-text-col" ref={textRef}>
            <div className="about-editorial-intro-wrapper">
              <div className="vertical-accent-line" />
              <TextType
                text="we craft identities that command attention and refuse to let go."
                as="p"
                className="about-editorial-tagline"
                typingSpeed={40}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
                startOnVisible={true}
                loop={true}
              />
            </div>
            
            <div className="about-editorial-body">
              <p>
                I'm Sinan Ahmed Siddique, the founder of SAS Printing &amp; IT Solutions based in Sharjah, UAE. With over 5 years of experience, I help brands across the Middle East and India craft identities and systems that don't just look stunning — they convert, scale, and resonate.
              </p>
              <p>
                Because identity should own the room, not ask for permission. Combining premium design with technical precision, we turn your brand's presence into something utterly unforgettable.
              </p>
            </div>

            <div className="about-editorial-cta">
              <a
                href="#contact"
                className="btn-editorial-pill"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                MAKE INQUIRY
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
