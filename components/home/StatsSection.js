import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from 'components/ui/AnimatedCounter';

const stats = [
    { label: "Active Users", value: 50000, suffix: "+" },
    { label: "AI Conversations", value: 1000000, suffix: "+" },
    { label: "Satisfaction", value: 98, suffix: "%" },
];

const StatsSection = ({ darkMode }) => {
    return (
        <motion.div
            style={{ display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap", userSelect: "none", maxWidth: 900, margin: "0 auto", paddingBottom: '120px' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
        >
            {stats.map(({ label, value, suffix }) => (
                <motion.div
                    key={label}
                    whileHover={{ y: -8, boxShadow: `0 14px 40px rgba(0,0,0,0.18)` }}
                    style={{ backgroundColor: darkMode ? "rgba(27, 41, 10, 0.9)" : "rgba(255, 255, 255, 0.85)", padding: "28px 24px", borderRadius: 22, boxShadow: darkMode ? "0 8px 30px rgba(167, 201, 87, 0.4)" : "0 6px 25px rgba(61, 91, 48, 0.18)", textAlign: "center", flex: "1 1 auto", minWidth: 150, cursor: "default", userSelect: "text", color: darkMode ? "#a7c957" : "#4a6d3b", fontWeight: "700", margin: "0 6px", transition: "all 0.4s ease" }}
                >
                    <div style={{ fontSize: "clamp(2.5rem, 4vw, 3.4rem)", fontWeight: "900", userSelect: "text", textShadow: darkMode ? "0 0 12px #a7c957bb" : "0 0 4px #4a6d3baa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <AnimatedCounter target={value} duration={4} />
                        {suffix}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 18, fontWeight: 600, userSelect: "text", color: darkMode ? "#cadcad" : "#4a6d3b" }}>
                        {label}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};
export default StatsSection;