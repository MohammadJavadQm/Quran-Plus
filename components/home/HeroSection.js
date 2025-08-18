// HeroSection.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

// کامپوننت نمایش آیه روز
const VerseDisplay = () => {
    const [verse, setVerse] = useState(null);
    const [status, setStatus] = useState('loading'); // loading, success, error

    useEffect(() => {
        // شبیه‌سازی دریافت آیه از اینترنت
        const fetchVerse = () => {
            setTimeout(() => {
                setVerse({
                    ayaText: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ",
                    translation: "And We send down of the Quran that which is healing and mercy for the believers",
                    suraName: "الإسراء",
                    ayaNumber: 82
                });
                setStatus('success');
            }, 1000); // تاخیر ۱ ثانیه‌ای برای شبیه‌سازی لودینگ
        };
        fetchVerse();
    }, []);

    if (status === 'loading') {
        return (
            <div className={styles.quoteCard}>
                <div className={styles.statusBox}>
                    <div className={styles.spinner}></div>
                    <p>در حال بارگذاری آیه...</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className={styles.quoteCard}>
                <div className={styles.statusBox}>
                    <span className={styles.errorIcon}>⚠️</span>
                    <p>مشکلی در دریافت آیه پیش آمده.</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className={styles.quoteCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
        >
            <div className={styles.arabic}>{verse.ayaText}</div>
            <p className={styles.trans}>"{verse.translation}"</p>
            <div className={styles.source}>— {verse.suraName} {verse.ayaNumber}</div>
        </motion.div>
    );
};

// کامپوننت اصلی صفحه
const HeroSection = () => {
    return (
        <div className={styles.container}>
            <motion.h1
                className={styles.h1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Your AI Quran Companion, <span className={styles.gold}>Guiding Life's Moments</span>
            </motion.h1>

            <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Experience the wisdom of the Quran through intelligent insights tailored to your spiritual journey and emotional needs
            </motion.p>

            <motion.div
                className={styles.actions}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <button className={`${styles.btn} ${styles.btnStart}`}>Start Free</button>
                <button className={`${styles.btn} ${styles.btnDemo}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" fill="transparent" />
                        <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                    </svg>
                    Live Demo
                </button>
            </motion.div>

            <VerseDisplay />
            
        </div>
    );
};

export default HeroSection;