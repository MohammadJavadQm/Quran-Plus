// components/home/Header.js

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaUser, FaPlay, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from 'components/ThemeToggle';
import BrandLogo from 'components/ui/BrandLogo';
import styles from './Header.module.css';

// انیمیشن‌های Framer Motion برای منو و آیتم‌ها
const menuVariants = {
  hidden: {
    opacity: 0,
    clipPath: 'circle(10px at 90% 40px)', // شروع انیمیشن از کنار دکمه همبرگری
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  visible: {
    opacity: 1,
    clipPath: 'circle(150% at 90% 40px)', // باز شدن به صورت دایره‌ای
    transition: {
      type: 'spring',
      stiffness: 50,
      restDelta: 2,
      staggerChildren: 0.1, // تاخیر در نمایش آیتم‌ها
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};


const Header = ({ onStartConversation }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);


    return (
        <>
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 w-full">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <nav className="hidden md:flex items-center gap-x-2">
                            <button onClick={onStartConversation} className={`px-6 py-2 font-medium rounded-md text-sm ${styles.btnHoverLift} ${styles.btnGradient}`}>
                                <FaPlay className="w-4 h-4 ml-2 inline" /> دمو
                            </button>
                            <Link href="/signuppage" className={`px-6 py-2 font-medium rounded-md text-sm border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 ${styles.btnHoverLift}`}>
                                ثبت‌نام
                            </Link>
                            <Link href="/loginpage" className={`px-6 py-2 font-medium rounded-md text-sm ${styles.btnHoverLift}`}>
                                <FaUser className="w-4 h-4 ml-2 inline" /> ورود
                            </Link>
                        </nav>
                        <div className="flex items-center gap-x-4">
                            <div className="hidden md:block">
                               <ThemeToggle />
                            </div>
                            <BrandLogo />
                        </div>
                        <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 text-gray-800 dark:text-gray-200">
                            <FaBars className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className={styles.mobileMenuOverlay}
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className={styles.stars}></div>
                        <div className={styles.twinkling}></div>

                        <div className={styles.mobileMenuHeader}>
                            <BrandLogo />
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-200 z-10">
                                <FaTimes className="w-7 h-7" />
                            </button>
                        </div>
                        
                        <motion.nav className={styles.mobileMenuNav}>
                            <motion.div variants={itemVariants}><Link href="/loginpage" className={styles.mobileNavLink}><FaUser className="w-5 h-5 ml-3" /> ورود</Link></motion.div>
                            <motion.div variants={itemVariants}><Link href="/signuppage" className={styles.mobileNavLink}>ثبت‌نام</Link></motion.div>
                            <motion.div variants={itemVariants}><button onClick={() => { onStartConversation(); setIsMenuOpen(false); }} className={`${styles.mobileNavLink} ${styles.btnGradient}`}><FaPlay className="w-5 h-5 ml-3" /> دمو</button></motion.div>
                        </motion.nav>

                        <motion.div className={styles.themeToggleWrapper} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.5}}>
                            <ThemeToggle />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
