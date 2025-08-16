import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { useTheme } from '../components/ThemeToggle';
import { ThemeToggle } from '../components/ThemeToggle';
import VerseOfTheDay from '../components/VerseOfTheDay';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaChevronLeft, FaRegLightbulb, FaBook, FaCog, FaStar, FaHandHoldingHeart, FaQuran } from 'react-icons/fa';

// لوگوی جدید شما به عنوان یک کامپوننت SVG
const NewLogo = ({ width = 40, darkMode }) => {
  return (
    <svg width={width} height={width} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="128" fill="#181818" />
      <g transform="translate(102.4, 76.8)">
        <path d="M153.6,0l153.6,88.7v177.3L153.6,354.7L0,266V88.7L153.6,0z" fill="#D4CA7E" />
        <path d="M153.6,30.3L275.6,99.9v140L153.6,30.3z" fill="#a7c957" />
        <path d="M153.6,30.3L31.6,99.9v140L153.6,30.3z" fill="#4a6d3b" />
        <path d="M153.6,30.3L275.6,99.9l-122-69.6z" fill="#D4CA7E" />
        <path d="M153.6,30.3L31.6,99.9l122-69.6z" fill="#4a6d3b" />
        <path d="M307.2,88.7L153.6,177.3l-153.6-88.6L153.6,0L307.2,88.7z" fill="#a7c957" />
        <path d="M153.6,266L0,177.3l153.6-88.6L307.2,177.3L153.6,266z" fill="#D4CA7E" />
        <path d="M153.6,354.7L0,266l153.6-88.7l153.6,88.7L153.6,354.7z" fill="#4a6d3b" />
        <text x="153.6" y="177.3" textAnchor="middle" alignmentBaseline="central" fontSize="30" fill="#FFFF00" fontFamily="Arial, sans-serif" transform="translate(0, -10)">الله</text>
      </g>
    </svg>
  );
};

// کامپوننت جدید برای نمایش ویژگی‌های پیشرفته در یک بخش جداگانه
const AdvancedFeaturesSection = ({ darkMode, currentTheme }) => {
  const textColor = darkMode ? '#d4d4d4' : '#333';

  const features = [
    {
      title: "Verse-by-Verse Tafsir",
      description: "Dive deep into the meaning of each verse with multiple interpretations from leading scholars.",
      icon: <FaQuran />,
    },
    {
      title: "Hadith Integration",
      description: "Connect Quranic verses to relevant prophetic sayings for a holistic understanding.",
      icon: <FaBook />,
    },
    {
      title: "Emotional Support AI",
      description: "Our AI is trained to provide gentle, empathetic responses to your life challenges, grounded in Islamic wisdom.",
      icon: <FaHandHoldingHeart />,
    },
    {
      title: "Interactive Study Plans",
      description: "Create personalized learning journeys to memorize, reflect, or study specific themes.",
      icon: <FaStar />,
    },
  ];

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '80px auto',
      textAlign: 'center',
      padding: '0 20px',
    }}>
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: '900',
        color: currentTheme.primary,
        marginBottom: '20px',
        textShadow: darkMode ? '0 0 8px #a7c957aa' : '0 0 4px #4a6d3baa',
      }}>
        Features that Elevate Your Experience
      </h2>
      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        color: darkMode ? '#c1c1c1' : '#555',
        marginBottom: '60px',
        maxWidth: '800px',
        margin: '0 auto 60px',
      }}>
        Go beyond simple translations. Our platform is built with tools to enrich your spiritual and intellectual connection to the Quran.
      </p>
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, boxShadow: darkMode ? '0 15px 30px rgba(167, 201, 87, 0.3)' : '0 15px 30px rgba(61, 91, 48, 0.15)' }}
            style={{
              background: darkMode ? 'rgba(27, 41, 10, 0.9)' : 'white',
              borderRadius: '20px',
              padding: '30px',
              border: `1px solid ${darkMode ? 'rgba(167, 201, 87, 0.2)' : 'rgba(74, 109, 59, 0.1)'}`,
              transition: 'all 0.4s ease',
              textAlign: 'left',
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              background: currentTheme.buttonBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: 'white',
              marginBottom: '20px',
            }}>
              {feature.icon}
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: currentTheme.primary,
              marginBottom: '10px',
            }}>
              {feature.title}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: darkMode ? '#c1c1c1' : '#555',
              lineHeight: 1.6,
            }}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// AnimatedCounter component
