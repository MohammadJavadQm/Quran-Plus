import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './AuthForm.module.css';
import NewLogo from 'components/ui/NewLogo';

const AuthForm = ({ isLogin }) => {
    const title = isLogin ? "Welcome Back" : "Create Your Account";
    const subtitle = isLogin ? "Log in to continue your journey." : "Join us to start your spiritual journey.";
    const buttonText = isLogin ? "Login" : "Sign Up";
    const linkText = isLogin ? "Don't have an account?" : "Already have an account?";
    const linkHref = isLogin ? "/signuppage" : "/loginpage";
    const linkActionText = isLogin ? "Sign Up" : "Login";

    return (
        <motion.div 
            className={styles.wrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <NewLogo width={50} />
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
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
                    {linkText} <Link href={linkHref} className={styles.link}>{linkActionText}</Link>
                </div>
            </div>
        </motion.div>
    );
};

export default AuthForm;