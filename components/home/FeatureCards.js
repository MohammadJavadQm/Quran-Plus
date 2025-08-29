import React from 'react';
import { motion } from 'framer-motion';
import HoverableCard from 'components/ui/HoverableCard';
import styles from './FeatureCards.module.css';

const featuresData = [
    { title: "بینش مبتنی بر هوش مصنوعی", description: "پاسخ‌های فوری برای سؤالات معنوی خود دریافت کنید", icon: "💡" },
    { title: "پیگیری پیشرفت", description: "رشد معنوی و یادگیری خود را دنبال کنید", icon: "📊" },
    { title: "قرائت تعاملی", description: "قرآن را با ابزارهای مدرن تجربه کنید", icon: "📖" },
];

const FeatureCards = () => {
    return (
        <section className={styles.wrapper}>
            <motion.div
                className={styles.grid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.2 }}
            >
                {featuresData.map((feature, index) => (
                    <HoverableCard key={index} {...feature} />
                ))}
            </motion.div>
        </section>
    );
};

export default FeatureCards;