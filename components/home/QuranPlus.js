// components/QuranPlus/QuranPlus.jsx
// Requires: react, CSS Modules enabled in bundler (create-react-app supports this by default)

import React from 'react';
import styles from './QuranPlus.module.css';
import { StarIcon, BookIcon, CommunityIcon } from 'Components/ui/Icons/QuranPlusicons';

export default function QuranPlus() {
  return (
    <section className={styles.container} aria-labelledby="quranplus-heading">
      <header className={styles.header}>
        <h1 id="quranplus-heading" className={styles.title}>QuranPlus</h1>
        <p className={styles.subtitle}>
          Your AI-powered companion for deeper understanding and spiritual growth through the Holy Quran
        </p>
      </header>

      <div className={styles.features}>
        <article className={styles.feature}>
          <div className={styles.featureIcon} aria-hidden>
            <StarIcon className={styles.icon} />
          </div>
          <h3 className={styles.featureTitle}>AI-Powered Insights</h3>
          <p className={styles.featureText}>
            Deepen your understanding with intelligent explanations of Quranic verses and their contemporary relevance.
          </p>
        </article>

        <article className={styles.feature}>
          <div className={styles.featureIcon} aria-hidden>
            <BookIcon className={styles.icon} />
          </div>
          <h3 className={styles.featureTitle}>Personalized Journey</h3>
          <p className={styles.featureText}>
            Track your progress and receive tailored recommendations based on your reading habits and interests.
          </p>
        </article>

        <article className={styles.feature}>
          <div className={styles.featureIcon} aria-hidden>
            <CommunityIcon className={styles.icon} />
          </div>
          <h3 className={styles.featureTitle}>Community Learning</h3>
          <p className={styles.featureText}>
            Join study groups and discussions with fellow believers to enhance your spiritual journey together.
          </p>
        </article>
      </div>
    </section>
  );
}
