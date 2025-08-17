import React, { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

import { useTheme } from 'components/ThemeToggle';
import Header from 'components/home/Header';
import Footer from 'components/Footer';
import BackgroundEffects from 'components/home/BackgroundEffects';

const Layout = ({ children, onStartConversation }) => {
    const { theme } = useTheme();

    // افکت برای اعمال تم به کل سند HTML
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // مدیریت انیمیشن موس
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
    const springMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div
            style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
            onMouseMove={handleMouseMove}
        >
            <BackgroundEffects springMouseX={springMouseX} springMouseY={springMouseY} />
            
            <Header onStartConversation={onStartConversation} />
            
            {/* محتوای اصلی صفحه در اینجا قرار می‌گیرد */}
            <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                {children}
            </main>
            
            <Footer />
        </div>
    );
};

export default Layout;
