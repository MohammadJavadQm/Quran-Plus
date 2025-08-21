// components/chat/ChatPage.js (Final and Corrected Version)

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from 'components/chat/ChatPage.module.css';
import { 
    FaRobot, 
    FaCommentDots, 
    FaBookOpen, 
    FaArrowRight, 
    FaBrain, 
    FaCheckCircle, 
    FaUserCog,
    FaArrowLeft
} from 'react-icons/fa';

const sampleConversation = [
    { id: '1', type: 'user', content: "I'm feeling stressed today...", timestamp: "2:30 PM" },
    { id: '2', type: 'ai', content: "I understand. Let me share a verse that brings peace:", verse: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", reference: "At-Talaq 65:2", timestamp: "2:31 PM" },
    { id: '3', type: 'ai', content: "\"And whoever fears Allah - He will make for him a way out.\" This verse reminds us that divine solutions exist for every difficulty.", timestamp: "2:31 PM" }
];

const ChatPage = ({ onGoBack }) => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    // شبیه‌سازی مکالمه
    useEffect(() => {
        let currentMessageIndex = 0;
        const totalMessages = sampleConversation.length;

        const showNextMessage = () => {
            if (currentMessageIndex >= totalMessages) {
                // *** تغییر کلیدی اینجاست ***
                // بعد از اینکه همه پیام‌ها نمایش داده شدند، یک بار اسکرول کن
                setTimeout(() => {
                    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // می‌توانیم به smooth برگردانیم
                }, 100); // یک تأخیر کوتاه برای اطمینان
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
    }, []); // این useEffect فقط یک بار اجرا می‌شود

    // *** تغییر کلیدی: useEffect قبلی برای اسکرول حذف شد ***
    // ما دیگر نیازی به گوش دادن به تغییرات messages برای اسکرول نداریم.

    return (
        <div className={styles.pageContainer}>
             <button onClick={onGoBack} className={styles.backButton}>
                <FaArrowLeft />
                <span>Back to Home</span>
            </button>
            <div className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.header}>
                        <h1>Experience AI-Powered Spiritual Guidance</h1>
                        <p>See how our intelligent assistant provides personalized Quranic wisdom for life's moments</p>
                    </div>
                    
                    <div className={styles.grid}>
                        <div className={styles.chatContainer}>
                            <div className={styles.chatHeader}>
                                <div className={styles.chatHeaderContent}>
                                    <div className={styles.chatIcon}><FaRobot /></div>
                                    <div className={styles.chatTitle}>
                                        <h2>QuranPlus AI</h2>
                                        <p>Your spiritual companion</p>
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
                                <button className={`${styles.btn} ${styles.btnPrimary}`}><FaCommentDots style={{marginRight: '10px'}}/>Start Real Conversation<FaArrowRight style={{marginLeft: '10px'}}/></button>
                                <button className={`${styles.btn} ${styles.btnAccent}`}><FaBookOpen style={{marginRight: '10px'}}/>Explore Tafsir<FaArrowRight style={{marginLeft: '10px'}}/></button>
                            </div>
                        </div>

                        <div className={styles.contentSection}>
                            <div>
                                <h2>Intelligent Conversations with Purpose</h2>
                                <p>Our AI understands context, emotion, and spiritual needs. Every response is crafted to provide meaningful guidance rooted in authentic Islamic teachings.</p>
                            </div>
                            <div className={styles.features}>
                                <div className={styles.feature}><div className={styles.featureIcon}><FaBrain/></div><div className={styles.featureContent}><h3>Contextual Understanding</h3><p>AI recognizes your emotional state and life situation to provide relevant guidance.</p></div></div>
                                <div className={styles.feature}><div className={styles.featureIcon}><FaCheckCircle/></div><div className={styles.featureContent}><h3>Authentic Sources</h3><p>All responses backed by verified Quranic verses and scholarly interpretations.</p></div></div>
                                <div className={styles.feature}><div className={styles.featureIcon}><FaUserCog/></div><div className={styles.featureContent}><h3>Personalized Guidance</h3><p>Tailored advice that grows with your spiritual journey and personal needs.</p></div></div>
                            </div>
                            <button className={styles.ctaBtn}><FaRobot/>Try AI Assistant Now<FaArrowRight style={{marginLeft: '12px'}}/></button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ChatPage;