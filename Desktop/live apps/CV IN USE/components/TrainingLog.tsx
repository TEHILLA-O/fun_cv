import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PixelBorder from './ui/PixelBorder';
import { education } from '../data/userData';

const TrainingLog: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
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
    <section id="education" className="h-full">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="h-full"
      >
        <PixelBorder className="p-6 h-full" hover={false}>
          <h2 className="font-pixel text-xl mb-6 text-pixel-green">TRAINING LOG</h2>
          
          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div 
                key={`${edu.degree}-${index}`}
                variants={itemVariants}
              >
                <div className="mb-6">
                  <h3 className="font-medium mb-1">{edu.degree}</h3>
                  <p className="text-sm text-gray-400">{edu.school}</p>
                  <p className="text-xs text-gray-500 mt-1">{edu.period}</p>
                  
                  {edu.completed ? (
                    <PixelBorder 
                      className="mt-3 py-2 px-3 inline-block"
                      border="border-2 border-pixel-green"
                      hover={false}
                    >
                      <span className="text-xs font-pixel text-pixel-green">
                        COMPLETED {edu.score ? `- FINAL SCORE: ${edu.score}` : ''}
                      </span>
                    </PixelBorder>
                  ) : (
                    <PixelBorder 
                      className="mt-3 py-2 px-3 inline-block"
                      border="border-2 border-yellow-500"
                      hover={false}
                    >
                      <span className="text-xs font-pixel text-yellow-500">IN PROGRESS</span>
                    </PixelBorder>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </PixelBorder>
      </motion.div>
    </section>
  );
};

export default TrainingLog;