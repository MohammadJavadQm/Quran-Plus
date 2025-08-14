import { useEffect, useState, useCallback } from 'react';
import styles from './VerseOfTheDay.module.css';

const useFetchVerse = () => {
  const [verse, setVerse] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchVerse = async () => {
      setStatus('loading');
      try {
        const res = await fetch('/api/daily-verse');
        if (!res.ok) {
          throw new Error('Failed to fetch daily verse');
        }
        const data = await res.json();
        setVerse(data);
        setStatus('success');
      } catch (err) {
        console.error('API call failed:', err);
        setStatus('error');
      }
    };
    fetchVerse();
  }, []);
  return { verse, status };
};

const VerseOfTheDay = () => {
  const { verse, status } = useFetchVerse();

  const handleShare = useCallback(async () => {
    if (!verse) return;
    const shareText = `آیه روز:
${verse.ayaText}
${verse.translation}
(سوره ${verse.suraName}، آیه ${verse.ayaNumber})
📖 قرآن پلاس`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'آیه روز - قرآن پلاس',
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('✅ متن آیه در حافظه کپی شد.');
      }
    } catch (err) {
      console.error('Share operation failed:', err);
      alert('❌ اشتراک‌گذاری انجام نشد.');
    }
  }, [verse]);

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className={styles.statusBox}>
          <div className={styles.spinner}></div>
          <p>در حال بارگذاری آیه...</p>
        </div>
      );
    }
    if (status === 'error') {
      return (
        <div className={styles.statusBox}>
          <span className={styles.errorIcon}>⚠️</span>
          <p>مشکلی پیش آمده. لطفاً دوباره تلاش کنید.</p>
        </div>
      );
    }
    if (status === 'success' && verse) {
      return (
        <>
          <h2 className={styles.title}>آیه روز</h2>
          <div className={styles.verseBox}>
            <p className={styles.ayaText}>{verse.ayaText}</p>
            <p className={styles.translation}>{verse.translation}</p>
            <p className={styles.tafsir}>{verse.tafsir}</p>
            <p className={styles.info}>
              سوره {verse.suraName}، آیه {verse.ayaNumber}
            </p>
          </div>
          <button onClick={handleShare} className={styles.shareButton} aria-label="اشتراک‌گذاری آیه روز">
            اشتراک‌گذاری
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM13.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 13.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM4.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 13.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM4.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            </svg>
          </button>
        </>
      );
    }
    return null;
  };
  return <div className={styles.card}>{renderContent()}</div>;
};

export default VerseOfTheDay;