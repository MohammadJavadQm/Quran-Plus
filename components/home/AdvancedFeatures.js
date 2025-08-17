import React from 'react';
import { motion } from 'framer-motion';
import { FaQuran, FaBook, FaHandHoldingHeart, FaStar } from 'react-icons/fa';
import styles from './AdvancedFeatures.module.css'; // Import the new CSS module

const features = [
    { title: "Verse-by-Verse Tafsir", description: "Dive deep into the meaning of each verse with multiple interpretations from leading scholars.", icon: <FaQuran /> },
    { title: "Hadith Integration", description: "Connect Quranic verses to relevant prophetic sayings for a holistic understanding.", icon: <FaBook /> },
    { title: "Emotional Support AI", description: "Our AI is trained to provide gentle, empathetic responses to your life challenges, grounded in Islamic wisdom.", icon: <FaHandHoldingHeart /> },
    { title: "Interactive Study Plans", description: "Create personalized learning journeys to memorize, reflect, or study specific themes.", icon: <FaStar /> },
];

// No more darkMode or currentTheme props needed!
const AdvancedFeatures = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>
                Features that Elevate Your Experience
            </h2>
            <p className={styles.subtitle}>
                Go beyond simple translations. Our platform is built with tools to enrich your spiritual and intellectual connection to the Quran.
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
