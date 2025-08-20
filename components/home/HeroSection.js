import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

// VerseDisplay Component (Unchanged)
const VerseDisplay = () => {
    const [verse, setVerse] = useState(null);
    const [status, setStatus] = useState('loading');
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchVerse = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setVerse({
                    ayaText: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ",
                    translation: "And We send down of the Quran that which is healing and mercy for the believers",
                    suraName: "Al-Isra",
                    ayaNumber: "17:82"
                });
                setStatus('success');
            } catch (error) {
                console.error("Failed to fetch verse:", error);
                setStatus('error');
            }
        };
        fetchVerse();
    }, []);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;
            const rotateX = (y / height) * -20;
            const rotateY = (x / width) * 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (card) {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [status]);

    if (status === 'loading') {
        return <div className={styles.quoteCard}><div className={styles.statusBox}><div className={styles.spinner}></div><p>Loading verse...</p></div></div>;
    }
    if (status === 'error') {
        return <div className={styles.quoteCard}><div className={styles.statusBox}><span className={styles.errorIcon}>⚠️</span><p>Could not fetch the verse.</p></div></div>;
    }

    return (
        <motion.div ref={cardRef} className={styles.quoteCard} role="note" aria-label="Quran verse" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <div className={styles.arabicWrap}><div className={styles.arabic}>{verse.ayaText}</div></div>
            <p className={styles.trans}>"{verse.translation}"</p>
            <div className={styles.source}>— {verse.suraName} {verse.ayaNumber}</div>
        </motion.div>
    );
};


// Main Hero Section Component
const HeroSection = () => {
    return (
        <div className={styles.heroWrapper}>
            <div className={`${styles.decoration} ${styles.circle}`}></div>
            <div className={`${styles.decoration} ${styles.triangle}`}></div>

            <div className={styles.container}>
                {/* Wrapper for the top content */}
                <div className={styles.contentBlock}>
                    <motion.h1
                        className={styles.h1}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* The <br /> tag was added here to create the line break */}
                        Your AI Quran Companion, <br /> 
                        <span className={styles.gold}>Guiding Life's Moments</span>
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
                </div>

                {/* The VerseDisplay component is now completely independent */}
                <VerseDisplay />
            </div>
        </div>
    );
};

export default HeroSection;
