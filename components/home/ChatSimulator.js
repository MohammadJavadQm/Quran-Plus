import React, { useState, useEffect, useRef } from 'react';
import Button from 'components/ui/ChatSimulator';
import styles from './ChatSimulator.module.css';

const QuranPlusAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Sample conversation data
  const sampleConversation = [
    {
      id: '1',
      type: 'user',
      content: "I'm feeling stressed today...",
      timestamp: "2:30 PM"
    },
    {
      id: '2',
      type: 'ai',
      content: "I understand you're going through a challenging time. Let me share a verse that brings peace:",
      verse: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      reference: "At-Talaq 65:2",
      timestamp: "2:31 PM"
    },
    {
      id: '3',
      type: 'ai',
      content: "\"And whoever fears Allah - He will make for him a way out.\" This verse reminds us that divine solutions exist for every difficulty.",
      timestamp: "2:31 PM"
    }
  ];

  // Simulate chat conversation
  useEffect(() => {
    let index = 0;
    let delay = 1000;

    function showNextMessage() {
      if (index >= sampleConversation.length) {
        return;
      }

      const message = sampleConversation[index];
      setMessages(prev => [...prev, message]);

      index++;

      // If next message is AI, show typing indicator
      if (index < sampleConversation.length && sampleConversation[index].type === 'ai') {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setTimeout(showNextMessage, 800);
        }, 1500);
      } else {
        setTimeout(showNextMessage, 1500);
      }
    }

    // Start showing messages after a delay
    const timer = setTimeout(showNextMessage, delay);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, showTyping]);

  const createMessageElement = (message) => {
    return (
      <div key={message.id} className={`${styles.message} ${message.type === 'user' ? styles.userMessage : styles.aiMessage}`}>
        <p>{message.content}</p>
        {message.verse && (
          <div className={styles.verseContainer}>
            <p className={styles.verseText}>{message.verse}</p>
            <p className={styles.verseReference}>{message.reference}</p>
          </div>
        )}
        <p className={styles.messageTime}>{message.timestamp}</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.header}>
          <h1>Experience AI-Powered Spiritual Guidance</h1>
          <p>See how our intelligent assistant provides personalized Quranic wisdom for life's moments</p>
        </div>

        <div className={styles.grid}>
          {/* Chat Simulator */}
          <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderContent}>
                <div className={styles.chatIcon}>
                  <i className="fas fa-robot"></i>
                </div>
                <div className={styles.chatTitle}>
                  <h2>QuranPlus AI</h2>
                  <p>Your spiritual companion</p>
                </div>
              </div>
            </div>

            <div className={styles.chatMessages} ref={chatContainerRef}>
              {messages.map(createMessageElement)}
              {showTyping && (
                <div className={styles.typingIndicator}>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                </div>
              )}
            </div>

            <div className={styles.actionButtons}>
              <Button variant="primary" icon="fas fa-comment-dots">
                Start Real Conversation
              </Button>

              <Button variant="accent" icon="fas fa-book-open">
                Explore Tafsir
              </Button>
            </div>
          </div>

          {/* Content Description */}
          <div className={styles.contentSection}>
            <div>
              <h2>Intelligent Conversations with Purpose</h2>
              <p>Our AI understands context, emotion, and spiritual needs. Every response is crafted to provide meaningful guidance rooted in authentic Islamic teachings.</p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-brain"></i>
                </div>
                <div className={styles.featureContent}>
                  <h3>Contextual Understanding</h3>
                  <p>AI recognizes your emotional state and life situation to provide relevant guidance.</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className={styles.featureContent}>
                  <h3>Authentic Sources</h3>
                  <p>All responses backed by verified Quranic verses and scholarly interpretations.</p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-user-cog"></i>
                </div>
                <div className={styles.featureContent}>
                  <h3>Personalized Guidance</h3>
                  <p>Tailored advice that grows with your spiritual journey and personal needs.</p>
                </div>
              </div>
            </div>

            <Button variant="cta" icon="fas fa-robot">
              Try AI Assistant Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuranPlusAIChat;