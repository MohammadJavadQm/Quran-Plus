// components/Footer/Footer.js
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link'; // استفاده از کامپوننت Link برای ناوبری
import styles from './Footer.module.css';

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiBook, FiMail } from 'react-icons/fi';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: 'easeOut'
    },
  }),
};

const FooterSection = ({ children, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      {children}
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.arabesqueDivider}></div>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <FooterSection index={4}>
            <h4 className={styles.sectionTitle}>در ارتباط باشید</h4>
            <div className={styles.newsletter}>
              <p>آیات روزانه و مطالب معنوی را در ایمیل خود دریافت کنید.</p>
              <input type="email" className={styles.inputField} placeholder="ایمیل خود را وارد کنید" />
              <button className={styles.btnSubscribe}>
                <FiMail className={`${styles.icon} ml-2`} /> عضویت
              </button>
            </div>
            <div className={styles.socialSection}>
              <p>ما را دنبال کنید</p>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon} aria-label="Facebook"><FaFacebookF className={styles.icon} /></a>
                <a href="#" className={styles.socialIcon} aria-label="Twitter"><FaTwitter className={styles.icon} /></a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram"><FaInstagram className={styles.icon} /></a>
                <a href="#" className={styles.socialIcon} aria-label="YouTube"><FaYoutube className={styles.icon} /></a>
              </div>
            </div>
          </FooterSection>

          <FooterSection index={3}>
            <h4 className={styles.sectionTitle}>جامعه</h4>
            <ul className={styles.linksList}>
              <li><Link href="/groups">گروه‌های مطالعه</Link></li>
              <li><Link href="/forum">انجمن پرسش و پاسخ</Link></li>
              <li><Link href="/resources">منابع اسلامی</Link></li>
            </ul>
          </FooterSection>

          <FooterSection index={2}>
            <h4 className={styles.sectionTitle}>لینک‌های سریع</h4>
            <ul className={styles.linksList}>
              <li><Link href="/about">درباره ما</Link></li>
              <li><Link href="/features">ویژگی‌ها</Link></li>
              <li><Link href="/testimonials">نظرات کاربران</Link></li>
              <li><Link href="/support">پشتیبانی</Link></li>
            </ul>
          </FooterSection>

          <FooterSection index={1}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}><FiBook className={styles.icon} /></div>
              <div className={styles.logoText}>
                <h3>QuranPlus</h3>
                <p>مُصْحَفِي الْذَّكِيُّ</p>
              </div>
            </div>
            <p className={styles.description}>همراه هوش مصنوعی شما برای درک عمیق‌تر و رشد معنوی.</p>
            <div className={styles.verseBox}>
              <p className={styles.arabic}>﴿وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ﴾</p>
              <p className={styles.translation}>«و بگو: عمل کنید! پس خداوند عمل شما را خواهد دید.»</p>
            </div>
          </FooterSection>

        </div>

        <FooterSection index={5}>
            <div className={styles.bottomSection}>
                <div className={styles.bottomContent}>
                    <div className={styles.legalLinks}>
                        <Link href="/privacy">سیاست حفظ حریم خصوصی</Link>
                        <Link href="/terms">شرایط خدمات</Link>
                    </div>
                    <div className={styles.copyright}>
                        <p>&copy; {new Date().getFullYear()} QuranPlus. تمامی حقوق محفوظ است.</p>
                    </div>
                </div>
            </div>
        </FooterSection>
      </div>
    </footer>
  );
};

export default Footer;
