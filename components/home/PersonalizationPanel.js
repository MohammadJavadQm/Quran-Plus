import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaHeart, FaSearch, FaSparkles } from 'react-icons/fa';
import styles from './PersonalizationPanel.module.css';

// Data for the component
const suggestedTopics = [
    'Patience in difficult times', 'Finding peace through prayer', 'The concept of destiny (Qadar)',
    'Gratitude and contentment', 'Trust in Allah (Tawakkul)', 'The nature of true success',
    'Compassion and mercy', 'Seeking forgiveness'
];

const moodLabels = [
    { value: 0, emoji: '😔', label: 'Struggling', arabic: 'متعب' },
    { value: 25, emoji: '😐', label: 'Neutral', arabic: 'محايد' },
    { value: 50, emoji: '🙂', label: 'Content', arabic: 'راضِ' },
    { value: 75, emoji: '😊', label: 'Happy', arabic: 'سعيد' },
    { value: 100, emoji: '😄', label: 'Joyful', arabic: 'مبتهج' }
];

const PersonalizationPanel = () => {
    // State management with React Hooks
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [moodValue, setMoodValue] = useState(50);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Filter suggestions based on search query
    const filteredSuggestions = useMemo(() =>
        searchQuery ? suggestedTopics.filter(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())) : [],
        [searchQuery]
    );

    // Find the closest mood label for the current slider value
    const currentMood = useMemo(() =>
        moodLabels.reduce((prev, curr) =>
            Math.abs(curr.value - moodValue) < Math.abs(prev.value - moodValue) ? curr : prev
        ), [moodValue]
    );
    
    // Determine the insight text based on mood
    const moodInsightText = useMemo(() => {
        if (moodValue < 30) return "Your AI assistant will focus on verses of comfort and hope.";
        if (moodValue >= 30 && moodValue < 70) return "Your AI assistant will provide balanced guidance for growth.";
        return "Your AI assistant will share verses of gratitude and celebration.";
    }, [moodValue]);

    // Handle topic selection
    const handleSelectTopic = (topic) => {
        setSearchQuery(topic);
        setSelectedTopic(topic);
        setShowSuggestions(false);
    };

    // Effect to handle clicks outside the search box to close suggestions
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
                    <h2 className={styles.title}>What does your assistant know today?</h2>
                    <p className={styles.subtitle}>Personalize your experience by sharing your current spiritual needs and emotional state</p>
                </div>
                <div className={styles.grid}>
                    {/* Spiritual Inquiry Card */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <FaBook />
                            <h3 className={styles.cardTitle}>Spiritual Inquiry</h3>
                        </div>
                        <div ref={searchRef} style={{ position: 'relative' }}>
                            <div className={styles.searchInputWrapper}>
                                <FaSearch className={styles.searchIcon} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Search a verse or topic..."
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

                    {/* Mood Meter Card */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <FaHeart />
                            <h3 className={styles.cardTitle}>Mood Meter</h3>
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
                        Get Personalized Guidance
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PersonalizationPanel;
