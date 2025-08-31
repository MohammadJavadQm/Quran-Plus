import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaHeart, FaSearch } from 'react-icons/fa';
import { FaSparkles } from 'react-icons/fa6';
import styles from './PersonalizationPanel.module.css';

// داده‌های کامپوننت به فارسی
const suggestedTopics = [
    'صبر در زمان سختی‌ها', 'یافتن آرامش با نماز', 'مفهوم تقدیر (قَدَر)',
    'شکرگزاری و قناعت', 'توکل به خدا', 'ماهیت موفقیت واقعی',
    'شفقت و مهربانی', 'طلب بخشش'
];

const moodLabels = [
    { value: 0, emoji: '😔', label: 'پریشان', arabic: 'متعب' },
    { value: 25, emoji: '😐', label: 'خنثی', arabic: 'محايد' },
    { value: 50, emoji: '🙂', label: 'آرام', arabic: 'راضِ' },
    { value: 75, emoji: '😊', label: 'خوشحال', arabic: 'سعيد' },
    { value: 100, emoji: '😄', label: 'شادمان', arabic: 'مبتهج' }
];

const PersonalizationPanel = () => {
    // مدیریت وضعیت با هوک‌های ری‌اکت (بدون تغییر در منطق)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [moodValue, setMoodValue] = useState(50);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // فیلتر کردن پیشنهادات بر اساس جستجو (بدون تغییر در منطق)
    const filteredSuggestions = useMemo(() =>
        searchQuery ? suggestedTopics.filter(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())) : [],
        [searchQuery]
    );

    // پیدا کردن نزدیک‌ترین برچسب حالت روحی به مقدار اسلایدر (بدون تغییر در منطق)
    const currentMood = useMemo(() =>
        moodLabels.reduce((prev, curr) =>
            Math.abs(curr.value - moodValue) < Math.abs(prev.value - moodValue) ? curr : prev
        ), [moodValue]
    );
    
    // تعیین متن بینش بر اساس حالت روحی
    const moodInsightText = useMemo(() => {
        if (moodValue < 30) return "دستیار هوش مصنوعی شما بر آیات آرامش‌بخش و امیدبخش تمرکز خواهد کرد.";
        if (moodValue >= 30 && moodValue < 70) return "دستیار هوش مصنوعی شما راهنمایی متعادلی برای رشد شما ارائه خواهد داد.";
        return "دستیار هوش مصنوعی شما آیات شکرگزاری و شادی را به اشتراک خواهد گذاشت.";
    }, [moodValue]);

    // مدیریت انتخاب موضوع (بدون تغییر در منطق)
    const handleSelectTopic = (topic) => {
        setSearchQuery(topic);
        setSelectedTopic(topic);
        setShowSuggestions(false);
    };

    // افکت برای بستن پیشنهادات با کلیک بیرون از کادر جستجو (بدون تغییر در منطق)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>راهنمایی خود را شخصی‌سازی کنید</h2>
                    <p className={styles.subtitle}>با به اشتراک گذاشتن نیازهای معنوی و وضعیت عاطفی فعلی خود، تجربه خود را شخصی‌سازی کنید</p>
                </div>
                <div className={styles.grid}>
                    {/* کارت کاوش معنوی */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <FaBook />
                            <h3 className={styles.cardTitle}>کاوش معنوی</h3>
                        </div>
                        <div ref={searchRef} style={{ position: 'relative' }}>
                            <div className={styles.searchInputWrapper}>
                                <FaSearch className={styles.searchIcon} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="جستجوی آیه یا موضوع..."
                                    className={styles.searchInput}
                                />
                            </div>
                            {showSuggestions && filteredSuggestions.length > 0 && (
                                <div className={styles.suggestionsDropdown}>
                                    {filteredSuggestions.map(topic => (
                                        <button key={topic} onClick={() => handleSelectTopic(topic)} className={styles.suggestionItem}>
                                            <FaSparkles style={{ color: 'var(--accent-primary)' }} />
                                            <span>{topic}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {selectedTopic && (
                            <div className={styles.selectedTopic}>
                                <p style={{ color: 'var(--text-primary)' }}>{selectedTopic}</p>
                            </div>
                        )}
                    </div>

                    {/* کارت حال‌سنج */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <FaHeart />
                            <h3 className={styles.cardTitle}>حال‌سنج</h3>
                        </div>
                        <div className={styles.moodDisplay}>
                            <div className={styles.moodEmoji}>{currentMood.emoji}</div>
                            <p className={styles.moodLabel}>{currentMood.label}</p>
                            <p className={styles.moodArabic}>{currentMood.arabic}</p>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={moodValue}
                            onChange={(e) => setMoodValue(e.target.value)}
                            className={styles.moodSlider}
                        />
                        <div className={styles.moodInsight}>
                            <p>{moodInsightText}</p>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button className={styles.actionButton}>
                        دریافت راهنمایی شخصی‌سازی شده
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PersonalizationPanel;
