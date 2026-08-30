import { useEffect } from 'react';

type KeyCombo = {
  key: string;
  ctrlOrCmd?: boolean;
  shift?: boolean;
  alt?: boolean;
};

export function useKeyboardShortcut(
  combo: KeyCombo | string,
  callback: (e: KeyboardEvent) => void,
  options: { enabled?: boolean; preventDefault?: boolean } = {}
) {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      let isMatch = false;

      if (typeof combo === 'string') {
        if (e.key.toLowerCase() === combo.toLowerCase()) {
          isMatch = true;
        }
      } else {
        const keyMatch = e.key.toLowerCase() === combo.key.toLowerCase();
        const metaMatch = combo.ctrlOrCmd ? (e.metaKey || e.ctrlKey) : true;
        const shiftMatch = combo.shift ? e.shiftKey : !e.shiftKey || combo.shift === undefined;
        const altMatch = combo.alt ? e.altKey : !e.altKey || combo.alt === undefined;

        if (keyMatch && metaMatch && (combo.shift ? shiftMatch : true) && (combo.alt ? altMatch : true)) {
          isMatch = true;
        }
      }

      if (isMatch) {
        if (preventDefault) {
          e.preventDefault();
        }
        callback(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [combo, callback, enabled, preventDefault]);
}
