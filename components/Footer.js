// components/Footer/Footer.js
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Footer.module.css';

// آیکون‌ها را مستقیماً از کتابخانه react-icons وارد می‌کنیم
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
          
          <FooterSection index={1}>
            <div className={styles.logoContainer}>
              {/* نام کامپوننت آیکون تغییر کرده است */}
              <div className={styles.logoIcon}><FiBook className={styles.icon} /></div>
              <div className={styles.logoText}>
                <h3>QuranPlus</h3>
                <p>مُصْحَفِي الْذَّكِيُّ</p>
              </div>
            </div>
            <p className={styles.description}>Your AI-powered companion for deeper understanding and spiritual growth.</p>
            <div className={styles.verseBox}>
              <p className={styles.arabic}>﴿وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ﴾</p>
              <p className={styles.translation}>"And say: Work, so Allah will see your work"</p>
            </div>
          </FooterSection>

          <FooterSection index={2}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </FooterSection>

          <FooterSection index={3}>
            <h4 className={styles.sectionTitle}>Community</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Study Groups</a></li>
              <li><a href="#">Q&A Forum</a></li>
              <li><a href="#">Islamic Resources</a></li>
            </ul>
          </FooterSection>

          <FooterSection index={4}>
            <h4 className={styles.sectionTitle}>Stay Connected</h4>
            <div className={styles.newsletter}>
              <p>Get daily verses and spiritual insights delivered to your inbox.</p>
              <input type="email" className={styles.inputField} placeholder="Enter your email" />
              <button className={styles.btnSubscribe}>
                 {/* نام کامپوننت آیکون تغییر کرده است */}
                <FiMail className={styles.icon} /> Subscribe
              </button>
            </div>
            <div className={styles.socialSection}>
              <p>Follow Us</p>
              <div className={styles.socialIcons}>
                {/* نام کامپوننت‌های آیکون‌ها تغییر کرده است */}
                <a href="#" className={styles.socialIcon}><FaFacebookF className={styles.icon} /></a>
                <a href="#" className={styles.socialIcon}><FaTwitter className={styles.icon} /></a>
                <a href="#" className={styles.socialIcon}><FaInstagram className={styles.icon} /></a>
                <a href="#" className={styles.socialIcon}><FaYoutube className={styles.icon} /></a>
              </div>
            </div>
          </FooterSection>
        </div>

        <FooterSection index={5}>
            <div className={styles.bottomSection}>
                <div className={styles.bottomContent}>
                    <div className={styles.copyright}>
                        <p>© 2025 QuranPlus. All rights reserved.</p>
                    </div>
                    <div className={styles.legalLinks}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </FooterSection>
      </div>
    </footer>
  );
};

export default Footer;