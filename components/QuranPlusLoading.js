import React, { useEffect, useRef } from 'react';
import styles from './QuranPlusLoading.module.css';
import BrandLogo from 'components/ui/BrandLogo';

const QuranPlusLoading = () => {
    const progressRingRef = useRef(null);
    const outerGlowRef = useRef(null);
    const englishPhraseRef = useRef(null);
    const arabicPhraseRef = useRef(null);
    const brandingRef = useRef(null);
    const particlesContainerRef = useRef(null);

    useEffect(() => {
        // ... (تمام منطق جاوااسکریپت شما بدون تغییر باقی می‌ماند)
        const loadingPhrases = [
            { english: "Illuminating your path with wisdom...", arabic: "ننير طريقك بالحكمة..." },
            { english: "Connecting you to divine guidance...", arabic: "نصلك بالهداية الإلهية..." },
            { english: "Preparing your spiritual journey...", arabic: "نحضر رحلتك الروحية..." },
            { english: "Opening the gates of knowledge...", arabic: "نفتح أبواب المعرفة..." }
        ];
        const duration = 4000;
        const circumference = 2 * Math.PI * 90;
        const { current: progressRing } = progressRingRef;
        const { current: outerGlow } = outerGlowRef;
        const { current: englishPhrase } = englishPhraseRef;
        const { current: arabicPhrase } = arabicPhraseRef;
        const { current: branding } = brandingRef;
        const { current: particlesContainer } = particlesContainerRef;
        if (particlesContainer.children.length === 0) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = styles.floatingParticle;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 6}s`;
                particle.style.animationDuration = `${6 + Math.random() * 4}s`;
                particlesContainer.appendChild(particle);
            }
        }
        let progress = 0;
        let currentPhraseIndex = 0;
        const progressInterval = setInterval(() => {
            progress += (100 / (duration / 50));
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            const strokeDashoffset = circumference - (progress / 100) * circumference;
            progressRing.style.strokeDashoffset = strokeDashoffset;
            outerGlow.style.background = `conic-gradient(from 0deg, #D4AF37 0%, #F0D080 ${progress * 0.25}%, #FFD700 ${progress * 0.5}%, #DAA520 ${progress * 0.75}%, #B8860B ${progress}%, rgba(212, 175, 55, 0.1) ${progress}%, transparent 100%)`;
        }, 50);
        const phraseInterval = setInterval(() => {
            currentPhraseIndex = (currentPhraseIndex + 1) % loadingPhrases.length;
            englishPhrase.textContent = loadingPhrases[currentPhraseIndex].english;
            arabicPhrase.textContent = loadingPhrases[currentPhraseIndex].arabic;
            englishPhrase.style.opacity = 0;
            arabicPhrase.style.opacity = 0;
            setTimeout(() => {
                englishPhrase.style.opacity = 1;
                arabicPhrase.style.opacity = 1;
            }, 100);
        }, 3000);
        const brandingTimeout = setTimeout(() => {
            branding.style.opacity = 1;
        }, 1000);
        const resetTimeout = setTimeout(() => {
            clearInterval(progressInterval);
            progress = 0;
            progressRing.style.strokeDashoffset = circumference;
        }, duration + 500);
        return () => {
            clearInterval(progressInterval);
            clearInterval(phraseInterval);
            clearTimeout(brandingTimeout);
            clearTimeout(resetTimeout);
        };
    }, []);

    return (
        <div className={styles.body}>
            <div className={styles.loadingContainer}>
                <div ref={particlesContainerRef} className={styles.particlesContainer}></div>
                
                <div className={styles.progressContainer}>
                    <div className={styles.progressWrapper}>
                        <div ref={outerGlowRef} className={styles.outerGlow}></div>
                        <div style={{ position: 'relative', width: '192px', height: '192px' }}>
                            <svg className={styles.progressSvg} viewBox="0 0 192 192">
                                <circle className={styles.backgroundRing} cx="96" cy="96" r="90"></circle>
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FFD700" />
                                        <stop offset="100%" stopColor="#B8860B" />
                                    </linearGradient>
                                    <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                                </defs>
                                <circle ref={progressRingRef} className={styles.progressRing} cx="96" cy="96" r="90"></circle>
                            </svg>
                            <div className={styles.islamicPatterns}>
                                <div className={styles.islamicPattern1}><svg viewBox="0 0 32 32"><path d="M16 8 L24 16 L16 24 L8 16 Z" fill="none" stroke="rgba(212, 175, 55, 0.6)" strokeWidth="1.5"/></svg></div>
                                <div className={styles.islamicPattern2}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="rgba(212, 175, 55, 0.7)" strokeWidth="1"/></svg></div>
                                <div className={styles.islamicPattern3}><svg viewBox="0 0 16 16"><rect x="4" y="4" width="8" height="8" fill="none" stroke="rgba(212, 175, 55, 0.8)" strokeWidth="1" transform="rotate(45 8 8)"/></svg></div>
                            </div>
                            <div className={styles.divineOrb}>
                                <div className={styles.orbInner}></div>
                                <div className={styles.orbHighlight}></div>
                                <div className={styles.orbPulse}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={brandingRef} className={styles.textContent}>
                    {/* --- تغییر اصلی چیدمان اینجاست --- */}
                    {/* حالا متن‌های متحرک اول می‌آیند */}
                    <div className={styles.phraseContainer}>
                        <p ref={englishPhraseRef} className={styles.englishText}>Illuminating your path with wisdom...</p>
                        <p ref={arabicPhraseRef} className={styles.arabicText}>ننير طريقك بالحكمة...</p>
                    </div>

                    {/* و بعد لوگو و عنوان */}
                    <div className={styles.branding}>
                        <BrandLogo />
                        <p className={styles.brandingSubtitle}>Your AI-Powered Spiritual Companion</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuranPlusLoading;