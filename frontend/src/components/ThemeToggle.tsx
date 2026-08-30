import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { mode, setMode } = useTheme();

  return (
    <div className={`inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 ${className}`}>
      <button
        onClick={() => setMode('light')}
        title="Light Mode"
        aria-label="Switch to light mode"
        className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
          mode === 'light'
            ? 'bg-white text-[#1E3A5F] shadow-xs'
            : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <Sun size={15} />
      </button>

      <button
        onClick={() => setMode('dark')}
        title="Dark Mode"
        aria-label="Switch to dark mode"
        className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
          mode === 'dark'
            ? 'bg-slate-700 text-amber-300 shadow-xs'
            : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <Moon size={15} />
      </button>

      <button
        onClick={() => setMode('system')}
        title="System Default"
        aria-label="Use system color scheme"
        className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
          mode === 'system'
            ? 'bg-white dark:bg-slate-700 text-[#1E3A5F] dark:text-cyan-300 shadow-xs'
            : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <Laptop size={15} />
      </button>
    </div>
  );
};