function AnimatedCounter({ target, duration = 3 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const totalFrames = duration * 60;
    let frame = 0;

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function updateCounter() {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentCount = Math.floor(progress * target);
      setCount(currentCount > target ? target : currentCount);

      if (frame < totalFrames) {
        requestAnimationFrame(updateCounter);
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(updateCounter);
    }, 1500); // Delay the start of the animation

    return () => {
      clearTimeout(timer);
      setCount(target);
    };
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}

// HoverableFeatureCard component
const HoverableFeatureCard = ({ title, description, icon, href, currentTheme, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6, boxShadow: darkMode ? '0 12px 30px rgba(167, 201, 87, 0.4)' : '0 12px 30px rgba(61, 91, 48, 0.25)' }}
      whileTap={{ scale: 0.98 }}
      style={{
        flex: 1,
        minWidth: 250,
        backgroundColor: darkMode ? "rgba(27, 41, 10, 0.9)" : "rgba(255, 255, 255, 0.85)",
        borderRadius: 22,
        padding: "30px",
        boxShadow: darkMode ? '0 6px 20px rgba(167, 201, 87, 0.3)' : '0 6px 20px rgba(61, 91, 48, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        border: `1px solid ${darkMode ? 'rgba(167, 201, 87, 0.2)' : 'rgba(74, 109, 59, 0.1)'}`,
        transition: 'all 0.4s ease',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 14,
          backgroundColor: darkMode ? '#4a6d3b' : '#a7c957',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {icon}
      </div>
      <div style={{ textAlign: 'left' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: currentTheme.primary,
          margin: 0,
          marginBottom: 8,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '1rem',
          color: darkMode ? '#c1c1c1' : '#555',
          margin: 0,
          lineHeight: 1.5,
        }}>
          {description}
        </p>
      </div>
      <AnimatePresence>
        {isHovered && href && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: 'auto',
            }}
          >
            <Link href={href} passHref>
              {/* Correct way to handle nested anchor tags */}
              <motion.a
                style={{
                  textDecoration: 'none',
                  color: currentTheme.primary,
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                whileHover={{ x: 5 }}
              >
                Explore
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.a>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ChatPageContent component, adapted to be a sub-component
const ChatPageContent = ({ darkMode, currentTheme, onGoBack }) => {
  const primaryColor = darkMode ? '#a7c957' : '#4a6d3b';
  const secondaryColor = darkMode ? '#a7c957' : '#a7c957';
  const mutedTextColor = darkMode ? '#c1c1c1' : '#888';
  const chatBgColor = darkMode ? '#181818' : '#f0f4e8';
  const panelBgColor = darkMode ? '#222' : 'white';
  const panelShadow = darkMode ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.08)';

  const containerStyle = {
    display: 'flex',
    minHeight: 'calc(100vh - 60px)', 
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: 'white',
    color: darkMode ? '#d4d4d4' : '#333',
    maxWidth: '1200px',
    margin: '30px auto',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: panelShadow,
    flexGrow: 1,
  };

  const sidebarStyle = {
    width: '280px',
    backgroundColor: panelBgColor,
    padding: '24px 16px',
    borderRight: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  };

  const sidebarHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    marginBottom: '20px',
  };

  const sidebarTitleStyle = {
    fontSize: '24px',
    fontWeight: '900',
    color: primaryColor,
    letterSpacing: '1px',
  };

  const sidebarButtonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    flexGrow: 1,
    marginTop: '20px',
  };

  const sidebarButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 16px',
    borderRadius: '12px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    color: primaryColor,
    transition: 'background-color 0.2s, transform 0.1s',
  };
  
  const sidebarButtonHoverStyle = {
    backgroundColor: darkMode ? 'rgba(167, 201, 87, 0.1)' : 'rgba(74, 109, 59, 0.1)',
  };

  const sidebarIconStyle = {
    fontSize: '20px',
  };

  const mainContentStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: '24px',
    backgroundColor: chatBgColor,
  };

  const chatPanelStyle = {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: panelBgColor,
    borderRadius: '24px',
    boxShadow: panelShadow,
    marginRight: '24px',
    padding: '24px',
  };

  const chatMessageContainerStyle = {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const aiMessageBubbleStyle = {
    backgroundColor: primaryColor,
    color: 'white',
    padding: '16px 20px',
    borderRadius: '20px 20px 20px 6px',
    maxWidth: '70%',
    alignSelf: 'flex-start',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  };

  const userMessageBubbleStyle = {
    backgroundColor: darkMode ? '#333' : '#e0e8e0',
    color: darkMode ? '#d4d4d4' : '#333',
    padding: '16px 20px',
    borderRadius: '20px 20px 6px 20px',
    maxWidth: '70%',
    alignSelf: 'flex-end',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  };
  
  const verseTextArStyle = {
    fontFamily: '"Amiri", serif', 
    fontSize: '22px', 
    direction: 'rtl',
    lineHeight: 1.8,
    borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
    paddingBottom: '10px',
    marginBottom: '10px',
  };
  
  const verseTranslationStyle = {
    fontSize: '16px',
    fontWeight: '400',
    fontStyle: 'italic',
    lineHeight: 1.5,
    opacity: 0.9,
  };

  const chatInputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginTop: '20px',
  };

  const chatInputStyle = {
    width: '100%',
    padding: '16px 24px',
    borderRadius: '30px',
    border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
    fontSize: '16px',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#333',
  };

  const exploreButtonStyle = {
    backgroundColor: 'transparent',
    border: `2px solid ${primaryColor}`,
    color: primaryColor,
    padding: '12px 24px',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
  };

  const rightPanelStyle = {
    flex: 1,
    backgroundColor: panelBgColor,
    borderRadius: '24px',
    padding: '30px',
    boxShadow: panelShadow,
  };

  const featureCardStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor: darkMode ? 'rgba(167, 201, 87, 0.1)' : '#f8f8f4',
    marginBottom: '16px',
  };

  const featureIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: secondaryColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  const tryAiButtonStyle = {
    marginTop: '30px', 
    width: '100%', 
    padding: '16px', 
    borderRadius: '30px', 
    backgroundColor: primaryColor,
    color: 'white',
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  };

  return (
    <div style={containerStyle}>
      {/* Left Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ width: '100%' }}>
          <div style={sidebarHeaderStyle}>
            <NewLogo width={36} darkMode={darkMode} />
            <span style={sidebarTitleStyle}>QuranPlus AI</span>
          </div>
          <p style={{ color: mutedTextColor, fontSize: '14px', marginTop: '4px' }}>Your spiritual companion</p>
        </div>
        
        <div style={sidebarButtonContainerStyle}>
           <button style={{...sidebarButtonStyle, ...sidebarButtonHoverStyle}} onClick={onGoBack}>
             <FaChevronLeft style={sidebarIconStyle} />
             <span>Go Back to Home</span>
           </button>
           <button style={sidebarButtonStyle} >
             <FaRegLightbulb style={sidebarIconStyle} />
             <span>Discover Insights</span>
           </button>
           <button style={sidebarButtonStyle}>
             <FaBook style={sidebarIconStyle} />
             <span>Read Quran</span>
           </button>
         </div>
         
         <div style={{ width: '100%', marginTop: 'auto' }}>
           <button style={sidebarButtonStyle}>
             <FaCog style={sidebarIconStyle} />
             <span>Settings</span>
           </button>
         </div>
       </div>

       {/* Main Content Area */}
       <div style={mainContentStyle}>
         {/* Chat Panel */}
         <div style={chatPanelStyle}>
           <div style={chatMessageContainerStyle}>
             <div style={userMessageBubbleStyle}>
               I understand you're going through a challenging time.
             </div>
             
             <div style={aiMessageBubbleStyle}>
               <p style={verseTextArStyle}>
                 وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
               </p>
               <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.7)' }}>
                 At-Talaq 65:2
               </p>
               <p style={verseTranslationStyle}>
                 "And whoever fears Allah - He will make for him a way out." This verse reminds us that divine solutions exist
               </p>
             </div>
           </div>
           
           <div style={chatInputContainerStyle}>
             <input 
               type="text" 
               placeholder="شروع گفتگوی واقعی" 
               style={chatInputStyle}
             />
             <button style={exploreButtonStyle}>
               + Explore Tafsir
             </button>
           </div>
         </div>

         {/* Right Panel */}
         <div style={rightPanelStyle}>
           <h2 style={{ color: primaryColor, fontSize: '24px', fontWeight: 'bold', margin: 0, marginBottom: '20px' }}>
             Intelligent Conversations with Purpose
           </h2>
           <p style={{ color: mutedTextColor, fontSize: '16px', lineHeight: 1.6, marginBottom: '30px' }}>
             Our AI understands context, emotion, and spiritual needs. Every response is crafted to provide meaningful guidance rooted in authentic Islamic teachings.
           </p>

           <div style={featureCardStyle}>
             <div style={featureIconStyle}>
               <FaRegLightbulb />
             </div>
             <div>
               <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: primaryColor }}>Contextual Understanding</h3>
               <p style={{ margin: 0, fontSize: '14px', color: mutedTextColor }}>AI recognizes your emotional state and life situation</p>
             </div>
           </div>
           
           <div style={featureCardStyle}>
             <div style={featureIconStyle}>
               <FaBook />
             </div>
             <div>
               <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: primaryColor }}>Authentic Sources</h3>
               <p style={{ margin: 0, fontSize: '14px', color: mutedTextColor }}>All responses backed by verified Quranic verses and scholarly interpretations</p>
             </div>
           </div>
           
           <div style={featureCardStyle}>
             <div style={featureIconStyle}>
               <FaRegLightbulb />
             </div>
             <div>
               <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: primaryColor }}>Personalized Guidance</h3>
               <p style={{ margin: 0, fontSize: '14px', color: mutedTextColor }}>Tailored advice that grows with your spiritual journey</p>
             </div>
           </div>
           
           <button style={tryAiButtonStyle}>
             <FaRegLightbulb />
             Try AI Assistant Now
           </button>
         </div>
       </div>
     </div>
   );
};

