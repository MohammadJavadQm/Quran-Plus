import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { User, Lock, Mail, ChevronLeft, UserPlus } from 'lucide-react';
import {
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';

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
      className="w-full max-w-sm p-8 bg-gray-900/80 backdrop-blur-md rounded-3xl border border-gray-700 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] relative overflow-hidden"
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
      return 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      return 'Please enter your email address.';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    if (!formData.password) {
      return 'Please enter a password.';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
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
        text: 'Account created successfully!',
      });
      setTimeout(() => {
        onSignupSuccess ? onSignupSuccess() : onSwitchToLogin();
      }, 1500);
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
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

  const buttonGradient = 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)';
  const buttonHoverGradient = 'linear-gradient(90deg, #4f46e5 0%, #9333ea 100%)';
  const socialButtonShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';

  return (
    <div className="relative flex items-center justify-center min-h-screen p-6 bg-gray-950 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#111827_0%,#000_100%)]"></div>
        <div className="absolute inset-0 star-field-animation-layer-1"></div>
        <div className="absolute inset-0 star-field-animation-layer-2"></div>
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
            className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white transition duration-300 rounded-full bg-gray-800/50"
            aria-label="Back"
            whileHover={{ scale: 1.1, backgroundColor: '#3f3f46' }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.h2
            variants={itemVariants}
            className="text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Create Your Account
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-center mb-6 text-sm"
          >
            Join us to explore a new spiritual journey.
          </motion.p>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-3 rounded-xl text-center font-semibold text-white mb-4
                ${message.type === 'error' ? 'bg-red-500/20 text-red-300 border border-red-500' : 'bg-green-500/20 text-green-300 border border-green-500'}`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants} className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="Full Name"
                disabled={isLoading}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="you@email.com"
                disabled={isLoading}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                placeholder="Password"
                disabled={isLoading}
                required
                className="w-full pl-12 pr-12 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </motion.button>
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm Password"
                disabled={isLoading}
                required
                className="w-full pl-12 pr-12 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500"
              />
              <motion.button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition duration-300"
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
              className={`w-full py-3 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-all duration-300 relative overflow-hidden group
                ${isLoading ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'text-white'}`}
              style={{
                background: isLoading ? 'var(--gray-700)' : buttonGradient,
                boxShadow: isLoading ? 'none' : '0 10px 20px rgba(168, 85, 247, 0.25)',
              }}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <motion.div
                    className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: buttonHoverGradient }}
                  />
                  <span className="relative z-10">Create Account</span>
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="mt-6 text-center text-gray-400"
          >
            Already have an account?{' '}
            <motion.button
              onClick={onSwitchToLogin}
              className="font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}