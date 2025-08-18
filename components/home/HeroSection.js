import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

// Verse Display Component with Parallax Effect
const VerseDisplay = () => {
    const [verse, setVerse] = useState(null);
    const [status, setStatus] = useState('loading'); // loading, success, error
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchVerse = () => {
            setTimeout(() => {
                setVerse({
                    ayaText: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ",
                    translation: "And We send down of the Quran that which is healing and mercy for the believers",
                    suraName: "Al-Isra", // Matching the source HTML
                    ayaNumber: "17:82"
                });
                setStatus('success');
            }, 1000);
        };
        fetchVerse();
    }, []);

    // Parallax effect for the verse card
    useEffect(() => {
        const card = cardRef.current;
        if (status !== 'success' || !card) return;

        // Use CSS variables to combine JS-driven transform with CSS hover transform
        const handleMouseMove = (e) => {
            const { clientX, clientY, currentTarget } = e;
            const { innerWidth, innerHeight } = window;
            const xAxis = (innerWidth / 2 - clientX) / 25;
            const yAxis = (innerHeight / 2 - clientY) / 25;
            card.style.setProperty('--rotateX', `${yAxis}deg`);
            card.style.setProperty('--rotateY', `${xAxis}deg`);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (card) {
                // Reset properties on cleanup
                card.style.removeProperty('--rotateX');
                card.style.removeProperty('--rotateY');
            }
        };
    }, [status]);


    if (status === 'loading') {
        return (
            <div className={styles.quoteCard}>
                <div className={styles.statusBox}>
                    <div className={styles.spinner}></div>
                    <p>Loading verse...</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className={styles.quoteCard}>
                <div className={styles.statusBox}>
                    <span className={styles.errorIcon}>⚠️</span>
                    <p>Could not fetch the verse.</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            ref={cardRef}
            className={styles.quoteCard}
            role="note"
            aria-label="Quran verse"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
        >
            <div className={styles.arabicWrap}>
                <div className={styles.arabic}>{verse.ayaText}</div>
            </div>
            <p className={styles.trans}>"{verse.translation}"</p>
            <div className={styles.source}>— {verse.suraName} {verse.ayaNumber}</div>
        </motion.div>
    );
};

// Main Hero Section Component
const HeroSection = () => {
    const goldSpanRef = useRef(null);

    // Title glow effect
    useEffect(() => {
        const goldSpan = goldSpanRef.current;
        if (!goldSpan) return;

        const intervalId = setInterval(() => {
            // Directly manipulate the animation property to trigger it periodically
            goldSpan.style.animation = `${styles.titleGlow} 2s ease-in-out`;
            setTimeout(() => {
                if (goldSpanRef.current) {
                    goldSpanRef.current.style.animation = '';
                }
            }, 2000);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.heroWrapper}>
            <div className={`${styles.decoration} ${styles.circle}`}></div>
            <div className={`${styles.decoration} ${styles.triangle}`}></div>

            <div className={styles.container}>
                <motion.h1
                    className={styles.h1}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Your AI Quran Companion, <span ref={goldSpanRef} className={styles.gold}>Guiding Life's Moments</span>
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
                    role="group"
                    aria-label="Primary actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <button className={`${styles.btn} ${styles.btnStart}`} aria-label="Start Free">Start Free</button>
                    <button className={`${styles.btn} ${styles.btnDemo}`} aria-label="Live Demo">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" fill="transparent"></circle>
                            <path d="M10 8l6 4-6 4V8z" fill="currentColor"></path>
                        </svg>
                        Live Demo
                    </button>
                </motion.div>

                <VerseDisplay />
            </div>
        </div>
    );
};

export default HeroSection;