// Main HomePage component with dynamic rendering
export default function HomePage() {
  const { theme, mounted } = useTheme();
  const darkMode = theme === 'dark';
  const [isChatOpen, setIsChatOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100 };
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = ({ clientX, clientY }) => {
    const rect = document.body.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 20,
  };
  
  const buttonBaseStyle = {
    padding: "14px 36px",
    borderRadius: 30,
    fontSize: 16,
    fontWeight: "700",
    cursor: "pointer",
    minWidth: 180,
    userSelect: "none",
    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    position: "relative",
    overflow: "hidden",
    willChange: "transform, box-shadow",
  };

  const parallaxHexagram1 = useTransform(springMouseX, [0, 1], [-50, 50]);
  const parallaxHexagram2 = useTransform(springMouseY, [0, 1], [-40, 40]);
  const parallaxHexagram3 = useTransform(springMouseX, [0, 1], [40, -40]);
  const parallaxHexagram4 = useTransform(springMouseY, [0, 1], [50, -50]);
  const parallaxHexagram5 = useTransform(springMouseX, [0, 1], [-30, 30]);

  const variants = {
    hidden: { opacity: 0, y: 30, transition: { duration: 0.6 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } },
  };

  const themeColors = {
    light: {
      primary: "#4a6d3b",
      secondary: "#a7c957",
      background: "#f8f8f4",
      headerBg: "rgba(255, 255, 255, 0.7)",
      headerShadow: "0 2px 10px rgba(0,0,0,0.12)",
      headerLogo: "#4a6d3b",
      buttonBg: `linear-gradient(45deg, #a7c957, #4a6d3b)`,
      buttonColor: "white",
      buttonBorder: "#4a6d3b",
    },
    dark: {
      primary: "#a7c957",
      secondary: "#a7c957",
      background: "#121212",
      headerBg: "rgba(18, 18, 18, 0.7)",
      headerShadow: "0 2px 14px rgba(0,0,0,0.9)",
      headerLogo: "#a7c957",
      buttonBg: `linear-gradient(45deg, #a7c957, #4a6d3b)`,
      buttonColor: "white",
      buttonBorder: "#a7c957",
    },
  };

  const currentTheme = darkMode ? themeColors.dark : themeColors.light;
  
  const handleStartConversation = () => {
    setIsChatOpen(true);
  };
  
  const handleGoBack = () => {
    setIsChatOpen(false);
  };

  return (
    <motion.div
      style={{
        position: "relative",
        overflowX: "hidden",
        background: currentTheme.background,
        minHeight: "100vh",
        padding: "60px 20px 0",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        color: currentTheme.primary,
        transition: "all 0.6s ease",
        cursor: "default",
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(167, 201, 87, 0.08) 0%, transparent 70%)",
          zIndex: 0,
          transition: "all 1s ease",
        }}
      />
      
      {/* Hexagrams */}
      <motion.svg
        viewBox="0 0 250 250"
        style={{
          position: "absolute", top: "15%", left: "10%", width: 250, height: 250, opacity: 0.15,
          userSelect: "none", pointerEvents: "none", filter: darkMode ? "blur(4px) brightness(0.8)" : "blur(3px)",
          mixBlendMode: darkMode ? "screen" : "normal", x: parallaxHexagram1,
        }}
        animate={{ rotate: 360 }}
        transition={spinTransition}
        aria-hidden="true"
      >
        <polygon points="125,0 240,62 240,188 125,250 10,188 10,62" fill={darkMode ? "#a7c957" : "#4a6d3b"} />
      </motion.svg>
      <motion.svg
        viewBox="0 0 300 300"
        style={{
          position: "absolute", top: "60%", left: "70%", width: 300, height: 300, opacity: 0.15,
          userSelect: "none", pointerEvents: "none", filter: darkMode ? "blur(4px) brightness(0.8)" : "blur(3px)",
          mixBlendMode: darkMode ? "screen" : "normal", y: parallaxHexagram2,
        }}
        animate={{ rotate: 360 }}
        transition={{ ...spinTransition, duration: 25, delay: 8 }}
        aria-hidden="true"
      >
        <polygon points="150,0 276,75 276,225 150,300 24,225 24,75" fill={darkMode ? "#a7c957" : "#4a6d3b"} />
      </motion.svg>
      <motion.svg
        viewBox="0 0 200 200"
        style={{
          position: "absolute", top: "30%", left: "80%", width: 200, height: 200, opacity: 0.15,
          userSelect: "none", pointerEvents: "none", filter: darkMode ? "blur(4px) brightness(0.8)" : "blur(3px)",
          mixBlendMode: darkMode ? "screen" : "normal", x: parallaxHexagram3,
        }}
        animate={{ rotate: 360 }}
        transition={{ ...spinTransition, duration: 18, delay: 16 }}
        aria-hidden="true"
      >
        <polygon points="100,0 190,55 190,145 100,200 10,145 10,55" fill={darkMode ? "#a7c957" : "#4a6d3b"} />
      </motion.svg>
      {/* New Hexagrams */}
      <motion.svg
        viewBox="0 0 180 180"
        style={{
          position: "absolute", bottom: "10%", left: "25%", width: 180, height: 180, opacity: 0.1,
          userSelect: "none", pointerEvents: "none", filter: darkMode ? "blur(2px) brightness(0.7)" : "blur(2px)",
          mixBlendMode: darkMode ? "screen" : "normal", x: parallaxHexagram4,
        }}
        animate={{ rotate: 360 }}
        transition={{ ...spinTransition, duration: 30, delay: 20 }}
        aria-hidden="true"
      >
        <polygon points="90,0 170,45 170,135 90,180 10,135 10,45" fill={darkMode ? "#a7c957" : "#4a6d3b"} />
      </motion.svg>
      <motion.svg
        viewBox="0 0 150 150"
        style={{
          position: "absolute", top: "50%", left: "15%", width: 150, height: 150, opacity: 0.1,
          userSelect: "none", pointerEvents: "none", filter: darkMode ? "blur(2px) brightness(0.7)" : "blur(2px)",
          mixBlendMode: darkMode ? "screen" : "normal", y: parallaxHexagram5,
        }}
        animate={{ rotate: 360 }}
        transition={{ ...spinTransition, duration: 22, delay: 12 }}
        aria-hidden="true"
      >
        <polygon points="75,0 140,40 140,110 75,150 10,110 10,40" fill={darkMode ? "#a7c957" : "#4a6d3b"} />
      </motion.svg>

      {/* Header */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 60,
          backgroundColor: currentTheme.headerBg, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 20px", boxShadow: currentTheme.headerShadow,
          backdropFilter: "blur(15px)", zIndex: 10, transition: "all 0.5s ease",
          fontWeight: "700", userSelect: "none",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", gap: 12, color: currentTheme.headerLogo,
            fontSize: 26, filter: "drop-shadow(0 0 3px rgba(0,0,0,0.25))",
          }}
        >
          <NewLogo width={38} darkMode={darkMode} />
          
          <span
            style={{
              fontWeight: "900", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              letterSpacing: "1.1px", color: currentTheme.headerLogo,
            }}
          >
            QuranPlus
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <ThemeToggle />
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: darkMode ? "0 0 15px 5px rgba(33, 209, 217, 0.5)" : "0 0 15px 5px rgba(74, 109, 59, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...buttonBaseStyle, minWidth: 80, padding: "10px 20px", border: "none", color: "white",
              background: currentTheme.buttonBg, boxShadow: "0 4px 10px rgba(0,0,0,0.2)", userSelect: "text",
            }}
            onClick={handleStartConversation}
          >
            AI
          </motion.button>
          
          <Link href="/loginpage" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...buttonBaseStyle, minWidth: 80, padding: "10px 20px", color: currentTheme.buttonBorder,
                background: "transparent", border: `2px solid ${currentTheme.buttonBorder}`,
                boxShadow: "0 4-10px rgba(0,0,0,0.1)", textDecoration: "none", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >
              Login
            </motion.a>
          </Link>
          
          <Link href="/signuppage" passHref>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: darkMode ? "0 0 15px 5px rgba(33, 209, 217, 0.5)" : "0 0 15px 5px rgba(74, 109, 59, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...buttonBaseStyle, minWidth: 80, padding: "10px 20px", border: "none",
                color: "white", background: currentTheme.buttonBg,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)", textDecoration: "none", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >
              Signup
            </motion.a>
          </Link>
        </div>
      </header>
      
      {/* Main Content: Conditionally render the landing page or chat page */}
      <motion.div
        initial="hidden" animate="visible"
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', flexGrow: 1 }}
            >
              <ChatPageContent darkMode={darkMode} currentTheme={currentTheme} onGoBack={handleGoBack} />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              style={{
                maxWidth: 900, margin: "120px auto 0", position: "relative", zIndex: 1,
                textAlign: "center", userSelect: "none", flexGrow: 1,
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 3.8rem)", fontWeight: "900", marginBottom: 20,
                  letterSpacing: "1.3px", color: currentTheme.primary, textShadow: darkMode ? "0 0 12px #a7c957aa" : "0 0 6px #4a6d3baa",
                  transition: "all 0.5s ease",
                }}
              >
                Transform Your{" "}
                <motion.span
                  style={{ color: darkMode ? "#d4ca7e" : "#c6a24f" }}
                  animate={{ color: [darkMode ? "#d4ca7e" : "#c6a24f", darkMode ? "#ffebb7" : "#a3824f", darkMode ? "#d4ca7e" : "#c6a24f"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  Spiritual Journey
                </motion.span>
              </h1>
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.3rem)", color: darkMode ? "#c1c1c1" : "#555",
                  maxWidth: 700, margin: "0 auto 50px", lineHeight: 1.75, fontWeight: "500",
                  textShadow: darkMode ? "0 0 4px #00000088" : "none", transition: "all 0.5s ease",
                }}
              >
                Experience the Quran like never before with intelligent AI guidance,
                personalized insights, and meaningful conversations that illuminate your
                path.
              </p>

              <div
                style={{
                  display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap",
                  marginBottom: 80,
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.12, boxShadow: `0 12px 28px ${darkMode ? "rgba(167, 201, 87, 0.6)" : "rgba(61, 91, 48, 0.6)"}` }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    ...buttonBaseStyle, backgroundColor: darkMode ? "#a7c957" : "#4a6d3b",
                    color: darkMode ? "#121212" : "white", border: "none", outline: "none",
                    userSelect: "none", fontWeight: "900", letterSpacing: "0.04em",
                    boxShadow: darkMode ? "0 6px 15px rgba(167, 201, 87, 0.6)" : "0 6px 15px rgba(61, 91, 48, 0.6)",
                    textShadow: "0 0 2px rgba(0,0,0,0.18)",
                  }}
                  onClick={handleStartConversation}
                >
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }} >
                    Start AI Conversation
                  </motion.span>
                </motion.button>
                
                <motion.button
                  whileHover={{
                    scale: 1.12, backgroundColor: darkMode ? "#4a6d3b" : "#a7c957",
                    color: darkMode ? "white" : "#1a1a1a",
                    boxShadow: `0 12px 28px ${darkMode ? "rgba(167, 201, 87, 0.6)" : "rgba(61, 91, 48, 0.6)"}`,
                    borderColor: "transparent",
                  }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    ...buttonBaseStyle, backgroundColor: "transparent", color: darkMode ? "#a7c957" : "#4a6d3b",
                    border: `2px solid ${darkMode ? "#a7c957" : "#4a6d3b"}`, outline: "none", fontWeight: "700",
                    minWidth: 180, boxShadow: darkMode ? "none" : "0 6px 25px rgba(61, 91, 48, 0.18)",
                  }}
                >
                  Dashboard
                </motion.button>
              </div>

              {/* بخش آیه روز */}
              <div style={{
                maxWidth: '800px',
                margin: '60px auto',
                padding: '20px',
                borderRadius: '20px',
                backgroundColor: currentTheme.background,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <VerseOfTheDay />
              </div>

              {/* این بخش اول از پایین قرار داده شده است */}
              <motion.div
                style={{
                  display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap",
                  userSelect: "none", maxWidth: 900, margin: "0 auto", paddingBottom: '120px',
                }}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                {[
                  { label: "Active Users", value: 50000, suffix: "+" },
                  { label: "AI Conversations", value: 1000000, suffix: "+" },
                  { label: "Satisfaction", value: 98, suffix: "%" },
                ].map(({ label, value, suffix }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -8, boxShadow: `0 14px 40px rgba(0,0,0,0.18)` }}
                    style={{
                      backgroundColor: darkMode ? "rgba(27, 41, 10, 0.9)" : "rgba(255, 255, 255, 0.85)",
                      padding: "28px 24px", borderRadius: 22,
                      boxShadow: darkMode ? "0 8px 30px rgba(167, 201, 87, 0.4)" : "0 6px 25px rgba(61, 91, 48, 0.18)",
                      textAlign: "center", flex: "1 1 auto", minWidth: 150, cursor: "default",
                      userSelect: "text", color: darkMode ? "#a7c957" : "#4a6d3b",
                      fontWeight: "700", margin: "0 6px", transition: "all 0.4s ease",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(2.5rem, 4vw, 3.4rem)", fontWeight: "900", userSelect: "text",
                        textShadow: darkMode ? "0 0 12px #a7c957bb" : "0 0 4px #4a6d3baa",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}
                    >
                      <AnimatedCounter target={value} duration={4} />
                      {suffix}
                    </div>
                    <div
                      style={{
                        marginTop: 8, fontSize: 18, fontWeight: 600, userSelect: "text",
                        color: darkMode ? "#cadcad" : "#4a6d3b",
                      }}
                    >
                      {label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* این بخش دوم از پایین قرار داده شده است */}
              <AdvancedFeaturesSection darkMode={darkMode} currentTheme={currentTheme} />


              {/* New Section for Feature Cards */}
              <motion.div
                style={{
                  display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap",
                  marginTop: 80, maxWidth: 1000, margin: "80px auto",
                }}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <HoverableFeatureCard
                  title="AI-Powered Insights"
                  description="Get instant answers to your spiritual questions"
                  href="#"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 10.5C13.5 9.11929 12.3807 8 11 8C9.61929 8 8.5 9.11929 8.5 10.5C8.5 11.8807 9.61929 13 11 13C12.3807 13 13.5 11.8807 13.5 10.5ZM19.5 11C19.5 8.23858 17.2614 6 14.5 6C13.7816 6 13.1114 6.18562 12.5516 6.51613L11 8.5L9.4484 6.51613C8.88859 6.18562 8.21841 6 7.5 6C4.73858 6 2.5 8.23858 2.5 11C2.5 13.7614 4.73858 16 7.5 16C8.21841 16 8.88859 15.8144 9.4484 15.4839L11 13.5L12.5516 15.4839C13.1114 15.8144 13.7816 16 14.5 16C17.2614 16 19.5 13.7614 19.5 11Z" fill="currentColor"/>
                    </svg>
                  }
                  currentTheme={currentTheme}
                  darkMode={darkMode}
                />
                
                <HoverableFeatureCard
                  title="Progress Tracking"
                  description="Monitor your spiritual growth and learning"
                  href="#"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13 17H11V13H8V11H11V8H13V11H16V13H13V17Z" fill="currentColor"/>
                    </svg>
                  }
                  currentTheme={currentTheme}
                  darkMode={darkMode}
                />
                
                <HoverableFeatureCard
                  title="Interactive Reading"
                  description="Experience the Quran with modern tools"
                  href="#"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9M15 4V7C15 8.10457 15.8954 9 17 9H21M15 4H19C20.1046 4 21 4.89543 21 6V9M5 8H13M5 12H17M5 16H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  currentTheme={currentTheme}
                  darkMode={darkMode}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Footer component */}
      <Footer darkMode={darkMode} currentTheme={currentTheme} />
    </motion.div>
  );
}

