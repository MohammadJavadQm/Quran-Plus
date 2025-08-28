// AuthForm.js
import React from 'react';
import styles from './AuthForm.module.css';

// Back Icon Component (no changes needed here)
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"></path>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// We added onSubmit and onToggleForm props
const AuthForm = ({ type, onBack, title, onSubmit, onToggleForm }) => {

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
      console.warn("onBack prop was not provided. Using window.history.back() as fallback.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <button className={styles.backButton} onClick={handleBackClick} aria-label="Go back">
        <BackIcon />
      </button>

      <h2 className={styles.title}>{title || 'Sign In'}</h2>

      {/* The form now calls the onSubmit function passed from the parent */}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputGroup}>
          <input id="email" type="email" className={styles.input} placeholder=" " required />
          <label htmlFor="email" className={styles.label}>Email</label>
        </div>

        <div className={styles.inputGroup}>
          <input id="password" type="password" className={styles.input} placeholder=" " required />
          <label htmlFor="password" className={styles.label}>Password</label>
        </div>

        {/* Conditional "Confirm Password" field for sign-up */}
        {type === 'signup' && (
          <div className={styles.inputGroup}>
            <input id="confirmPassword" type="password" className={styles.input} placeholder=" " required />
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          {type === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <p className={styles.footerText}>
        {type === 'login' ? "Don't have an account?" : 'Already have an account?'}
        {/* This button now correctly toggles the form state */}
        <button type="button" className={styles.link} onClick={onToggleForm}>
          {type === 'login' ? ' Sign Up' : ' Sign In'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;