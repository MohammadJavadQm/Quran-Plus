import React from 'react';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoBook}>
        <i className="fas fa-book-open text-white text-xl"></i>
      </div>
      <div className={styles.logoWave}>
        <svg viewBox="0 0 20 20" className={styles.waveSvg}>
          <path
            d="M2 10 Q6 6, 10 10 T18 10"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M2 12 Q6 8, 10 12 T18 12"
            stroke="#D4AF37"
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </div>
      <div className={styles.logoText}>
        <h1 className={styles.logoTitle}>QuranPlus</h1>
        <p className={`${styles.arabicText} arabic-text`}>مُصْحَفِي الْذَّكِيُّ</p>
      </div>
    </div>
  );
};

export default Logo;