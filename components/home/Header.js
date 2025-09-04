
import React, { useState, useEffect, useRef } from 'react';
import Logo from 'Components/ui/Logo';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        toggleMenu();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <Logo />
            
            <nav className={styles.desktopNav}>
              <button className={`${styles.btn} ${styles.btnLogin}`}>
                <i className="fas fa-user w-4 h-4 mr-2"></i>
                Login
              </button>
              <button className={`${styles.btn} ${styles.btnSignup}`}>
                Signup
              </button>
              <button className={`${styles.btn} ${styles.demoBtn}`}>
                <i className="fas fa-play w-4 h-4 mr-2"></i>
                Demo
              </button>
            </nav>

            <button 
              ref={buttonRef}
              className={styles.mobileMenuButton} 
              onClick={toggleMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={menuRef}
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}
        >
          <div className={styles.menuContent}>
            <a href="#" className={`${styles.menuItem} ${styles.loginItem}`}>
              <i className="fas fa-user w-4 h-4 mr-2"></i>
              Login
            </a>
            <a href="#" className={`${styles.menuItem} ${styles.signupItem}`}>
              Signup
            </a>
            <a href="#" className={`${styles.menuItem} ${styles.demoItem}`}>
              <i className="fas fa-play w-4 h-4 mr-2"></i>
              Demo
            </a>
          </div>
        </div>
      </header>

      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.active : ''}`}
        onClick={toggleMenu}
      ></div>
    </>
  );
};

export default Header;