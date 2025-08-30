import React, { useState } from 'react';
import style from './SignupForm.module.css'; // مسیر اصلاح‌شده
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { User, Lock, Mail, ChevronRight } from 'lucide-react'; // آیکون برای راست‌چین

const Card = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      whileHover={{
        scale: 1.01,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
      className={style.card}
    >
      {children}
    </motion.div>
  );
};

export function SignupForm({ onBack, onSwitchToLogin, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (message) {
      setMessage(null);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'لطفاً نام خود را وارد کنید.';
    }
    if (!formData.email.trim()) {
      return 'لطفاً آدرس ایمیل خود را وارد کنید.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'لطفاً یک آدرس ایمیل معتبر وارد کنید.';
    }
    if (!formData.password) {
      return 'لطفاً یک رمز عبور وارد کنید.';
    }
    if (formData.password.length < 6) {
      return 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'رمزهای عبور با یکدیگر مطابقت ندارند.';
    }
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: 'error', text: validationError });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 2500));
      setMessage({
        type: 'success',
        text: 'حساب کاربری با موفقیت ایجاد شد!',
      });
      setTimeout(() => {
        onSignupSuccess ? onSignupSuccess() : onSwitchToLogin();
      }, 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'خطای شبکه. لطفاً دوباره تلاش کنید.' });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className={style.container}>
      <motion.div
        className={style.bgGradient}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className={style.starFieldAnimationLayer1}></div>
        <div className={style.starFieldAnimationLayer2}></div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md z-10"
      >
        <Card>
          <motion.button
            onClick={onBack}
            className={style.backButton}
            aria-label="بازگشت"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <motion.h2
            variants={itemVariants}
            className={style.formHeading}
          >
            حساب کاربری خود را بسازید
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={style.formSubheading}
          >
            به ما بپیوندید تا یک سفر معنوی جدید را کشف کنید.
          </motion.p>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`${style.alert} ${
                  message.type === 'error' ? style.alertError : style.alertSuccess
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants} className={style.inputContainer}>
              <User className={style.inputIcon} size={20} />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="نام کامل"
                disabled={isLoading}
                required
                className={style.input}
              />
            </motion.div>
            <motion.div variants={itemVariants} className={style.inputContainer}>
              <Mail className={style.inputIcon} size={20} />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="you@email.com"
                disabled={isLoading}
                required
                className={style.input}
              />
            </motion.div>
            <motion.div variants={itemVariants} className={style.inputContainer}>
              <Lock className={style.inputIcon} size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                placeholder="رمز عبور"
                disabled={isLoading}
                required
                className={style.input}
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'پنهان کردن رمز' : 'نمایش رمز'}
                className={style.passwordToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </motion.button>
            </motion.div>
            <motion.div variants={itemVariants} className={style.inputContainer}>
              <Lock className={style.inputIcon} size={20} />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                placeholder="تکرار رمز عبور"
                disabled={isLoading}
                required
                className={style.input}
              />
              <motion.button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                aria-label={showConfirmPassword ? 'پنهان کردن رمز' : 'نمایش رمز'}
                className={style.passwordToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showConfirmPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </motion.button>
            </motion.div>
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              className={`${style.submitButton} ${
                isLoading ? style.submitButtonDisabled : style.submitButtonEnabled
              }`}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <div className={style.submitButtonLoading}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className={style.loader}
                  />
                  <span>در حال ایجاد حساب...</span>
                </div>
              ) : (
                <>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(90deg, #4f46e5 0%, #9333ea 100%)' }}
                  />
                  <span className="relative z-10">ایجاد حساب</span>
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className={style.signinLinkContainer}
          >
            قبلاً حساب ساخته‌اید؟{' '}
            <motion.button
              onClick={onSwitchToLogin}
              className={style.signinLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              وارد شوید
            </motion.button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
