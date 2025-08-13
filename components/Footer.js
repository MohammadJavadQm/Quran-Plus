// components/Footer.js
import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ darkMode, currentTheme }) => {
  return (
    <motion.footer
      style={{
        // تمام استایل‌های کلی فوتر اینجا قرار می‌گیرد
        backgroundColor: 'darkgreen', // مثال
        color: 'white',
        padding: '60px 20px',
        marginTop: '80px',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* محتوای فوتر (لوگو، لینک‌ها، فرم ایمیل و ...) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', gap: '40px' }}>

        {/* بخش لوگو و متن */}
        <div>
          <div style={{ /* استایل لوگو و نام */ }}>
            <img src="/logo-path.svg" alt="QuranPlus logo" />
            <span>QuranPlus</span>
          </div>
          <p>Your AI-powered companion for deeper understanding...</p>
          {/* آیه قرآنی */}
        </div>

        {/* بخش Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            {/* ... بقیه لینک‌ها */}
          </ul>
        </div>

        {/* بخش Community */}
        <div>
          <h4>Community</h4>
          <ul>
            <li><a href="#">Prayer Times</a></li>
            {/* ... بقیه لینک‌ها */}
          </ul>
        </div>

        {/* بخش Stay Connected */}
        <div>
          <h4>Stay Connected</h4>
          <p>Get daily verses, spiritual insights...</p>
          {/* فرم و دکمه Subscribe */}
        </div>

      </div>

      {/* بخش پایین فوتر (کپی‌رایت و لینک‌های حقوقی) */}
      <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p>© 2024 QuranPlus. All rights reserved.</p>
        {/* ... لینک‌های Privacy Policy و ... */}
      </div>
    </motion.footer>
  );
};

export default Footer;