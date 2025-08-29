import React from 'react';
import { motion } from 'framer-motion';
import { FaQuran, FaBook, FaHandHoldingHeart, FaStar } from 'react-icons/fa';
import styles from './AdvancedFeatures.module.css'; // فایل CSS بدون تغییر باقی می‌ماند

const features = [
    { title: "تفسیر آیه به آیه", description: "با تفاسیر متعدد از علمای برجسته، در معنای عمیق هر آیه غرق شوید.", icon: <FaQuran /> },
    { title: "یکپارچه‌سازی با حدیث", description: "آیات قرآن را برای درک جامع، به احادیث نبوی مرتبط متصل کنید.", icon: <FaBook /> },
    { title: "هوش مصنوعی حامی عاطفی", description: "هوش مصنوعی ما برای ارائه پاسخ‌های همدلانه به چالش‌های زندگی شما، بر پایه حکمت اسلامی آموزش دیده است.", icon: <FaHandHoldingHeart /> },
    { title: "برنامه‌های مطالعه تعاملی", description: "مسیرهای یادگیری شخصی‌سازی شده برای حفظ، تأمل یا مطالعه موضوعات خاص ایجاد کنید.", icon: <FaStar /> },
];

const AdvancedFeatures = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>
                ویژگی‌هایی که تجربه شما را ارتقا می‌دهند
            </h2>
            <p className={styles.subtitle}>
                فراتر از ترجمه‌های ساده بروید. پلتفرم ما با ابزارهایی برای غنی‌سازی ارتباط معنوی و فکری شما با قرآن ساخته شده است.
            </p>
            <motion.div
                className={styles.grid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.15 }}
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className={styles.featureCard}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <div className={styles.iconWrapper}>
                            {feature.icon}
                        </div>
                        <h3 className={styles.featureTitle}>
                            {feature.title}
                        </h3>
                        <p className={styles.featureDescription}>
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AdvancedFeatures;
