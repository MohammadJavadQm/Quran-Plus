import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaUser, FaPlay, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from 'components/ThemeToggle';
import BrandLogo from 'components/ui/BrandLogo'; // <-- استفاده از کامپوننت لوگوی جدید
import styles from './Header.module.css';

const Header = ({ onStartConversation }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = (
        <>
            <Link href="/loginpage" className={`px-6 py-2 font-medium rounded-md text-sm ${styles.btnHoverLift}`}>
                <FaUser className="w-4 h-4 mr-2 inline" /> Login
            </Link>
            <Link href="/signuppage" className={`px-6 py-2 font-medium rounded-md text-sm border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 ${styles.btnHoverLift}`}>
                Signup
            </Link>
            <button onClick={onStartConversation} className={`px-6 py-2 font-medium rounded-md text-sm ${styles.btnHoverLift} ${styles.btnGradient}`}>
                <FaPlay className="w-4 h-4 mr-2 inline" /> Demo
            </button>
            <ThemeToggle />
        </>
    );

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 w-full">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <BrandLogo /> {/* <-- کامپوننت لوگو در اینجا قرار گرفت */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems}
                    </nav>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-800 dark:text-gray-200">
                        {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div className={`md:hidden ${styles.mobileMenu}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <nav className={styles.mobileMenuNav}>{navItems}</nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
