import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PixelBorder from './ui/PixelBorder';
import { experiences } from '../data/userData';

const QuestLog: React.FC = () => {
  const [expandedQuest, setExpandedQuest] = useState<number | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleExpand = (index: number) => {
    setExpandedQuest(expandedQuest === index ? null : index);
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="experience" className="h-full">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="h-full"
      >
        <PixelBorder className="p-6 h-full" hover={false}>
          <h2 className="font-pixel text-xl mb-6 text-pixel-green">QUEST LOG</h2>
          
          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <motion.div 
                key={`${experience.company}-${experience.period}`}
                variants={itemVariants}
                className="relative"
              >
                <PixelBorder 
                  className={`p-4 cursor-pointer ${experience.active ? 'border-pixel-gold' : ''}`}
                  border={experience.active ? 'border-2 border-pixel-gold' : undefined}
                >
                  <div 
                    className="flex justify-between items-start"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        {experience.active && (
                          <span className="inline-block w-3 h-3 rounded-full bg-pixel-gold mr-2 animate-pulse"></span>
                        )}
                        <h3 className="font-medium">
                          {experience.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{experience.company} | {experience.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{experience.period}</p>
                    </div>
                    
                    <button 
                      className="text-gray-400 hover:text-white transition-colors p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                    >
                      {expandedQuest === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                  
                  {expandedQuest === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <p className="text-sm mb-3">{experience.description}</p>
                      
                      {experience.skills && (
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill: string) => (
                            <span 
                              key={skill} 
                              className="inline-block px-2 py-1 bg-modern-dark text-xs rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </PixelBorder>
                
                {/* Connect line for timeline, except for last item */}
                {index < experiences.length - 1 && (
                  <div className="absolute top-full left-4 w-0.5 h-4 bg-pixel-green"></div>
                )}
              </motion.div>
            ))}
          </div>
        </PixelBorder>
      </motion.div>
    </section>
  );
};

export default QuestLog;