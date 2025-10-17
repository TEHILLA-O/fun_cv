'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  ease?: string | number[]
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.02,
  duration = 0.6,
  ease = [0.25, 0.46, 0.45, 0.94]
}) => {
  return (
    <div className={className}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ 
            opacity: 0, 
            y: 30, 
            rotateX: -90,
            scale: 0.5,
            rotateZ: -15
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            scale: 1,
            rotateZ: 0
          }}
          transition={{
            duration,
            delay: delay + (index * stagger),
            ease,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{
            scale: 1.2,
            color: "#00ff9d",
            textShadow: "0 0 15px #00ff9d",
            rotateZ: 5,
            transition: { duration: 0.2 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}

export default SplitText
