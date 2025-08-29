import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useTheme } from '../ThemeToggle'; // وارد کردن هوک تم

// کامپوننت افکت‌های پس‌زمینه که با حرکت موس حرکت می‌کنند
const BackgroundEffects = ({ springMouseX, springMouseY }) => {
    // از هوک تم برای تشخیص حالت تاریک/روشن استفاده می‌کنیم
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    // مقادیر حرکت پارالکس را بر اساس حرکت موس محاسبه می‌کنیم
    const parallaxHexagram1 = useTransform(springMouseX, [0, 1], [-50, 50]);
    const parallaxHexagram2 = useTransform(springMouseY, [0, 1], [-40, 40]);
    const parallaxHexagram3 = useTransform(springMouseX, [0, 1], [40, -40]);
    const parallaxHexagram4 = useTransform(springMouseY, [0, 1], [50, -50]);
    const parallaxHexagram5 = useTransform(springMouseX, [0, 1], [-30, 30]);

    // تنظیمات انیمیشن چرخش بی‌نهایت
    const spinTransition = { loop: Infinity, ease: "linear", duration: 20 };

    return (
        <>
            {/* شکل شش‌ضلعی اول */}
            <motion.svg 
                viewBox="0 0 250 250" 
                style={{ 
                    position: "absolute", top: "15%", left: "10%", width: 250, height: 250, 
                    opacity: 0.15, userSelect: "none", pointerEvents: "none", 
                    filter: isDarkMode ? "blur(4px) brightness(0.8)" : "blur(3px)", 
                    mixBlendMode: isDarkMode ? "screen" : "normal", 
                    x: parallaxHexagram1 
                }} 
                animate={{ rotate: 360 }} 
                transition={spinTransition} 
                aria-hidden="true"
            >
                <polygon points="125,0 240,62 240,188 125,250 10,188 10,62" fill={isDarkMode ? "#a7c957" : "#4a6d3b"} />
            </motion.svg>

            {/* شکل شش‌ضلعی دوم */}
            <motion.svg 
                viewBox="0 0 300 300" 
                style={{ 
                    position: "absolute", top: "60%", left: "70%", width: 300, height: 300, 
                    opacity: 0.15, userSelect: "none", pointerEvents: "none", 
                    filter: isDarkMode ? "blur(4px) brightness(0.8)" : "blur(3px)", 
                    mixBlendMode: isDarkMode ? "screen" : "normal", 
                    y: parallaxHexagram2 
                }} 
                animate={{ rotate: 360 }} 
                transition={{ ...spinTransition, duration: 25, delay: 8 }} 
                aria-hidden="true"
            >
                <polygon points="150,0 276,75 276,225 150,300 24,225 24,75" fill={isDarkMode ? "#a7c957" : "#4a6d3b"} />
            </motion.svg>
            
            {/* ... می‌توانید بقیه شش‌ضلعی‌ها را به همین شکل اضافه کنید ... */}
        </>
    );
};

export default BackgroundEffects;