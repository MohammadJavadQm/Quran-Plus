import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa';
import styles from './AuthForm.module.css';

const AuthForm = ({ isLogin }) => {
    const title = isLogin ? "Welcome Back" : "Create Your Account";
    const buttonText = isLogin ? "Login" : "Sign Up";
    const linkText = isLogin ? "Don't have an account?" : "Already have an account?";
    const linkHref = isLogin ? "/signuppage" : "/loginpage";
    const linkActionText = isLogin ? "Sign Up" : "Login";

    return (
        <motion.div 
            className={styles.wrapper}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <div className={styles.logoIcon}>
                            <FaBookOpen />
                        </div>
                        <div className={styles.logoTextContainer}>
                            <h1 className={styles.title}>QuranPlus</h1>
                            <p className={styles.subtitle}>مُصْحَفِي الْذَّكِيُّ</p>
                        </div>
                    </div>
                </div>

                <form className={styles.form}>
                    {!isLogin && (
                        <input type="text" placeholder="Full Name" className={styles.input} required />
                    )}
                    <input type="email" placeholder="Email Address" className={styles.input} required />
                    <input type="password" placeholder="Password" className={styles.input} required />
                    <button type="submit" className={styles.button}>{buttonText}</button>
                </form>

                <div className={styles.footer}>
                    {linkText}
                    <Link href={linkHref} className={styles.link}>
                        {linkActionText}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default AuthForm;
