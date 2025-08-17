import React from 'react';
import { FaChevronLeft, FaRegLightbulb, FaBook, FaCog } from 'react-icons/fa';
import NewLogo from 'components/ui/NewLogo';

const ChatPage = ({ darkMode, currentTheme, onGoBack }) => {
    const primaryColor = darkMode ? '#a7c957' : '#4a6d3b';
    const secondaryColor = darkMode ? '#a7c957' : '#a7c957';
    const mutedTextColor = darkMode ? '#c1c1c1' : '#888';
    const chatBgColor = darkMode ? '#181818' : '#f0f4e8';
    const panelBgColor = darkMode ? '#222' : 'white';
    const panelShadow = darkMode ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.08)';

    // All style objects from the original ChatPageContent go here...
    // To keep it brief, I'm omitting the large style objects, but you should copy them from your original file.
    const containerStyle = { display: 'flex', minHeight: 'calc(100vh - 60px)', fontFamily: '"Segoe UI", sans-serif', backgroundColor: 'white', color: darkMode ? '#d4d4d4' : '#333', maxWidth: '1200px', margin: '30px auto', borderRadius: '24px', overflow: 'hidden', boxShadow: panelShadow, flexGrow: 1 };
    const sidebarStyle = { width: '280px', backgroundColor: panelBgColor, padding: '24px 16px', borderRight: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 };
    const sidebarHeaderStyle = { display: 'flex', alignItems: 'center', gap: '12px', width: '100%', marginBottom: '20px' };
    const sidebarTitleStyle = { fontSize: '24px', fontWeight: '900', color: primaryColor, letterSpacing: '1px' };
    const sidebarButtonContainerStyle = { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', flexGrow: 1, marginTop: '20px' };
    const sidebarButtonStyle = { display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', borderRadius: '12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '600', color: primaryColor, transition: 'background-color 0.2s, transform 0.1s' };
    const sidebarButtonHoverStyle = { backgroundColor: darkMode ? 'rgba(167, 201, 87, 0.1)' : 'rgba(74, 109, 59, 0.1)' };
    const sidebarIconStyle = { fontSize: '20px' };
    const mainContentStyle = { flexGrow: 1, display: 'flex', flexDirection: 'row', padding: '24px', backgroundColor: chatBgColor };
    const chatPanelStyle = { flex: 2, display: 'flex', flexDirection: 'column', backgroundColor: panelBgColor, borderRadius: '24px', boxShadow: panelShadow, marginRight: '24px', padding: '24px' };
    const chatMessageContainerStyle = { flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' };
    const aiMessageBubbleStyle = { backgroundColor: primaryColor, color: 'white', padding: '16px 20px', borderRadius: '20px 20px 20px 6px', maxWidth: '70%', alignSelf: 'flex-start', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' };
    const userMessageBubbleStyle = { backgroundColor: darkMode ? '#333' : '#e0e8e0', color: darkMode ? '#d4d4d4' : '#333', padding: '16px 20px', borderRadius: '20px 20px 6px 20px', maxWidth: '70%', alignSelf: 'flex-end', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' };
    const verseTextArStyle = { fontFamily: '"Amiri", serif', fontSize: '22px', direction: 'rtl', lineHeight: 1.8, borderBottom: '1px solid rgba(255, 255, 255, 0.4)', paddingBottom: '10px', marginBottom: '10px' };
    const verseTranslationStyle = { fontSize: '16px', fontWeight: '400', fontStyle: 'italic', lineHeight: 1.5, opacity: 0.9 };
    const chatInputContainerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '20px' };
    const chatInputStyle = { width: '100%', padding: '16px 24px', borderRadius: '30px', border: `1px solid ${darkMode ? '#444' : '#ddd'}`, fontSize: '16px', outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333' };
    const exploreButtonStyle = { backgroundColor: 'transparent', border: `2px solid ${primaryColor}`, color: primaryColor, padding: '12px 24px', borderRadius: '30px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s, color 0.2s' };
    const rightPanelStyle = { flex: 1, backgroundColor: panelBgColor, borderRadius: '24px', padding: '30px', boxShadow: panelShadow };
    const featureCardStyle = { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '16px', backgroundColor: darkMode ? 'rgba(167, 201, 87, 0.1)' : '#f8f8f4', marginBottom: '16px' };
    const featureIconStyle = { width: '40px', height: '40px', borderRadius: '12px', backgroundColor: secondaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' };
    const tryAiButtonStyle = { marginTop: '30px', width: '100%', padding: '16px', borderRadius: '30px', backgroundColor: primaryColor, color: 'white', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' };

    return (
        <div style={containerStyle}>
            {/* JSX for the chat page goes here, exactly as it was in the original file */}
            {/* Make sure to replace <NewLogo ... /> with the imported component */}
            <div style={sidebarStyle}>
                <div style={{ width: '100%' }}>
                    <div style={sidebarHeaderStyle}>
                        <NewLogo width={36} darkMode={darkMode} />
                        <span style={sidebarTitleStyle}>QuranPlus AI</span>
                    </div>
                    <p style={{ color: mutedTextColor, fontSize: '14px', marginTop: '4px' }}>Your spiritual companion</p>
                </div>
                <div style={sidebarButtonContainerStyle}>
                    <button style={{ ...sidebarButtonStyle, ...sidebarButtonHoverStyle }} onClick={onGoBack}>
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
            <div style={mainContentStyle}>
                {/* ... rest of the ChatPage JSX */}
            </div>
        </div>
    );
};

export default ChatPage;
