// pages/index.js

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Head from 'next/head';

// هدر و فوتر به صورت مستقیم اینجا وارد می‌شوند
import Header from '../components/home/Header';
import Footer from '../components/Footer';

// ... بقیه کامپوننت‌های شما
import QuranPlusLoading from 'components/QuranPlusLoading';
import { useTheme } from 'components/ThemeToggle';
import BackgroundEffects from 'components/home/BackgroundEffects';
import ChatPage from 'components/chat/ChatPage';
import HeroSection from 'components/home/HeroSection';
import StatsSection from 'components/home/StatsSection';
import AdvancedFeatures from 'components/home/AdvancedFeatures';
import FeatureCards from 'components/home/FeatureCards';
import PersonalizationPanel from 'components/home/PersonalizationPanel';

export default function Index() {
    const [showLoading, setShowLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const handleStartConversation = () => setIsChatOpen(true);

    // ... بقیه کدهای شما (useEffect, useMotionValue, etc.) بدون تغییر ...
    const { theme } = useTheme();
    useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
    useEffect(() => {
        const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
        if (hasLoadedBefore) { setShowLoading(false); } 
        else {
            const timer = setTimeout(() => {
                setShowLoading(false);
                sessionStorage.setItem('hasLoadedBefore', 'true');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
    const springMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // حالت اول: اگر در حال لودینگ بود، فقط کامپوننت لودینگ را نمایش بده
    if (showLoading) {
        return <QuranPlusLoading />;
    }

    // حالت دوم: اگر چت باز بود، فقط کامپوننت چت را نمایش بده
    if (isChatOpen) {
        // ما یک پس‌زمینه ساده برای صفحه چت قرار می‌دهیم
        return (
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }} onMouseMove={handleMouseMove}>
                <BackgroundEffects springMouseX={springMouseX} springMouseY={springMouseY} />
                <ChatPage onGoBack={() => setIsChatOpen(false)} />
            </div>
        );
    }

    // حالت سوم (حالت پیش‌فرض): صفحه اصلی را با هدر و فوتر کامل نمایش بده
    return (
        <>
            <Head>
                <title>QuranPlus | صفحه اصلی</title>
            </Head>

            <Header onStartConversation={handleStartConversation} />

            <main onMouseMove={handleMouseMove} style={{ position: 'relative', overflow: 'hidden' }}>
                <BackgroundEffects springMouseX={springMouseX} springMouseY={springMouseY} />
                <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <HeroSection onStartConversation={handleStartConversation} />
                    <StatsSection />
                    <AdvancedFeatures />
                    <FeatureCards />
                    <PersonalizationPanel />
                </motion.div>
            </main>

            <Footer />
        </>
    );
}

// >> بسیار مهم: هیچ خط getLayout در انتهای این فایل وجود ندارد <<
