// components/ui/AuthForm.js

import React from 'react';
import styles from './AuthForm.module.css';

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"></path>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const AuthForm = ({ type, onBack, title, onSubmit, onToggleForm }) => {
  return (
    <div className={styles.authContainer}>
      <button className={styles.backButton} onClick={onBack} aria-label="بازگشت">
        <BackIcon />
      </button>

      <h2 className={styles.title}>{title}</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputGroup}>
          <input id="email" type="email" className={styles.input} placeholder=" " required />
          {/* لیبل فارسی شده */}
          <label htmlFor="email" className={styles.label}>ایمیل</label>
        </div>

        <div className={styles.inputGroup}>
          <input id="password" type="password" className={styles.input} placeholder=" " required />
          {/* لیبل فارسی شده */}
          <label htmlFor="password" className={styles.label}>رمز عبور</label>
        </div>

        {type === 'signup' && (
          <div className={styles.inputGroup}>
            <input id="confirmPassword" type="password" className={styles.input} placeholder=" " required />
            {/* لیبل فارسی شده */}
            <label htmlFor="confirmPassword" className={styles.label}>تکرار رمز عبور</label>
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          {/* متن دکمه فارسی شده */}
          {type === 'login' ? 'ورود' : 'ایجاد حساب'}
        </button>
      </form>

      {/* ***** این بخش مهم اصلاح شده است ***** */}
      <p className={styles.footerText}>
        {/* متن فارسی شده */}
        {type === 'login' ? "حساب کاربری ندارید؟" : 'قبلاً ثبت‌نام کرده‌اید؟'}
        <button type="button" className={styles.link} onClick={onToggleForm}>
          {/* متن لینک فارسی شده */}
          {type === 'login' ? ' ثبت‌نام کنید' : ' وارد شوید'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
