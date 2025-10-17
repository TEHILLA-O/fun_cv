import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  useEffect(() => {
    if (delay > 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [delay]);

  return (
    <motion.div 
      className={`${className} text-glow`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {displayedText}
      </motion.span>
      {!isComplete && (
        <motion.span
          animate={{ 
            opacity: [1, 0, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block w-0.5 h-4 bg-pixel-green ml-1 text-glow-intense"
        />
      )}
    </motion.div>
  );
};

export default TypingText;
