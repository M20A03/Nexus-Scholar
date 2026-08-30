import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, GitCompare, Network, Layers, Plus, X, ArrowRight } from 'lucide-react';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMANDS = [
  { id: 'feed', title: 'Research Feed', icon: BookOpen, path: '/feed', category: 'Navigation' },
  { id: 'search', title: 'Hybrid Paper & Author Search', icon: Search, path: '/search', category: 'Navigation' },
  { id: 'compare', title: 'Comparison Matrix Builder', icon: GitCompare, path: '/compare', category: 'Analysis' },
  { id: 'graph', title: 'Knowledge Graph Explorer', icon: Network, path: '/graph', category: 'Visualization' },
  { id: 'upload', title: 'Ingest arXiv Paper', icon: Plus, path: '/upload', category: 'Actions' },
  { id: 'architecture', title: 'System Architecture & Specs', icon: Layers, path: '/architecture', category: 'Specs' },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Escape to close
  useKeyboardShortcut('Escape', () => {
    if (isOpen) onClose();
  }, { enabled: isOpen });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredCommands = COMMANDS.filter(cmd =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredCommands[selectedIndex].path);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-20">
      <div 
        className="lumina-card max-w-xl w-full bg-white dark:bg-[#131C2A] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search size={18} className="text-slate-400 dark:text-slate-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search (e.g. graph, compare)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full py-4 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button 
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
          >
            <X size={16} />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching commands or pages found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd.path)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#1E3A5F] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-medium">{cmd.title}</div>
                      <div className="text-[10px] text-slate-400">{cmd.category}</div>
                    </div>
                  </div>
                  {isSelected && <ArrowRight size={14} className="text-[#1E3A5F] dark:text-cyan-400" />}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px]">↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px]">Enter</kbd> select</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px]">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
};
