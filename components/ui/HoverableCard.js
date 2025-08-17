import React from 'react';
import { motion } from 'framer-motion';
import styles from './HoverableCard.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const HoverableCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className={styles.card}
      variants={cardVariants}
      whileHover={{ y: -8, boxShadow: '0 20px 40px -15px var(--shadow-color)' }}
    >
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  );
};

export default HoverableCard;