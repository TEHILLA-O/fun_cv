import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PixelBorder from './ui/PixelBorder';
import ProgressBar from './ui/ProgressBar';
import { skills } from '../data/userData';

const SkillMastery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'design' | 'data' | 'other'>('design');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"]
  });

  // Transform scroll progress to rotation values - correct orientation when in view
  const rotateX = useTransform(scrollYProgress, [0, 0.1, 0.4, 1], [45, 45, 0, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.1, 0.4, 1], [-30, -30, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.4, 1], [0.8, 0.8, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.8, 1], [0, 0.5, 1, 1, 0.8]);

  const categories = [
    { id: 'design', label: 'Design Tools' },
    { id: 'data', label: 'Data Skills' },
    { id: 'other', label: 'Specialization' },
  ];

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.9,
      rotateX: -10,
      filter: "blur(3px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="skills"
      className="py-20 relative"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        opacity,
      }}
    >
      <motion.div
        className="container mx-auto px-4"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="font-pixel text-2xl mb-8 text-center text-pixel-green"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            SKILL MASTERY
          </motion.h2>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <PixelBorder 
                  className={`cursor-pointer ${activeCategory === category.id ? 'border-pixel-green' : ''}`}
              >
                <button
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`px-4 py-2 ${activeCategory === category.id ? 'bg-pixel-green text-black' : 'bg-transparent'}`}
                >
                  {category.label}
                </button>
              </PixelBorder>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
          <PixelBorder className="p-6 md:p-8" hover={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <motion.div 
                  key={skill.name} 
                    className="bg-modern-darker p-4 border border-gray-700 relative group"
                    initial={{ opacity: 0, y: 20, rotateX: 15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                      borderColor: skill.color || '#00FF9D',
                      rotateX: 5,
                      rotateY: 2
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      y: -5
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.0 + index * 0.1,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    viewport={{ once: true }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Subtle background glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-pixel-green/5 to-pixel-blue/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <div className="flex flex-col h-full relative z-10">
                      <motion.h3 
                        className="font-medium mb-3 relative group-hover:text-pixel-green transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 1.2 + index * 0.1 
                        }}
                        viewport={{ once: true }}
                      >
                        {skill.name}
                        <motion.div
                          className="absolute -bottom-1 left-0 h-0.5 bg-pixel-green"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.h3>
                      
                      <motion.div
                        className="mt-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 1.4 + index * 0.1 
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="w-full h-4 bg-gray-800 border border-gray-600 relative">
                          <motion.div 
                            className={`h-full relative`}
                            style={{ 
                              backgroundColor: skill.color || '#00FF9D',
                              width: `${(skill.level / skill.maxLevel) * 100}%`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: 1.6 + index * 0.1,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          >
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ 
                                duration: 1.2, 
                                delay: 2.8 + index * 0.1,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 4
                              }}
                            />
                          </motion.div>
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-end pr-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 2.0 + index * 0.1 
                            }}
                          >
                            <span className="text-xs font-pixel text-white">{skill.level}/{skill.maxLevel}</span>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="mt-2 text-right"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 1.8 + index * 0.1 
                        }}
                        viewport={{ once: true }}
                      >
                      <span className="text-sm font-pixel">level {skill.level}/{skill.maxLevel}</span>
                      </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PixelBorder>
        </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SkillMastery;