import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import styles from './BrandLogo.module.css';

const BrandLogo = () => {
    return (
        <div className={styles.logoContainer}>
            <div className="relative">
                <div className={styles.logoBook}>
                    <FaBookOpen className="text-white text-xl" />
                </div>
                <div className={styles.logoWave}>
                    <svg viewBox="0 0 20 20" className="w-full h-full">
                        <path d="M2 10 Q6 6, 10 10 T18 10" stroke="#D4AF37" strokeWidth="2" fill="none" />
                        <path d="M2 12 Q6 8, 10 12 T18 12" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.7" />
                    </svg>
                </div>
            </div>
            <div>
                <h1 className={styles.logoTitle}>QuranPlus</h1>
                <p className={styles.logoSubtitle}>مُصْحَفِي الْذَّكِيُّ</p>
            </div>
        </div>
    );
};

export default BrandLogo;