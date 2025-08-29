import React,{ useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

// کامپوننت نمایش آیه (بدون تغییر در منطق)
const VerseDisplay = () => {
    const [verse, setVerse] = useState(null);
    const [status, setStatus] = useState('loading');
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchVerse = async () => {
            try {
                // شبیه‌سازی تاخیر در دریافت داده
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                setVerse({
                    ayaText: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ",
                    translation: "و از قرآن، آنچه شفا و رحمت است براى مؤمنان، نازل مى‌كنيم",
                    suraName: "اسراء",
                    ayaNumber: "۱۷:۸۲"
                });
                setStatus('success');
            } catch (error) {
                console.error("دریافت آیه با مشکل مواجه شد:", error);
                setStatus('error');
            }
        };
        fetchVerse();
    }, []);

    // افکت سه‌بعدی کارت با حرکت موس
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
        return <div className={styles.quoteCard}><div className={styles.statusBox}><div className={styles.spinner}></div><p>در حال بارگذاری آیه...</p></div></div>;
    }
    if (status === 'error') {
        return <div className={styles.quoteCard}><div className={styles.statusBox}><span className={styles.errorIcon}>⚠️</span><p>دریافت آیه با مشکل مواجه شد.</p></div></div>;
    }

    return (
        <motion.div ref={cardRef} className={styles.quoteCard} role="note" aria-label="آیه قرآن" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <div className={styles.arabicWrap}><div className={styles.arabic}>{verse.ayaText}</div></div>
            <p className={styles.trans}>"{verse.translation}"</p>
            <div className={styles.source}>— سوره {verse.suraName}، آیه {verse.ayaNumber}</div>
        </motion.div>
    );
};


// کامپوننت اصلی بخش Hero
const HeroSection = ({ onStartConversation }) => {
    return (
        <div className={styles.heroWrapper}>
            <div className={`${styles.decoration} ${styles.circle}`}></div>
            <div className={`${styles.decoration} ${styles.triangle}`}></div>

            <div className={styles.container}>
                {/* بخش بالایی محتوا */}
                <div className={styles.contentBlock}>
                    <motion.h1
                        className={styles.h1}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        همراه قرآنی هوشمند شما، <br /> 
                        <span className={styles.gold}>راهنمای لحظات زندگی</span>
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        حکمت قرآن را از طریق بینش‌های هوشمندانه، متناسب با سفر معنوی و نیازهای عاطفی خود تجربه کنید
                    </motion.p>
                    
                    <motion.div
                        className={styles.actions}
                        role="group"
                        aria-label="اقدامات اصلی"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <button className={`${styles.btn} ${styles.btnStart}`} aria-label="شروع رایگان">شروع رایگان</button>
                        <button onClick={onStartConversation} className={`${styles.btn} ${styles.btnDemo}`} aria-label="دموی زنده">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" fill="transparent"></circle>
                                <path d="M10 8l6 4-6 4V8z" fill="currentColor"></path>
                            </svg>
                            دموی زنده
                        </button>
                    </motion.div>
                </div>

                {/* کامپوننت نمایش آیه */}
                <VerseDisplay />
            </div>
        </div>
    );
};

export default HeroSection;
