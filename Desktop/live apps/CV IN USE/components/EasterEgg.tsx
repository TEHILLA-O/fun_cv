import React from 'react';
import { motion } from 'framer-motion';
import PixelBorder from './ui/PixelBorder';
import { Cuboid as Cube3d } from 'lucide-react';

const EasterEgg: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
      >
        <PixelBorder className="p-6 bg-modern-darker max-w-md mx-auto" hover={false}>
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-pixel-gold/20 mb-4">
              <Cube3d size={48} className="text-pixel-gold" />
            </div>
            
            <h2 className="font-pixel text-lg text-pixel-gold mb-3">HIDDEN SKILL UNLOCKED!</h2>
            <h3 className="text-xl font-medium mb-2">3D Modeling Mastery</h3>
            
            <div className="w-full bg-gray-800 h-4 mb-4">
              <div className="bg-pixel-gold h-full" style={{ width: '75%' }}></div>
            </div>
            
            <p className="text-sm text-gray-300 mb-6">
              You&apos;ve discovered my secret skill! I&apos;ve been working on 3D modeling in my spare time, 
              creating assets for game development and visualization projects.
            </p>
            
            <div className="text-xs text-gray-500 font-pixel">
              ACHIEVEMENT UNLOCKED: KONAMI CODE MASTER
            </div>
          </div>
        </PixelBorder>
      </motion.div>
    </motion.div>
  );
};

export default EasterEgg;