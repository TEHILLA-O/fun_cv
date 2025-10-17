import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import PixelBorder from './ui/PixelBorder';
import ProgressBar from './ui/ProgressBar';
import TypingText from './ui/TypingText';
import SectionWrapper from './SectionWrapper';
import { userInfo } from '../data/userData';

const CharacterSheet: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textComplete, setTextComplete] = useState(false);
  
  const scrollAnimation = useScrollAnimation({
    threshold: 0.2,
    springConfig: { stiffness: 80, damping: 25, mass: 1 }
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.9,
      rotateX: -15,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const characterDescription = "Tehilla Obanor is a dynamic postgraduate graduate in Financial Technology with a background in Economics. Known for his analytical mindset and positive energy, he brings strong skills in data analysis, audit, and project coordination. He's proficient in Python, SQL, Tableau, and Excel, and thrives on transforming complex data into clear business insights. Tehilla recently helped plan a corporate anniversary, blending creativity with structured project management to deliver meaningful impact.";

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={scrollAnimation.ref}
          initial={{ 
            opacity: 0, 
            y: 60, 
            scale: 0.95,
            rotateX: -20,
            filter: "blur(10px)"
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)"
          }}
          style={scrollAnimation.transforms}
          transition={{ 
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 80,
            damping: 20
          }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.03,
              y: -5,
              boxShadow: "0 25px 50px rgba(0, 255, 157, 0.15)",
              rotateX: 2,
              rotateY: 2
            }}
            whileTap={{ 
              scale: 0.98,
              y: -2
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="fluid-hover"
          >
              <PixelBorder className="p-6 md:p-8" hover={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="flex flex-col justify-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                <motion.h2 
                  className="font-pixel text-xl md:text-2xl mb-6 text-pixel-green"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  CHARACTER SHEET
                </motion.h2>
                
                <div className="prose prose-invert max-w-none">
                  <TypingText 
                    text={characterDescription}
                    speed={30}
                    delay={1000}
                    className="text-gray-300 leading-relaxed"
                    onComplete={() => setTextComplete(true)}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="relative z-20"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="bg-gray-900 p-4 md:p-6 border-2 border-yellow-600 relative z-20">
                  <div className="space-y-6 relative z-20">
                    <div className="relative z-20">
                      <motion.div 
                        className="mb-2 text-green-400 font-pixel"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                      >
                        HP
                      </motion.div>
                      <div className="w-full h-6 bg-gray-800 border-2 border-yellow-600 relative">
                        <motion.div 
                          className="h-full bg-blue-500 relative"
                          initial={{ width: 0 }}
                          animate={{ width: `${(userInfo.stats.hp / userInfo.stats.maxHp) * 100}%` }}
                          transition={{ 
                            duration: 2, 
                            delay: 1.8,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ 
                              duration: 1.5, 
                              delay: 3.5,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                          />
                        </motion.div>
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-end pr-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 2.5 }}
                        >
                          <span className="text-xs font-pixel text-white">{userInfo.stats.hp}/{userInfo.stats.maxHp}</span>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <motion.div 
                        className="mb-2 text-green-400 font-pixel"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 2.0 }}
                      >
                        MANA
                      </motion.div>
                      <div className="w-full h-6 bg-gray-800 border-2 border-yellow-600 relative">
                        <motion.div 
                          className="h-full bg-pink-500 relative"
                          initial={{ width: 0 }}
                          animate={{ width: `${(userInfo.stats.mana / userInfo.stats.maxMana) * 100}%` }}
                          transition={{ 
                            duration: 2, 
                            delay: 2.3,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ 
                              duration: 1.5, 
                              delay: 4.0,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                          />
                        </motion.div>
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-end pr-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 3.0 }}
                        >
                          <span className="text-xs font-pixel text-white">{userInfo.stats.mana}/{userInfo.stats.maxMana}</span>
                        </motion.div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="grid grid-cols-2 gap-4 mt-6 relative z-20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.5 }}
                    >
                      <motion.div 
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 2.7 }}
                      >
                        <div className="text-gray-400 font-pixel text-xs">RACE</div>
                        <div className="font-pixel text-sm text-green-400">: {userInfo.stats.race}</div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 2.9 }}
                      >
                        <div className="text-gray-400 font-pixel text-xs">CLASS</div>
                        <div className="font-pixel text-sm text-blue-400">: {userInfo.stats.class}</div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 3.1 }}
                      >
                        <div className="text-gray-400 font-pixel text-xs">LEVEL</div>
                        <div className="font-pixel text-sm text-purple-400">: {userInfo.stats.level}</div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 3.3 }}
                      >
                        <div className="text-gray-400 font-pixel text-xs">EXP</div>
                        <div className="font-pixel text-sm text-orange-400">: {userInfo.stats.exp}</div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 3.5 }}
                      >
                        <div className="text-gray-400 font-pixel text-xs">LOCATION</div>
                        <div className="font-pixel text-sm text-yellow-400 truncate">: {userInfo.location}</div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </PixelBorder>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CharacterSheet;