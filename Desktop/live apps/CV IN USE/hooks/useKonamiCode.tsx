import { useEffect, useState } from 'react';

// Simplified sequence: ↑↑↓↓
const konamiCodeSequence = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown'
];

export default function useKonamiCode(callback: () => void) {
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      // Get the key pressed
      const key = e.key.toLowerCase();
      
      // Update sequence with new key
      const updatedSequence = [...sequence, key];
      
      // Only keep the last N keys pressed (where N is the length of the sequence)
      const limitedSequence = updatedSequence.slice(-konamiCodeSequence.length);
      
      setSequence(limitedSequence);
      
      // Check if sequence matches the code
      const konamiString = konamiCodeSequence.join(',').toLowerCase();
      const currentString = limitedSequence.join(',').toLowerCase();
      
      if (currentString === konamiString) {
        // Code activated!
        callback();
        // Reset sequence
        setSequence([]);
      }
    };

    // Attach and detach event listener
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [callback, sequence]);
}