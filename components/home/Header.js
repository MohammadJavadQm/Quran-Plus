import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // Make sure Link is imported
import { FaBars } from 'react-icons/fa';

import { ThemeToggle } from 'components/ThemeToggle';
import NewLogo from 'components/ui/NewLogo';
import styles from './Header.module.css';

const Header = ({ onStartConversation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <NewLogo width={38} />
        <span className={styles.logoText}>QuranPlus</span>
      </div>

      {/* Desktop Navigation */}
      <nav className={styles.navContainer}>
        <ThemeToggle />
        <button className={`${styles.button} ${styles.primary}`} onClick={onStartConversation}>
          AI
        </button>
        {/* The <a> tag is removed, and className is moved to Link */}
        <Link href="/loginpage" className={`${styles.button} ${styles.secondary}`}>
          Login
        </Link>
        {/* The <a> tag is removed, and className is moved to Link */}
        <Link href="/signuppage" className={`${styles.button} ${styles.primary}`}>
          Signup
        </Link>
      </nav>

      {/* Hamburger Button for Mobile */}
      <button
        className={styles.hamburgerButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={styles.mobileNavItem} onClick={closeMenu}>
              <ThemeToggle />
            </div>
            <button className={`${styles.button} ${styles.primary} ${styles.mobileNavItem}`} onClick={() => { onStartConversation(); closeMenu(); }}>
              AI
            </button>
            {/* The <a> tag is removed, and className/onClick are moved to Link */}
            <Link href="/loginpage" className={`${styles.button} ${styles.secondary} ${styles.mobileNavItem}`} onClick={closeMenu}>
              Login
            </Link>
            {/* The <a> tag is removed, and className/onClick are moved to Link */}
            <Link href="/signuppage" className={`${styles.button} ${styles.primary} ${styles.mobileNavItem}`} onClick={closeMenu}>
              Signup
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
