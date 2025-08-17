import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Head from 'next/head';

// کامپوننت‌های اصلی
import QuranPlusLoading from 'components/QuranPlusLoading';
import { useTheme } from 'components/ThemeToggle';
import Footer from 'components/Footer';
import Header from 'components/home/Header';
import BackgroundEffects from 'components/home/BackgroundEffects';
import ChatPage from 'components/chat/ChatPage';

// بخش‌های صفحه اصلی
import HeroSection from 'components/home/HeroSection';
import StatsSection from 'components/home/StatsSection';
import AdvancedFeatures from 'components/home/AdvancedFeatures';
import FeatureCards from 'components/home/FeatureCards';
import PersonalizationPanel from 'components/home/PersonalizationPanel';

export default function Index() {
    // 1. مقدار اولیه state را true می‌گذاریم
    const [showLoading, setShowLoading] = useState(true);
    const { theme } = useTheme();
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    // 2. این useEffect جدید، منطق لودینگ را مدیریت می‌کند
    useEffect(() => {
        // چک می‌کنیم آیا قبلاً لودینگ نمایش داده شده است یا نه
        const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

        if (hasLoadedBefore) {
            // اگر قبلاً نمایش داده شده، بلافاصله لودینگ را غیرفعال کن
            setShowLoading(false);
        } else {
            // اگر اولین بار است، لودینگ را برای مدتی نمایش بده
            const timer = setTimeout(() => {
                setShowLoading(false);
                // و در حافظه مرورگر ثبت کن که دیگر نمایش داده نشود
                sessionStorage.setItem('hasLoadedBefore', 'true');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []); // [] یعنی این افکت فقط یک بار بعد از رندر اولیه اجرا می‌شود

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
    const springMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // 3. اگر showLoading همچنان true بود، کامپوننت لودینگ را نمایش بده
    // (این حالت فقط در رندر اولیه و قبل از اجرای useEffect اتفاق می‌افتد)
    if (showLoading) {
        return <QuranPlusLoading />;
    }

    return (
        <>
            <Head>
                <title>QuranPlus | Your AI Spiritual Companion</title>
                <meta name="description" content="Experience the Quran like never before with AI-powered guidance." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div
                style={{ position: 'relative', overflow: 'hidden' }}
                onMouseMove={handleMouseMove}
            >
                <BackgroundEffects springMouseX={springMouseX} springMouseY={springMouseY} />
                
                <Header onStartConversation={() => setIsChatOpen(true)} />
                
                <main>
                    <AnimatePresence mode="wait">
                        {isChatOpen ? (
                            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <ChatPage onGoBack={() => setIsChatOpen(false)} />
                            </motion.div>
                        ) : (
                            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <HeroSection onStartConversation={() => setIsChatOpen(true)} />
                                <StatsSection />
                                <AdvancedFeatures />
                                <FeatureCards />
                                <PersonalizationPanel />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {!isChatOpen && <Footer />}
            </div>
        </>
    );
}
