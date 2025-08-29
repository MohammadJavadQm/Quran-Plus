import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Footer.module.css';

// وارد کردن کامپوننت لوگوی اصلی
import BrandLogo from 'components/ui/BrandLogo.js'; 

// آیکون‌ها
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';


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
                            <p>آیات روزانه و بینش‌های معنوی را در ایمیل خود دریافت کنید.</p>
                            <input type="email" className={styles.inputField} placeholder="ایمیل خود را وارد کنید" />
                            <button className={styles.btnSubscribe}>
                                <FiMail className={styles.icon} /> عضویت
                            </button>
                        </div>
                        <div className={styles.socialSection}>
                            <p>ما را دنبال کنید</p>
                            <div className={styles.socialIcons}>
                                <a href="#" className={styles.socialIcon}><FaFacebookF className={styles.icon} /></a>
                                <a href="#" className={styles.socialIcon}><FaTwitter className={styles.icon} /></a>
                                <a href="#" className={styles.socialIcon}><FaInstagram className={styles.icon} /></a>
                                <a href="#" className={styles.socialIcon}><FaYoutube className={styles.icon} /></a>
                            </div>
                        </div>
                    </FooterSection>

                    <FooterSection index={3}>
                        <h4 className={styles.sectionTitle}>جامعه</h4>
                        <ul className={styles.linksList}>
                            <li><a href="#">گروه‌های مطالعه</a></li>
                            <li><a href="#">انجمن پرسش و پاسخ</a></li>
                            <li><a href="#">منابع اسلامی</a></li>
                        </ul>
                    </FooterSection>

                    <FooterSection index={2}>
                        <h4 className={styles.sectionTitle}>لینک‌های سریع</h4>
                        <ul className={styles.linksList}>
                            <li><a href="#">درباره ما</a></li>
                            <li><a href="#">ویژگی‌ها</a></li>
                            <li><a href="#">نظرات کاربران</a></li>
                            <li><a href="#">پشتیبانی</a></li>
                        </ul>
                    </FooterSection>

                    <FooterSection index={1}>
                        {/* --- تغییر اصلی اینجاست --- */}
                        {/* به جای متن ساده، از کامپوننت لوگوی اصلی استفاده می‌کنیم */}
                        <div className={styles.logoContainer}>
                           <BrandLogo />
                        </div>
                        <p className={styles.description}>همراه هوش مصنوعی شما برای درک عمیق‌تر و رشد معنوی.</p>
                        <div className={styles.verseBox}>
                            <p className={styles.arabic}>﴿وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ﴾</p>
                            <p className={styles.translation}>"و بگو: عمل کنید، پس خداوند عمل شما را خواهد دید."</p>
                        </div>
                    </FooterSection>

                </div>

                <FooterSection index={5}>
                    <div className={styles.bottomSection}>
                        <div className={styles.bottomContent}>
                            <div className={styles.legalLinks}>
                                <a href="#">شرایط خدمات</a>
                                <a href="#">سیاست حفظ حریم خصوصی</a>
                            </div>
                            <div className={styles.copyright}>
                                <p> © 2025 QuranPlus. تمام حقوق محفوظ است.</p>
                            </div>
                        </div>
                    </div>
                </FooterSection>
            </div>
        </footer>
    );
};

export default Footer;