// Footer component
const Footer = ({ darkMode, currentTheme }) => {
  const footerLinkStyle = {
    color: darkMode ? '#d4d4d4' : '#4a6d3b',
    textDecoration: 'none',
    marginBottom: '10px',
    fontSize: '0.95rem',
    transition: 'color 0.3s ease',
  };

  return (
    <footer style={{
      marginTop: 'auto',
      backgroundColor: darkMode ? '#181818' : '#f0f4e8',
      color: darkMode ? '#d4d4d4' : '#4a6d3b',
      padding: '80px 20px 20px',
      borderTop: `1px solid ${darkMode ? '#444' : '#ccc'}`,
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
        {/* About Section */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: currentTheme.headerLogo }}>
            <NewLogo width={40} darkMode={darkMode} />
            <span style={{ fontSize: '1.5rem', fontWeight: '900' }}>QuranPlus</span>
          </div>
          <p style={{ fontSize: '1rem', color: darkMode ? '#c1c1c1' : '#555', lineHeight: 1.6 }}>
            Your AI-powered companion for deeper understanding and spiritual growth through the Holy Quran.
          </p>
          <div style={{
            marginTop: '20px',
            padding: '15px',
            border: `1px solid ${darkMode ? '#4a6d3b' : '#a7c957'}`,
            borderRadius: '10px',
            display: 'inline-block',
            backgroundColor: darkMode ? 'rgba(74, 109, 59, 0.2)' : 'rgba(167, 201, 87, 0.1)',
          }}>
            <p style={{ margin: 0, color: darkMode ? '#a7c957' : '#4a6d3b', fontStyle: 'italic', fontSize: '1.1rem' }}>
              وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '25px', color: currentTheme.primary }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="#" style={footerLinkStyle}>About Us</Link>
            <Link href="#" style={footerLinkStyle}>Features</Link>
            <Link href="#" style={footerLinkStyle}>How It Works</Link>
            <Link href="#" style={footerLinkStyle}>Testimonials</Link>
            <Link href="#" style={footerLinkStyle}>Blog</Link>
            <Link href="#" style={footerLinkStyle}>Support</Link>
          </div>
        </div>

        {/* Community */}
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '25px', color: currentTheme.primary }}>Community</h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="#" style={footerLinkStyle}>Prayer Times</Link>
            <Link href="#" style={footerLinkStyle}>Islamic Calendar</Link>
            <Link href="#" style={footerLinkStyle}>Study Groups</Link>
            <Link href="#" style={footerLinkStyle}>Q&A Forum</Link>
            <Link href="#" style={footerLinkStyle}>Islamic Resources</Link>
            <Link href="#" style={footerLinkStyle}>Downloads</Link>
          </div>
        </div>

        {/* Stay Connected */}
        <div style={{ flex: '1.5', minWidth: '250px' }}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '25px', color: currentTheme.primary }}>Stay Connected</h4>
          <p style={{ fontSize: '1rem', color: darkMode ? '#c1c1c1' : '#555', marginBottom: '20px' }}>
            Get daily verses, spiritual insights, and updates delivered to your inbox.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '30px',
                  border: '1px solid #ccc',
                  backgroundColor: darkMode ? '#222' : '#fff',
                  color: darkMode ? '#fff' : '#333',
                  outline: 'none',
                  fontSize: '1rem',
                }}
              />
              <button
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  backgroundColor: currentTheme.buttonBg,
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <motion.span whileHover={{ scale: 1.1 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </motion.span>
                Subscribe
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
              <span style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>Follow Us</span>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href="#" style={{ color: darkMode ? '#a7c957' : '#4a6d3b', fontSize: '1.5rem' }}><FaFacebook /></a>
                <a href="#" style={{ color: darkMode ? '#a7c957' : '#4a6d3b', fontSize: '1.5rem' }}><FaTwitter /></a>
                <a href="#" style={{ color: darkMode ? '#a7c957' : '#4a6d3b', fontSize: '1.5rem' }}><FaInstagram /></a>
                <a href="#" style={{ color: darkMode ? '#a7c957' : '#4a6d3b', fontSize: '1.5rem' }}><FaYoutube /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: `1px solid ${darkMode ? '#444' : '#ccc'}`,
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: darkMode ? '#777' : '#888' }}>
          © 2024 QuranPlus. All rights reserved. Built with respect for Islamic values and digital ethics.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <Link href="#" style={{ ...footerLinkStyle, marginBottom: 0, fontSize: '0.85rem' }}>Privacy Policy</Link>
          <Link href="#" style={{ ...footerLinkStyle, marginBottom: 0, fontSize: '0.85rem' }}>Terms of Service</Link>
          <Link href="#" style={{ ...footerLinkStyle, marginBottom: 0, fontSize: '0.85rem' }}>Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};