'use client'

import { motion } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  orientation?: 'portrait' | 'landscape'
}

const SectionWrapper = ({ 
  children, 
  className = '', 
  id,
  orientation = 'portrait' 
}: SectionWrapperProps) => {
  const [ref, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true 
  })

  const variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 50,
      rotateY: orientation === 'landscape' ? -20 : 0,
      rotateX: orientation === 'portrait' ? -20 : 0,
      filter: 'blur(10px)',
      boxShadow: '0 0 0px rgba(0, 255, 157, 0)',
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      boxShadow: '0 20px 40px rgba(0, 255, 157, 0.1)',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-20 ${className} breathing-section`}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.section>
  )
}

export default SectionWrapper
