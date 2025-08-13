import React, { createContext, useContext, useEffect, useState } from 'react';

// --- Start of useTheme hook code (Self-contained) ---
const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPreference ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    window.localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
// --- End of useTheme hook code ---

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 shadow-lg" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group overflow-hidden"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1A0B2E 0%, #2D1B3D 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #F8F5F0 100%)'
      }}
    >
      <div 
        className="absolute inset-0 rounded-full opacity-30 blur-md transition-all duration-500"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle, #00D4FF 0%, #B14AED 50%, transparent 70%)'
            : 'radial-gradient(circle, #0A5C36 0%, transparent 70%)'
        }}
      />
      
      <div className="relative w-6 h-6 flex items-center justify-center z-10 transition-transform duration-600 ease-in-out">
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-yellow-600 group-hover:text-yellow-500 transition-colors duration-300 drop-shadow-md">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 drop-shadow-glow">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </div>
    </button>
  );
}

export { ThemeProvider };
export { useTheme };