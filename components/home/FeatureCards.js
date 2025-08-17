import React from 'react';
import { motion } from 'framer-motion';
import HoverableCard from 'components/ui/HoverableCard';
import styles from './FeatureCards.module.css';

const featuresData = [
    { title: "AI-Powered Insights", description: "Get instant answers to your spiritual questions", icon: "💡" },
    { title: "Progress Tracking", description: "Monitor your spiritual growth and learning", icon: "📊" },
    { title: "Interactive Reading", description: "Experience the Quran with modern tools", icon: "📖" },
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