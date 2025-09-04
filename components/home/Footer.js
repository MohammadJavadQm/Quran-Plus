import React, { useEffect, useRef, useState } from 'react';
import styles from './Footer.module.css';

/**
 * Footer component converted from the provided HTML/CSS/JS.
 * - Use: <Footer />
 * - Make sure global.css is imported once in your app (e.g. index.js or App.jsx)
 */

export default function Footer() {
  const sectionRefs = useRef([]);
  const bottomRef = useRef(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  // attach refs to array items
  function setSectionRef(el, idx) {
    sectionRefs.current[idx] = el;
  }

  useEffect(() => {
    // Initial sequential reveal (mirrors original delays)
    const initialTimers = [];
    initialTimers.push(setTimeout(() => sectionRefs.current[0]?.classList.add(styles.animateIn), 500));
    initialTimers.push(setTimeout(() => sectionRefs.current[1]?.classList.add(styles.animateIn), 700));
    initialTimers.push(setTimeout(() => sectionRefs.current[2]?.classList.add(styles.animateIn), 900));
    initialTimers.push(setTimeout(() => sectionRefs.current[3]?.classList.add(styles.animateIn), 1100));
    initialTimers.push(setTimeout(() => bottomRef.current?.classList.add(styles.animateIn), 1500));

    // IntersectionObserver to animate when sections enter viewport
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateIn);
          }
        });
      },
      { threshold: 0.05 }
    );

    sectionRefs.current.forEach((el) => { if (el) obs.observe(el); });
    if (bottomRef.current) obs.observe(bottomRef.current);

    // Theme change listener (keeps parity with original)
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const themeHandler = (e) => console.log('Theme changed to:', e.matches ? 'dark' : 'light');
    if (darkMedia.addEventListener) darkMedia.addEventListener('change', themeHandler);
    else if (darkMedia.addListener) darkMedia.addListener(themeHandler);

    return () => {
      initialTimers.forEach(clearTimeout);
      obs.disconnect();
      if (darkMedia.removeEventListener) darkMedia.removeEventListener('change', themeHandler);
      else if (darkMedia.removeListener) darkMedia.removeListener(themeHandler);
    };
  }, []);

  // Email validation on blur (mirrors original behaviour)
  const handleEmailBlur = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ok = email === '' || re.test(email);
    setEmailError(!ok);
  };

  return (
    <footer className={styles.footer} aria-labelledby="quranplus-footer-title">
      <div className={styles.arabesqueDivider} />
      <div className={styles.containerFigma}>
        <div className={styles.grid}>
          {/* Section 1 */}
          <div className={styles.footerSection} ref={(el) => setSectionRef(el, 0)} id="section1">
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon} aria-hidden>
                <svg className={styles.icon} viewBox="0 0 24 24" role="img" aria-hidden>
                  <path d="M2 3H8V5H4V19H8V21H2V3M7 17V15H9V17H7M11 17V15H13V17H11M15 17V15H17V17H15M22 3V21H16V19H20V5H16V3H22Z" />
                </svg>
              </div>
              <div className={styles.logoText}>
                <h3 id="quranplus-footer-title">QuranPlus</h3>
                <p>مُصْحَفِي الْذَّكِيُّ</p>
              </div>
            </div>

            <p className={styles.description}>
              Your AI-powered companion for deeper understanding and spiritual growth through the Holy Quran.
            </p>

            <div className={styles.verseBox} aria-live="polite">
              <p className={styles.arabic} dir="rtl">﴿وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ﴾</p>
              <p className={styles.translation}>"And say: Work, so Allah will see your work" - At-Tawbah 9:105</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className={styles.footerSection} ref={(el) => setSectionRef(el, 1)} id="section2">
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className={styles.footerSection} ref={(el) => setSectionRef(el, 2)} id="section3">
            <h4 className={styles.sectionTitle}>Community</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Prayer Times</a></li>
              <li><a href="#">Islamic Calendar</a></li>
              <li><a href="#">Study Groups</a></li>
              <li><a href="#">Q&A Forum</a></li>
              <li><a href="#">Islamic Resources</a></li>
              <li><a href="#">Downloads</a></li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className={styles.footerSection} ref={(el) => setSectionRef(el, 3)} id="section4">
            <h4 className={styles.sectionTitle}>Stay Connected</h4>
            <div className={styles.newsletter}>
              <p>Get daily verses, spiritual insights, and updates delivered to your inbox.</p>

              <div className={styles.inputGroup}>
                <input
                  id="emailInput"
                  className={styles.inputField}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  aria-invalid={emailError}
                />

                <button
                  className={styles.btnSubscribe}
                  type="button"
                  onClick={() => alert(email ? `Subscribed: ${email}` : 'Please enter email')}
                >
                  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                  </svg>
                  Subscribe
                </button>
              </div>

              <div className={styles.socialSection}>
                <p>Follow Us</p>
                <div className={styles.socialIcons} role="list">
                  {/* Each social icon is a button/div for demo - replace hrefs with links */}
                  <div className={styles.socialIcon} role="listitem" aria-label="Facebook">
                    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
                      <path d="M22 12C0 12 0 12 0 12C0 12 0 12 0 12C0 6.477 5.373 2 12 2C18.627 2 24 6.477 24 12C24 17.523 18.627 22 12 22C5.373 22 0 17.523 0 12Z" />
                      <path d="M16.5 7.5H13.5V9H16.5V12H13.5V17H11V12H8.5V9H11V7.5C11 6.67 11.67 6 12.5 6H16.5V7.5Z" fill="white" />
                    </svg>
                  </div>

                  <div className={styles.socialIcon} role="listitem" aria-label="Twitter">
                    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
                      <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.19 14.39 4.53 14.39 3.9 14.24C4.18 15.08 4.74 15.78 5.48 16.23C6.22 16.68 7.09 16.86 7.95 16.74C6.41 17.99 4.43 18.73 2.32 18.73C1.99 18.73 1.66 18.71 1.33 18.67C3.28 20 5.67 20.73 8.24 20.73C16 20.73 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" />
                    </svg>
                  </div>

                  <div className={styles.socialIcon} role="listitem" aria-label="Instagram">
                    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
                      <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2M7.6 4C5.61 4 4 5.61 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C18.39 20 20 18.39 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6M17.25 5.5C17.94 5.5 18.5 6.06 18.5 6.75C18.5 7.44 17.94 8 17.25 8C16.56 8 16 7.44 16 6.75C16 6.06 16.56 5.5 17.25 5.5M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7M12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"/>
                    </svg>
                  </div>

                  <div className={styles.socialIcon} role="listitem" aria-label="YouTube">
                    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
                      <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className={styles.bottomSection} id="bottomSection" ref={bottomRef}>
          <div className={styles.bottomContent}>
            <div>
              <p className={styles.copyRightText}>© 2024 QuranPlus. All rights reserved. Built with respect for Islamic values and digital ethics.</p>
              <p className={styles.heart}>Made with ❤️ for the Ummah</p>
            </div>

            <div className={styles.legalLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
