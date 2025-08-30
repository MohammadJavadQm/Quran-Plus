// components/chat/ChatPage.js (نسخه نهایی و فارسی‌شده)

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from 'components/chat/ChatPage.module.css';
import { 
    FaRobot, 
    FaCommentDots, 
    FaBookOpen, 
    FaArrowLeft, // فلش راست برای زبان فارسی
    FaBrain, 
    FaCheckCircle, 
    FaUserCog,
    FaArrowRight // فلش چپ برای زبان فارسی
} from 'react-icons/fa';

// مکالمه نمونه به فارسی
const sampleConversation = [
    { id: '1', type: 'user', content: "امروز احساس استرس می‌کنم...", timestamp: "ساعت ۲:۳۰" },
    { id: '2', type: 'ai', content: "درک می‌کنم. اجازه دهید آیه‌ای را با شما به اشتراک بگذارم که آرامش‌بخش است:", verse: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", reference: "طلاق ۶۵:۲", timestamp: "ساعت ۲:۳۱" },
    { id: '3', type: 'ai', content: "«و هر کس از خدا پروا کند، [خدا] برای او راه بیرون‌شدنی قرار می‌دهد.» این آیه به ما یادآوری می‌کند که برای هر مشکلی، راه‌حل‌های الهی وجود دارد.", timestamp: "ساعت ۲:۳۱" }
];

const ChatPage = ({ onGoBack }) => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    // شبیه‌سازی مکالمه (منطق بدون تغییر)
    useEffect(() => {
        let currentMessageIndex = 0;
        const totalMessages = sampleConversation.length;

        const showNextMessage = () => {
            if (currentMessageIndex >= totalMessages) {
                setTimeout(() => {
                    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                return;
            }

            const message = sampleConversation[currentMessageIndex];
            
            if (message.type === 'ai' && (currentMessageIndex === 0 || sampleConversation[currentMessageIndex - 1].type === 'user')) {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages(prev => [...prev, message]);
                    currentMessageIndex++;
                    setTimeout(showNextMessage, 1200);
                }, 1500);
            } else {
                setMessages(prev => [...prev, message]);
                currentMessageIndex++;
                setTimeout(showNextMessage, 1200);
            }
        };
        const timeoutId = setTimeout(showNextMessage, 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={styles.pageContainer}>
             <button onClick={onGoBack} className={styles.backButton}>
                <FaArrowRight /> {/* آیکون برای راست‌چین */}
                <span>بازگشت به صفحه اصلی</span>
            </button>
            <div className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.header}>
                        <h1>راهنمایی معنوی مبتنی بر هوش مصنوعی را تجربه کنید</h1>
                        <p>ببینید چگونه دستیار هوشمند ما حکمت قرآنی شخصی‌سازی‌شده را برای لحظات زندگی شما فراهم می‌کند</p>
                    </div>
                    
                    <div className={styles.grid}>
                        <div className={styles.chatContainer}>
                            <div className={styles.chatHeader}>
                                <div className={styles.chatHeaderContent}>
                                    <div className={styles.chatIcon}><FaRobot /></div>
                                    <div className={styles.chatTitle}>
                                        <h2>هوش مصنوعی QuranPlus</h2>
                                        <p>همراه معنوی شما</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.chatMessages}>
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`${styles.message} ${msg.type === 'user' ? styles.userMessage : styles.aiMessage}`}>
                                        <p>{msg.content}</p>
                                        {msg.verse && (
                                            <div className={styles.verseContainer}>
                                                <p className={styles.verseText}>{msg.verse}</p>
                                                <p className={styles.verseReference}>{msg.reference}</p>
                                            </div>
                                        )}
                                        <p className={styles.messageTime}>{msg.timestamp}</p>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className={styles.typingIndicator}>
                                        <div className={styles.typingDot}></div><div className={styles.typingDot}></div><div className={styles.typingDot}></div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                            <div className={styles.actionButtons}>
                                <button className={`${styles.btn} ${styles.btnPrimary}`}><FaCommentDots style={{marginLeft: '10px'}}/>شروع گفتگوی واقعی<FaArrowLeft style={{marginRight: '10px'}}/></button>
                                <button className={`${styles.btn} ${styles.btnAccent}`}><FaBookOpen style={{marginLeft: '10px'}}/>کاوش در تفسیر<FaArrowLeft style={{marginRight: '10px'}}/></button>
                            </div>
                        </div>

                        <div className={styles.contentSection}>
                            <div>
                                <h2>گفتگوهای هوشمند و هدفمند</h2>
                                <p>هوش مصنوعی ما زمینه، احساسات و نیازهای معنوی را درک می‌کند. هر پاسخ با دقت طراحی شده تا راهنمایی معناداری بر اساس آموزه‌های اصیل اسلامی ارائه دهد.</p>
                            </div>
                            <div className={styles.features}>
                                <div className={styles.feature}><div className={styles.featureIcon}><FaBrain/></div><div className={styles.featureContent}><h3>درک متنی</h3><p>هوش مصنوعی وضعیت عاطفی و شرایط زندگی شما را تشخیص می‌دهد تا راهنمایی مرتبط ارائه دهد.</p></div></div>
                                <div className={styles.feature}><div className={styles.featureIcon}><FaCheckCircle/></div><div className={styles.featureContent}><h3>منابع معتبر</h3><p>تمام پاسخ‌ها با استناد به آیات تأییدشده قرآن و تفاسیر علما پشتیبانی می‌شوند.</p></div></div>
                                <div className={styles.feature}><div className={styles.featureIcon}><FaUserCog/></div><div className={styles.featureContent}><h3>راهنمایی شخصی‌سازی‌شده</h3><p>مشاوره‌ای متناسب با سفر معنوی و نیازهای شخصی شما که همگام با شما رشد می‌کند.</p></div></div>
                            </div>
                            <button className={styles.ctaBtn}><FaRobot/>همین حالا دستیار هوش مصنوعی را امتحان کنید<FaArrowLeft style={{marginRight: '12px'}}/></button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ChatPage;
