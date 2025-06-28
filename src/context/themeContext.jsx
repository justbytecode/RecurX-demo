"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default to system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply theme to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const themeClasses = {

    background: isDarkMode ? 'bg-slate-900' : 'bg-slate-50',
    cardBackground: isDarkMode ? 'bg-slate-800' : 'bg-white',
    cardBorder: isDarkMode ? 'border-slate-700' : 'border-slate-200',
    
    // Text classes
    textPrimary: isDarkMode ? 'text-slate-50' : 'text-slate-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-slate-600',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    
    // Interactive elements
    hover: isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100',
    border: isDarkMode ? 'border-slate-600' : 'border-slate-300',
    
    // Input/Select styles
    input: isDarkMode 
      ? 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400' 
      : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-500',
    
    // Code blocks
    code: isDarkMode ? 'bg-slate-700 text-slate-100' : 'bg-slate-100 text-slate-900',
  };

  const value = {
    isDarkMode,
    setIsDarkMode,
    toggleTheme,
    themeClasses
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}