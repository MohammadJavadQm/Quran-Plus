import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { ChevronLeft } from 'lucide-react';

// Card component for a clean, minimalistic design
const Card = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm p-8 bg-gray-800 rounded-xl shadow-lg relative overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export function LoginForm({ onBack, onSwitchToSignup, onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (message) setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!formData.email.trim() || !formData.password) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    setIsLoading(true);

    try {
      await new Promise(res => setTimeout(res, 2000));
      if (formData.email === 'test@test.com' && formData.password === 'password') {
        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          else if (onBack) onBack();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Invalid email or password.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}...`);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-6 bg-gray-950 overflow-hidden">
      {/* پس‌زمینه ستاره‌ای */}
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
      
      <div className="w-full max-w-sm z-10">
        <Card>
          {/* Back Button */}
          <motion.button
            onClick={onBack}
            className="absolute top-4 left-4 p-3 bg-gray-700 text-white rounded-full transition-colors duration-200"
            aria-label="Back"
            whileHover={{ backgroundColor: '#6b7280' }} // تغییر رنگ پس‌زمینه به خاکستری روشن‌تر
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          {/* Animated Welcome Text */}
          <motion.h2 
            className="text-2xl font-bold text-center mb-2 mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
              backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7, #6366f1)'
            }}
          >
            Welcome Back
          </motion.h2>
          
          <p className="text-gray-400 text-center mb-6 text-sm">Sign in to your account.</p>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-3 rounded-lg text-center font-medium mb-4 ${
                  message.type === 'error' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                disabled={isLoading}
                required
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                required
                className="w-full pl-4 pr-10 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </motion.button>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-bold text-white transition ${
                isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="my-6 text-center text-gray-600">— or —</div>

          <div className="flex gap-4">
            <motion.button
              onClick={() => handleSocialLogin('Google')}
              className="flex-1 py-2 rounded-lg font-bold border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <FcGoogle size={20} />
                <span>Google</span>
              </div>
            </motion.button>
            <motion.button
              onClick={() => handleSocialLogin('GitHub')}
              className="flex-1 py-2 rounded-lg font-bold border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <FaGithub size={20} />
                <span>GitHub</span>
              </div>
            </motion.button>
          </div>

          <div className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <motion.button
              onClick={onSwitchToSignup}
              className="font-semibold text-blue-400 hover:text-blue-300 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account
            </motion.button>
          </div>
        </Card>
      </div>
    </div>
  );
}