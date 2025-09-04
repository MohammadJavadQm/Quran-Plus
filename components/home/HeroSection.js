// QuranCompanion.js
import React, { useEffect } from 'react';
import styles from './Herosection.module.css';

const QuranCompanion = () => {
  useEffect(() => {
    // Check if dark mode is preferred
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      const buttons = document.querySelectorAll(`.${styles.btn}`);
      const title = document.querySelector(`.${styles.gold}`);
      const quoteCard = document.querySelector(`.${styles.quoteCard}`);

      // Mouse move effect for buttons
      buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          button.style.setProperty('--x', `${x}px`);
          button.style.setProperty('--y', `${y}px`);
        });
      });

      // Glow effect for title
      if (title) {
        setInterval(() => {
          title.style.animation = 'titleGlow 2s ease-in-out';
          setTimeout(() => {
            title.style.animation = '';
          }, 2000);
        }, 5000);
      }

      // Parallax effect for quote card
      if (quoteCard) {
        window.addEventListener('mousemove', (e) => {
          const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
          const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
          quoteCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
      }
    }
  }, []);

  return (
    <>
      <div className={styles.decoration + ' ' + styles.circle}></div>
      <div className={styles.decoration + ' ' + styles.triangle}></div>

      <div className={styles.container}>
        <h1 className={styles.title}>Your AI Quran Companion, <span className={styles.gold}>Guiding Life's Moments</span></h1>

        <p className={styles.subtitle}>
          Experience the wisdom of the Quran through intelligent insights tailored to
          your spiritual journey and emotional needs
        </p>

        <div className={styles.actions} role="group" aria-label="Primary actions">
          <button className={`${styles.btn} ${styles.btnStart}`} aria-label="Start Free">Start Free</button>

          <button className={`${styles.btn} ${styles.btnDemo}`} aria-label="Live Demo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" fill="transparent"></circle>
              <path d="M10 8l6 4-6 4V8z" fill="currentColor"></path>
            </svg>
            Live Demo
          </button>
        </div>

        <div className={styles.quoteCard} role="note" aria-label="Quran verse">
          <div className={styles.arabicWrap}>
            <div className={styles.arabic}>وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ</div>
          </div>

          <p className={styles.trans}>
            "And We send down of the Quran that which is healing and mercy for the believers"
          </p>
          <div className={styles.source}>— Al-Isra 17:82</div>
        </div>
      </div>
    </>
  );
};

export default QuranCompanion;