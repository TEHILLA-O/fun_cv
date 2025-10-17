import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  maxValue: number;
  color?: string;
  label?: string;
  showText?: boolean;
  className?: string;
  delay?: number;
  animatedText?: boolean;
  animatedFill?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  maxValue, 
  color = 'bg-pixel-green', 
  label,
  showText = true,
  className = '',
  delay = 0,
  animatedText = true,
  animatedFill = true
}) => {
  const percentage = Math.min(Math.max(0, value / maxValue * 100), 100);
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentValue = 0;
      const increment = value / 60; // 60 steps for smooth animation
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= value) {
          currentValue = value;
          clearInterval(interval);
        }
        setDisplayedValue(Math.floor(currentValue));
      }, 16); // ~60fps

      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return (
    <div className={`w-full ${className} relative z-30`}>
      {label && (
        <motion.div 
          className="mb-1 font-medium font-pixel text-green-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {label}
        </motion.div>
      )}
      <div className="relative w-full h-6 bg-gray-800 border-2 border-yellow-600 overflow-hidden z-30">
        <motion.div 
          className={`h-full ${color} relative z-30`}
          initial={{ width: animatedFill ? 0 : `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: animatedFill ? 1.5 : 0, 
            delay: animatedFill ? delay + 0.2 : 0,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {/* Animated shine effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.2, 
              delay: animatedFill ? delay + 1.2 : delay + 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 4
            }}
          />
          
          {/* Pixel grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.1)_1px,_transparent_1px)] [background-size:3px_3px]"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </motion.div>
        
        {showText && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-end pr-3 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 1 }}
          >
            <span className="text-xs font-pixel text-white drop-shadow-lg relative z-30">
              {animatedText ? displayedValue : value}/{maxValue}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;