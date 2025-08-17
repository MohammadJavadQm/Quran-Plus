import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import VerseOfTheDay from 'components/VerseOfTheDay';

const HeroSection = ({ onStartConversation }) => {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transform Your <span className={styles.highlight}>Spiritual Journey</span>
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experience the Quran like never before with intelligent AI guidance,
          personalized insights, and meaningful conversations that illuminate your path.
        </motion.p>
        <motion.div 
          className={styles.buttonGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className={`${styles.button} ${styles.primary}`} onClick={onStartConversation}>
            Start AI Conversation
          </button>
          <button className={`${styles.button} ${styles.secondary}`}>
            Explore Dashboard
          </button>
        </motion.div>
      </div>
      <motion.div 
        className={styles.verseContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <VerseOfTheDay />
      </motion.div>
    </section>
  );
};

export default HeroSection;
